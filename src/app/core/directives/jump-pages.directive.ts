/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
import { AfterViewInit, Directive, DoCheck, Host, Optional, Renderer2, Self, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

/**
 * The JumpPagesDirective is a directive for adding jump-to-page functionality to a MatPaginator.
 * @directive
 */
@Directive({
  selector: '[appJumpPages]'
})
export class JumpPagesDirective implements DoCheck, AfterViewInit {
  /**
   * The current page for the directive.
   */
  private currentPage: number;
  /**
   * The page gap text for the directive.
   */
  private pageGapTxt: string[];
  /**
   * The range start for the directive.
   */
  private rangeStart!: number;
  /**
   * The range end for the directive.
   */
  private rangeEnd!: number;
  /**
   * The buttons for the directive.
   */
  private buttons: MatButton[] = [];
  /**
   * The total number of pages to show for the directive.
   */
  private showTotalPages: number;
  /**
   * The checked page for the directive.
   */
  private checkPage: number[];

  /**
   * Creates an instance of the JumpPagesDirective class.
   * @param {MatPaginator} matPag - The MatPaginator to use for the directive.
   * @param {ViewContainerRef} ViewContainer - The view container reference to use for the directive.
   * @param {Renderer2} renderer - The renderer to use for the directive.
   */
  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private readonly ViewContainer: ViewContainerRef,
    private readonly renderer: Renderer2
  ) {
    this.currentPage = 1;
    this.pageGapTxt = ['•••', '---'];
    this.showTotalPages = 3;
    this.checkPage = [0, 0, 0];

    // Subscribe to rerender buttons when next page and last page button is used
    this.matPag.page.subscribe((paginator: PageEvent) => {
      this.currentPage = paginator.pageIndex;
      this.matPag.pageIndex = paginator.pageIndex;
      this.initPageRange();
    });
  }

  /**
   * Lifecycle hook that is called when Angular checks the directive's bindings.
   * Resets the paginator if the pageSize, pageIndex, or length changes.
   */
  ngDoCheck(): void {
    // Reset paginator if the pageSize, pageIndex, length changes
    if (
      this.matPag?.length !== this.checkPage[0] ||
      this.matPag?.pageSize !== this.checkPage[1] ||
      this.matPag?.pageIndex !== this.checkPage[2]
    ) {
      const pageCount = this.matPag.getNumberOfPages();
      if (this.currentPage > pageCount && pageCount !== 0) {
        this.currentPage = 1;
        this.matPag.pageIndex = 0;
      }
      this.currentPage = this.matPag.pageIndex;
      this.initPageRange();
      this.checkPage = [this.matPag.length, this.matPag.pageSize, this.matPag.pageIndex];
    }
  }

  /**
   * Builds the page numbers for the paginator.
   */
  private buildPageNumbers = () => {
    let dots: boolean[];
    let page: number;
    let pageDifference: number;
    let startIndex: number;
    let totalPages: number;
    totalPages = this.matPag.getNumberOfPages();
    // Container div with paginator container
    const pageContainer = this.ViewContainer.element.nativeElement.querySelector('div.mat-mdc-paginator-container');

    // Container div with paginator elements
    const actionContainer = this.ViewContainer.element.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    );
    // Button that triggers the next page action
    const nextPageNode = this.ViewContainer.element.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    // Button that triggers the prev page action
    const previousPageNode = this.ViewContainer.element.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous'
    );

    // Label showing the page range
    const pageRange = this.ViewContainer.element.nativeElement.querySelector('div.mat-mdc-paginator-range-label');

    let prevButtonCount = this.buttons.length;

    const buttonsContainer = this.renderer.createElement('div');

    // Remove buttons before creating new ones
    if (prevButtonCount > 0) {
      this.buttons.forEach((button) => {
        this.renderer.removeChild(actionContainer, button);
      });
      // Empty state array
      prevButtonCount = 0;
    }

    // this.renderer.addClass(pageRange, 'custom-paginator-counter');
    this.renderer.addClass(actionContainer, 'custom-paginator-container');

    // Initialize next page and last page buttons
    if (prevButtonCount === 0) {
      const nodeArray = actionContainer.childNodes;
      setTimeout(() => {
        for (const node of nodeArray) {
          if (node.nodeName === 'BUTTON') {
            // Next Button styles
            if (node.innerHTML.length > 100 && node.disabled) {
              this.renderer.addClass(node, 'custom-paginator-arrow-disabled');
              this.renderer.removeClass(node, 'custom-paginator-arrow-enabled');
            } else if (node.innerHTML.length > 100 && !node.disabled) {
              this.renderer.addClass(node, 'custom-paginator-arrow-enabled');
              this.renderer.removeClass(node, 'custom-paginator-arrow-disabled');
            }
          }
        }
      });
    }

    dots = [false, false];

    if (totalPages > 0) {
      this.renderer.insertBefore(actionContainer, this.createButton('0', this.matPag.pageIndex), nextPageNode);
    }

    page = this.showTotalPages + 2;
    pageDifference = totalPages - page;
    startIndex = Math.max(this.currentPage - this.showTotalPages - 2, 1);

    for (let index = startIndex; index < totalPages - 1; index = index + 1) {
      if (
        (index < page && this.currentPage <= this.showTotalPages) ||
        (index >= this.rangeStart && index <= this.rangeEnd) ||
        (this.currentPage > pageDifference && index >= pageDifference) ||
        totalPages < this.showTotalPages + page
      ) {
        this.renderer.insertBefore(actionContainer, this.createButton(`${index}`, this.matPag.pageIndex), nextPageNode);
      } else {
        if (index > this.rangeEnd && !dots[0]) {
          this.renderer.insertBefore(
            actionContainer,
            this.createButton(this.pageGapTxt[0], this.matPag.pageIndex),
            nextPageNode
          );
          dots[0] = true;
          break;
        }
        if (index < this.rangeEnd && !dots[1]) {
          this.renderer.insertBefore(
            actionContainer,
            this.createButton(this.pageGapTxt[1], this.matPag.pageIndex),
            nextPageNode
          );
          dots[1] = true;
        }
      }
    }

    if (totalPages > 1) {
      this.renderer.insertBefore(
        actionContainer,
        this.createButton(`${totalPages - 1}`, this.matPag.pageIndex),
        nextPageNode
      );
    }
  };

  /**
   * Creates a button element for a given page index.
   * @param {string} index The page index for the button.
   * @param {number} pageIndex The current page index.
   * @returns The created button element.
   */
  private createButton(index: string, pageIndex: number): MatButton {
    const linkBtn: MatButton = this.renderer.createElement('button');
    this.renderer.setAttribute(linkBtn, 'class', 'custom-paginator-page');
    this.renderer.addClass(linkBtn, 'custom-paginator-page-enabled');
    if (index === this.pageGapTxt[0] || index === this.pageGapTxt[1]) {
      this.renderer.addClass(linkBtn, 'custom-paginator-arrow-enabled');
    }
    const pagingTxt = isNaN(+index) ? this.pageGapTxt[0] : +index + 1;
    const text = this.renderer.createText(pagingTxt + '');
    this.renderer.addClass(linkBtn, 'mat-custom-page');
    switch (index) {
      case `${pageIndex}`:
        this.renderer.setAttribute(linkBtn, 'disabled', 'disabled');
        this.renderer.removeClass(linkBtn, 'custom-paginator-page-enabled');
        this.renderer.addClass(linkBtn, 'custom-paginator-page-disabled');
        break;
      case this.pageGapTxt[0]:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(
            this.currentPage < this.showTotalPages + 1
              ? this.showTotalPages + 2
              : this.currentPage + this.showTotalPages - 1
          );
        });
        break;
      case this.pageGapTxt[1]:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(
            this.currentPage > this.matPag.getNumberOfPages() - this.showTotalPages - 2
              ? this.matPag.getNumberOfPages() - this.showTotalPages - 3
              : this.currentPage - this.showTotalPages + 1
          );
        });
        break;
      default:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(+index);
        });
        break;
    }
    this.renderer.appendChild(linkBtn, text);
    // Add button to private array for state
    this.buttons.push(linkBtn);
    return linkBtn;
  }

  /**
   * Calculates the button range based on class input parameters and based on current page index value.
   */
  private initPageRange(): void {
    this.rangeStart = this.currentPage - this.showTotalPages / 2;
    this.rangeEnd = this.currentPage + this.showTotalPages / 2;
    this.buildPageNumbers();
  }

  /**
   * Switches to the specified page index and emits a page event with the new page index.
   * @param {number} index The index of the page to switch to.
   */
  private switchPage(index: number): void {
    this.matPag.pageIndex = index;
    this.matPag.page.emit({
      previousPageIndex: this.currentPage,
      pageIndex: index,
      pageSize: this.matPag.pageSize,
      length: this.matPag.length
    });
    this.currentPage = index;
    this.initPageRange();
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   * Sets the range start and range end for the directive and initializes the page range.
   */
  public ngAfterViewInit(): void {
    this.rangeStart = 0;
    this.rangeEnd = this.showTotalPages - 1;
    this.initPageRange();
  }
}

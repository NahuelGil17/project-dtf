import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ValidatorMessage } from '../../api/validator_message.service';
import { IHelpDescription } from '../../interfaces/help_description.interface';

/**
 * This directive adds custom styling and functionality to a textarea element.
 */
@Directive({
  selector: '[appTextarea]'
})
export class TextareaDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  /**
   * A subject for managing unsubscriptions.
   */
  unsubscription = new Subject();
  /**
   * The label to display for the textarea element.
   */
  @Input() label = '';

  /**
   * The icon to display when there is an error.
   */
  @Input() iconError = '';

  /**
   * Whether to display the error message or not.
   */
  @Input() notMessageError = false;

  /**
   * The help description to display for the textarea element.
   */
  @Input() helpDesc: IHelpDescription | null = null;
  /**
   * The wrap element for the textarea directive.
   */
  wrap: ElementRef | null = null;
  /**
   * The label input element for the textarea directive.
   */
  labelInputEl: ElementRef | null = null;
  /**
   * The paragraph element for the error description of the textarea directive.
   */
  paragraphErrorDesc: any = null;
  /**
   * The paragraph element for the help description of the textarea directive.
   */
  paragraphHelpDesc: any = null;
  /**
   * A boolean indicating whether the textarea element is required or not.
   */
  isRequired = false;

  /**
   * Creates an instance of the TextareaDirective class.
   * @param {ElementRef} el - The element reference to use for the directive.
   * @param {Renderer2} rendered - The renderer to use for the directive.
   * @param {ChangeDetectorRef} cd - The change detector reference to use for the directive.
   * @param {ValidatorMessage} validatorMessage - The validator message to use for the directive.
   * @param {NgModel} ngModel - The ngModel to use for the directive.
   * @param {NgControl} ngControl - The ngControl to use for the directive.
   */
  constructor(
    public el: ElementRef,
    public rendered: Renderer2,
    public cd: ChangeDetectorRef,
    public validatorMessage: ValidatorMessage,
    @Optional() public ngModel: NgModel,
    @Optional() public ngControl: NgControl
  ) {}

  /**
   * Handles the blur event for the textarea element.
   * @param {any} target - The target of the blur event.
   */
  @HostListener('blur', ['$event.target'])
  /**
   * Handles the blur event of the textarea element.
   * If the textarea is invalid, adds an error class to the element and displays an error message.
   * If the textarea is valid, removes the error class and error message.
   */
  onBlur(): void {
    if (this.ngControl.invalid) {
      this.addClass(true);
      if (this.notMessageError) return;
      const errors = this.ngControl?.control?.errors || {};
      const errorMessage = this.validatorMessage.getFirstErrorMessage(errors) as string;

      this.addErrorDescription(errorMessage);
      this.removeDescription();
      return;
    }

    this.addClass(false);
    this.addErrorDescription('');
  }

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * Adds the description for the directive if the help description has changed.
   * @param {SimpleChanges} changes - The changes to the directive's properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const helpDescChange = changes['helpDesc'];

    if (!helpDescChange?.firstChange) {
      this.addDescription();
    }
  }

  /**
   * Lifecycle hook that is called after the directive's properties have been initialized.
   * Adds the default class for the directive.
   */
  ngOnInit(): void {
    this.addClass(false);
  }

  /**
   * Lifecycle hook that is called after the directive's view has been initialized.
   * Sets the isRequired property for the directive and subscribes to the ngControl's statusChanges.
   * Adds the input label, description, and default class for the directive.
   */
  ngAfterViewInit(): void {
    this.isRequired = this.ngControl.hasError('required');

    this.ngControl.statusChanges?.pipe(takeUntil(this.unsubscription)).subscribe((res) => {
      if (res === 'VALID') {
        this.addClass(false);
        this.addErrorDescription('');
        if (!this.paragraphHelpDesc) {
          this.addDescription();
        }
      }

      const validators = this.ngControl.control?.validator && this.ngControl.control.validator({} as any);
      const validatorRequired = validators && validators['required'];
      if (this.isRequired != validatorRequired) {
        this.isRequired = this.ngControl.hasError('required');
        this.removeInputLabel();
        this.addInputLabel();
      }
    });

    this.addInputLabel();
    this.addDescription();
    this.rendered.addClass(this.el.nativeElement, 'input-default');
  }

  /**
   * Adds or removes the 'input-error' and 'input-default' classes to the textarea element based on the error parameter.
   * @param error A boolean indicating whether to add or remove the 'input-error' class.
   */
  addClass(error: boolean): void {
    if (error) {
      this.rendered.removeClass(this.el.nativeElement, 'input-default');
      this.rendered.addClass(this.el.nativeElement, 'input-error');
      return;
    }

    this.rendered.removeClass(this.el.nativeElement, 'input-error');
    this.rendered.addClass(this.el.nativeElement, 'input-default');
  }

  /**
   * Removes the input label from the textarea element.
   */
  removeInputLabel(): void {
    if (this.labelInputEl) {
      const currentElement = this.el.nativeElement;
      this.rendered.removeChild(currentElement.parentNode, this.labelInputEl);
    }
  }

  /**
   * Adds an input label to the textarea element.
   */
  addInputLabel(): void {
    if (!this.label) return;
    const currentElement = this.el.nativeElement;
    if (!this.wrap) {
      this.wrap = this.rendered.createElement('div');
      this.rendered.appendChild(currentElement.parentNode, this.wrap);
      this.rendered.appendChild(this.wrap, currentElement);
    }

    this.labelInputEl = this.rendered.createElement('label');
    let labelText = this.label;
    labelText += this.isRequired ? '*' : '';
    const text: string = this.rendered.createText(labelText);
    this.rendered.addClass(this.labelInputEl, 'label-input');

    this.rendered.appendChild(this.labelInputEl, text);
    this.rendered.insertBefore(currentElement.parentNode, this.labelInputEl, currentElement);
  }

  /**
   * Adds an error description to the textarea element.
   * @param {string} message The error message to add to the textarea element.
   */
  addErrorDescription(message = ''): void {
    const currentElement = this.el.nativeElement;
    const parentCurrentElement = currentElement.parentNode;
    if (message) {
      this.paragraphErrorDesc ? this.rendered.removeChild(currentElement.parentNode, this.paragraphErrorDesc) : null;
      this.paragraphErrorDesc = this.rendered.createElement('p');
      this.rendered.addClass(this.paragraphErrorDesc, 'input-description');
      this.rendered.addClass(this.paragraphErrorDesc, 'text-error-100');
      this.rendered.addClass(this.paragraphErrorDesc, 'mt-2');

      this.rendered.appendChild(parentCurrentElement, this.paragraphErrorDesc);
      const text = this.rendered.createText(message);
      this.rendered.appendChild(this.paragraphErrorDesc, text);

      if (this.iconError) {
        const iconClass = `ph-${this.iconError}`;
        const iconElement = this.rendered.createElement('i');
        this.rendered.addClass(iconElement, iconClass);
        this.rendered.addClass(iconElement, 'block');
        this.rendered.addClass(iconElement, 'mt-0.5');
        this.rendered.addClass(iconElement, 'mr-1');
        this.rendered.insertBefore(this.paragraphErrorDesc, iconElement, text);
      }
    } else {
      this.paragraphErrorDesc ? this.rendered.removeChild(currentElement.parentNode, this.paragraphErrorDesc) : null;
      this.paragraphErrorDesc = null;
    }
  }

  /**
   * Removes the help description from the textarea element.
   */
  removeDescription(): void {
    if (this.paragraphHelpDesc) {
      const currentElement = this.el.nativeElement;
      this.rendered.removeChild(currentElement.parentNode, this.paragraphHelpDesc);
      this.paragraphHelpDesc = null;
    }
  }

  /**
   * Adds a help description to the textarea element.
   */
  addDescription(): void {
    if (this.helpDesc) {
      const currentElement = this.el.nativeElement;

      this.paragraphHelpDesc
        ? this.rendered.removeChild(currentElement.parentNode.parentNode, this.paragraphHelpDesc)
        : null;
      this.paragraphHelpDesc = this.rendered.createElement('p');
      this.rendered.addClass(this.paragraphHelpDesc, 'input-description');
      this.rendered.addClass(this.paragraphHelpDesc, 'mt-2');

      this.rendered.appendChild(currentElement.parentNode, this.paragraphHelpDesc);
      const text = this.rendered.createText(this.helpDesc.desc);
      this.rendered.appendChild(this.paragraphHelpDesc, text);

      if (this.helpDesc.icon) {
        const iconClass = `ph-${this.helpDesc.icon}`;
        const iconElement = this.rendered.createElement('i');
        this.rendered.addClass(iconElement, iconClass);
        this.rendered.addClass(iconElement, 'block');
        this.rendered.addClass(iconElement, 'mt-0.5');
        this.rendered.addClass(iconElement, 'mr-1');
        this.rendered.insertBefore(this.paragraphHelpDesc, iconElement, text);
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscription.next(null);
    this.unsubscription.complete();
  }
}

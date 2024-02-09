import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { SharedModule } from '../../shared.module';
import { BtnDirective } from './btn.directive';

describe('Button test', () => {
  test('Button render with btn-primary class', async () => {
    await render('<button appBtn>Test</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  test('Button render with btn-secondary class', async () => {
    await render('<button appBtn [color]="color">Test</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        color: 'secondary'
      }
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });

  test('Button render with btn-destructive class', async () => {
    await render('<button appBtn [color]="color">Test</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        color: 'destructive'
      }
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-destructive');
  });

  test('Button render with btn-destructive-outline class', async () => {
    await render('<button appBtn [color]="color">Test</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        color: 'destructive-outline'
      }
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-destructive-outline');
  });

  test('Button render with icon: google ', async () => {
    await render('<button appBtn [icon]="icon">Log in with Google</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        icon: 'info'
      }
    });

    const button = screen.getByRole('button');
    const icon = button.querySelector('.ph-info');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should add the "info" icon to the left of the button text', async () => {
    await render('<button appBtn [icon]="icon">Click me</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        icon: 'info'
      }
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex-row-reverse');
  });

  it('should add the "info" icon to the right of the button text', async () => {
    await render('<button appBtn [icon]="icon" [iconPosition]="iconPosition">Click me</button>', {
      declarations: [BtnDirective],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        icon: 'info',
        iconPosition: 'right'
      }
    });

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('flex-row-reverse');
  });

  it('should show icon based on animate value', async () => {
    await render(
      '<button appBtn [icon]="icon" [iconPosition]="iconPosition" [animate]="animate" [loader]="loader">Click me</button>',
      {
        declarations: [BtnDirective],
        imports: [SharedModule],
        schemas: [NO_ERRORS_SCHEMA],
        componentProperties: {
          icon: 'info',
          iconPosition: 'left',
          animate: true,
          loader: false
        }
      }
    );

    const button = screen.getByRole('button');
    const icon = button.querySelector('.ph-info');
    expect(icon).not.toBeVisible();
  });
});

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UppercaseDirective } from './uppercase.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appUppercase />`,
  standalone: true,
  imports: [UppercaseDirective]
})
class TestComponent { }

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.directive(UppercaseDirective));
  });

  it('debería crear la directiva', () => {
    expect(inputEl).toBeTruthy();
  });

  it('debería convertir el texto a mayúsculas al escribir', () => {
    const input = inputEl.nativeElement as HTMLInputElement;
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe('ABC');
  });
});

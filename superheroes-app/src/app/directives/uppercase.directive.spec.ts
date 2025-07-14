import { UppercaseDirective } from './uppercase.directive';
import { ElementRef } from '@angular/core';

describe('UppercaseDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('input') } as ElementRef;
    const directive = new UppercaseDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});

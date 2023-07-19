import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageNonPosterDirective } from './image-non-poster.directive';

@Component({
  template: `<img
    appImageNonPoster
    [placeholder]="placeholder"
    src="non-existent-image.jpg"
    alt="" />`,
})
class TestComponent {
  @Input() placeholder!: string;
}

describe('ImageNonPosterDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let imageEl: DebugElement;
  const testPlaceholder = 'Hello There';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageNonPosterDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.placeholder = testPlaceholder;
    imageEl = fixture.debugElement.query(By.css('img'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ImageNonPosterDirective(imageEl);

    expect(directive).toBeTruthy();
  });

  it('should replace the image source with a placeholder URL when the image fails to load', () => {
    const imgEl: HTMLImageElement = imageEl.nativeElement;

    imgEl.dispatchEvent(new Event('error'));

    expect(imgEl.src).toBe(
      `https://images.placeholders.dev/?text=${testPlaceholder.replace(
        ' ',
        '%20'
      )}&textColor=%236d6e71`
    );
  });
});

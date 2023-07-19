import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoLabelComponent } from './info-label.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

describe('InfoLabelComponent', () => {
  let component: InfoLabelComponent;
  let fixture: ComponentFixture<InfoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoLabelComponent, CapitalizePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLabelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label and value', () => {
    const label = 'Name';
    const value = 'John';
    component.label = label;
    component.value = value;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toContain(label + ': ' + value);
  });

  it('should capitalize label', () => {
    const label = 'name';
    const capitalizedLabel = 'Name';
    component.label = label;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('span');
    expect(element.textContent).toContain(capitalizedLabel);
  });
});

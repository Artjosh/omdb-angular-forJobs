import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {
  MatCard,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correctly without inputs', () => {
    const title = fixture.debugElement.query(By.directive(MatCardTitle));
    const subtitle = fixture.debugElement.query(By.directive(MatCardSubtitle));
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(title).toBeFalsy();
    expect(subtitle).toBeFalsy();
    expect(card?.styles['width']).toBeFalsy();
  });

  it('should render correctly with inputs', () => {
    const expectedWidth = 1337;
    const expectedTitle = 'Hello There!';
    const expectedSubtitle = 'General Kenobi';
    component.width = 1337;
    component.title = 'Hello There!';
    component.subtitle = 'General Kenobi';
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.directive(MatCard));
    const title = fixture.debugElement.query(By.directive(MatCardTitle));
    const subtitle = fixture.debugElement.query(By.directive(MatCardSubtitle));

    expect(title?.properties['innerText']).toContain(expectedTitle);
    expect(subtitle?.properties['innerText']).toContain(expectedSubtitle);
    expect(card?.styles['width']).toContain(`${expectedWidth}px`);
  });
});

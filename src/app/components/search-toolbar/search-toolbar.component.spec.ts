import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { SearchToolbarComponent } from './search-toolbar.component';

xdescribe('SearchToolbarComponent', () => {
  let component: SearchToolbarComponent;
  let fixture: ComponentFixture<SearchToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchToolbarComponent],
      imports: [TranslocoTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsContentComponent } from './suggestions-content.component';

describe('SuggestionsContentComponent', () => {
  let component: SuggestionsContentComponent;
  let fixture: ComponentFixture<SuggestionsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

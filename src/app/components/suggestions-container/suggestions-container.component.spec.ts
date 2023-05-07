import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsContainerComponent } from './suggestions-container.component';

describe('SuggestionsContainerComponent', () => {
  let component: SuggestionsContainerComponent;
  let fixture: ComponentFixture<SuggestionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationContentComponent } from './reclamation-content.component';

describe('ReclamationContentComponent', () => {
  let component: ReclamationContentComponent;
  let fixture: ComponentFixture<ReclamationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

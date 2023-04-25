import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsContainerComponent } from './reclamations-container.component';

describe('OperationsContainerComponent', () => {
  let component: ReclamationsContainerComponent;
  let fixture: ComponentFixture<ReclamationsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

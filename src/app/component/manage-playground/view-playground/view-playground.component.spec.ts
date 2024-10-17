import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlaygroundComponent } from './view-playground.component';

describe('ViewPlaygroundComponent', () => {
  let component: ViewPlaygroundComponent;
  let fixture: ComponentFixture<ViewPlaygroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPlaygroundComponent]
    });
    fixture = TestBed.createComponent(ViewPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

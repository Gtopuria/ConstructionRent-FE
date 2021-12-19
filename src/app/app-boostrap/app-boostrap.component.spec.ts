import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBoostrapComponent } from './app-boostrap.component';

describe('AppBoostrapComponent', () => {
  let component: AppBoostrapComponent;
  let fixture: ComponentFixture<AppBoostrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBoostrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBoostrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

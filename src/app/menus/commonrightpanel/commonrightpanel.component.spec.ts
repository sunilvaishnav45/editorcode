import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonrightpanelComponent } from './commonrightpanel.component';

describe('CommonrightpanelComponent', () => {
  let component: CommonrightpanelComponent;
  let fixture: ComponentFixture<CommonrightpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonrightpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonrightpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

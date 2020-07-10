import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendMgmtComponent } from './trend-mgmt.component';

describe('TrendMgmtComponent', () => {
  let component: TrendMgmtComponent;
  let fixture: ComponentFixture<TrendMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMgmtComponent } from './stock-mgmt.component';

describe('StockMgmtComponent', () => {
  let component: StockMgmtComponent;
  let fixture: ComponentFixture<StockMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

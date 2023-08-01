import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOffersComponent } from './tools-offers.component';

describe('ToolsOffersComponent', () => {
  let component: ToolsOffersComponent;
  let fixture: ComponentFixture<ToolsOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MystockComponent } from './mystock.component';

describe('MystockComponent', () => {
  let component: MystockComponent;
  let fixture: ComponentFixture<MystockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MystockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MystockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

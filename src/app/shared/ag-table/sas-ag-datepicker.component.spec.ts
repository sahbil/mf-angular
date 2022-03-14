import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SasAgDatepickerComponent } from './sas-ag-datepicker.component';

describe('SasAgDatepickerComponent', () => {
  let fixture: ComponentFixture<SasAgDatepickerComponent>;
  let comp: SasAgDatepickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SasAgDatepickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SasAgDatepickerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should init values', () => {
    comp.selectedDate = '2022-02-22T15:57:46.384Z';
    expect('2022-02-22').toEqual(comp.getValue());
  });

  it('should get the value of the selected date', () => {
    comp.selectedDate = '2022-02-22T15:57:46.384Z';
    expect('2022-02-22').toEqual(comp.getValue());
  });
});

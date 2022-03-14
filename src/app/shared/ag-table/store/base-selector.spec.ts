import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { BaseAgTableState } from './base-state';
import { BaseSelector } from './base-selector';

@Injectable()
class MockSelector extends BaseSelector<any> {
  getStateName(): string {
    return 'MOCK';
  }
}

const mockState: BaseAgTableState<any> = {
  isLoading: false,
  isDeleted: false,
  data: ['boo', 'foo'],
  selectedItem: 'boo',
  newItem: 'cool',
  draft: 'baby',
  editedItem: 'me',
  isValid: true,
  isReset: false,
};

describe('Store > Base > Selectors', () => {
  let selectorService: MockSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockSelector],
    }).compileComponents();
    selectorService = TestBed.inject(MockSelector);
  });

  it('should returns the current item', () => {
    expect(selectorService.selectCurrentItem().projector(mockState)).toBe('boo');
  });

  it('should returns the new item', () => {
    expect(selectorService.selectNewItem().projector(mockState)).toBe('cool');
  });

  it('should returns the list', () => {
    expect(selectorService.selectItemList().projector(mockState)?.length).toEqual(2);
  });

  it('should returns the draft item', () => {
    expect(selectorService.selectDraftItem().projector(mockState)).toBe('baby');
  });

  it('should returns the edit item', () => {
    expect(selectorService.selectEditedItem().projector(mockState)).toBe('me');
  });

  it('should returns the form validation state', () => {
    expect(selectorService.selectFormValidationState().projector(mockState)).toBe(true);
  });

  it('should returns the form reset state', () => {
    expect(selectorService.selectFormResetState().projector(mockState)).toBe(false);
  });
});

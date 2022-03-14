import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { MockFacadeService, mockReducer, MockSelectorService } from '../base-facade.service.spec';
import { SasNextLoggerService } from '../../../services/sas-logger.service';
import { AbstractAgTableModalComponent } from './abstract-table-modal.component';
import { BaseAgTableConfig } from '../../../model/table-base.model';
import { BMWTranslateTestingModule, MockTranslatePipe } from '../../../../test/translate-testing.module';

@Component({
  template: `
    <ag-grid-angular
      class="ag-theme-bmw"
      [modules]="modules"
      [rowData]="rowData"
      [rowBuffer]="runtimeCompilerData.rowBuffer"
      [gridOptions]="runtimeCompilerData.gridOptions"
      [defaultColDef]="runtimeCompilerData.defaultColDef"
      [rowModelType]="runtimeCompilerData.rowModelType"
      [paginationPageSize]="runtimeCompilerData.paginationPageSize"
      [cacheOverflowSize]="runtimeCompilerData.cacheOverflowSize"
      [maxConcurrentDatasourceRequests]="runtimeCompilerData.maxConcurrentDatasourceRequests"
      [infiniteInitialRowCount]="runtimeCompilerData.infiniteInitialRowCount"
      [maxBlocksInCache]="runtimeCompilerData.maxBlocksInCache"
      [getRowNodeId]="getRowNodeId"
      [frameworkComponents]="frameworkComponents"
      [statusBar]="runtimeCompilerData.statusBar"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
class MockTableModalComponent extends AbstractAgTableModalComponent<string, MockFacadeService> {
  constructor(protected readonly service: MockFacadeService, protected readonly trans: TranslateService) {
    super(
      new BaseAgTableConfig<string>(
        'Boo',
        [
          {
            headerName: 'foo',
          },
        ],
        {
          withModal: false,
        }
      ),
      trans
    );
  }

  getModalCreateTitle(): string {
    return 'boo';
  }

  getModalEditTitle(): string {
    return 'foo';
  }

  getService(): MockFacadeService {
    return this.service;
  }
}

describe('AbstractAgTableModalComponent', () => {
  let fixture: ComponentFixture<MockTableModalComponent>;
  let comp: MockTableModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('MOCK_TEST', mockReducer),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BMWTranslateTestingModule,
        AgGridModule.withComponents([]),
      ],
      declarations: [MockTableModalComponent, MockTranslatePipe],
      providers: [
        MockFacadeService,
        MockSelectorService,
        {
          provide: NGXLogger,
          useValue: {
            // eslint-disable-next-line no-console
            debug: (...s: string[]) => console.log(s), // eslint-disable-line no-console
            // eslint-disable-next-line no-console
            error: (...s: string[]) => console.log(s), // eslint-disable-line no-console
            // eslint-disable-next-line no-console
            info: (...s: string[]) => console.log(s), // eslint-disable-line no-console
          },
        },
        SasNextLoggerService,
      ],
    })
      .overrideComponent(MockTableModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MockTableModalComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
    expect(comp.getService()).toBeDefined();
    expect(comp.getModalCreateTitle()).toEqual('boo');
    expect(comp.getModalEditTitle()).toEqual('foo');
    expect(comp.showFormDialog).toBeFalsy();
    expect(comp.isEditMode).toBeFalsy();
  });

  it('should reset form when dialog is closed', () => {
    const spyFacade = spyOn(comp.getService(), 'resetForm');
    comp.closeDialog();
    expect(comp.showFormDialog).toBeFalsy();
    expect(spyFacade).toHaveBeenCalled();
  });

  it('should update state when the row has been edited', () => {
    const row = {
      node: {
        data: 'boo',
      },
    };
    const spyFacade = spyOn(comp.getService(), 'edit').and.callThrough();
    comp.onRowEditingStopped(row);
    expect(spyFacade).toHaveBeenCalledWith('boo');
  });

  it('should reset draft when create form popup opens', () => {
    const spyReset = spyOn(comp.getService(), 'removeSelection');
    comp.openOrRouting();
    expect(spyReset).toHaveBeenCalled();
    expect(comp.showFormDialog).toBeTrue();
    expect(comp.selectedRow).toBeFalsy();
    expect(comp.isEditMode).toBeFalsy();
  });

  it('should open popup in edit mode', () => {
    comp.openEditDialog();
    expect(comp.showFormDialog).toBeTrue();
    expect(comp.isEditMode).toBeTrue();
  });

  it('should init listeners', () => {
    const spy = spyOn<any>(comp, 'initStoreListener');
    comp.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should destroy all subscriptions', () => {
    expect(comp.editedItemSubscription).toBeDefined();
    const spyEdit = spyOn<any>(comp.editedItemSubscription, 'unsubscribe');
    expect(comp.draftSubscription).toBeDefined();
    const spyDraft = spyOn<any>(comp.draftSubscription, 'unsubscribe');
    expect(comp.selectNewItemSubscription).toBeDefined();
    const spyNew = spyOn<any>(comp.selectNewItemSubscription, 'unsubscribe');
    expect(comp.selectFormValidationSubscription).toBeDefined();
    const spyForm = spyOn<any>(comp.selectFormValidationSubscription, 'unsubscribe');
    expect(comp.selectedItemSubscription).toBeDefined();
    const spySelection = spyOn<any>(comp.selectedItemSubscription, 'unsubscribe');

    comp.ngOnDestroy();
    expect(spyEdit).toHaveBeenCalled();
    expect(spyDraft).toHaveBeenCalled();
    expect(spyNew).toHaveBeenCalled();
    expect(spyForm).toHaveBeenCalled();
    expect(spySelection).toHaveBeenCalled();
  });

  it('should close the dialog when edit item state is changed', fakeAsync(() => {
    const spyRefresh = spyOn(comp.getService(), 'refreshList');
    spyOn(comp.getService(), 'getEditedItem').and.returnValue(of('edit'));
    const spyLoad = spyOn(comp, 'loadTableData');
    const spyClose = spyOn(comp, 'closeDialog');
    comp.ngOnInit();
    flushMicrotasks();
    expect(spyRefresh).toHaveBeenCalled();
    expect(spyLoad).toHaveBeenCalled();
    expect(spyClose).toHaveBeenCalled();
  }));

  it('should close the dialog when new item state is changed', fakeAsync(() => {
    spyOn(comp.getService(), 'getNewItem').and.returnValue(of('new'));
    const spyLoad = spyOn(comp, 'loadTableData');
    const spyClose = spyOn(comp, 'closeDialog');
    comp.ngOnInit();
    flushMicrotasks();
    expect(spyLoad).toHaveBeenCalled();
    expect(spyClose).toHaveBeenCalled();
    expect(comp.showFormDialog).toBeFalsy();
  }));

  it('should open edit dialog when a row is selected', fakeAsync(() => {
    spyOn(comp.getService(), 'getSelectedItem').and.returnValue(of('select'));
    const spyOpen = spyOn(comp, 'openEditDialog');
    comp.ngOnInit();
    flushMicrotasks();
    expect(spyOpen).toHaveBeenCalled();
  }));

  it('should disable primary button if form is not valid', fakeAsync(() => {
    spyOn(comp.getService(), 'getFormValidationState').and.returnValue(of(false));
    comp.ngOnInit();
    flushMicrotasks();
    expect(comp.disablePrimaryBtn).toBeTrue();
  }));
});

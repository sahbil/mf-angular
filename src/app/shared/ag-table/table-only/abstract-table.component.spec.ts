import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {AgGridModule} from 'ag-grid-angular';
import {NGXLogger} from 'ngx-logger';
import {BaseAgTableConfig} from '../../model/table-base.model';
import {MockFacadeService, mockReducer, MockSelectorService} from '../base-facade.service.spec';
import {AbstractAgTableComponent} from './abstract-table.component';

@Component({
  template: `
    <ag-grid-angular
      class="ag-theme-bmw"
      [rowData]="rowData"
      [gridOptions]="gridOptions"
      [defaultColDef]="runtimeCompilerData.defaultColDef"
      [getRowNodeId]="getRowNodeId"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
class MockTableComponent extends AbstractAgTableComponent<string, MockFacadeService> {
  override title = 'mock';

  constructor(
    protected readonly service: MockFacadeService,
    protected override readonly trans: TranslateService,
    private readonly router: Router
  ) {
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

describe('AbstractAgTableComponent', () => {
  let fixture: ComponentFixture<MockTableComponent>;
  let comp: MockTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        StoreModule.forFeature('MOCK_TEST', mockReducer),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [MockTableComponent],
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
      ],
    })
      .overrideComponent(MockTableComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default},
      })
      .compileComponents();
    fixture = TestBed.createComponent(MockTableComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
    expect(comp.getService()).toBeDefined();
    expect(comp.getModalCreateTitle()).toEqual('boo');
    expect(comp.getModalEditTitle()).toEqual('foo');
    expect(comp.title).toEqual('mock');
    expect(comp.disableDeleteBtn).toBeTrue();
  });

  it('should trigger onResize method when window is resized', () => {
    const spy = spyOn(comp, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  it('should reload data', fakeAsync(() => {
    const spyRefreshCell = spyOn(comp, 'refreshCell');
    const spyServersideRender = spyOn<any>(comp, 'serverSideDatasource');
    comp.loadTableData();
    flushMicrotasks();
    expect(spyRefreshCell).toHaveBeenCalled();
    expect(spyServersideRender).toHaveBeenCalled();
  }));

  it('should navigate router', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    comp.openOrRouting();
    expect(navigateSpy).not.toHaveBeenCalled();
    comp.crudBehaviour.router = router;
    comp.crudBehaviour.navigateTo = 'boo';
    comp.openOrRouting();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should return the title', () => {
    expect(comp.getTitle()).toEqual('mock');
  });

  it('should return row ID', () => {
    expect(comp.getRowNodeId({id: 1})).toEqual(1);
  });

  it('should handle onResize calls', () => {
    const spyRowHeights = spyOn(comp.gridApi, 'resetRowHeights');
    const spySizeColumns = spyOn(comp.gridApi, 'sizeColumnsToFit');
    comp.onResize(new Event('resize'));
    expect(spyRowHeights).toHaveBeenCalled();
    expect(spySizeColumns).toHaveBeenCalled();
  });

  it('should not handle onResize calls when gridApi is undefined', () => {
    const spyRowHeights = spyOn(comp.gridApi, 'resetRowHeights');
    const spySizeColumns = spyOn(comp.gridApi, 'sizeColumnsToFit');
    // Force readonly prop gridApi to be undefined
    Object.defineProperty(
      comp,
      'gridApi',
      Object.defineProperty({}, '_gridApi', {
        get() {
          return undefined;
        },
      })
    );
    comp.onResize(new Event('resize'));
    expect(spyRowHeights).not.toHaveBeenCalled();
    expect(spySizeColumns).not.toHaveBeenCalled();
  });

  it('should handle onFirstDataRendered calls', () => {
    const spySizeColumns = spyOn(comp.gridApi, 'sizeColumnsToFit');
    const spyRowHeights = spyOn(comp.gridApi, 'resetRowHeights');
    comp.onFirstDataRendered(new Event('firstDataRendered'));
    expect(spySizeColumns).toHaveBeenCalled();
    expect(spyRowHeights).toHaveBeenCalled();
  });

  it('should not handle onFirstDataRendered calls when gridApi is undefined', () => {
    const spySizeColumns = spyOn(comp.gridApi, 'sizeColumnsToFit');
    const spyRowHeights = spyOn(comp.gridApi, 'resetRowHeights');
    // Force readonly prop gridApi to be undefined
    Object.defineProperty(
      comp,
      'gridApi',
      Object.defineProperty({}, '_gridApi', {
        get() {
          return undefined;
        },
      })
    );
    comp.onFirstDataRendered(new Event('firstDataRendered'));
    expect(spySizeColumns).not.toHaveBeenCalled();
    expect(spyRowHeights).not.toHaveBeenCalled();
  });
});

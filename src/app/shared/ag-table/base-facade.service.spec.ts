import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {AgBaseFacadeService} from './base-facade.service';
import {BaseSelector} from './store/base-selector';
import {BaseAgTableState} from './store/base-state';
import {MockReducer, mockState} from './store/base-reducer.spec';
import {AppRootState} from '../store/state';
import {LoggerService} from '../services/logger.service';
import {immutableReducer} from '../utils/reducerUtils';

@Injectable()
export class MockSelectorService extends BaseSelector<any> {
  getStateName(): string {
    return 'MOCK_TEST';
  }
}

@Injectable()
export class MockFacadeService extends AgBaseFacadeService<any> {
  constructor(
    protected override readonly store$: Store<AppRootState>,
    protected override readonly http: HttpClient,
    protected override readonly logger: LoggerService,
    private readonly selectorService: MockSelectorService
  ) {
    super(store$, http, logger);
  }

  getSelectorService(): BaseSelector<any> {
    return this.selectorService;
  }

  getUrl(): string {
    return 'url';
  }
}

const testState = {...mockState};

const mockReducerInstance = new MockReducer();

export const mockReducer = (state = testState, action: any): BaseAgTableState<any> =>
  immutableReducer(mockReducerInstance.cases(), state as BaseAgTableState<any>, action as any);

describe('AgBaseFacadeService', () => {
  let service: AgBaseFacadeService<any>;
  let selectorService: MockSelectorService;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreModule.forFeature('MOCK_TEST', mockReducer), HttpClientTestingModule],
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
        LoggerService,
      ],
    });
    service = TestBed.inject(MockFacadeService);
    selectorService = TestBed.inject(MockSelectorService);
    store = TestBed.inject(Store);
  });

  it('should create the service', () => {
    expect(service).toBeDefined();
    expect(service.getUrl()).toBe('url');
    expect(service.getSelectorService()).toBeDefined();
  });

  it('should get list from the state', (done) => {
    service.getList().subscribe((data) => {
      expect(data?.length).toBe(0);
      done();
    });
  });

  it('should update the list state', (done) => {
    service.setList(['boo', 'foo']);
    service.getList().subscribe((data) => {
      expect(data?.length).toBe(2);
      done();
    });
  });

  it('should update the selectedItem state', (done) => {
    service.selectItem('boo');
    service.getSelectedItem().subscribe((data) => {
      // @ts-ignore
      expect(service.inEditing).toBeTrue();
      expect(data).toBe('boo');
      done();
    });
  });

  it('should reset the selectedItem state', (done) => {
    service.removeSelection();
    service.getSelectedItem().subscribe((data) => {
      expect(data).toBeFalsy();
      // @ts-ignore
      expect(service.inEditing).toBeFalsy();
      done();
    });
  });

  it('should update the draft state', (done) => {
    service.onEdit('draft');
    service.getDraftItem().subscribe((data) => {
      expect(data).toBe('draft');
      done();
    });
  });

  it('should update the new item state', (done) => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.returnValue(of('new'));
    service.newItem('draft');
    service.getNewItem().subscribe((data) => {
      expect(data).toBe('new');
      done();
    });
  });

  it('should update the editItem state', (done) => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'put').and.returnValue(of('edited'));
    service.edit('draft');
    service.getEditedItem().subscribe((data) => {
      expect(data).toBe('edited');
      done();
    });
  });

  it('should update the delete state', (done) => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'delete').and.callThrough();
    service.delete(1);
    service.getDeletedState().subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });
  });

  it('should update the form validation state', (done) => {
    service.setFormValidationState(true);
    service.getFormValidationState().subscribe((data) => {
      expect(data).toBeTrue();
      done();
    });
  });

  it('should reset the form state', (done) => {
    service.resetForm();
    service.isFormReset().subscribe((data) => {
      expect(data).toBeTrue();
      done();
    });
  });

  it('should refresh the list state', (done) => {
    service.refreshList();
    service.getList().subscribe((data) => {
      expect(data.length).toEqual(0);
      done();
    });
  });

  it('should load the list state', (done) => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of({content: ['boo']}));
    service.loadList();
    service.getList().subscribe((data) => {
      expect(data.length).toEqual(1);
      done();
    });
  });

  it('should reset the delete state', (done) => {
    service.resetDelete();
    service.getDeletedState().subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });
  });
});

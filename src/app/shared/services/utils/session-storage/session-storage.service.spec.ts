import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });
    service = TestBed.get(SessionStorageService);
  });

  afterEach(() => sessionStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testSessionStorage should be executable', () => {
    spyOn(service, 'testSessionStorage');
    service.testSessionStorage();
    expect(service.testSessionStorage).toHaveBeenCalled();
  });

  it('should get, set, and remove the item', () => {
    service.setItem('TEST', 'item');
    expect(service.getItem('TEST')).toBe('item');
    service.removeItem('TEST');
    expect(service.getItem('TEST')).toBe(null);
  });

  it('should load initial state', () => {
    service.setItem('TEST.PROP', 'value');
    expect(SessionStorageService.loadInitialState()).toEqual({
      test: { prop: 'value' }
    });
  });

  it('should load nested initial state', () => {
    service.setItem('TEST.PROP1.PROP2', 'value');
    expect(SessionStorageService.loadInitialState()).toEqual({
      test: { prop1: { prop2: 'value' } }
    });
  });

  it('should load initial state with camel case property', () => {
    service.setItem('TEST.SUB-PROP', 'value');
    expect(SessionStorageService.loadInitialState()).toEqual({
      test: { subProp: 'value' }
    });
  });

  it('should load nested initial state with camel case properties', () => {
    service.setItem('TEST.SUB-PROP.SUB-SUB-PROP', 'value');
    expect(SessionStorageService.loadInitialState()).toEqual({
      test: { subProp: { subSubProp: 'value' } }
    });
  });
});

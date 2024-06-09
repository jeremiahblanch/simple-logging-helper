import { WindowRef } from '../src/types';
import SimpleLoggingHelper from '../src/lib/slh';

const slh = new SimpleLoggingHelper();

slh.init({
  keyOnWindow: '__',
})

const cat = slh.createForNamespace('CAT')
const dog = slh.createForNamespace('DOG')

test('shouldLogTrace handles toggling of TRACE across multiple namespaces', () => {
  expect(cat.shouldLogTrace()).toBeFalsy();
  expect(dog.shouldLogTrace()).toBeFalsy();
  
  (window as WindowRef).__.CAT.TRACE = true;
  expect(cat.shouldLogTrace()).toBeTruthy();
  expect(dog.shouldLogTrace()).toBeFalsy();

  (window as WindowRef).__.DOG.TRACE = true;
  expect(dog.shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug handles toggling of DEBUG across multiple namespaces', () => {
  expect(cat.shouldLogDebug()).toBeFalsy();
  expect(dog.shouldLogDebug()).toBeFalsy();
  
  (window as WindowRef).__.CAT.DEBUG = true;
  expect(cat.shouldLogDebug()).toBeTruthy();
  expect(dog.shouldLogDebug()).toBeFalsy();

  (window as WindowRef).__.DOG.DEBUG = true;
  expect(dog.shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo handles toggling of INFO across multiple namespaces', () => {
  expect(cat.shouldLogInfo()).toBeFalsy();
  expect(dog.shouldLogInfo()).toBeFalsy();
  
  (window as WindowRef).__.CAT.INFO = true;
  expect(cat.shouldLogInfo()).toBeTruthy();
  expect(dog.shouldLogInfo()).toBeFalsy();

  (window as WindowRef).__.DOG.INFO = true;
  expect(dog.shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn handles toggling of WARN across multiple namespaces', () => {
  expect(cat.shouldLogWarn()).toBeFalsy();
  expect(dog.shouldLogWarn()).toBeFalsy();
  
  (window as WindowRef).__.CAT.WARN = true;
  expect(cat.shouldLogWarn()).toBeTruthy();
  expect(dog.shouldLogWarn()).toBeFalsy();

  (window as WindowRef).__.DOG.WARN = true;
  expect(dog.shouldLogWarn()).toBeTruthy();
})

test('shouldLogError handles toggling of ERROR across multiple namespaces', () => {
  expect(cat.shouldLogError()).toBeFalsy();
  expect(dog.shouldLogError()).toBeFalsy();
  
  (window as WindowRef).__.CAT.ERROR = true;
  expect(cat.shouldLogError()).toBeTruthy();
  expect(dog.shouldLogError()).toBeFalsy();

  (window as WindowRef).__.DOG.ERROR = true;
  expect(dog.shouldLogError()).toBeTruthy();
})

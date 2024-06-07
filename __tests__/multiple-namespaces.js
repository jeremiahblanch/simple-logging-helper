import simpleLoggingHelper from '../src';

simpleLoggingHelper.init({
  keyOnWindow: '__',
})
const cat = simpleLoggingHelper.createForNamespace('CAT')
const dog = simpleLoggingHelper.createForNamespace('DOG')

test('shouldLogTrace handles toggling of TRACE across multiple namespaces', () => {
  expect(cat.shouldLogTrace()).toBeFalsy();
  expect(dog.shouldLogTrace()).toBeFalsy();
  
  window.__.CAT.TRACE = true;
  expect(cat.shouldLogTrace()).toBeTruthy();
  expect(dog.shouldLogTrace()).toBeFalsy();

  window.__.DOG.TRACE = true;
  expect(dog.shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug handles toggling of DEBUG across multiple namespaces', () => {
  expect(cat.shouldLogDebug()).toBeFalsy();
  expect(dog.shouldLogDebug()).toBeFalsy();
  
  window.__.CAT.DEBUG = true;
  expect(cat.shouldLogDebug()).toBeTruthy();
  expect(dog.shouldLogDebug()).toBeFalsy();

  window.__.DOG.DEBUG = true;
  expect(dog.shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo handles toggling of INFO across multiple namespaces', () => {
  expect(cat.shouldLogInfo()).toBeFalsy();
  expect(dog.shouldLogInfo()).toBeFalsy();
  
  window.__.CAT.INFO = true;
  expect(cat.shouldLogInfo()).toBeTruthy();
  expect(dog.shouldLogInfo()).toBeFalsy();

  window.__.DOG.INFO = true;
  expect(dog.shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn handles toggling of WARN across multiple namespaces', () => {
  expect(cat.shouldLogWarn()).toBeFalsy();
  expect(dog.shouldLogWarn()).toBeFalsy();
  
  window.__.CAT.WARN = true;
  expect(cat.shouldLogWarn()).toBeTruthy();
  expect(dog.shouldLogWarn()).toBeFalsy();

  window.__.DOG.WARN = true;
  expect(dog.shouldLogWarn()).toBeTruthy();
})

test('shouldLogError handles toggling of ERROR across multiple namespaces', () => {
  expect(cat.shouldLogError()).toBeFalsy();
  expect(dog.shouldLogError()).toBeFalsy();
  
  window.__.CAT.ERROR = true;
  expect(cat.shouldLogError()).toBeTruthy();
  expect(dog.shouldLogError()).toBeFalsy();

  window.__.DOG.ERROR = true;
  expect(dog.shouldLogError()).toBeTruthy();
})

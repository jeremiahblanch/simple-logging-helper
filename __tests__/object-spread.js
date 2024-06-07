import simpleLoggingHelper from '../src';

simpleLoggingHelper.init({
  keyOnWindow: '__',
})

const {
  prefix: logPrefix,
  shouldLogTrace, 
  shouldLogDebug, 
  shouldLogInfo,
  shouldLogWarn,
  shouldLogError,
} = simpleLoggingHelper.createForNamespace('namespace')

test('prefix accessible via object spread and renamed', () => {
  expect(logPrefix()).toBe('namespace: ');
})

test('shouldLogTrace accessible via object spread', () => {
  expect(shouldLogTrace()).toBeFalsy();
  
  window.__.namespace.TRACE = true;
  expect(shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug accessible via object spread', () => {
  expect(shouldLogDebug()).toBeFalsy();
  
  window.__.namespace.DEBUG = true;
  expect(shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo accessible via object spread', () => {
  expect(shouldLogInfo()).toBeFalsy();
  
  window.__.namespace.INFO = true;
  expect(shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn accessible via object spread', () => {
  expect(shouldLogWarn()).toBeFalsy();
  
  window.__.namespace.WARN = true;
  expect(shouldLogWarn()).toBeTruthy();
})

test('shouldLogError accessible via object spread', () => {
  expect(shouldLogError()).toBeFalsy();
  
  window.__.namespace.ERROR = true;
  expect(shouldLogError()).toBeTruthy();
})

import simpleLoggingHelper from '../src';

const windowRef = {}
simpleLoggingHelper.init('__', windowRef)

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
  
  windowRef.__.namespace.TRACE = true;
  expect(shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug accessible via object spread', () => {
  expect(shouldLogDebug()).toBeFalsy();
  
  windowRef.__.namespace.DEBUG = true;
  expect(shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo accessible via object spread', () => {
  expect(shouldLogInfo()).toBeFalsy();
  
  windowRef.__.namespace.INFO = true;
  expect(shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn accessible via object spread', () => {
  expect(shouldLogWarn()).toBeFalsy();
  
  windowRef.__.namespace.WARN = true;
  expect(shouldLogWarn()).toBeTruthy();
})

test('shouldLogError accessible via object spread', () => {
  expect(shouldLogError()).toBeFalsy();
  
  windowRef.__.namespace.ERROR = true;
  expect(shouldLogError()).toBeTruthy();
})

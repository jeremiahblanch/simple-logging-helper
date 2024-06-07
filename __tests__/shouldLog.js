import simpleLoggingHelper from '../src';

const windowRef = {}
simpleLoggingHelper.init(undefined, windowRef)
const l = simpleLoggingHelper.createForNamespace('namespace')

test('shouldLogTrace handles toggling of TRACE', () => {
  expect(l.shouldLogTrace()).toBeFalsy();
  windowRef.__LOGGING.namespace.TRACE = true;
  expect(l.shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug handles toggling of DEBUG', () => {
  expect(l.shouldLogDebug()).toBeFalsy();
  windowRef.__LOGGING.namespace.DEBUG = true;
  expect(l.shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo handles toggling of INFO', () => {
  expect(l.shouldLogInfo()).toBeFalsy();
  windowRef.__LOGGING.namespace.INFO = true;
  expect(l.shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn handles toggling of WARN', () => {
  expect(l.shouldLogWarn()).toBeFalsy();
  windowRef.__LOGGING.namespace.WARN = true;
  expect(l.shouldLogWarn()).toBeTruthy();
})

test('shouldLogError handles toggling of ERROR', () => {
  expect(l.shouldLogError()).toBeFalsy();
  windowRef.__LOGGING.namespace.ERROR = true;
  expect(l.shouldLogError()).toBeTruthy();
})

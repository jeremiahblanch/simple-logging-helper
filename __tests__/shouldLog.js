import simpleLoggingHelper from '../src';

simpleLoggingHelper.init()
const l = simpleLoggingHelper.createForNamespace('namespace')

test('shouldLogTrace handles toggling of TRACE', () => {
  expect(l.shouldLogTrace()).toBeFalsy();
  window.__LOGGING.namespace.TRACE = true;
  expect(l.shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug handles toggling of DEBUG', () => {
  expect(l.shouldLogDebug()).toBeFalsy();
  window.__LOGGING.namespace.DEBUG = true;
  expect(l.shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo handles toggling of INFO', () => {
  expect(l.shouldLogInfo()).toBeFalsy();
  window.__LOGGING.namespace.INFO = true;
  expect(l.shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn handles toggling of WARN', () => {
  expect(l.shouldLogWarn()).toBeFalsy();
  window.__LOGGING.namespace.WARN = true;
  expect(l.shouldLogWarn()).toBeTruthy();
})

test('shouldLogError handles toggling of ERROR', () => {
  expect(l.shouldLogError()).toBeFalsy();
  window.__LOGGING.namespace.ERROR = true;
  expect(l.shouldLogError()).toBeTruthy();
})

import LoggingHelper from '../src';

const windowRef = {}

test('shouldLogTrace handles toggling of TRACE', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.shouldLogTrace()).toBeFalsy();
  windowRef.__LOGGING.namespace.TRACE = true;
  expect(lh.shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug handles toggling of DEBUG', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.shouldLogDebug()).toBeFalsy();
  windowRef.__LOGGING.namespace.DEBUG = true;
  expect(lh.shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo handles toggling of INFO', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.shouldLogInfo()).toBeFalsy();
  windowRef.__LOGGING.namespace.INFO = true;
  expect(lh.shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn handles toggling of WARN', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.shouldLogWarn()).toBeFalsy();
  windowRef.__LOGGING.namespace.WARN = true;
  expect(lh.shouldLogWarn()).toBeTruthy();
})

test('shouldLogError handles toggling of ERROR', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.shouldLogError()).toBeFalsy();
  windowRef.__LOGGING.namespace.ERROR = true;
  expect(lh.shouldLogError()).toBeTruthy();
})
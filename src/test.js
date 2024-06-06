import LoggingHelper from '.';

const windowRef = {}

// =======================================
// Test creation

test('Creates properly with defaults', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(windowRef.__LOGGING.namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})

test('Handles a different keyOnWindow', () => {
  const keyOnWindow = 'DIFFERENT'
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef, keyOnWindow })

  expect(windowRef[keyOnWindow].namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})

test('Handles supplied defaults', () => {
  const defaults = {
    TRACE: true,
    DEBUG: true,
    INFO: true,
    WARN: true,
    ERROR: true,
  }

  const lh = new LoggingHelper({ namespace: 'namespace', windowRef, defaults})

  expect(windowRef.__LOGGING.namespace).toMatchObject(defaults)
})

// =======================================
// Test Prefix
test('Outputs the correct prefix', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.prefix()).toBe('namespace: ')
})


// =======================================
// TEST shouldLogX methods

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
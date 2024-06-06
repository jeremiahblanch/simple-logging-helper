import LoggingHelper from './loggingHelper';

const windowRef = {}

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

test('Outputs the correct prefix', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.prefix()).toBe('namespace: ')
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

test('shouldLogDebug handles toggling of DEBUG', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.shouldLogDebug()).toBeFalsy();
  windowRef.__LOGGING.namespace.DEBUG = true;
  expect(lh.shouldLogDebug()).toBeTruthy();
})

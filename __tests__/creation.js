import LoggingHelper from '../src';

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

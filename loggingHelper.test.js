import LoggingHelper from './loggingHelper';

const windowRef = {}

test('It creates properly with defaults', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(windowRef.__LOGGING.namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})


test('It handles a different keyOnWindow', () => {
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

test('It handles outputs the correct prefix', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.prefix()).toBe('namespace: ')
})



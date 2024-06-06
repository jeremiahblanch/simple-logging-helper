import LoggingHelper from './loggingHelper';

const windowRef = {}

test('creates properly with defaults', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(windowRef.__LOGGING.namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})

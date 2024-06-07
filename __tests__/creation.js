import simpleLoggingHelper from '../src';

const windowRef = {}

test('Creates properly with defaults', () => {
  simpleLoggingHelper.init(undefined, windowRef)
  simpleLoggingHelper.createForNamespace('namespace')

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
  simpleLoggingHelper.init(keyOnWindow, windowRef)
  simpleLoggingHelper.createForNamespace('namespace')

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

  simpleLoggingHelper.init(undefined, windowRef)
  simpleLoggingHelper.createForNamespace('namespace', defaults)

  expect(windowRef.__LOGGING.namespace).toMatchObject(defaults)
})


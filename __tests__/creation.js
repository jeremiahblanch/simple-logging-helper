import simpleLoggingHelper from '../src';

const windowRef = {}

test('Creates properly with no arguments', () => {
  simpleLoggingHelper.init()
  simpleLoggingHelper.createForNamespace('namespace')

  expect(window.__LOGGING.namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})


test('Handles a different windowRef', () => {
  simpleLoggingHelper.init({ windowRef })
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
  simpleLoggingHelper.init({ keyOnWindow })
  simpleLoggingHelper.createForNamespace('namespace')

  expect(window[keyOnWindow].namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})

test('Handles enableAllByDefault', () => {
  simpleLoggingHelper.init({ enableAllByDefault: true })
  simpleLoggingHelper.createForNamespace('namespace')

  expect(window.__LOGGING.namespace).toMatchObject({
    TRACE: true,
    DEBUG: true,
    INFO: true,
    WARN: true,
    ERROR: true,
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

  simpleLoggingHelper.init()
  simpleLoggingHelper.createForNamespace('namespace', defaults)

  expect(window.__LOGGING.namespace).toMatchObject(defaults)
})

test('Handles supplied defaults overriding enableAllByDefault', () => {
  const defaults = {
    TRACE: true,
    DEBUG: false,
    INFO: true,
    WARN: false,
    ERROR: true,
  }

  simpleLoggingHelper.init({ enableAllByDefault: true })
  simpleLoggingHelper.createForNamespace('namespace', defaults)

  expect(window.__LOGGING.namespace).toMatchObject(defaults)
})


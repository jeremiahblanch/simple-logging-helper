import { WindowRef } from '../src/types';
import SimpleLoggingHelper from '../src/lib/slh';

const windowRef: WindowRef = {}

let slh: SimpleLoggingHelper

beforeEach(() => {
  slh = new SimpleLoggingHelper();
})

test('Creates properly with no arguments', () => {
  slh.init()
  slh.createForNamespace('namespace')

  expect((window as WindowRef).__LOGGING.namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})


test('Handles a different windowRef', () => {
  slh.init({ windowRef })
  slh.createForNamespace('namespace')

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
  slh.init({ keyOnWindow })
  slh.createForNamespace('namespace')

  expect((window as WindowRef)[keyOnWindow].namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})

test('Handles enableAllByDefault', () => {
  slh.init({ enableAllByDefault: true })
  slh.createForNamespace('namespace')

  expect((window as WindowRef).__LOGGING.namespace).toMatchObject({
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

  slh.init()
  slh.createForNamespace('namespace', defaults)

  expect((window as WindowRef).__LOGGING.namespace).toMatchObject(defaults)
})

test('Handles supplied defaults overriding enableAllByDefault', () => {
  const defaults = {
    TRACE: true,
    DEBUG: false,
    INFO: true,
    WARN: false,
    ERROR: true,
  }

  slh.init({ enableAllByDefault: true })
  slh.createForNamespace('namespace', defaults)

  expect((window as WindowRef).__LOGGING.namespace).toMatchObject(defaults)
})


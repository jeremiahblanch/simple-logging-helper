import { WindowRef } from '../src/types';
import SimpleLoggingHelper from '../src/lib/slh';

const slh = new SimpleLoggingHelper();

slh.init({
  keyOnWindow: '__',
})

const l = slh.createForNamespace('namespace')

test('shouldLogTrace handles toggling of TRACE', () => {
  expect(l.shouldLogTrace()).toBeFalsy();
  (window as WindowRef).__.namespace.TRACE = true;
  expect(l.shouldLogTrace()).toBeTruthy();
})

test('shouldLogDebug handles toggling of DEBUG', () => {
  expect(l.shouldLogDebug()).toBeFalsy();
  (window as WindowRef).__.namespace.DEBUG = true;
  expect(l.shouldLogDebug()).toBeTruthy();
})

test('shouldLogInfo handles toggling of INFO', () => {
  expect(l.shouldLogInfo()).toBeFalsy();
  (window as WindowRef).__.namespace.INFO = true;
  expect(l.shouldLogInfo()).toBeTruthy();
})

test('shouldLogWarn handles toggling of WARN', () => {
  expect(l.shouldLogWarn()).toBeFalsy();
  (window as WindowRef).__.namespace.WARN = true;
  expect(l.shouldLogWarn()).toBeTruthy();
})

test('shouldLogError handles toggling of ERROR', () => {
  expect(l.shouldLogError()).toBeFalsy();
  (window as WindowRef).__.namespace.ERROR = true;
  expect(l.shouldLogError()).toBeTruthy();
})

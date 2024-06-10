
/**
 * @jest-environment node
 */

import { WindowRef } from '../src/types';
import SimpleLoggingHelper from '../src/lib/slh';

let slh: SimpleLoggingHelper

test('Creates properly with no arguments', () => {
  slh = new SimpleLoggingHelper();
  slh.init()
  slh.createForNamespace('namespace')

  expect((global as WindowRef).__LOGGING.namespace).toMatchObject({
    TRACE: false,
    DEBUG: false,
    INFO: false,
    WARN: false,
    ERROR: false,
  })
})

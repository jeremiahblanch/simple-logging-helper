import { WindowRef } from '../src/types';
import SimpleLoggingHelper from '../src/lib/slh';



test('Outputs the correct prefix', () => {
  const slh = new SimpleLoggingHelper();
  
  slh.init()
  
  const l = slh.createForNamespace('namespace')

  expect(l.prefix()).toBe('namespace: ')
})

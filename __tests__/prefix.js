import simpleLoggingHelper from '../src';

test('Outputs the correct prefix', () => {
  simpleLoggingHelper.init()
  const l = simpleLoggingHelper.createForNamespace('namespace')

  expect(l.prefix()).toBe('namespace: ')
})

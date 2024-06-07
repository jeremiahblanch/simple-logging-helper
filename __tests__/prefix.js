import simpleLoggingHelper from '../src';

const windowRef = {}

test('Outputs the correct prefix', () => {
  simpleLoggingHelper.init(undefined, windowRef)
  const l = simpleLoggingHelper.createForNamespace('namespace')

  expect(l.prefix()).toBe('namespace: ')
})

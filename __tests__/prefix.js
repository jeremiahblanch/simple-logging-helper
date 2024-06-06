import LoggingHelper from '../src';

const windowRef = {}

test('Outputs the correct prefix', () => {
  const lh = new LoggingHelper({ namespace: 'namespace', windowRef})

  expect(lh.prefix()).toBe('namespace: ')
})

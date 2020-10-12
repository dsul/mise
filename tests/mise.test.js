const Mise = require('../src/Mise')

test('the constructor argument must be a function', () => {
  const invalidConstructors = []
  invalidConstructors.push(() => new Mise({}))
  invalidConstructors.push(() => new Mise(''))
  invalidConstructors.push(() => new Mise(1))
  invalidConstructors.push(() => new Mise(true))
  invalidConstructors.forEach(instantiation => {
    return expect(instantiation).toThrow('Executor must be a function.')
  })
})


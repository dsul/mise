const Mise = require('../src/Mise')

test('the constructor argument must be a function', () => {
  const invalidConstructors = []
  invalidConstructors.push(() => new Mise({}))
  invalidConstructors.push(() => new Mise(''))
  invalidConstructors.push(() => new Mise(1))
  invalidConstructors.push(() => new Mise(true))
  invalidConstructors.forEach(instantiation => {
    expect(instantiation).toThrow(TypeError)
    expect(instantiation).toThrow('The constructor argument must be a function.')
  })
})

describe('.resolve', () => {
  it('returns an instance of Mise', () => {
    const mise = Mise.resolve('')
    expect(mise).toBeInstanceOf(Mise)
  }),

  describe('value is not a promise or thenable', () => {
    it('returns the resolved value', () => {
      const resolvedValue = 5
      const mise = Mise.resolve(resolvedValue)
      mise.then(value => expect(value).toEqual(resolvedValue))
    })
  })
})


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

describe('#then', () => {
  it('returns an instance of mise', () => {
    const mise1 = Mise.resolve(4)
    const mise2 = mise1.then((val) => val)
    expect(mise2).toBeInstanceOf(Mise)
  })

  it('has the resolved value available on the first then', () => {
    const resolvedValue = 5
    const mise1 = Mise.resolve(resolvedValue)
    mise1
      .then(val => expect(val).toEqual(resolvedValue))
  })

  it('has the returned value available on chained thens', () => {
    const resolvedValue = 5
    const mise1 = Mise.resolve(resolvedValue)
    mise1
      .then(val => val + 5)
      .then(val => expect(val).toEqual(resolvedValue + 5))
      .then(val => expect(val).toEqual(undefined))
  })

  it('does not modify the original Mise\'s resolved value when chaining', () => {
    const resolvedValue = 5
    const mise1 = Mise.resolve(resolvedValue)
    mise1.then(val => val + 5)
    mise1.then(val => expect(val).toEqual(resolvedValue)) 
  })
})


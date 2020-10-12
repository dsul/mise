class Mise {
  constructor(executor) {
    if (!(executor instanceof Function)) {
      throw new TypeError('The constructor argument must be a function.')
    }
  }
}

module.exports = Mise

class Mise {
  constructor(executor) {
    if (!(executor instanceof Function)) {
      throw new Error('Executor must be a function.')
    }
  }
}

module.exports = Mise

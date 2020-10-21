const StateMachine = require('./StateMachine')

class Mise {
  constructor(executor) {
    if (!(executor instanceof Function)) {
      throw new TypeError('The constructor argument must be a function.')
    }
    this.stateMachine = new StateMachine()
    const resolve = (value) => this.stateMachine.dispatch('resolve', value)
    const reject = () => {}
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.stateMachine.dispatch('then', onFulfilled, onRejected)
    return new Mise((resolve) => resolve(this.stateMachine.thenValue))
  }

  static resolve(value) {
    return new Mise(resolve => resolve(value))
  }
}

module.exports = Mise


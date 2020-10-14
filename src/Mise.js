class Mise {
  constructor(executor) {
    if (!(executor instanceof Function)) {
      throw new TypeError('The constructor argument must be a function.')
    }
    const resolve = (value) => stateMachine.dispatch('resolve', value)
    const reject = () => {}
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    stateMachine.dispatch('then', onFulfilled, onRejected)
  }
}

const stateMachine = {
  state: 'pending',
  currentValue: undefined,
  dispatch(actionName, ...args) {
    const action = this.transitions[this.state][actionName]
    action.apply(stateMachine, args)
  },
  changeState(state) {
    this.state = state
  },
  transitions: {
    'pending': {
      resolve: function (value) {
        this.changeState('fulfilled')
        this.currentValue = value
      }
    },
    'fulfilled': {
      then: function (onFulfilled, _) {
        onFulfilled(this.currentValue)
      }
    },
    'rejected': {
      then: function (_, onRejected) {
        onRejected(this.currentValue)
      }
    }
  }
}

module.exports = Mise


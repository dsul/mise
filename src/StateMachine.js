class StateMachine {
  constructor() {
    return {
      state: 'pending',
      currentValue: null,
      thenValue: null,
      dispatch(actionName, ...args) {
        const action = this.transitions[this.state][actionName]
        action.apply(this, args)
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
            const result = onFulfilled(this.currentValue)
            if (result && (typeof result.then === 'function')) {
              result.then(value => this.thenValue = value)
            } else {
              this.thenValue = result
            }
          }
        },
        'rejected': {
          then: function (_, onRejected) {
            onRejected(this.currentValue)
          }
        }
      }
    }
  }
}

module.exports = StateMachine

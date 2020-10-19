class StateMachine {
  constructor() {
    return {
      state: 'pending',
      currentValue: undefined,
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
  }
}

module.exports = StateMachine

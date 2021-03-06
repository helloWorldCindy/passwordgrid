/*
    This component is used for rendering the password testing session, allowing user to test their password.
    The testOver() function is for recording the total time that users spend on testing password.
*/
import React, { Component } from 'react'
import Password from './Password'

class Test extends Component {
  constructor (props) {
    super(props)
    this.testOver = this.testOver.bind(this)
    this.state = {
      start: Date.now()
    }
  }

  testOver () {
    const elapsed = Math.round(((new Date() - this.state.start) / 10).toFixed(1) / 10)
    this.props.testOver((elapsed / 10).toFixed(1))
  }

  render () {
    const {type, pw, user, isLastPW, nextButtonFunc} = this.props
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Password
          test
          user={user}
          pwType={type}
          password={pw}
          isLastPW={isLastPW}
          calculateTime={this.calculateTime}
          nextButtonFunc={nextButtonFunc}
          testOver={this.testOver}
        />
      </div>
    )
  }
}

export default Test

/* 
    This component is used as the grid containing the given passwords in the password practice session.
    The type of the passwords, the given passwords, and functions of switching passwords and generating new
  passwords are all passed to this component as props. Therefore, the buttons that allow users to switch between
  different passwords and generate new passwords are rendered in this component.
    This component also renders a toggle component, allowing users to hide or show the given password.
    If the given passwords is shown, this component will render the grid component with the given icons that passed
  by its parent.
*/
import React, { Component } from 'react'
import Grid from './Grid'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'

const buttonStyle = {
  margin: 2.5
}

const passwordArray = [
  {type: 'email'},
  {type: 'banking'},
  {type: 'shopping'}
]

class GivenPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hide: false
    }
  }

  render () {
    const { hide } = this.state
    const { passwordType, icons, switchPassword, generateNew } = this.props
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'}}>
          {passwordArray.map((pw, i) => (
            <RaisedButton
              key={i}
              label={pw.type}
              labelColor='#ffffff'
              style={buttonStyle}
              backgroundColor='#32c3e0'
              onClick={() => switchPassword(pw.type)}
            />
          ))}
          <RaisedButton
            label='generate new'
            labelColor='#ffffff'
            style={buttonStyle}
            backgroundColor='#f94d89'
            onClick={() => generateNew(passwordType)}
          />
          <Toggle
            label='Hide password'
            onToggle={() => this.setState({hide: !hide})}
          />
        </div>
        {!hide
          ? <Grid
            fixed
            passwordType={passwordType}
            icons={icons}
            />
          : null
        }
      </div>
    )
  }
}

export default GivenPassword

import React, { Component } from 'react'
import './App.css'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Login from './components/Login'
import data from './components/Data'
import Practice from './components/Practice'
import Test from './components/Test'
import EndScreen from './components/EndScreen'
import { firestore } from './index'

class App extends Component {
  constructor (props) {
    super(props)

    this.chooseUniquePassword = this.chooseUniquePassword.bind(this)
    this.generatePassword = this.generatePassword.bind(this)
    this.switchPassword = this.switchPassword.bind(this)
    this.handleGenerateNew = this.handleGenerateNew.bind(this)
    this.handleGoToTest = this.handleGoToTest.bind(this)
    this.testOver = this.testOver.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

    const emailPassword = this.generatePassword(4)
    const bankPassword = this.generatePassword(4)
    const shoppingPassword = this.generatePassword(4)
    const login = false
    const username = ''

    this.state = {
      login,
      username,
      index: 0,
      testFinished: false,
      practice: true,
      passwordArray: [
        {pw: emailPassword, type: 'email'},
        {pw: bankPassword, type: 'banking'},
        {pw: shoppingPassword, type: 'shopping'}
      ]
    }
  }

  chooseUniquePassword (elm, array, length) {
    while (array.includes(elm) || !elm) {
      elm = data[Math.floor(Math.random() * data.length)]
    }
    return elm
  }

  generatePassword (length) {
    const random = []
    let randomIcon
    for (let i = 0; i < length; i++) {
      random.push(this.chooseUniquePassword(randomIcon, random, length))
    }
    return random
  }

  switchPassword (type) {
    const {passwordArray} = this.state
    const index = passwordArray.findIndex((item) => {
      return item.type === type
    })

    this.setState({index})
  }

  handleGenerateNew (type) {
    const {passwordArray} = this.state
    const index = passwordArray.findIndex((item) => {
      return item.type === type
    })

    this.setState({
      passwordArray: [
        ...passwordArray.slice(0, index),
        {pw: this.generatePassword(4), type},
        ...passwordArray.slice(index + 1, passwordArray.length)
      ]
    })
  }

  handleGoToTest (timeSpent) {
    const {username} = this.state
    firestore.collection(username).doc('practice').set({timeSpent})

    this.setState({
      index: 0,
      practice: false
    })
  }

  testOver (timeSpent) {
    const {username} = this.state
    this.setState({testFinished: true})
    firestore.collection(username).doc('test').set({timeSpent})
  }

  handleLogin (username) {
    this.setState({
      username,
      login: true
    })
  }

  render () {
    const {index, passwordArray, login, practice, testFinished, username} = this.state
    const {type, pw} = passwordArray[index]
    if (login) {
      if (practice) {
        return (
          <Practice
            pw={pw}
            type={type}
            user={username}
            switchPassword={this.switchPassword}
            generateNew={this.handleGenerateNew}
            goToTestFunc={this.handleGoToTest}
          />
        )
      } else {
        if (testFinished) {
          return <EndScreen />
        } else {
          return (
            <Test
              pw={pw}
              type={type}
              user={username}
              nextButtonFunc={() => this.setState({index: index + 1})}
              testOver={this.testOver}
            />
          )
        }
      }
    } else {
      return <Login handleLogin={this.handleLogin} />
    }
  }
}

export default DragDropContext(HTML5Backend)(App)

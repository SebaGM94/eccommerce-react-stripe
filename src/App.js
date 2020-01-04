import React from 'react'
import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage'

import Header from './components/Header/Header'
import { Switch, Route } from 'react-router-dom'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import './App.css'
class App extends React.Component {
  constructor () {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })

          console.log(this.state)
        })
      }

      this.setState({ currentUser: userAuth })
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App

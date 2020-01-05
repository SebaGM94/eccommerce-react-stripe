import React from 'react'
import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage'

import { connect } from 'react-redux'

import Header from './components/Header/Header'
import { Switch, Route } from 'react-router-dom'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/userActions'
import './App.css'
class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount () {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }

      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)

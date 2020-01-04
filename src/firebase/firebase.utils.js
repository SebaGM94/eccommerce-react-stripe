import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyC44jafYTFszubXCAqQXjM1qAsUk3HoAFE',
  authDomain: 'ecommerce-react-stripe-db.firebaseapp.com',
  databaseURL: 'https://ecommerce-react-stripe-db.firebaseio.com',
  projectId: 'ecommerce-react-stripe-db',
  storageBucket: 'ecommerce-react-stripe-db.appspot.com',
  messagingSenderId: '557499359799',
  appId: '1:557499359799:web:c503837546e95eb51bd5b2'
}
firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

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

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ promt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

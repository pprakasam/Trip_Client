import firebase from 'firebase/app'
import 'firebase/storage'

const API_KEY = `${process.env.REACT_APP_FIREBASE_API_KEY}`
const config = {
  apiKey: API_KEY,
  authDomain: 'capstone-179d6.firebaseapp.com',
  databaseURL: 'https://capstone-179d6.firebaseio.com',
  projectId: 'capstone-179d6',
  storageBucket: 'capstone-179d6.appspot.com',
  messagingSenderId: '482389095255'
}
firebase.initializeApp(config)

const storage = firebase.storage()

export {
  storage, firebase as default
}

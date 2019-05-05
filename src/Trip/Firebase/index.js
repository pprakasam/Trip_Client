import firebase from 'firebase/app'
import 'firebase/storage'

const API_KEY = `${process.env.REACT_APP_FIREBASE_API_KEY}`
const config = {
  apiKey: API_KEY,
  authDomain: 'trip-planner-891f1.firebaseapp.com',
  databaseURL: 'https://trip-planner-891f1.firebaseio.com',
  projectId: 'trip-planner-891f1',
  storageBucket: 'trip-planner-891f1.appspot.com',
  messagingSenderId: '509108913543',
  appId: '1:509108913543:web:bc743b20ff149903'
}
firebase.initializeApp(config)

const storage = firebase.storage()

export {
  storage, firebase as default
}

import firebase from 'firebase/app'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyD_fIkHtZkwh0x6U4jT_xyGAlNNQYYbvCo',
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

import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBC0xQbpCp1H-tbg846_5VFEBUxOUkuzsY',
  authDomain: 'telegram-clone-f7d5d.firebaseapp.com',
  databaseURL: 'https://telegram-clone-f7d5d.firebaseio.com',
  projectId: 'telegram-clone-f7d5d',
  storageBucket: 'telegram-clone-f7d5d.appspot.com',
  messagingSenderId: '460051376662',
  appId: '1:460051376662:web:3aaa8253832f33ce9e6337'
};

firebase.initializeApp(firebaseConfig);

export default firebase;

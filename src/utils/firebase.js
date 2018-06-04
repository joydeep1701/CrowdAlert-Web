import * as firebase from 'firebase';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export default database;

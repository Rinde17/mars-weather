import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCoU4uIGCTptepw62q7SxuCVsXnk7l7XpY",
    authDomain: "marsweather2-b9d05.firebaseapp.com",
    projectId: "marsweather2-b9d05",
    storageBucket: "marsweather2-b9d05.appspot.com",
    messagingSenderId: "426966129400",
    appId: "1:426966129400:web:3a65924f805bab36cbf90d"
}

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyCm9wHhwRYnVd_1bQ8wPU2orf5ZLS_V2EQ",
	authDomain: "tinder-c205f.firebaseapp.com",
	projectId: "tinder-c205f",
	storageBucket: "tinder-c205f.appspot.com",
	messagingSenderId: "292116175582",
	appId: "1:292116175582:web:7292afda495ca523ee004f",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
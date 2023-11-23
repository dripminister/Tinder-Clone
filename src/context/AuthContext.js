import React, { createContext, useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { query, collection, getDocs, where } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [userDocument, setUserDocument] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user)
			setError(null)

			if (user) {
				const q = query(
					collection(db, "users"),
					where("userId", "==", user.uid)
				)
				try {
					const querySnapshot = await getDocs(q)
					const userDoc = querySnapshot.docs[0]
					if (userDoc) {
						setUserDocument({ ...userDoc.data(), username: userDoc.id })
					} else {
						setUserDocument(null)
					}
				} catch (error) {
					console.error("Fehler beim Abrufen des Benutzerdokuments:", error)
					setError("Fehler beim Abrufen von Benutzerdaten")
				}
			} else {
				setUserDocument(null)
			}
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		userDocument,
		loading,
		error,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

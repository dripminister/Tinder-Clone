import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import ImageUpload from "../components/profile/ImageUpload"
import UserProfile from "../components/profile/UserProfile"

function ProfilePage() {
	const { currentUser } = useAuth()
	const [userData, setUserData] = useState(null)

	useEffect(() => {

		handleSave()
	}, [userData?.images])

	useEffect(() => {
		if (currentUser) {
			const userDocRef = doc(db, "users", currentUser.uid)
			getDoc(userDocRef).then((docSnap) => {
				if (docSnap.exists()) {
					setUserData({ uid: currentUser.uid, ...docSnap.data() })
				}
			})
		}
	}, [currentUser])

	if (!currentUser) {
		return <div>Please login to view this page.</div>
	}

	const handleSave = async () => {
		if (currentUser && userData) {
			const userDocRef = doc(db, "users", currentUser.uid)
			try {
				await updateDoc(userDocRef, userData)
			} catch (e) {
				alert(e.message)
			}
		}
	}

	const handleUserDataChange = (key, value) => {
		const isAgeValue =
			key === "age" || key === "minAgePreference" || key === "maxAgePreference"
		const newValue = isAgeValue ? parseInt(value, 10) : value
		setUserData({ ...userData, [key]: newValue })
	}

	return (
		<div className="profile-container">
			<h2>Profile Page</h2>
			{userData && (
				<>
					<UserProfile
						user={userData}
						onUserDataChange={handleUserDataChange}
						handleSave={handleSave}
					/>
					<ImageUpload
						userId={currentUser.uid}
						userData={userData}
						onImagesChange={(images) => handleUserDataChange("images", images)}
						handleSave={handleSave}
					/>
				</>
			)}
		</div>
	)
}

export default ProfilePage

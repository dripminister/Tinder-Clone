import React, { useEffect, useState } from "react"
import {
	collection,
	getDoc,
	getDocs,
	doc,
	where,
	query,
	addDoc,
	Timestamp,
} from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import Card from "./card/Card"
import MatchModal from "./card/MatchModal"

function Cards() {
	const { currentUser } = useAuth()
	const [people, setPeople] = useState([])
	const [showMatchModal, setShowMatchModal] = useState(false)

	useEffect(() => {
		const getPeople = async () => {
			try {
				const userDocRef = doc(db, "users", currentUser.uid)
				const userDoc = await getDoc(userDocRef)
				const userPreferences = userDoc.data()

				let peopleQuery
				if (userPreferences.genderPreference === "all") {
					peopleQuery = query(
						collection(db, "users"),
						where("age", ">=", userPreferences.minAgePreference),
						where("age", "<=", userPreferences.maxAgePreference)
					)
				} else {
					peopleQuery = query(
						collection(db, "users"),
						where("gender", "==", userPreferences.genderPreference),
						where("age", ">=", userPreferences.minAgePreference),
						where("age", "<=", userPreferences.maxAgePreference)
					)
				}

				const querySnapshot = await getDocs(peopleQuery)
				const personsArray = querySnapshot.docs
					.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
					.filter((person) => person.id !== currentUser.uid)

				setPeople(personsArray)
			} catch (error) {
				console.error("Error:", error)
			}
		}

		if (currentUser) {
			getPeople()
		}
	}, [currentUser])

	const handleSwipe = async (event, personId, direction) => {
		event.stopPropagation()
		await addDoc(collection(db, "swipes"), {
			swiperId: currentUser.uid,
			swipedId: personId,
			direction: direction,
			lastMessageTimestamp: Timestamp.now(),
		})

		if (direction === "like") {
			const matchQuery = query(
				collection(db, "swipes"),
				where("swiperId", "==", personId),
				where("swipedId", "==", currentUser.uid),
				where("direction", "==", "like")
			)
			const querySnapshot = await getDocs(matchQuery)
			const isMatch = !querySnapshot.empty

			if (isMatch) {
				const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid))
				const matchUserDoc = await getDoc(doc(db, "users", personId))

				if (currentUserDoc.exists() && matchUserDoc.exists()) {
					const currentUserData = currentUserDoc.data()
					const matchUserData = matchUserDoc.data()

					await addDoc(collection(db, "matches"), {
						userIds: [currentUser.uid, personId],
						timestamp: Timestamp.now(),
						isActive: true,
						lastMessage: "",
						user1: currentUserData,
						user2: matchUserData,
					})
					setShowMatchModal(true)

					setTimeout(() => {
						setShowMatchModal(false)
						setPeople((prevPeople) =>
							prevPeople.filter((person) => person.id !== personId)
						)
					}, 5000)
				}
			} else {
				setPeople((prevPeople) =>
					prevPeople.filter((person) => person.id !== personId)
				)
			}
		} else {
			setPeople((prevPeople) =>
				prevPeople.filter((person) => person.id !== personId)
			)
		}
	}

	return (
		<div className="tinderCards__container">
			{people.map((person, index) => (
				<Card
					key={index}
					person={person}
					onSwipe={handleSwipe}
				/>
			))}
			<MatchModal
				isOpen={showMatchModal}
				onClose={() => setShowMatchModal(false)}
			/>
		</div>
	)
}

export default Cards

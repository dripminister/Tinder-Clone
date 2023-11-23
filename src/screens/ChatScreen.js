import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	doc,
	getDoc,
} from "firebase/firestore"
import Message from "../components/chat/Message"
import SendMessage from "../components/chat/SendMessage"
import { useAuth } from "../context/AuthContext"

function ChatScreen() {
	const { chatId } = useParams()
	const [messages, setMessages] = useState([])
	const [userData, setUserData] = useState(null)
	const { currentUser } = useAuth()

	useEffect(() => {
		const getUserData = async () => {
			const userDocRef = doc(db, "users", currentUser.uid)
			const userDoc = await getDoc(userDocRef)
			setUserData(userDoc.data())
		}

		getUserData()
	}, [chatId, currentUser])

	useEffect(() => {
		if (currentUser) {
			const messagesRef = collection(db, "matches", chatId, "messages")
			const q = query(messagesRef, orderBy("timestamp", "asc"))

			const unsubscribe = onSnapshot(q, (snapshot) => {
				setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
			})

			return unsubscribe
		}
	}, [chatId, currentUser])

	return (
		<div className="chatScreen">
			{messages.length > 0 &&
				messages.map((message) => (
					<Message
						key={message.id}
						message={message}
						currentUser={userData}
					/>
				))}
			<SendMessage
				chatId={chatId}
				currentUser={userData}
			/>
		</div>
	)
}

export default ChatScreen

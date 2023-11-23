import React, { useState } from "react"
import { db } from "../../firebase"
import {
	collection,
	addDoc,
	Timestamp,
	doc,
	updateDoc,
} from "firebase/firestore"

function SendMessage({ chatId, currentUser }) {
	const [input, setInput] = useState("")

	const sendMessage = async (e) => {
		e.preventDefault()
		if (input.trim() === "") return

		console.log(currentUser)

		const currentTime = Timestamp.now()

		const messagesRef = collection(db, "matches", chatId, "messages")
		await addDoc(messagesRef, {
			text: input,
			timestamp: currentTime,
			senderId: currentUser.uid,
			image: currentUser.images[0]
		})

		const matchRef = doc(db, "matches", chatId)
		await updateDoc(matchRef, {
			lastMessage: input,
			lastMessageTimestamp: currentTime,
		})

		setInput("")
	}


	return (
		<form
			className="sendMessageForm"
			onSubmit={sendMessage}
		>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Write something..."
			/>
			<button type="submit">Send</button>
		</form>
	)
}

export default SendMessage

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ChatListItem from "../components/chat/ChatListItem"
import { db } from "../firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { format } from "date-fns"

function ChatListScreen() {
	const { currentUser } = useAuth()
	const [matches, setMatches] = useState([])

    const timestampToReadableDate = (timestamp) => {
			if (!timestamp) return ""
			const date = timestamp.toDate()
			return format(date, "PPP, p")
		}

    useEffect(() => {
			const fetchMatches = async () => {
				const matchesQuery = query(
					collection(db, "matches"),
					where("userIds", "array-contains", currentUser.uid)
				)

				const querySnapshot = await getDocs(matchesQuery)
				const fetchedMatches = []

				querySnapshot.forEach((doc) => {
					const matchData = doc.data()
					const isUser1 = matchData.user1.uid === currentUser.uid
					console.log(isUser1)
					console.log(matchData.user1.uid)

					fetchedMatches.push({
						id: doc.id,
						chatPartner: isUser1 ? matchData.user2 : matchData.user1,
						lastMessage: matchData.lastMessage,
						lastMessageTimestamp: matchData.lastMessageTimestamp, 
					})
				})

				setMatches(fetchedMatches)
			}

			fetchMatches()
		}, [currentUser.uid])

	return (
		<div className="chats">
			{matches.length > 0 ? (
				matches.map((match) => (
					<Link
						key={match.id}
						to={`/chat/${match.id}`}
					>
						<ChatListItem
							name={match.chatPartner.name}
							message={match?.lastMessage ? match.lastMessage : ""}
							timestamp={timestampToReadableDate(match.lastMessageTimestamp)}
							profilePic={match.chatPartner.images[0]}
						/>
					</Link>
				))
			) : (
				<div className="chatListScreen__empty">Keine Chats vorhanden.</div>
			)}
		</div>
	)
}

export default ChatListScreen

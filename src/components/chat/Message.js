import React from "react"
import { Avatar } from "@mui/material"

function Message({ message, currentUser }) {
	const isCurrentUser = message.senderId === currentUser.uid

	const messageClass = isCurrentUser
		? "message--currentUser"
		: "message--otherUser"
	const messageTextClass = isCurrentUser
		? "message__text--currentUser"
		: "message__text--otherUser"

	return (
		<div className={`chatScreen__message ${messageClass}`}>
			<Avatar
				src={message.image}
				alt={message.senderId}
			/>
			<p className={`chatScreen__text ${messageTextClass}`}>{message.text}</p>
		</div>
	)
}

export default Message

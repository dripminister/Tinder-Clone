import React from 'react'
import Chat from './Chat'
import { Link } from 'react-router-dom'

function Chats() {
  return (
		<div className="chats">
			<Link to="/chat/asd">
				<Chat
					name="Justin"
					message="Hey bro"
					timestamp="now"
					profilePic="https://www.twincities.com/wp-content/uploads/2023/02/STP-L-VIKINGS-1217.jpg?w=670"
				/>
			</Link>
		</div>
	)
}

export default Chats
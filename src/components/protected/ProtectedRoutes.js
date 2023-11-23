import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ProtectedLayout from "./ProtectedLayout"
import Cards from "../Cards"
import ChatScreen from "../../screens/ChatScreen"
import ProfilePage from "../../screens/ProfilePage"
import ChatListScreen from "../../screens/ChatListScreen"

function ProtectedRoutes() {
	const { currentUser } = useAuth()

	return (
		<Routes>
			<Route element={<ProtectedLayout />}>
				<Route
					path="/"
					element={currentUser ? <Cards /> : <Navigate to="/login" />}
				/>
				<Route
					path="/chats"
					element={currentUser ? <ChatListScreen /> : <Navigate to="/login" />}
				/>
				<Route
					path="/chat/:chatId"
					element={currentUser ? <ChatScreen /> : <Navigate to="/login" />}
				/>
				<Route
					path="/profile"
					element={currentUser ? <ProfilePage /> : <Navigate to="/login" />}
				/>
			</Route>
		</Routes>
	)
}

export default ProtectedRoutes

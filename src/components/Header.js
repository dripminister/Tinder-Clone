import React from "react"
import PersonIcon from "@mui/icons-material/Person"
import ForumIcon from "@mui/icons-material/Forum"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { Link, useLocation,  useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

function Header() {
	const location = useLocation()
	const navigate = useNavigate()

	 const handleLogout = async () => {
			try {
				await signOut(auth)
				navigate("/login")
			} catch (error) {
				console.error("Logout-Fehler", error)
			}
		}

	return (
		<div className="header">
			{location.pathname !== "/" ? (
				<IconButton onClick={() => navigate(-1)}>
					<ArrowBackIcon
						fontSize="large"
						className="header__icon"
					/>
				</IconButton>
			) : (
				<Link to="/profile">
					<IconButton>
						<PersonIcon
							fontSize="large"
							className="header__icon"
						/>
					</IconButton>
				</Link>
			)}

			<Link to="/">
				<img
					src="https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo-768x432.png"
					alt="logo"
					className="header__logo"
				/>
			</Link>
			<div>
				<Link to="/chats">
					<IconButton>
						<ForumIcon
							fontSize="large"
							className="header__icon"
						/>
					</IconButton>
				</Link>
				<IconButton onClick={handleLogout}>
					<ExitToAppIcon
						fontSize="large"
						className="header__icon"
					/>
				</IconButton>
			</div>
		</div>
	)
}

export default Header

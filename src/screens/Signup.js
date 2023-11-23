import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"

function SignUp() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [age, setAge] = useState("")
	const [gender, setGender] = useState("")
	const [error, setError] = useState(null)
	const navigate = useNavigate()

const handleSubmit = async (e) => {
	e.preventDefault()
	setError(null)

	if (!name.trim()) {
		setError("Please enter your name")
		return
	}
	
	const numericAge = parseInt(age, 10)
	if (isNaN(numericAge) || numericAge < 18) {
		setError("You must be at least 18 years old!")
		return
	}

	if (gender === "") {
		setError("Please select a gender")
		return
	}

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user

		const userDocRef = doc(db, "users", user.uid)
		await setDoc(userDocRef, {
			userId: user.uid,
			name: name,
			age: numericAge,
			gender: gender,
			bio: "",
			minAgePreference: 18,
			maxAgePreference: 99,
			genderPreference: "all",
			images: [],
		})
		navigate("/")
	} catch (firebaseError) {
		setError(firebaseError.message)
	}
}


	return (
		<div className="signup-container">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Age"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<select
					value={gender}
					onChange={(e) => setGender(e.target.value)}
				>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
				<button type="submit">Register</button>
			</form>
			{error && <p>{error}</p>}
			<Link to="/login">Login</Link>
		</div>
	)
}

export default SignUp

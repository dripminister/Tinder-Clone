import React from "react"

function UserProfile({ user, onUserDataChange, handleSave }) {
	const {
		name,
		age,
		gender,
		bio,
		minAgePreference,
		maxAgePreference,
		genderPreference,
	} = user


	return (
		<div>
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={(e) => onUserDataChange("name", e.target.value)}
				/>
			</label>

			<label>
				Age:
				<input
					type="number"
					value={age}
					onChange={(e) => onUserDataChange("age", e.target.value)}
					min="18"
				/>
			</label>

			<label>
				Gender:
				<select
					value={gender}
					onChange={(e) => onUserDataChange("gender", e.target.value)}
				>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
			</label>

			<label>
				Bio:
				<textarea
					className="bio-textarea"
					value={bio || ""}
					onChange={(e) => onUserDataChange("bio", e.target.value)}
				/>
			</label>

			<label>
				Min Age Preference:
				<input
					type="number"
					value={minAgePreference || ""}
					onChange={(e) => onUserDataChange("minAgePreference", e.target.value)}
					min="18"
				/>
			</label>

			<label>
				Max Age Preference:
				<input
					type="number"
					value={maxAgePreference || ""}
					onChange={(e) => onUserDataChange("maxAgePreference", e.target.value)}
					max="99"
				/>
			</label>

			<label>
				Gender Preference:
				<select
					value={genderPreference || ""}
					onChange={(e) => onUserDataChange("genderPreference", e.target.value)}
				>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
					<option value="all">All</option>
				</select>
			</label>

			<button onClick={handleSave}>Save Changes</button>
		</div>
	)
}

export default UserProfile

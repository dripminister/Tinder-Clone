import CloseIcon from "@mui/icons-material/Close"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { IconButton } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { useState } from "react"

function Card({ person, onSwipe }) {
	const [showBio, setShowBio] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

	const toggleBio = (event) => {
		event.stopPropagation()
		setShowBio(!showBio)
	}

    	const handleImageClick = () => {
				const imageLength = person.images.length - 1
				if (imageIndex === imageLength) {
					setImageIndex(0)
				} else {
					setImageIndex(imageIndex + 1)
				}
			}


	return (
		<div
			className="card"
			onClick={handleImageClick}
		>
			{showBio && <p className="card__bio">{person.bio}</p>}
			<img
				src={person.images[imageIndex]}
				alt={`Bild von ${person.name}`}
				className="card__image"
			/>
			<h3>
				{person.name}, {person.age}
			</h3>
			<IconButton
				className="card__buttonLeft"
				onClick={(e) => onSwipe(e, person.id, "dislike")}
			>
				<CloseIcon />
			</IconButton>
			<IconButton
				className="card__buttonInfo"
				onClick={(e) => toggleBio(e)}
			>
				<InfoIcon />
			</IconButton>
			<IconButton
				className="card__buttonRight"
				onClick={(e) => onSwipe(e, person.id, "like")}
			>
				<FavoriteIcon />
			</IconButton>
		</div>
	)
}

export default Card

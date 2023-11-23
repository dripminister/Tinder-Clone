import React, { useState, useRef } from "react"
import { storage } from "../../firebase"
import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage"
import { DragDropContext } from "react-beautiful-dnd"
import ImageList from "./ImageList"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

function ImageUpload({ userId, onImagesChange, userData, handleSave }) {
	const fileInputRef = useRef()
	const [images, setImages] = useState(userData?.images ? userData.images : [])

	const handleImageUpload = async (event) => {
		const files = event.target.files
		let newImagesList = [...images]

		for (let i = 0; i < files.length; i++) {
			const file = files[i]

			if (!file.type.startsWith("image/")) {
				alert("Only upload image files!")
				continue
			}

			const imageRef = ref(storage, `images/${userId}/${file.name}`)
			const snapshot = await uploadBytes(imageRef, file)
			const downloadURL = await getDownloadURL(snapshot.ref)
			newImagesList.push(downloadURL)
		}

		setImages(newImagesList)
		onImagesChange(newImagesList)
	}


	const onDragEnd = (result) => {
		const { destination, source } = result
		if (!destination || destination.index === source.index) {
			return
		}

		const newImages = Array.from(images)
		const [reorderedImage] = newImages.splice(source.index, 1)
		newImages.splice(destination.index, 0, reorderedImage)

		setImages(newImages)
		onImagesChange(newImages)
	}

	const handleDeleteImage = async (urlToDelete) => {
		try {
			const imageRef = ref(storage, urlToDelete)
			await deleteObject(imageRef)

			const updatedImages = images.filter((url) => url !== urlToDelete)
			setImages(updatedImages)
			onImagesChange(updatedImages)
		} catch (error) {
			console.error("Fehler beim Löschen des Bildes:", error)
		}
	}

	return (
		<div className="imageUpload">
			<input
				type="file"
				onChange={handleImageUpload}
				multiple
				style={{ display: "none" }}
				ref={fileInputRef}
			/>
			<button
				className="imageUpload__button"
				onClick={() => fileInputRef.current.click()}
			>
				<AddAPhotoIcon /> Upload Images
			</button>
			<DragDropContext onDragEnd={onDragEnd}>
				<ImageList
					images={images}
					onDeleteImage={handleDeleteImage}
				/>
			</DragDropContext>
		</div>
	)
}

export default ImageUpload

import React from "react"
import { Droppable } from "react-beautiful-dnd"
import ImageItem from "./ImageItem"

function ImageList({ images, onDeleteImage }) {
	return (
		<Droppable droppableId="droppable">
			{(provided) => (
				<div
					className="image-list"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{images.map((url, index) => (
						<ImageItem
							key={url}
							url={url}
							index={index}
							onDelete={onDeleteImage}
						/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}

export default ImageList

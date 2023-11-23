import React from "react"
import { Draggable } from "react-beautiful-dnd"
import CloseIcon from "@mui/icons-material/Close"

function ImageItem({ url, index, onDelete }) {
	return (
		<Draggable
			draggableId={url}
			index={index}
		>
			{(provided) => (
				<div
					className="image-item"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<img
						src={url}
						alt={`Uploaded ${index}`}
					/>
					<button
						onClick={() => onDelete(url)}
						className="delete-button"
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</Draggable>
	)
}

export default ImageItem

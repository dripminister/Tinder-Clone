import Modal from "@mui/material/Modal"
import { useSpring, animated } from "react-spring"

function MatchModal({ isOpen, onClose }) {
	const animation = useSpring({
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? `translateY(0)` : `translateY(-100%)`,
	})

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			className="match-modal"
		>
			<animated.div style={animation}>
				<div className="match-modal-content">
					<h2>It's a Match!</h2>
				</div>
			</animated.div>
		</Modal>
	)
}

export default MatchModal

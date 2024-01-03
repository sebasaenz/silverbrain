import { ReactNode } from 'react'
import { Modal, StyleSheet, View } from 'react-native'

interface SimpleModalProps {
	isModalVisible: boolean
	onRequestClose: () => void
	children: ReactNode
}

const SimpleModal: React.FC<SimpleModalProps> = ({
	isModalVisible,
	onRequestClose,
	children,
}) => {
	return (
		<Modal
			animationType="slide"
			visible={isModalVisible}
			onRequestClose={onRequestClose}
		>
			<View style={styles.centeredView}>
				<View style={styles.innerContainer}>{children}</View>
			</View>
		</Modal>
	)
}

export default SimpleModal

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	innerContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

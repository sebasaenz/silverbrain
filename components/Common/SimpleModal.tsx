import React, { ReactNode } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

interface SimpleModalProps {
	isModalVisible: boolean
	onRequestClose: () => void
	showCloseButton?: boolean
	children: ReactNode
}

const SimpleModal: React.FC<SimpleModalProps> = ({
	isModalVisible,
	onRequestClose,
	showCloseButton,
	children,
}) => {
	return (
		<Modal
			animationType="slide"
			visible={isModalVisible}
			onRequestClose={onRequestClose}
		>
			<View style={styles.centeredView}>
				<View
					style={{
						position: 'absolute',
						top: 30,
						right: 30,
						display: showCloseButton ? undefined : 'none',
					}}
				>
					<Ionicons
						name="md-close"
						size={32}
						color="#2e2e2e"
						onPress={onRequestClose}
					/>
				</View>
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
		backgroundColor: '#fff8f2',
	},
	innerContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import OppositesGame from '../components/Opposites/OppositesGame'
import { useTranslation } from 'react-i18next'

const Opposites: React.FC<Record<string, never>> = () => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{t('common.opposites')}</Text>
			<OppositesGame />
			<StatusBar style="auto" />
		</View>
	)
}

export default Opposites

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 30,
	},
})

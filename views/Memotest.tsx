import { StyleSheet, Text, View } from 'react-native'
import MemotestGrid from '../components/Memotest/MemotestGrid'
import { useTranslation } from 'react-i18next'

const Memotest: React.FC<Record<string, never>> = () => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{t('common.memotest')}</Text>
			<MemotestGrid />
		</View>
	)
}

export default Memotest

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff8f2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 30,
	},
})

import { Link } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AvailableLanguage } from '../i18n'
import images from '../imageLoader'

const Home: React.FC<Record<string, never>> = () => {
	const { t, i18n } = useTranslation()
	const languages: AvailableLanguage[] = ['es', 'ca', 'eu', 'en']

	const changeLanguageHandler = (lang: AvailableLanguage) =>
		i18n.changeLanguage(lang)

	return (
		<View style={styles.container}>
			<View style={{ display: 'flex', flexDirection: 'row', marginBottom: 30 }}>
				{languages.map((flag, idx) => (
					<TouchableOpacity
						onPress={() => changeLanguageHandler(flag)}
						key={flag}
					>
						<Image
							style={{
								...styles.image,
								marginRight: idx == languages.length - 1 ? 0 : 15,
							}}
							source={images.flags[flag]}
						/>
					</TouchableOpacity>
				))}
			</View>
			<Text style={styles.header}>{t('home.choose_game')}</Text>
			<Link style={styles.link} to={{ screen: 'Memotest' }}>
				{t('common.memotest')}
			</Link>
			<Link style={styles.link} to={{ screen: 'Opposites' }}>
				{t('common.opposites')}
			</Link>
			<StatusBar style="auto" />
		</View>
	)
}

export default Home

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
	link: {
		fontSize: 20,
		letterSpacing: 4,
		marginBottom: 10,
	},
	image: {
		width: 60,
		height: 30,
	},
})

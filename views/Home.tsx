import { Link } from '@react-navigation/native'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AVAILABLE_LANGUAGES } from '../i18n'
import images from '../imageLoader'
import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
	Easing,
} from 'react-native-reanimated'
import { useMediaQuery } from 'react-responsive'
import SettingsModal from '../modals/SettingsModal'
import { changeLanguageHandler } from '../utils/i18n'

const DURATION = 1500

const Home: React.FC<Record<string, never>> = () => {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	})

	const { t, i18n } = useTranslation()

	const [isSettngsModalVisible, setIsSettngsModalVisible] = useState<boolean>(false)

	const offset = useSharedValue(0)

	const animatedStyles = useAnimatedStyle(
		() => ({
			width: 200,
			height: 140,
			marginBottom: 60,
			transform: [{ translateY: offset.value * -8 }],
		}),
		[offset],
	)

	useEffect(() => {
		offset.value = withRepeat(
			withSequence(
				withTiming(0, { duration: DURATION, easing: Easing.elastic(0.1) }),
				withTiming(1, { duration: DURATION, easing: Easing.elastic(0.1) }),
			),
			-1,
			true,
		)
	}, [])

	return (
		<View style={styles.container}>
			<View
				style={{
					position: 'absolute',
					top: isTabletOrMobileDevice ? 58 : 20,
					right: isTabletOrMobileDevice ? 20 : 30,
				}}
			>
				<Ionicons
					name="md-settings-sharp"
					size={32}
					color="#2e2e2e"
					onPress={() => setIsSettngsModalVisible(true)}
				/>
			</View>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					position: 'absolute',
					top: isTabletOrMobileDevice ? 60 : 25,
					left: isTabletOrMobileDevice ? 20 : 30,
				}}
			>
				{AVAILABLE_LANGUAGES.map((flag, idx) => (
					<TouchableOpacity onPress={() => changeLanguageHandler(flag)} key={flag}>
						<Image
							style={{
								...styles.image,
								marginRight: idx == AVAILABLE_LANGUAGES.length - 1 ? 0 : 15,
								borderColor: i18n.language == flag ? '#171717' : 'transparent',
							}}
							source={images.flags[flag]}
						/>
					</TouchableOpacity>
				))}
			</View>
			<Animated.Image
				source={images.brainIcon}
				style={{
					...animatedStyles,
				}}
			/>
			<Text style={styles.header}>{t('home.choose_game')}</Text>
			<Link style={styles.link} to={{ screen: 'Memotest' }}>
				{t('common.memotest')}
			</Link>
			<Link style={styles.link} to={{ screen: 'Opposites' }}>
				{t('common.opposites')}
			</Link>
			<Link style={styles.link} to={{ screen: 'Calculator' }}>
				{t('common.calculator')}
			</Link>
			<SettingsModal
				isUserModalVisible={isSettngsModalVisible}
				onRequestClose={() => setIsSettngsModalVisible(false)}
			/>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff8f2',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	link: {
		fontSize: 20,
		letterSpacing: 4,
		marginBottom: 15,
	},
	image: {
		borderWidth: 2,
		width: 55,
		height: 37,
	},
})

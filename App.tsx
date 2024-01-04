import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import '@expo/match-media'
import './i18n'

import Home from './views/Home'
import Memotest from './views/Memotest'
import Opposites from './views/Opposites'
import Calculator from './views/Calculator'

import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { View } from 'react-native'
import { useEffect } from 'react'
import { AvailableLanguage } from './i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

export default function App() {
	const { t, i18n } = useTranslation()

	useEffect(() => {
		;(async () => {
			const currentLanguage =
				((await AsyncStorage.getItem('lang')) as AvailableLanguage) || 'es'
			if (i18n.language !== currentLanguage) {
				i18n.changeLanguage(currentLanguage)
			}
		})()
	}, [])

	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{ headerStyle: { backgroundColor: '#fff8f2' } }}
				>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Memotest"
						component={Memotest}
						options={{ title: _.capitalize(t('common.memotest')) }}
					/>
					<Stack.Screen
						name="Opposites"
						component={Opposites}
						options={{ title: _.capitalize(t('common.opposites')) }}
					/>
					<Stack.Screen
						name="Calculator"
						component={Calculator}
						options={{ title: _.capitalize(t('common.calculator')) }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}

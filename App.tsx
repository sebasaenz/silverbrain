import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import '@expo/match-media'
import './i18n'

import Home from './views/Home'
import Memotest from './views/Memotest'
import Opposites from './views/Opposites'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

const Stack = createNativeStackNavigator()

export default function App() {
	const { t } = useTranslation()

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
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
			</Stack.Navigator>
		</NavigationContainer>
	)
}

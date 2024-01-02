import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import '@expo/match-media'

import Home from './views/Home'
import Memotest from './views/Memotest'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Memotest" component={Memotest} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

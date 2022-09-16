// In App.js in a new project

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Game } from '../screens/Game';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home/Home';
import { New } from './pages/New/New';
import { Info } from './pages/New/Info';
import { Local } from './pages/New/Local';
import { Detail } from './pages/Detail/Detail';

export default function Routes() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="New" component={New} />
                <Stack.Screen options={{ headerShown: false }} name="Info" component={Info} />
                <Stack.Screen options={{ headerShown: false }} name="Local" component={Local} />
                <Stack.Screen options={{ headerShown: false }} name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
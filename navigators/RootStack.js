import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
    <NavigationContainer>
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </RootStack.Navigator>
    </NavigationContainer>
);

export default RootStackScreen;
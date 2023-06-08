import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ProfileScreen from '../screens/ProfileScreen';
import UpdateInformationScreen from '../screens/UpdateInformationScreen';

const ProfileStack = createNativeStackNavigator({
    Profile: {screen: ProfileScreen},
    UpdateInformation: {screen: UpdateInformationScreen}
});

export default ProfileStack;
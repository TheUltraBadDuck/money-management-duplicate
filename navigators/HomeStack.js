import React, { createContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import PiggyBank from '../screens/PiggyBank';
import AchievementScreen from '../screens/AchievementScreen';
import NewsScreen from '../screens/News/NewsScreen';
import NewsDetail from '../screens/News/NewsDetail';
import AddWalletScreen from '../screens/AddWalletScreen';
import UpdateInformationScreen from '../screens/UpdateInformationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({navigation,route}) => {

  return (
      <HomeStack.Navigator initialRouteName="HomeStack">
        <HomeStack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeStack" component={HomeScreen} 
        />
        <HomeStack.Screen name="Wallet" component={WalletScreen} />
        <HomeStack.Screen name="AddWallet" component={AddWalletScreen} />
        <HomeStack.Screen name="Piggy" component={PiggyBank} />
        <HomeStack.Screen name="Achievement" component={AchievementScreen} />
        <HomeStack.Screen name="News" component = {NewsScreen} />
        <HomeStack.Screen name="NewsDetail" component = {NewsDetail} />
        <HomeStack.Screen name='UpdateInformation' component={UpdateInformationScreen}/>
        <HomeStack.Screen name='Profile' component={ProfileScreen}/>
      </HomeStack.Navigator>
  );
}

export default HomeStackScreen;

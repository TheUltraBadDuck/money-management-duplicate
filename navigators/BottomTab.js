import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myColor from '../assets/colors/colors';
import { globalStyles } from '../assets/styles';

// Screens
import HomeStackScreen from './HomeStack';
import ReportScreen from '../screens/ReportScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TransactionStack from "./TransactionStack"
import AddTransferScreen from '../screens/Transaction/AddTransferScreen';
import AddCategory from '../screens/Transaction/AddCategory';
import CategoriesScreen from '../screens/Transaction/CategoriesScreen';

const CustomTabBar = ({ child, onPress }) => (
  <View style={styles.backgroundBtnAdd}>
    <TouchableOpacity
      style={styles.btnAdd}
      onPress={onPress}
    >
      {child}
      <Ionicons name='add' color='#FFF' size={32} />
    </TouchableOpacity>
  </View>
)

const optionsTab = ({ route }) => ({
  headerShown: false,
  tabBarStyle: styles.tabBar,
  tabBarActiveTintColor: '#FF6347',
  tabBarInactiveTintColor: '#FFF',
  tabBarIcon: ({ focused, color }) => {
    const icons = {
      Home:        focused ? 'home'          : 'home-outline',
      Report:      focused ? 'cellular'      : 'cellular-outline',
      AddTransfer: focused ? 'add-circle'    : 'add',
      History:     focused ? 'reload-circle' : 'reload-circle-outline',
      Settings:    focused ? 'settings'      : 'settings-outline',

      'Trang chủ': focused ? 'home'          : 'home-outline',
      'Báo cáo':   focused ? 'cellular'      : 'cellular-outline',
      'Thêm giao dịch': focused ? 'add-circle' : 'add',
      'Lịch sử':   focused ? 'reload-circle' : 'reload-circle-outline',
      'Cài đặt':   focused ? 'settings'      : 'settings-outline',
    };
    return (
      <Ionicons name={icons[route.name]} color={color} size={32} />
    )
  }
})

const Tab = createBottomTabNavigator();

export default function BottomTab({navigation}) {
  return (
    <View style={globalStyles.flex(1)}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={optionsTab}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Report" component={ReportScreen} />
          <Tab.Screen name="AddTransfer"
            component={TransactionStack}
            options={{
              tabBarButton: (props) => <CustomTabBar {...props} />,
              tabBarStyle: {
                display: "none"
              }
            }} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
    backgroundColor: myColor.main,
  },

  btnAdd: {
    top: 5,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: myColor.main,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundBtnAdd: {
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
  }
});
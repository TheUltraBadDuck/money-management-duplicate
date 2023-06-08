import React from 'react';
import { Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { NavigationActions } from 'react-navigation';

import AddTransferScreen from '../screens/Transaction/AddTransferScreen';
import CategoriesScreen from '../screens/Transaction/CategoriesScreen';
import AddCategory from '../screens/Transaction/AddCategory';
import ChooseWalletScreen from '../screens/Transaction/ChooseWalletScreen'
import HomeScreen from '../screens/HomeScreen';

const ComponentStack = createNativeStackNavigator();

const TransactionStack = ({ navigation }) => {
    return (
        <ComponentStack.Navigator
            initialRouteName="AddTransactionScreen"
        >
            <ComponentStack.Screen
                name="AddTransactionScreen"
                component={AddTransferScreen}
                options={{
                    title: 'Thêm giao dịch',
                    headerTitleAlign: "center"
                }}
                initialParams={{ 
                    amount: 42 // idCategory: null,
                    // note: null, 
                    // startDate: null, 
                    // idWallet: null 
                  }}
            />
            <ComponentStack.Screen
                name="CategoriesScreen"
                component={CategoriesScreen}
                options={{
                    title: 'Chọn nhóm',
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#F9F9F9',
                        height: 70,
                    },
                }}
            />
            <ComponentStack.Screen
                name="AddCategory"
                component={AddCategory}
                options={{
                    title: 'Nhóm mới',
                }}
            />
            <ComponentStack.Screen
                name="ChooseWallet"
                component={ChooseWalletScreen}
                options={{
                    title: 'Choose Wallet',
                }}
            />
        </ComponentStack.Navigator>
    );
}

export default TransactionStack;

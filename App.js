import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import myColor from './assets/colors/colors'
import { Context, WalletProvider, walContext } from './components/context';
import RootStack from './navigators/RootStack';
import BottomTab from './navigators/BottomTab';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";

import './assets/languages/i18n';
import { useTranslation } from 'react-i18next';
// import { store } from './store/store';
import Loading from './components/Loading';

//them dong nay khi demo
//LogBox.ignoreAllLogs(); 


export default function App() {


  //category trans
  const [cate_trans, setCateTrans] = React.useState({
    id: null,
    title: null
  })

  //wallet chinh thuc
  const[walletTest,setWalletTest]= React.useState([])

  const initialLoginState = {
    userId: null,
    isLoading: true,
    email: null,
    token: null,
  }

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.uid,
          email: action.mail,
          userToken: action.token,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          userId: action.uid,
          email: action.mail,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...state,
          userId: null,
          email: null,
          userToken: null,
          isLoading: false,
        }
    }
  }
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  // Cài đặt
  const [t, i18n] = useTranslation();
  const [settings, setSettings] = React.useState({
    theme: 'light',
    notification: true,
    language: 'en',
    currency: 'us_dollar'
  });

  const updateSettings = (name, value = null) => {

    let new_settings = { ...settings };

    switch (name) {
      case 'theme':
        new_settings.theme = value;
        setSettings(new_settings);
        break;
      case 'notification':
        new_settings.notification = !new_settings.notification;
        setSettings(new_settings);
        break;
      case 'language':
        function toggleLanguage(new_lang) {
          new_settings.language = value;
          setSettings(new_settings);
        }
        i18n.changeLanguage(value).then(() => toggleLanguage(value)).catch(err => console.log(err));
        break;
      case 'currency':
        new_settings.currency = value;
        setSettings(new_settings);
        break;
    }
  }

  const authContext = React.useMemo(() => ({
    signIn: (email, password, userId) => {
      let userToken;
      userToken = null;
      if (email === 'user' && password === 'pass') {
        userToken = 'haha';
      }
      dispatch({ type: 'LOGIN', mail: email, token: userToken, uid: userId });
    },
    logOut: () => {
      dispatch({ type: 'LOGOUT' })
      
    }
  }))

  React.useEffect(() => {
    let userToken;
    userToken = 'ffg';
    setTimeout(() => { dispatch({ type: 'LOGOUT', token: userToken }); }, 1000)
  }, [])


  if (loginState.isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <Context.Provider value={{ authContext, settings, updateSettings, cate_trans, setCateTrans, walletTest, setWalletTest }}>
      <WalletProvider>
        {loginState.userToken !== null ?
          //<TransProvider>
          <BottomTab />
          //</TransProvider>
          :
          //<TransProvider>
          <RootStack />
          //</TransProvider>
        }
      </WalletProvider>
    </Context.Provider>
  );
}
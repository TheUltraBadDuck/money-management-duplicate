import { createContext, useState, useEffect, useContext, useRef } from 'react';
import '../assets/languages/i18n';
import { useTranslation } from 'react-i18next';
import { ref, onValue, getDatabase } from "firebase/database";
import firebaseApp from '../firebase';
import Loading from './Loading';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from 'firebase/auth';


// export const basicjson = require('../datas/basicwallets.json');
// export const piggyjson = require('../datas/piggybanks.json');

export const Context = createContext();
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    const { setWalletTest } = useContext(Context);

    const db = getDatabase()
    const [basic, setBasic] = useState([]);
    const [piggy, setPiggy] = useState([]);
    const [current_wallet, setCurrWallet] = useState({})
    const [userId, setUserId] = useState('');

    const wallet = {
        uid: userId,
        setUid: setUserId,

        basic: basic,
        piggy: piggy,

        setBasic: setBasic,
        setPiggy: setPiggy,
        
        current_wallet: current_wallet,//object
        setCurrWallet: setCurrWallet
    }


    function objToArr(value) {
        if (!value) {
            return [];
        }
        else {
            var arr = []
            Object.keys(value).forEach(function(i) {
                arr.push(value[i]);
            })
            return arr;
        }
    }

    // Đọc và chuyển thành Array
    // Ở dưới là Object
    const readDataWallet = () => {
        let basicArr = []
        let piggyArr = []
        console.log('Getting wallet data...')
        // Object.keys(basicjson).forEach((id) => {
        //     basicArr.push(basicjson[id])
        // })
        // Object.keys(piggyjson).forEach((id) => {
        //     piggyArr.push(piggyjson[id])
        // })
        // setBasic(basicArr)
        // setPiggy(piggyArr)
        // console.log('Successfully get wallet data')
        onValue(ref(db, `users/${userId}/wallet/`), (snapshot) => {
            snapshot.child('basic/').forEach((childSnapshot) => {
                var val = childSnapshot.val();
                var new_val = {
                    id: val.id,
                    name: val.name,
                    date: val.date,
                    balance: val.balance,
                    Transaction: objToArr(val['Transaction'])
                }
                basicArr.push(new_val)
                
            })
            snapshot.child('piggy/').forEach((childSnapshot) => {
                piggyArr.push(childSnapshot.val())
            })
            setBasic(basicArr)
            console.log('\nBasic ARR context.js: ', basicArr, '\n')
            setPiggy(piggyArr)
            setWalletTest(basicArr)
            console.log('0) ', basicArr.length)
            console.log('Successfully get wallet data')
        })
    }
    useEffect(() => {
        readDataWallet()
        return () => {
            setBasic([]);
            setPiggy([]);
        };
    }, [userId])

    //
    // Không re-render được :((
    // Bấm Ctrl+F để render
    //
    return (

        <WalletContext.Provider value={wallet} >
            {children}
        </WalletContext.Provider>
    );
};


export const getTheme = (texting = true) => {

    const { t, i18n } = useTranslation();

    if (texting) {
        switch (Context._currentValue.settings.theme) {
            case 'light': return t('settings_screen.light');
            case 'dark' : return t('settings_screen.dark');
            default: return 'error settings_screen.<theme>';
        }
    }
    return Context._currentValue.settings.theme;
}

export const getNotification = () => {
    return Context._currentValue.settings.notification;
}

export const getLanguage = (texting = true) => {

    const { t, i18n } = useTranslation();

    if (texting) {
        switch (Context._currentValue.settings.language) {
            case 'en': return t('settings_screen.en');
            case 'vi': return t('settings_screen.vi');
            default: return 'error settings_screen.<language>';
        }
    }
    return Context._currentValue.settings.language;
}

export const getCurrency = (texting = true) => {

    const { t, i18n } = useTranslation();

    if (texting) {
        switch (Context._currentValue.settings.currency) {
            case 'vn_dong'  : return t('settings_screen.vn_dong');
            case 'us_dollar': return t('settings_screen.us_dollar');
            case 'uk_pound' : return t('settings_screen.uk_pound');
            case 'euro'     : return t('settings_screen.euro');
            case 'yuan'     : return t('settings_screen.yuan');
            case 'yen'      : return t('settings_screen.yen');
            default: return 'error settings_screen.<currency>';
        }
    }

    return Context._currentValue.settings.currency;
}

// Trả về giá trị bên trái nếu nền sáng, ngược lại bên phải nếu nền tối
export const gt = (light_theme, dark_theme) => {
    switch (Context._currentValue.settings.theme) {
        case 'light': return light_theme;
        case 'dark' : return dark_theme;
        default: return null;
    }
}

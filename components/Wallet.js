import { useContext } from 'react';
import { Context, WalletContext, getLanguage, getCurrency } from './context';


//var RNFS = require('react-native-fs');
import { ref, set, get, onValue, getDatabase } from "firebase/database";
import { firebaseApp, auth } from '../firebase';



// Chỉnh ngày
var month_en = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
]
function getDayMonthYear(date) {

    const context_val = useContext(Context);

    switch (getLanguage(false)) {
        case 'en': return (date.getDate() + ' ' + month_en[date.getMonth()] + ' ' + date.getFullYear());
        case 'vi': return (date.getDate() + ' Tháng ' + date.getMonth().toString() + ' ' + date.getFullYear());
        default: return null;
    }
}

function getHourMinute(date) {

    var hour_str = (date.getUTCHours() < 10 ? '0' : '') + date.getUTCHours();
    hour_str += ' : ' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return hour_str;
}


// Đổi tiền tệ
const amountByCurrency = (us_amount, currency = 'by_settings') => {

    if (currency = 'by_settings') {
        const context_val = useContext(Context);
        currency = getCurrency(false);
    }

    var new_amount = 0;
    switch (currency) {
        case 'us_dollar': new_amount = us_amount         ; return new_amount.toString() + '$';
        case 'vn_dong'  : new_amount = us_amount * 23251 ; return (Math.round(new_amount / 100) * 100).toString() + '₫';
        case 'uk_pound' : new_amount = us_amount * 0.81  ; return (Math.round(new_amount * 100) / 100).toString() + '£';
        case 'euro'     : new_amount = us_amount * 0.95  ; return (Math.round(new_amount * 100) / 100).toString() + '€';
        case 'yuan'     : new_amount = us_amount * 6.69  ; return (Math.round(new_amount * 100) / 100).toString() + '¥';
        case 'yen'      : new_amount = us_amount * 135.12; return Math.round(new_amount).toString() + '¥';
        default: return '0[ERROR]';
    }
}



function getIcon(type) {
    switch (type) {
        case "basic_wallet": return 'wallet';
        case "piggy_bank"  : return 'piggy-bank';
    }
}



// Có 2 kiểu dữ liệu
// Object (cho json và firebase) { { [] } }, {}, {} }
// Array (cho xử lý dữ liệu)
function arrayToObject(a_wallet) {
    let obj = {};

    a_wallet.forEach(function(value) {
        obj[value['id']] = value;

        if ('transactions' in value) {
            value.transactions.forEach(function(trans) {
                obj[value['id']]['transactions'][trans['id']] = trans
            })
        }
    });

    return obj;
}


function writeJSONBasic(_basic,_basic_next_id) {

    var basic = arrayToObject(_basic);
    // var path = RNFS.DocumentDirectoryPath + '../datas/basicwallets.json';
    // RNFS.writeFile(path, basic, 'utf8')
    // .then(() => {
    //     console.log('Successfully write basic wallets to JSON');
    // })
    // .catch((err) => {
    //     console.log('Something goes wrong with writing basic wallets to JSON. Look at components/Wallet');
    // });
}

function writeJSONPiggy() {

    var piggy = arrayToObject();

    var path = RNFS.DocumentDirectoryPath + '../datas/piggybanks.json';
    RNFS.writeFile(path, piggy, 'utf8')
    .then(() => {
        console.log('Successfully write basic wallets to JSON');
    })
    .catch((err) => {
        console.log('Something goes wrong with writing basic wallets to JSON. Look at components/Wallet');
    });
}


function readWalletFireBase() {
    let currentUser = auth.currentUser;
    if(currentUser.uid) {
        get(child(dbRef, 'users/' + currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            }
            else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    };
}




export {
    getDayMonthYear, getHourMinute, amountByCurrency, getIcon,
    arrayToObject
}

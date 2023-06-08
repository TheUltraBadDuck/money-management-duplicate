import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Modal } from 'react-native';
import { getDayMonthYear, getHourMinute, amountByCurrency, arrayToObject } from '../components/Wallet';
import DropDown from '../components/DropDown';


import '../assets/languages/i18n';
import { useTranslation } from 'react-i18next';
import { Context, WalletContext, gt } from '../components/context';
import BlankRect from '../components/BlankRect';

import { ref, set, get, onValue, getDatabase } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


const WalletScreen = ({ navigation, route }) => {

    const [userId, setUid] = useState(null)
    const context_val = useContext(Context);
    const wallet_array = useContext(WalletContext);
    const { t } = useTranslation();

    // Lấy ví hiện tại
    const wallet_id = route.params.id;
    const [this_wallet, setThisWallet] = useState(getThisWallet(wallet_id));

    // Chọn các loại sắp xếp
    const sort_types = [
        { id: 0, name: 'wallet_screen.latest_transaction' },
        { id: 1, name: 'wallet_screen.oldest_transaction' },
        { id: 2, name: 'wallet_screen.largest_money_amount' },
        { id: 3, name: 'wallet_screen.smallest_money_amount' }
    ]
    const [curr_sort_type, setCurrSortType] = useState(sort_types[0]);
    const [sorted_object, setSortedObject] = useState(getObjectForSortingThisWallet(this_wallet));
    
    const onChangeSort = (item) => {
        setCurrSortType(item);

        let new_sort = [...sorted_object];

        switch(item['id']) {
            case 0: new_sort.sort((a, b) => { return a['date'] < b['date'] } ); break;
            case 1: new_sort.sort((a, b) => { return a['date'] > b['date'] } ); break;
            case 2: new_sort.sort((a, b) => { return parseInt(a['amount']) < parseInt(b['amount']) } ); break;
            case 3: new_sort.sort((a, b) => { return parseInt(a['amount']) > parseInt(b['amount']) } ); break;
            default: console.log('Error sorting'); break;
        }

        setSortedObject(updateKey(new_sort));
    }

    const [show_modal, setShowModal] = useState(false);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            }
        });
    }, [])

    const removeWallet = () => {
        setShowModal(false);

        let new_wallets = [...wallet_array['basic']];

        for (var i = 0; i < new_wallets.length; i++) {
            if (new_wallets[i]['id'] == wallet_id) {
                new_wallets.splice(i,1);
                break;
            }
        }

        console.log('Start deleting');

        //writeJSONBasic(wallet_array['basic'],wallet_array['']);
        const db = getDatabase();
        const _basic = arrayToObject(new_wallets)
        const _piggy = arrayToObject(wallet_array.piggy)
        set(ref(db, `users/${userId}/wallet`), { basic: _basic, piggy: _piggy });


        let basicArr = []
        let piggyArr = []
        onValue(ref(db, `users/${userId}/wallet/`), (snapshot) => {
            snapshot.child('basic/').forEach((childSnapshot) => {
                basicArr.push(childSnapshot.val())
            })
            snapshot.child('piggy/').forEach((childSnapshot) => {
                piggyArr.push(childSnapshot.val())
            })
            wallet_array.setBasic(basicArr)
            wallet_array.setPiggy(piggyArr)
        })
        
        wallet_array.setBasic(new_wallets);


        console.log(this_wallet['name'] + ' was permanently removed!');
        navigation.goBack();
    }

    // Hiện danh sách
    // Nếu không có giao dịch nào, không hiện
    const TransactionList = () => {
        if (Object.keys(sorted_object).length == 0)
            return (
                <Text style = { [styles.warningNormalText, { color: gt('#000', '#FFF') }] }>
                    { t('wallet_screen.no_transaction_warning') }
                </Text>
            )
        else return (
            <View style = { [styles.container, { backgroundColor: gt('#FFF', '#222') }] }>
                {/* Hiện sắp xếp giao dịch */}
                <View style = { styles.sortingView }>
                    <View style = { styles.sortingView2 }>
                        <Text style = { [styles.sortingText, { color: gt('#000', '#FFF') }] }>
                            {t('wallet_screen.sort_by')}
                        </Text>
                    </View>

                    <View style = { styles.sortingDropDown }>
                        <DropDown
                            value = { curr_sort_type }
                            data = { sort_types }
                            onSelect = { onChangeSort }
                            with_language = { true }
                        />
                    </View>
                </View>

                {/* Hiện các giao dịch */}
                <View style = { [styles.wholeTableView] }>
                    <ScrollView persistentScrollbar = { true }>
                        {sorted_object.map((item, index) => {
                                return (
                                    <ShowItem info = { item }   key = { index }/>
                                )
                            })
                        }
                        <BlankRect/>
                    </ScrollView>
                </View>
            </View>
        )
    }


    return (
        <View style = { [styles.container, { backgroundColor: gt('#FFF', '#222') } ] }>

            {/* Modal */}
            <Modal visible = { show_modal }   transparent = { true }   animationType = { 'fade' }>
                <View style = { styles.modalWholeView }>
                    <View style = { [styles.modalBoxView, { backgroundColor: gt('#FFF', '#222') }] }>
                        <Text style = { styles.warningTitleText }>{t('wallet_screen.delete_warning_text')}</Text>
                        <View style = { styles.lowerTextView }>
                            <TouchableHighlight onPress = { () => removeWallet() }>
                                <Text style = { styles.warningNormalText }>{t('wallet_screen.agree')}    </Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress = { () => setShowModal(false) }>
                                <Text style = { styles.warningNormalText }>    {t('wallet_screen.disagree')}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            { /* Hiện tên ví */ }
            <Text style = { [styles.titleText, { color: gt('#000', '#FFF') }] }>
                { this_wallet['name'] }
            </Text>

            {/* Hiện tổng số dư */}
            <Text style = { { fontSize: 16, color: gt('#2380D7', '#FFF') } }>
                { t('wallet_screen.total_balance') }
            </Text>
            <Text style = { { fontSize: 30, fontWeight: 'bold', color: gt('#2380D7', '#FFF') } }>
                { amountByCurrency(this_wallet['balance']) }
            </Text>

            {/* Hiện bút bấm */}
            <View style = { styles.buttonRowView }>
                <TouchableHighlight onPress = { () => navigation.navigate('AddTransfer') }>
                <View style = { [styles.buttonView, { backgroundColor: gt('#2380D7', '#000') }] }>
                        <Text style = { styles.buttonText }>
                            { t('wallet_screen.deposit') }
                        </Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress = { () => setShowModal(true) }>
                    <View style = { [styles.buttonView, { backgroundColor: gt('#D63324', '#662321') }] }>
                        <Text style = { styles.buttonText }>
                            { t('wallet_screen.remove') }
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>

            <TransactionList/>
        </View>
    );
}


// Tìm ví
const getThisWallet = (wallet_id) => {
    const wallet_array = useContext(WalletContext);
    let temp = null;

    Object.keys(wallet_array['basic']).forEach(function(i) {
        if (wallet_array['basic'][i]['id'] == wallet_id) {
            console.log('Found wallet: ', wallet_array['basic'][i]['name']);
            temp = {...wallet_array['basic'][i]};
        }
    })

    return temp;
}


// Xếp các loại giao dịch trong ví
const getObjectForSortingThisWallet = (this_wallet) => {

    var new_sort = [];

    if (!('Transaction' in this_wallet))
        return new_sort;

    var id_sort = 0;

    Object.keys(this_wallet['Transaction']).forEach(function(i) {
        var ele = {
            key: id_sort,
            date: new Date(this_wallet['Transaction'][i]['date']),
            amount: this_wallet['Transaction'][i]['amount'],
            note: this_wallet['Transaction'][i]['note']
        }
        new_sort.push(ele);
        id_sort++;
    })

    // Xếp trước
    new_sort.sort((a, b) => { return a['date'] > b['date'] } );

    new_sort = updateKey(new_sort);

    return new_sort;
}

// Đặt lại id
const updateKey = (sorted_object) => {
    let new_sort = [...sorted_object];

    Object.keys(sorted_object).forEach(function(i) {
        new_sort[i]['key'] = i;
    })

    return new_sort;
}


// Xếp các khối
const ShowItem = (props) => {

    const context_val = useContext(Context);

    const light_colors = ['#EEF', '#FFF'];
    const dark_colors = ['#000', '#222'];
    
    return (
        <View style = { [
            styles.itemView,
            { backgroundColor: gt(light_colors[props.info['key'] % 2], dark_colors[props.info['key'] % 2]) }
        ] }>
            <View style = { styles.leftItemView }>
                <Text style = { [ styles.leftItemText, { color: gt('#2380D7', '#FFF') } ] }>
                    { getDayMonthYear(props.info['date']) }
                </Text>
                <Text style = { [ styles.leftItemText, { color: gt('#2380D7', '#FFF') } ] }>
                    { getHourMinute(props.info['date']) }
                </Text>
            </View>

            <View style = { styles.rightItemView }>
                <Text style = { [styles.noteText, { color: gt('#000', '#fff') }] }>
                    { props.info['note'] }
                </Text>
                <Text style = { [styles.amountText, { color: gt('#000', '#fff') }] }>
                    { amountByCurrency(props.info['amount']) }
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        padding: 10,
        paddingBottom: 20
    },

    balanceText: {
        fontSize: 16
    },

    buttonRowView: {
        flexDirection: 'row',
        padding: 10
    },

    buttonView: {
        //flex: 1,
        width: 150,
        height: 40,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 20
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },

    sortingView: {
        height: 80,
        flexDirection: 'row',
        zIndex: 1,
    },

    sortingView2: {
        paddingTop: 7,
        paddingRight: 5
    },

    sortingText: {
        fontWeight: 'bold',
        fontSize: 16
    },

    sortingDropDown: {
        width: 180,
        height: 180,
        paddingLeft: 10
    },

    wholeTableView: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5
    },

    itemView: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        paddingLeft: 30,
        paddingRight: 30,
    },

    leftItemView: {
        flexDirection: 'column',
        flex: 1
    },

    rightItemView: {
        flexDirection: 'column',
        flex: 2
    },

    leftItemText: {
        fontSize: 16
    },

    noteText: {
        fontSize: 16,
        textAlign: 'right'
    },

    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right'
    },

    warningTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    warningNormalText: {
        fontSize: 16,
        textAlign: 'center'
    },

    modalWholeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0008'
    },

    modalBoxView: {
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },

    lowerTextView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});


export default WalletScreen

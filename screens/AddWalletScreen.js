import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SnapshotViewIOS } from "react-native";
import Icon from '../Icon';
import { Button } from "react-native-paper";
import DateTimePicker from 'react-native-modal-datetime-picker';

import { database } from '../../firebase';
import { auth } from '../firebase';
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import { getStorage, ref as ref_storage, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { Context, WalletContext } from "../components/context";

// import * as firebase from 'firebase';
import { async } from '@firebase/util';

const AddWalletScreen = ({ navigation }) => {
    const [userId, setUid] = React.useState(null)
    const context_val = React.useContext(Context)
    const wallet_array = React.useContext(WalletContext)

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            }
        });
    }, [])

    // global variable
    const [WalletName, setWalletName] = useState(null);

    const [open, setOpen] = useState(false);
    const [date, setDate] = React.useState(new Date())

    const [TotalBalance, setTotalBalance] = useState(0);

    const add = () => {
        const db = getDatabase();
        const unqueId = Date.now().toString()
        set(ref(db, `users/${userId}/wallet/basic/${unqueId}`), {
            id: unqueId,
            name: WalletName,
            date: date.toString(),
            balance: TotalBalance,
        });

        console.log('1) ', context_val.walletTest.length);

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

        let arr = context_val.walletTest.concat({
            id: unqueId,
            name: WalletName,
            date: date.toISOString().slice(0, 10),
            balance: TotalBalance,
            Transaction: []
        })
        console.log('2) ', arr.length, '\n');
        context_val.setWalletTest(arr)
        
        navigation.navigate('HomeStack');
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tên Ví:</Text>
            </View>
            <View style={styles.wrapper}>
                <Icon.FontAwesome
                    style={{ marginLeft: 5 }}
                    name='pencil-square-o'
                    size={30}
                ></Icon.FontAwesome>
                <TextInput
                    style={styles.TextInput}
                    value={WalletName}
                    onChangeText={setWalletName}
                ></TextInput>
            </View>

            <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Số dư:</Text>
            </View>
            <View style={styles.wrapper}>
                <Icon.MaterialIcons
                    style={{ marginLeft: 5 }}
                    name='account-balance-wallet'
                    size={30}
                ></Icon.MaterialIcons>
                <TextInput
                    style={styles.TextInput}
                    value={TotalBalance}
                    onChangeText={setTotalBalance}
                ></TextInput>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Ngày:</Text>
            </View>
            <View style={styles.wrapper}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setOpen(true)}>
                    <Icon.MaterialIcons
                        style={{ marginLeft: 5 }}
                        name='date-range'
                        size={30}
                    ></Icon.MaterialIcons>
                    <DateTimePicker
                        mode="date"
                        date={date}
                        onChange={(date) => { setDate(date) }}
                        isVisible={open}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => { setOpen(false) }}
                    />
                    <Text style={{ color: myColor.greyText }}>{date.toString()}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => add()}>
                <View
                    style={{
                        width: '80%',
                        height: 40,
                        marginTop: 20,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        backgroundColor: '#0060DD'
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>THÊM</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 0,
    },
    wrapperFirst: {
        marginTop: 10,
        marginLeft: 10,
        flexDirection: 'row'
    },
    wrapper: {
        marginTop: 18,
        marginLeft: 10,
        flexDirection: 'row'
    },
    TextInput: {
        width: '80%',
        height: 30,
        marginLeft: 10,
        borderWidth: 1,
        borderBottomColor: '#CCCCFF',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        fontSize: 18,
    },
    wrapperDropDownPicker: {
        marginTop: 10,
        marginLeft: 10,
        flexDirection: 'row'
    },
    dropDownPickerStyle: {
        width: '60%',
        marginTop: -10,
        marginLeft: 10,
        borderRadius: 0,
        borderTopColor: 'transparent',
        borderEndColor: 'transparent',
        borderStartColor: 'transparent',
        borderBottomColor: '#CCCCFF',
        // backgroundColor: 'transparent'
    },
    customDatePickerStyle: {
        // width: '80%',
        // backgroundColor: 'blue',
        // marginTop: ,
        height: 30,
        marginLeft: 0,
        borderWidth: 1,
        borderBottomColor: '#CCCCFF',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        fontSize: 18,
    },
    dateContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10
    },
    datePickerStyle: {

        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
})

export default AddWalletScreen;
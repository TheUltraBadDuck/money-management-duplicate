import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    StatusBar,
    Button
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

import myColor from '../../assets/colors/colors';
import { database } from '../../firebase';
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { WalletContext, Context } from '../../components/context';
import { getAuth } from 'firebase/auth';
import DropDown from '../../components/DropDown';

const AddTransferScreen = ({ route, navigation }) => {
    //const {addTrans,removeTrans} = React.useContext(TransactionContext)
    const _wallet = React.useContext(WalletContext)
    const context_val = React.useContext(Context)


    //category = route.params?.idCategory
    const [money, setMoney] = React.useState(0);
    const [real_money, setRealMoney] = React.useState(0);
    const [description, setDescription] = useState('')
    const [date, setDate] = React.useState(new Date())
    //wallet = route.params?.walletId

    const [open, setOpen] = React.useState(false)
    const [transObj, setTransObj] = React.useState({
        id: null,
        amount: null,
        description: null,
        date: null,
        idCategory: null
    })
    const upFireBase = () => {
        const uniqueId = Date.now().toString()
        setTransObj({
            id: uniqueId,
            amount: real_money,
            description: description,
            date: date.toString(),
            idCategory: context_val.cate_trans.id
        })

        let wallet_model = context_val.walletTest;
        let index = context_val.walletTest.findIndex(e =>
            e.id === _wallet.current_wallet.id
        )

        console.log('DATEEE: ', date.toString());
        wallet_model[index]['Transaction'].push({
            id: uniqueId,
            amount: real_money,
            description: description,
            date: date.toString(),
            idCategory: context_val.cate_trans.id
        })
        context_val.setWalletTest(wallet_model)
        //navigation.navigate('HomeStack')
        const db = getDatabase()
        const userId = getAuth().currentUser.uid

        set(ref(db, `users/${userId}/wallet/basic/${_wallet.current_wallet.id}/Transaction/${uniqueId}`), {
            id: uniqueId,
            amount: real_money,
            description: description,
            date: date.toString(),
            idCategory: context_val.cate_trans.id
        })

        let basicArr = []
        let piggyArr = []
        onValue(ref(db, `users/${userId}/wallet/`), (snapshot) => {
            snapshot.child('basic/').forEach((childSnapshot) => {
                basicArr.push(childSnapshot.val())
            })
            snapshot.child('piggy/').forEach((childSnapshot) => {
                piggyArr.push(childSnapshot.val())
            })
            _wallet.setBasic(basicArr)
            _wallet.setPiggy(piggyArr)
        })

        navigation.goBack();
    }
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <IconButton
                    icon='arrow-left'
                    size={25}
                    onPress={() => {
                        navigation.navigate('HomeStack')
                    }}

                />
            ),
        })
    }, [real_money, context_val.cate_trans.id, description, date, _wallet.current_wallet.id])



    return (
        <ScrollView>
            {console.log(context_val.walletTest)}
            <View style={styles.container}>
                {/* Money field */}
                <View style={styles.action}>
                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome
                            name="money"
                            size={20}
                        />
                        <Text > Số tiền</Text>
                    </View>
                    <TextInput
                        placeholder="0đ"
                        placeholderTextColor={myColor.main}
                        keyboardType="number-pad"
                        style={styles.textInput}
                        value={money.toString()}
                        onChangeText={(value) => {
                            if ((value - '0') > 0) {
                                setMoney(value - '0')
                            } else {
                                setMoney('')
                            }
                        }}
                        onEndEditing={(e) => {
                            if (e.nativeEvent.text.length > 0 && !e.nativeEvent.text.includes("đ")) {
                                setMoney(e.nativeEvent.text + "đ")
                                setRealMoney(e.nativeEvent.text - "0")
                            }
                        }}
                    />
                </View>

                {/* category field */}
                <View style={styles.action}>
                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome
                            name="question"
                            size={20}
                        />
                        <Text > Nhóm</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => {

                            navigation.navigate('CategoriesScreen')
                        }}
                    >
                        {context_val.cate_trans.id ?
                            <Text style={{ color: 'black' }}>{context_val.cate_trans.title}</Text>
                            :
                            <Text style={{ color: myColor.greyText }}>Chọn nhóm</Text>
                        }

                    </TouchableOpacity>
                </View>

                {/* Take notes field */}
                <View style={styles.action}>
                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome
                            name="book"
                            size={20}
                        />
                        <Text >Ghi chú</Text>
                    </View>
                    <TextInput
                        placeholder="Thêm ghi chú"
                        placeholderTextColor={myColor.placeHodler}
                        defaultValue={description}
                        onChangeText={newText => setDescription(newText)}
                        style={styles.takeNote}
                    />
                </View>

                {/* Schedule field */}
                <View style={styles.action}>
                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome
                            name="calendar"
                            size={20}
                        />
                    </View>
                    <TouchableOpacity style={styles.textInput} onPress={() => setOpen(true)}>
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

                {/* Wallet field */}
                <View style={styles.action}>
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons
                            name="wallet-outline"
                            size={20}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => {
                            navigation.navigate('ChooseWallet')
                        }}
                    >
                        {_wallet.current_wallet.id ?
                            <Text style={{ color: 'black' }}>{_wallet.current_wallet.name}</Text>
                            :
                            <Text style={{ color: myColor.greyText }}>Chọn ví</Text>
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={upFireBase}>
                    <Text>
                        Lưu
                    </Text>
                </TouchableOpacity>

                {/* Clock field */}
                {/* <View style={styles.action}>
                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome
                            name="clock-o"
                            size={20}
                        />
                    </View>
                    <TextInput
                        placeholder="Đặt nhắc nhở"
                        placeholderTextColor={myColor.textInput}
                        style={styles.textInput}
                    />
                </View> */}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff"
    },
    action: {
        marginTop: 30,
        paddingLeft: 10,

    },
    actionBottom: {
        marginTop: 30,
        paddingLeft: 10,
        marginBottom: 30
    },
    textInput: {
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: myColor.greyBorder,
        height: 50,
        color: myColor.main,
        justifyContent: "center"
    },
    takeNote: {
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: myColor.greyBorder,
        height: 50,
        color: "black",
        justifyContent: "center"
    },
    touchable: {
        paddingLeft: 10,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: myColor.greyBorder,
        height: 50,
    },
    saveHeaderButton: {
        paddingRight: 10
    },
    saveHeaderText: {
        fontSize: 16
    }
});

export default AddTransferScreen;
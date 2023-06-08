import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
} from 'react-native';
import { database } from '../../firebase';
import { auth } from '../../firebase';
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

//import TRANSACTIONS from '../../data/transaction-data';
import TrancsactionItem from '../../components/wallet/TransactionItem';
import WalletItem from '../../components/wallet/WalletItem';
import myColor from '../../assets/colors/colors';
import { WALLET } from '../../datas/wallet';
import { WalletContext,Context } from '../../components/context';
import { TouchableOpacity } from 'react-native-web';
import { ListButton2,Button2 } from '../../components/Button';
import myIcon from '../../assets/icons'


const ChooseWalletScreen = ({ navigation }) => {
    const _wallet = React.useContext(WalletContext)
    const wallet = React.useContext(Context)

    const [selectedId, setSelectedId] = React.useState(null);
    const [userId, setUid] = React.useState(null)

    // React.useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUid(user.uid)
    //             console.log(_wallet['basic'])
    //         }
    //     });
    // }, [])

    // const walletData = []

    // const db = getDatabase();
    // const starCountRef = ref(db, `users/${userId}/wallet/basic/`);

    // React.useEffect(() => {
    //     onValue(starCountRef, (snapshot) => {
    //         const obj = snapshot.val();
    //         for (const prop in obj) {
    //             walletData.push(obj[prop])
    //         }
    //         console.log(walletData)
    //     });
    // })

    // const make_list = () => {
    //     const list = []
    //     for (const w in WALLET){
    //         list.push(WALLET[w])
    //     }
    //     console.log(list)
    //     return list
    // }

    // const list_wallet = make_list()
    return (

        <View style={styles.container}>
            {/* {console.log("data:",wallet.walletTest)} */}
            <FlatList
                data={wallet.walletTest} //walletData

                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <WalletItem
                        idSelect={selectedId}
                        id={item.id}
                        name={item.name}
                        balance={`${item.balance} đ`}
                        onSelect={() => {
                            const wallet_model = {
                                id: item.id,
                                name: item.name,
                                balance: item.balance
                            }
                            _wallet.setCurrWallet(wallet_model);
                            navigation.navigate('AddTransactionScreen');
                        }}
                    />)}
                extraData={selectedId}
            >
            </FlatList>
        </View>
    );
};


const padLeft = 20
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    newGroup: {
        height: 50,
    },
    headerGroupList: {
        justifyContent: "center",
        height: 50,
        paddingLeft: padLeft,
        backgroundColor: myColor.greyBackground
    },
    boderBottomLine: {
        height: 2,
        backgroundColor: myColor.greyBorder
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: myColor.greyBorder,
        backgroundColor: 'white',
    },
});

export default ChooseWalletScreen;
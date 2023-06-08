import { useContext, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDown from '../components/DropDown';


import '../assets/languages/i18n';
import { useTranslation } from 'react-i18next';
import { Context, WalletContext, gt } from '../components/context';
import BlankRect from '../components/BlankRect';


import { getDayMonthYear, getHourMinute, amountByCurrency, getIcon } from '../components/Wallet';


// 
// - - - Navigation Lịch sử - - - 
// 
const HistoryScreen = () => {

    const context_val = useContext(Context);
    const wallets = useContext(WalletContext);
    const { t } = useTranslation();

    // Chọn các loại sắp xếp
    const sort_types = [
        { id: 0, name: 'history_screen.wallet_a_z' },
        { id: 1, name: 'history_screen.wallet_z_a' },
        { id: 2, name: 'history_screen.latest_transaction' },
        { id: 3, name: 'history_screen.oldest_transaction' },
        { id: 4, name: 'history_screen.largest_money_amount' },
        { id: 5, name: 'history_screen.smallest_money_amount' }
    ]
    const [curr_sort_type, setCurrSortType] = useState(sort_types[0]);

    // Danh sách giao dịch
    const [sorted_object, setSortedObject] = useState(getObjectForSorting(wallets));
    
    const onChangeSort = (item) => {
        setCurrSortType(item);

        switch(item['id']) {
            case 0: setSortedObject(sorted_object.sort((a, b) => { return a['name'] > b['name'] } )); break;
            case 1: setSortedObject(sorted_object.sort((a, b) => { return a['name'] < b['name'] } )); break;
            case 2: setSortedObject(sorted_object.sort((a, b) => { return a['date'] < b['date'] } )); break;
            case 3: setSortedObject(sorted_object.sort((a, b) => { return a['date'] > b['date'] } )); break;
            case 4: setSortedObject(sorted_object.sort((a, b) => { return parseInt(a['amount']) < parseInt(b['amount']) } )); break;
            case 5: setSortedObject(sorted_object.sort((a, b) => { return parseInt(a['amount']) > parseInt(b['amount']) } )); break;
            default: console.log('Error sorting'); break;
        }
    }


    // Hiện danh sách lịch sử
    const HistoryList = () => {
        if (Object.keys(sorted_object).length == 0)
            return (
                <Text style = { styles.warningText }>
                    { t('history_screen.no_transaction_warning') }
                </Text>
            )
        else return (
            <View style = { styles.container }>
            <View style = { styles.sortingView }>
                <View style = {{ paddingTop: 7} }>
                    <Text style = { [styles.sortingText, { color: gt('#000', '#fff') }] }>
                        {t('history_screen.sort_by')}
                    </Text> 
                </View>

                <View style = { styles.sortingDropDown }>
                    <DropDown value = { curr_sort_type }   data = { sort_types }   onSelect = { onChangeSort }   with_language = { true }/>
                </View>
            </View>

            <View style = { styles.wholeTableView }>
                <ScrollView persistentScrollbar = { true }>

                    {sorted_object.map((item, index) => {
                                return (
                                    <ShowItem info = { item }   sortType = { curr_sort_type }   key = { index }/>
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
            <Text style = { [styles.titleText, { color: gt('#000', '#fff') }] }>{ t('history') }</Text>
            <HistoryList/>
        </View>
    )
}



// Xếp lại danh sách lịch sử
function getObjectForSorting(wallets) {

    var new_sort = [];
    var count = 0;

    // Object.keys(wallets['basic']).forEach(function(i) {
    //     var wp = wallets['basic'][i]['transactions'];
    //     Object.keys(wp).forEach(function(j) {
    //         var ele = {
    //             key: count,
    //             name: wallets['basic'][i]['name'],
    //             type: 'basic_wallet',
    //             date: new Date(wp[j]['date']),
    //             amount: wp[j]['amount'],
    //             description: wp[j]['description']
    //         }
            
    //         new_sort.push(ele);
    //         count++;
    //     })
    // })

    wallets.basic.map((iWallet) => {
        var wp = iWallet.Transaction
        if(wp){
            Object.values(wp).map((item) => {
                var ele = {
                    key: count,
                    name: iWallet.name,
                    type: 'basic_wallet',
                    date: new Date(item.date),
                    amount: item.amount,
                    description: item.note,
                }
                console.log(ele);
                new_sort.push(ele);
                count++;
            })
        }
    })

    wallets.piggy.map((iWallet) => {
        var wp = iWallet.Transaction
        if(wp){
            Object.values(wp).map((item) => {
                var ele = {
                    key: count,
                    name: iWallet.name,
                    type: 'basic_wallet',
                    date: new Date(item.date),
                    amount: item.amount,
                    description: item.note,
                }
                new_sort.push(ele);
                count++;
            })
        }
    })

    // Object.keys(wallets['piggy']).forEach(function(i) {

    //     var wp = wallets['piggy'][i]['transactions'];
    //     Object.keys(wp).forEach(function(j) {
    //         var ele = {
    //             key: count,
    //             name: wallets['piggy'][i]['name'],
    //             type: 'piggy_bank',
    //             date: new Date(wp[j]['date']),
    //             amount: wp[j]['amount'],
    //             description: wp[j]['description']
    //         }
            
    //         new_sort.push(ele);
    //         count++;
    //     })
    // })

    // Xếp trước
    new_sort.sort((a, b) => { return a['name'] > b['name'] } );

    return new_sort;
}


// Hiện những thông tin trong ngày
const ShowItem = (props) => {

    const context_val = useContext(Context);

    const ShowTime = () => {
        return (
            <View style = { [styles.dateHeaderView, { backgroundColor: gt('#2380D7', '#000') }] }>
                <Text style = { styles.dateHeaderText }>
                    { getDayMonthYear(props.info['date']) }
                </Text>
                <Text style = { styles.dateHeaderText }>
                    { getHourMinute(props.info['date']) }
                </Text>
            </View>
        )
    }

    const ShowIcon = () => {
        return (
            <View style = { styles.leftColumn }>
                <Text style = { [styles.infoText, { color: gt('#2380D7', '#FFF') }] }>
                    <FontAwesome5 name = { getIcon(props.info['type']) }   size = { 40 }   color = { gt('#2380D7', '#FFF') }/>
                    { '\n' }{ props.info['name'] }
                </Text>
            </View>
        )
    }

    const ShowAmount = () => {
        return (
            <View style = { styles.rightColumn }>
                <Text style = { [styles.descriptionText, { color: gt('#224', '#FFF') }] }>
                    { amountByCurrency(props.info['amount']) }
                </Text>
                <Text style = { [styles.amountText, { color: gt('#224', '#FFF') }] }>
                    { props.info['description'] }
                </Text>
            </View>
        )
    }

    return (
        <View>
            <ShowTime/>
            <View style = { styles.detailTableView }>
                <ShowIcon/>
                <ShowAmount/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10
    },

    sortingView: {
        height: 80,
        flexDirection: 'row',
        zIndex: 1,
    },

    sortingText: {
        fontWeight: 'bold',
        fontSize: 16
    },

    sortingDropDown: {
        width: 180,
        height: 180
    },

    wholeTableView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    detailTableView: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row'
    },
    
    dateHeaderView: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        paddingRight: 30,
        
    },

    dateHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'left',
        paddingLeft: 24
    },

    leftColumn: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 2
    },

    rightColumn: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 3,
        paddingRight: 30
    },

    infoText: {
        fontSize: 20,
        textAlign: 'center'
    },

    descriptionText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right'
    },

    amountText: {
        fontSize: 16,
        textAlign: 'right'
    }

})


export default HistoryScreen
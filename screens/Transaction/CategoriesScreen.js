import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { database } from '../../firebase';
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";

import { Avatar, Card, IconButton } from 'react-native-paper';
//import TRANSACTIONS from '../../data/transaction-data';
import TrancsactionItem from '../../components/wallet/TransactionItem';
import myColor from '../../assets/colors/colors';
import { ReactReduxContext } from 'react-redux';
import { Context } from '../../components/context';


const CategoriesScreen = ({ navigation }) => {
    const context_val = React.useContext(Context)

    const [selectedId, setSelectedId] = React.useState('');
    const [search, setSearch] = React.useState('')
    const [filterData, setFilterData] = React.useState([])


    const data = [];

    const db = getDatabase();
    const starCountRef = ref(db, 'categories/');
    React.useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const obj = snapshot.val();
            for (const prop in obj) {
                data.push(obj[prop])
            }
            setFilterData(data)
        });
    }, [])

    //use to search category
    const searchFilter = (text) => {
        if (text) {
            const newData = data.filter((item) => {
                const itemData = item.title ?
                    item.title.toUpperCase()
                    : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData)
            setSearch(text)
        } else {
            setFilterData(data)
            setSearch(text)
        }
    }


    // !!! object["id"] not object.id
    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <IconButton
                    icon='arrow-left'
                    size={25}
                    onPress={() => {
                        navigation.navigate('AddTransactionScreen',)
                    }}
                />
            ),
        })
    },[])

    return (

        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Nhập tên nhóm"
                vale={search}
                returnKeyType='search'
                onChangeText={(text) => { searchFilter(text) }}
            />
            <TouchableOpacity
                sytle={styles.newGroup}
                onPress={() => { navigation.navigate('AddCategory') }}
            >
                <Card.Title
                    title='Nhóm mới'
                    titleStyle={{
                        fontSize: 16,
                        color: "green"
                    }}
                    style={{
                        height: 60
                    }}
                    left={(prop) => <FontAwesome name="plus-circle" size={30} color="green" />}
                />
            </TouchableOpacity>
            <FlatList
                data={filterData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    item.id[2] == '1' ?
                        (<View style={styles.headerGroupList}>
                            <Text style={{ fontSize: 16, color: myColor.greyText }}>{item.title}</Text>
                        </View>) :
                        (<TrancsactionItem
                            idSelect={selectedId}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            onSelect={() => {
                                const cate_trans_model = {
                                    id: item.id,
                                    title: item.title
                                }
                                context_val.setCateTrans(cate_trans_model)
                                setSelectedId(item.id);
                            }}
                        />))}
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

export default CategoriesScreen;
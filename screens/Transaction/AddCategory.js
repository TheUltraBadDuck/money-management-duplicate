import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
} from 'react-native';


import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  IconButton } from 'react-native-paper';

import myColor from '../../assets/colors/colors';

const AddCategory = ({ navigation }) => {
    const [isSelected, setSelection] = React.useState(false);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.saveHeaderButton}>
                    <Text style={styles.saveHeaderText}>Lưu</Text>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <IconButton
                    icon='close'
                    size={25}
                    onPress={() => { navigation.goBack() }}
                />
            ),
        })
    },[])
    return (
        <View style={styles.container}>

            {/* group field */}
            <View style={styles.action}>
                <View style={{ flexDirection: "row" }}>
                    <FontAwesome
                        name="question"
                        size={20}
                    />
                </View>
                <TextInput
                    placeholder="Tên nhóm"
                    style={styles.textInput}
                />
            </View>

            {/* {check box filed} */}
            <View style={{...styles.checkboxContainer,...styles.action}}>

                <TouchableOpacity style={styles.checkbox} onPress={() => { setSelection(true) }}>
                    {isSelected === false ?
                        <IconButton
                            icon="circle-outline"
                            size={25}
                            color="grey"
                            onPress={() => { setSelection(true) }}
                        /> :
                        <IconButton
                            icon="circle-slice-8"
                            size={25}
                            color="green"
                        />}
                    <Text> Khoản thu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.checkbox} onPress={() => { setSelection(false) }}>
                    {isSelected === true ?
                        <IconButton
                            icon="circle-outline"
                            size={25}
                            color="grey"
                            onPress={() => { setSelection(false) }}
                        /> :
                        <IconButton
                            icon="circle-slice-8"
                            size={25}
                            color="green"
                        />}
                    <Text> Khoản chi</Text>
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
                <TextInput
                    placeholder="Chọn ví"
                    placeholderTextColor={myColor.textInput}
                    style={styles.textInput}
                />
            </View>
            
        </View >
    );
}


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
        color: myColor.textInput,
    },
    touchable: {
        paddingLeft: 10,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: myColor.greyBorder,
        height: 50,
    },
    checkboxContainer: {
        justifyContent: "space-between",
        flexDirection: 'row',
        paddingHorizontal: 80
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: "center"
    },
    saveHeaderButton: {
        paddingRight: 10
    },
    saveHeaderText: {
        fontSize: 16
    }
});

export default AddCategory;
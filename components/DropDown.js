import {useState, useContext} from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import myIcon from '../assets/icons';
import myColor from '../assets/colors/colors';
import { globalStyles } from '../assets/styles';
import { Button2, ListButton2 } from './Button';

import '../assets/languages/i18n';
import { useTranslation } from 'react-i18next';
import { Context, gt } from '../components/context';


const DropDown = (props) => {

    const context_val = useContext(Context);
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const handleOnPress = (item) => {
        setShow(false),
        props.onSelect(item)
    }
    
    return (
        <View style={globalStyles.subContainer}>
            <TouchableOpacity 
                style={globalStyles.boxIconH}
                onPress={() => {setShow(!show)}}
            >  
                <Button2 text={!!props.with_language ? t(props.value.name) : props.value.name}
                                icon={myIcon.wallet}/>

                <FontAwesome5 
                    style={globalStyles.icon} 
                    name={myIcon.arrowDown} 
                    size={20}/>
            </TouchableOpacity>
            
            {show &&
                <View style={[styles.listItem, { backgroundColor: gt('#FFF', '#222'), borderColor: gt('#ccc', '#444') }]}>
                    <ScrollView>
                        <ListButton2
                            value={props.value}
                            array={props.data}
                            onSelect={handleOnPress}
                            style={styles.item}
                            icon={myIcon.wallet}
                        />
                    </ScrollView>
                </View>
            }    
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#FFF',
        borderColor: myColor.greyBorder,
        borderWidth: 1,
        borderRadius: 10,
        maxHeight: 150,
    },

    item: (color) => ({
        backgroundColor: color,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
    }),
});

export default DropDown
import { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../assets/styles'
import { ListButton3 } from './Button';

const TimePeriod = (props) => {
    const TimeArr = useRef([
        {id: 0, name: 'Day', icon: 'calendar-day'},
        {id: 1, name: 'Month', icon: 'calendar-alt'},
        {id: 2, name: 'Year', icon: 'calendar-check'},
        {id: 3, name: 'All', icon: 'infinity'},
        {id: 4, name: 'Custom', icon: 'pen'},
    ])

    const [checked, setChecked] = useState(props.value);

    const handleOnPress = (idPeriod) => {
        setChecked(idPeriod)
        props.onSelect(idPeriod)
        if(idPeriod === 4){
            props.onModal(true)
        }
    }

    return (
        <View style={globalStyles.centered}>
            <Text style={globalStyles.h2Text}>Time period</Text>
            
            <View style={globalStyles.row}>
                <ListButton3
                    value={checked}
                    array={TimeArr.current}
                    onSelect={handleOnPress}
                    style={styles.button}
                />
            </View>
        </View>
    )
}
 
const styles = StyleSheet.create({
    button: (color) => ({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        height: 45,
        backgroundColor: color,
    }),
});
  
export default TimePeriod
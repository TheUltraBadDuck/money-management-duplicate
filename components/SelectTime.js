import { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { formatDate } from './DatePicker';
import { globalStyles } from '../assets/styles';

const SelectTime = (props) => {
    const [checked, setChecked] = useState(props.data[0]);

    useEffect(() => {
       setChecked(props.data[0])
    }, [props.data])

    useEffect(() => {
        props.onStartDate(checked)

        if(props.format === 'date')
            props.onEndDate(new Date(checked))
        else if(props.format === 'month-year')
            props.onEndDate(new Date(checked.getFullYear(), checked.getMonth() + 1, 0))
        else if(props.format === 'year')
            props.onEndDate(new Date(checked.getFullYear() + 1, 0, 0))
    }, [checked])

    return (
        <ScrollView horizontal>
            {props.data.map((item, index) => {
                return (
                    <Pressable key={index} 
                                style={globalStyles.marginHorizontal(10)}
                                onPress={() => setChecked(item)}
                    >
                        <Text style={checked.getTime() === item.getTime() ? styles.focus : styles.notfocus}>
                            {formatDate(item, props.format)}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    notfocus: {
        opacity: 0.3,
    },

    focus: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default SelectTime
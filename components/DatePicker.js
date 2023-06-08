import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { globalStyles } from '../assets/styles';

export const diffDate = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}

export const getToDay = () =>{
    let toDay = new Date()
    toDay.setHours(0,0,0,0)
    return toDay
}

export const getDatesInRange = (startDate, endDate) => {
    const moveDate = new Date(startDate);
    const dates = [];

    while (moveDate <= endDate) {
        dates.push(new Date(moveDate));
        moveDate.setDate(moveDate.getDate() + 1);
    }

    return dates
}

export const formatDate = (date, format = 'date') => {
    const toDay = getToDay()
    if(format === 'date'){
        if (date.getDate() === toDay.getDate() && date.getMonth() === toDay.getMonth() && date.getFullYear() === toDay.getFullYear())
            return 'Hôm nay'
        if(date.getDate() === toDay.getDate() - 1 && date.getMonth() === toDay.getMonth() && date.getFullYear() === toDay.getFullYear())
            return 'Hôm qua'
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
    }

    if(format === 'day-month')
        return date.getDate() + '/' + (date.getMonth() + 1)

    if(format === 'month-year'){
        if(date.getMonth() === toDay.getMonth() && date.getFullYear() === toDay.getFullYear())
            return 'Tháng này'
        if(date.getMonth() === toDay.getMonth() - 1 && date.getFullYear() === toDay.getFullYear())
            return 'Tháng trước'
        return (date.getMonth() + 1) + '/' + (date.getFullYear())
    }
    
    if(format === 'year'){
        if(date.getFullYear() === toDay.getFullYear())
            return 'Năm này'
        if(date.getFullYear() === toDay.getFullYear() - 1)
            return 'Năm trước'
        return (date.getFullYear())
    }
}

export const DatePicker = (props) => {
    const toDay = getToDay()
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    
    const onChangeDate = (event, selectedDate) => {
        setShow(false)
        props.onSelect(selectedDate)
        setText(formatDate(selectedDate))
    }

    return (
        <View style={[globalStyles.row, globalStyles.marginVertical(5)]}>
            <TouchableOpacity
                style={[globalStyles.button, globalStyles.width('40%'), globalStyles.centered]}
                onPress={() => setShow(true)}
            >       
                <Text style={globalStyles.buttonText}>Select {(props.isStart) ? 'start' : 'end'} date</Text>
            </TouchableOpacity>

            <View style={[globalStyles.box, globalStyles.width('40%'), globalStyles.centered]}>
                <Text>{text}</Text>
            </View>

            {show && (
                <DateTimePicker
                    value={toDay}
                    mode={'date'}
                    display='default'
                    onChange={onChangeDate}
                    minimumDate={props.minDate}
                    maximumDate={toDay}
                />
            )}
        </View>
    );
}

export const BoxDatePicker = (props) => {
    return (
        <View style={[globalStyles.flex(1), globalStyles.centered]}>
            <View style={[globalStyles.boxModal, globalStyles.centered]}>
                <Text style={globalStyles.titleText}>Select time</Text>
                {/* Select start date */}
                <DatePicker isStart={true}
                            onSelect={props.onStartDate}
                            minDate={props.minDate}
                />

                {/* Select end date */}
                <DatePicker isStart={false}
                            onSelect={props.onEndDate}
                            minDate={props.startDate}
                />

                <View style={styles.submitModal}>
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={props.onCancel}
                    >
                        <Text style={globalStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={props.onOK}
                    >
                        <Text style={globalStyles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    submitModal: {
        flexDirection: 'row', 
        alignSelf: 'flex-end',
        marginTop: 5,
    }
})
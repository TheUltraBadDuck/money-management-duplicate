import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = (props) => {
    const textStyle = props.textStyle;
    const defaultDate = props.defaultDate;
    const [date, setDate] = useState(moment(defaultDate));
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        setDate(selectedDate);
    }

    const onAndroidChange = (e, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(moment(selectedDate));
            props.onDateChange(selectedDate);
        }
    }

    const onPressDone = () => {
        props.onDateChange(defaultDate);
        setShow(false);
    }

    const onPressCancel = () => {
        setDate(moment(defaultDate));
        setShow(false);
    }

    const renderDatePicker = () => {
        return (
            <DateTimePicker
                style={{backgroundColor: 'white'}}
                timeZoneOffsetInMinutes={0}
                value={new Date(date)}
                mode='date'
                minimumDate={new Date(moment().subtract(120, 'year').format('YYYY-MM-DD'))}
                maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                onChange={Platform.OS == 'ios' ? onChange : onAndroidChange}
            />
        )
    }

    return (
        <View
            style={props.container}>
            <View
                style={date.DatePickerStyle}>
                <TouchableOpacity
                    onPress={() => setShow(true)}
                >
                    <View>
                        <Text style={textStyle}>{date.format('DD/MM/YYYY')}</Text>
                        {Platform.OS !== 'ios' && show && renderDatePicker()}

                        {/* {Platform.OS === 'ios' && (
                    <Modal
                        transparent={true}
                        animationType={'slide'}
                        visible={show}
                        supportedOrientations={['portrait']}
                        onRequestClose={() => setShow(false)}
                    >
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight
                                style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    flexDirection: 'row'
                                }}
                                activeOpacity={1}
                                visible={show}
                                onPress={() => setShow(false)}
                            >
                                <TouchableHighlight
                                    underlayColor={'#FFFFFF'}
                                    style={{
                                        flex: 1,
                                        borderColor: '#E9E9E9',
                                        borderTopWidth: 1,
                                    }}
                                    onPress={() => console.log('datepicker clicked')}
                                >
                                    <View style={{ margintop: 20 }}>
                                        <renderDatePicker></renderDatePicker>
                                    </View>

                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onPressCancel}
                                        style={[styles.btnText, styles.btnCacel]}
                                    >
                                        <Text>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onPressDone}
                                        style={[styles.btnText, styles.btnDone]}
                                    >
                                        <Text>Done</Text>
                                    </TouchableHighlight>

                                </TouchableHighlight>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                )
                } */}
                    </View>
                </TouchableOpacity >
            </View>
        </View>
    )
}

export default CustomDatePicker;
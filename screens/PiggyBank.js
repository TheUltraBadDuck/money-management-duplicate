import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import DailyLabel from '../components/DateLabel';

const PiggyBankScreen = () => {
    function GetAllWeek(timeline) {
        let dateNum = timeline.getDay();
        dateNum = (dateNum == 0 ? 7 : dateNum);
        let res = [];
        for (let i = 1; i < 8; i++) {
            if (i == dateNum) {
                let tmp = new Date();
                tmp.setDate(timeline.getDate())
                res.push(tmp);
            }
            else if (i < dateNum) {
                let tmp = new Date();
                tmp.setDate(timeline.getDate() - dateNum + i);
                res.push(tmp);
            }
            else {
                let tmp = new Date();
                tmp.setDate(timeline.getDate() + i - dateNum)
                res.push(tmp);
            }
        }
        return res;
    }

    let today = new Date();
    let allWeek = GetAllWeek(today);
    // This information should save to mobile storage so
    // we should get storaged data in this step (gonna do in later)
    const [isFed, setIsFed] = useState({
        mon: { date: allWeek[0], feed: 'yet' },
        tue: { date: allWeek[1], feed: 'yet' },
        wed: { date: allWeek[2], feed: 'yet' },
        thu: { date: allWeek[3], feed: 'yet' },
        fri: { date: allWeek[4], feed: 'yet' },
        sat: { date: allWeek[5], feed: 'yet' },
        sun: { date: allWeek[6], feed: 'yet' },
        lastStreak: null
    });

    // useEffect(() => {
    //     let today = new Date();
    //     // if (isFed == null) {
    //     allWeek = GetAllWeek(today);
    //     setIsFed(prev => ({
    //         mon: { date: allWeek[0], feed: 'yet' },
    //         tue: { date: allWeek[1], feed: 'yet' },
    //         wed: { date: allWeek[2], feed: 'yet' },
    //         thu: { date: allWeek[3], feed: 'yet' },
    //         fri: { date: allWeek[4], feed: 'yet' },
    //         sat: { date: allWeek[5], feed: 'yet' },
    //         sun: { date: allWeek[6], feed: 'yet' },
    //         lastStreak: null
    //     }))
    //     // }
    //     // else {

    //     // }
    // }, [])


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.piggyInfoWrapper}>
                    <View style={styles.piggyNameWrapper}>
                        <Icon.MaterialCommunityIcons
                            style={{ marginLeft: 20 }}
                            name='piggy-bank-outline'
                            size={25}
                        />
                        <Text style={styles.generalText}>Heo Ngày</Text>
                    </View>

                    <View style={styles.piggyMoneyWrapper}>
                        <Text style={styles.generalText}>+50.000</Text>
                        <Icon.MaterialIcons
                            style={{ marginRight: 20 }}
                            name='attach-money'
                            size={25}
                        />
                    </View>
                </View>

                <View style={styles.streakWrapper}>
                    <DailyLabel
                        day='monday'
                        state={isFed.mon.feed} />
                    <DailyLabel
                        day='tuesday'
                        state={isFed.tue.feed} />
                    <DailyLabel
                        day='wednesday'
                        state={isFed.wed.feed} />
                    <DailyLabel
                        day='thursday'
                        state={isFed.thu.feed} />
                    <DailyLabel
                        day='friday'
                        state={isFed.fri.feed} />
                    <DailyLabel
                        day='saturday'
                        state={isFed.sat.feed} />
                    <DailyLabel
                        day='sunday'
                        state={isFed.sun.feed} />
                </View>

                <Image
                    source={require('../assets/images/piggybank_crop.png')}
                    style={styles.piggyImage}
                />

                <TouchableOpacity style={styles.generalButton}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Cho heo ăn</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.generalButton}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Chi tiết heo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.generalButton}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Đập heo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        marginBottom: 110,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 5
    },
    piggyInfoWrapper: {
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },
    piggyNameWrapper: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    generalText: {
        fontSize: 20,
        fontWeight: '600'
    },
    piggyMoneyWrapper: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    streakWrapper: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    piggyImage: {
        width: 309,
        height: 300,
        marginTop: 15
    },
    generalButton: {
        width: 280,
        height: 69,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8DDFF1',
        borderRadius: 20
    }
})

export default PiggyBankScreen;
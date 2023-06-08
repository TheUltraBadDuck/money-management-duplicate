/* 
This file define Date Label component (use in piggy bank screen)
*/


import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import FeedStateColor from '../assets/colors/FeedStateColor';

const DailyLabel = (props) => {
    let day;
    switch (props.day) {
        case 'monday':
            day = 'M';
            break;
        case 'wednesday':
            day = 'W';
            break;
        case 'friday':
            day = 'F';
            break;
        case 'saturday':
        case 'sunday':
            day = 'S';
            break;
        default:
            day = 'T';
    }

    const [isFed, setIsFed] = useState('yet');
    const [labelCl, setLabelCl] = useState(FeedStateColor[isFed])

    useEffect(() => {
        setIsFed(props.state)
        setLabelCl(FeedStateColor[isFed])
    })

    return (
        <View 
        style={{ 
            width: 35, 
            height: 35, 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: 30, 
            backgroundColor: labelCl }}
        >
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{day}</Text>
        </View>
    )
}

// const CircleStreak = () => {
//     function GetAllWeek(timeline) {
//         let dateNum = timeline.getDay();
//         dateNum = (dateNum == 0 ? 7 : dateNum);
//         let res = [];
//         for (let i = 1; i < 8; i++) {
//             if (i == dateNum) {
//                 let tmp = new Date();
//                 tmp.setDate(timeline.getDate())
//                 res.push(tmp);
//             }
//             else if (i < dateNum) {
//                 let tmp = new Date();
//                 tmp.setDate(timeline.getDate() - dateNum + i);
//                 res.push(tmp);
//             }
//             else {
//                 let tmp = new Date();
//                 tmp.setDate(timeline.getDate() + i - dateNum)
//                 res.push(tmp);
//             }
//         }
//         return res;
//     }

//     let today = new Date();
//     allWeek = GetAllWeek(today);

//     // This information should save to mobile storage so we should get storaged data in this step (do in later)
//     const [isFed, setIsFed] = useState({
//         mon: { date: allWeek[0], feed: 'yet' },
//         tue: { date: allWeek[1], feed: 'yet' },
//         wed: { date: allWeek[2], feed: 'yet' },
//         thu: { date: allWeek[3], feed: 'yet' },
//         fri: { date: allWeek[4], feed: 'yet' },
//         sat: { date: allWeek[5], feed: 'yet' },
//         sun: { date: allWeek[6], feed: 'yet' },
//         lastStreak: null
//     });


//     // useEffect(() => {
//     //     let today = new Date();
//     //     // if (isFed == null) {
//     //     allWeek = GetAllWeek(today);
//     //     setIsFed(prev => ({
//     //         mon: { date: allWeek[0], feed: 'yet' },
//     //         tue: { date: allWeek[1], feed: 'yet' },
//     //         wed: { date: allWeek[2], feed: 'yet' },
//     //         thu: { date: allWeek[3], feed: 'yet' },
//     //         fri: { date: allWeek[4], feed: 'yet' },
//     //         sat: { date: allWeek[5], feed: 'yet' },
//     //         sun: { date: allWeek[6], feed: 'yet' },
//     //         lastStreak: null
//     //     }))
//     //     // }
//     //     // else {

//     //     // }
//     // }, [])



//     return (
//         <View>
//             <View style={{width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
//                 <DailyLabel
//                     day='monday'
//                     state={isFed.mon.feed} />
//                 <DailyLabel
//                     day='tuesday'
//                     state={isFed.tue.feed} />
//                 <DailyLabel
//                     day='wednesday'
//                     state={isFed.wed.feed} />
//                 <DailyLabel
//                     day='thursday'
//                     state={isFed.thu.feed} />
//                 <DailyLabel
//                     day='friday'
//                     state={isFed.fri.feed} />
//                 <DailyLabel
//                     day='saturday'
//                     state={isFed.sat.feed} />
//                 <DailyLabel
//                     day='sunday'
//                     state={isFed.sun.feed} />
//             </View>

//             <Image
//                 source={require('../assets/Image/piggybank.png')}
//                 style={{width: 309, height: 320, marginTop: 15}}
//             />

//             <Button
//                 title='Feed piggy!'
//                 onPress={() => setIsFed(prev => ({
//                     ...prev,
//                     mon: { ...prev.mon, feed: 'done' }
//                 }))} />
//         </View>
//     )
// }

// export default CircleStreak;

export default DailyLabel;
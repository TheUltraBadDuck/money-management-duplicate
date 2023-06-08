import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { globalStyles } from '../assets/styles'
import { formatDate, diffDate } from './DatePicker'
import {ref, onValue, getDatabase } from "firebase/database";
import React from 'react'

export const getLabelBarChart = (startDate, endDate) => {
    if(startDate.getTime() === endDate.getTime())
        return [formatDate(startDate, 'date')]

    let distance = diffDate(startDate, endDate)
    if(distance === 364 || distance === 365)
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let jump = Math.floor(distance/5)
    if(jump < 3) 
        return [formatDate(startDate,'day-month') + '-' + formatDate(endDate, 'day-month')]

    let labels = []
    let first = new Date(startDate)
    let last = new Date(first.getFullYear(), first.getMonth(), first.getDate() + jump)
    labels.push(formatDate(first, 'day-month') + '-' + formatDate(last, 'day-month'))

    while(last.getTime() < endDate.getTime()){
        first.setFullYear(last.getFullYear())
        first.setDate(last.getDate() + 1)
        first.setMonth(last.getMonth())

        last.setDate(first.getDate() + jump)

        if(last.getTime() < endDate.getTime())
            labels.push(formatDate(first, 'day-month') + '-' + formatDate(last, 'day-month'))
        else
            labels.push(formatDate(first, 'day-month') + '-' + formatDate(endDate, 'day-month'))

    }
    return labels
}

export const chartConfig  = {
    backgroundGradientFrom: myColor.main,
    backgroundGradientTo: "#FFF",
    color: () => "#000",
    propsForBackgroundLines: {
        strokeDasharray: "", // solid background lines with no dashes
        stroke:"#000",
        strokeWidth:"0.5",
        x: "60",    
    },
    propsForHorizontalLabels: {
        translateX: 10,
    },
};

export const PieC = (props) => {
    const [filterData, setFilterData] = React.useState([])

    const db = getDatabase();
    const starCountRef = ref(db, 'categories/');

    React.useEffect(() => {
        const categories = [];
        onValue(starCountRef, (snapshot) => {
            const obj = snapshot.val();
            for (const prop in obj) {
                categories.push(obj[prop])
            }
        });
        setFilterData(categories)
    }, [])
    
    return (
        <View style={[globalStyles.subContainer, styles.container, props.left ? {borderRightWidth: 1} : {borderRightWidth: 0}]}>
            <Text style={[globalStyles.h2Text, globalStyles.lightText]}>{props.title}</Text>
            <Text style={[globalStyles.h3Text, globalStyles.boldText]}>{props.money}</Text>
            
            <View style={[globalStyles.row, globalStyles.centered]}>
                <PieChart
                    data={props.data}
                    width={100}
                    height={100}
                    chartConfig={props.chartConfig}
                    accessor={props.accessor}
                    backgroundColor={"transparent"}
                    center={[0, 0]}
                    paddingLeft={20}
                    avoidFalseZero={true}
                    hasLegend={false}
                    absolute
                />

                <View>
                    {props.data.map((item, index) => {
                        return(
                            <View
                                key={index}
                                style={[globalStyles.boxIconH, {maxWidth: 50}]}
                            >
                                <View style={[styles.symbolLegend, {backgroundColor: item.color}]}/>
                                <Text style={globalStyles.iconText}>{filterData.find(x => x.id === item.name).title}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export const BarC = (props) => {
    return (
        <View style={globalStyles.subContainer}>
            <View style={globalStyles.inlineText}>
                <Text style={globalStyles.paragraph}>Opening balance: {props.openBalance}</Text>
                <Text style={globalStyles.paragraph}>Ending balance: {props.endBalance}</Text>
            </View>

            <Text style={globalStyles.paragraph}>Net Income: {props.netIncome}</Text>
            <BarChart
                data={props.data}
                showBarTops={false}
                fromZero={true}
                width={Dimensions.get("window").width - 20}
                verticalLabelRotation={props.labelRotation}
                height={180}
                yAxisLabel="$"
                // yAxisSuffix="k"
                chartConfig={props.chartConfig}
                style={globalStyles.box}
                flatColor={true}
                withCustomBarColorFromData={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },

    symbolLegend:{
        padding: 5, 
        marginHorizontal: 3,
    },
})
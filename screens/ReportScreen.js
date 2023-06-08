import { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { globalStyles } from '../assets/styles';
import { WalletContext } from '../components/context';
import DropDown from '../components/DropDown';
import TimePeriod from '../components/TimePeriod';
import SelectTime from '../components/SelectTime';
import * as myChart from '../components/Charts';
import {BarC, PieC} from '../components/Charts';

import { formatDate, BoxDatePicker, getToDay } from '../components/DatePicker';
import { set, ref, onValue, getDatabase } from "firebase/database";
import firebaseApp from '../firebase';
import Loading from '../components/Loading';
import myColor from '../assets/colors/colors';
import * as analysis from '../components/Analysis';

// Bugs: khi load lại firebase không cập nhật lại
const ReportScreen = () => {
    const dateList = useRef([])
    const toDay = getToDay()

    // Chọn ví tiền
    const wallets = useContext(WalletContext)
    const BasicWalletList = wallets.basic;
    const [wallet, setWallet] = useState(BasicWalletList[0])

    // Chọn khoảng thời gian
    const [period, setPeriod] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

    // Chọn thời gian (without time)
    const [typeTime, setTypeTime] = useState('date')
    const [startDate, setStartDate] = useState(new Date(toDay))
    const [endDate, setEndDate] = useState(new Date(toDay))

    // Bar Chart
    const [label, setLabel] = useState([])
    const [config, setConfig] = useState({rotateLabel: 0, widthBar: 1, transLateX: 0})
    const [data, setData] = useState([])
    const [color, setColor] = useState([])
    // info bar chart
    const [openBalance, setOpenBalance] = useState(0)
    const [endBalance, setEndBalance] = useState(0)

    // Pie Chart
    const [dataIncome, setDataIncome] = useState([])
    const [dataExpense, setDataExpense] = useState([])
    // info pie chart
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)

    const dataBarChart = {
        labels: label,
        datasets: [
            {
                data: data,
                colors: color,
            }
        ],
    };

    const chartConfig = {
        ...myChart.chartConfig,
        barPercentage: config.widthBar,
        propsForVerticalLabels: {
            translateX: config.transLateX
        }
    }

    // useEffect(() => {
    //     console.log(BasicWalletList)
    // }, [wallet])

    // Handle change period to select time
    useEffect (() => { 
        let typeTime = ''
        switch(period){
            case 0:
                handleShowDate()
                typeTime = 'date'
                break;
            case 1:
                handleShowMonth()  
                typeTime = 'month-year'
                break;
            case 2:
                handleShowYear()  
                typeTime = 'year'
                break;
            case 3:
                setStartDate(new Date(wallet.startDate))
                setEndDate(new Date(toDay))
                typeTime = 'start-end'
                break;
            case 4:
                typeTime = 'start-end'
                break;
            default:
                return;
        }

        setTypeTime(typeTime)
    }, [period])

    // Handle label and config of bar chart
    useEffect(() => {
        const labels = myChart.getLabelBarChart(startDate, endDate)
        setLabel(labels)

        switch(labels.length){
            case 1:
                setConfig({rotateLabel: 0, widthBar: 1, transLateX: 0})
                break;
            case 5:
                setConfig({rotateLabel: -15, widthBar: 1, transLateX: -30})
                break;
            case 12:
                setConfig({rotateLabel: -50, widthBar: 0.5, transLateX: -8})
                break;
        }
    }, [startDate, endDate])

    // Handle data in charts
    useEffect(() => {
        if(!wallet.transactions){
            alert("This wallet has not any transactions to report.")
            return
        }
        const startDateWallet = new Date(wallet.startDate)
        // Set info bar chart
        setOpenBalance(analysis.getTotalInRange(wallet, startDateWallet, startDate))
        setEndBalance(analysis.getTotalInRange(wallet, startDateWallet, endDate))

        // Set info pie chart
        const ei = analysis.getIncomeAndExpenseInRange(wallet, startDate, endDate)
        setIncome(ei.income)
        setExpense(ei.expense)

        // Set data bar chart
        const datas = analysis.getDataByRange(wallet, startDate, endDate)
        setData(datas)
        maskColor(datas)

        // Set data pie chart
        const result = analysis.getDataOfPieChartByRange(wallet, startDate, endDate)
        if(!result){
            setDataIncome([])
            setDataExpense([])
        }
        else{
            setDataIncome(result.filter(x => x.name[0] === 'i').slice(0, 5))
            setDataExpense(result.filter(x => x.name[0] === 'e').slice(0, 5))
        }
    }, [startDate, endDate, wallet])

    const maskColor = (total) => {
        let colors = []
        total.map((item) => {
            (item > 0)
            ? colors.push(() => myColor.barChartIncome)                 
            : colors.push(() => myColor.barChartExpense)
        })             
        setColor(colors)    
    }
    
    const handleShowDate = () => {
        dateList.current = []
        for(let i = 0; i < 20; i++) {
            let prevDate = new Date(toDay)
            dateList.current.push(prevDate)
            prevDate.setDate(toDay.getDate() - i)
        }
    }

    const handleShowMonth = () => {
        dateList.current = []
        let curDate = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
        for(let i = 0; i < 20; i++) {
            let prevDate = new Date(toDay.getFullYear(), toDay.getMonth(), 1)
            dateList.current.push(prevDate)
            prevDate.setMonth(curDate.getMonth() - i)
        }
    }

    const handleShowYear = () => {
        dateList.current = []
        let curDate = new Date(toDay.getFullYear(), 0, 1);
        for(let i = 0; i < 10; i++) {
            let prevDate = new Date(toDay.getFullYear(), 0, 1)
            dateList.current.push(prevDate)
            prevDate.setFullYear(curDate.getFullYear() - i)
        }
    }
    
    const handleOKModal = () => {
        if(startDate.getTime() >= endDate.getTime()){
            alert('Valid date')
        }
        else{
            setModalVisible(!modalVisible)
        }
    }

    if(wallets.isLoading || dateList.current.length === 0){
        return(
            <Loading/>
        )
    }

    return (    
        <View style={[globalStyles.container(), modalVisible ? styles.blur : null]}>
            {/* Select wallet part */}
            <View style={[styles.part(0), globalStyles.row, globalStyles.zIndex(1)]}>
                <View style={styles.leftPartTop}>
                    <DropDown
                        value={wallet}
                        data={BasicWalletList}
                        onSelect={setWallet}/>
                </View>

                <View style={[styles.rightPartTop, globalStyles.centered]}>
                    <Text style={[globalStyles.h2Text, globalStyles.lightText]}>
                        Total balance
                    </Text>
                    <Text style={[globalStyles.h2Text, globalStyles.boldText]}>
                        ${wallet.balance}
                    </Text>
                </View>
            </View>

            {/* Select time period and time part */}
            <View style={styles.part(60)}>
                <TimePeriod    
                    value={period} 
                    onSelect={setPeriod}
                    onModal={setModalVisible}
                /> 

                <View style={globalStyles.marginVertical(10)}>
                    { typeTime === 'start-end' ?
                        <View style={globalStyles.inlineText}>
                            <Text style={globalStyles.paragraph}>Start date: {formatDate(startDate)}</Text>
                            <Text style={globalStyles.paragraph}>End date: {formatDate(endDate)}</Text>
                        </View>
                        :
                        <SelectTime data= {dateList.current} 
                                        format= {typeTime} 
                                        onStartDate= {setStartDate} 
                                        onEndDate= {setEndDate}/>
                    }
                </View>
            </View>

            {/* Modal for custom period */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <BoxDatePicker
                    minDate = {new Date(wallet.startDate)}
                    startDate = {startDate}
                    onStartDate = {setStartDate}
                    onEndDate = {setEndDate}
                    onCancel = {() => setModalVisible(!modalVisible)}
                    onOK = {handleOKModal}
                />
            </Modal>
            
            {/* Information part */}
            <View style={styles.part(190)}>   
                {/* Bar chart and information*/}
                <BarC
                    openBalance={openBalance}
                    endBalance={endBalance}
                    netIncome={endBalance - openBalance}
                    chartConfig={chartConfig}
                    data={dataBarChart}
                    labelRotation={config.rotateLabel}
                />

                {/* Pie charts */}
                <View style={[globalStyles.row, globalStyles.box, globalStyles.marginVertical(20)]}>   
                    <PieC 
                        title='Expense'
                        money={'$' + expense}
                        accessor='amount'
                        chartConfig={chartConfig}
                        data={dataExpense}
                        left={true}
                    />         

                    <PieC 
                        title='Income'
                        money={'$' + income}
                        accessor='amount'
                        chartConfig={chartConfig}
                        data={dataIncome}
                    />        
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    blur: {
        opacity: 0.5
    },
    
    part: (top) => ({
        top: top,
        position:'absolute',
        width: '100%',
    }),

    leftPartTop: {
        flex: 1,
        paddingTop: 20,
    },

    rightPartTop: {
        flex: 1,
        borderLeftWidth: 2,
        height: 60,
    },
});
  
export default ReportScreen
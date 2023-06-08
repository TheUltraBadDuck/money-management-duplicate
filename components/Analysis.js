import { add } from "react-native-reanimated";
import { getDatesInRange, diffDate } from "./DatePicker"
function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}
const groupBy = (list, property) => {
    return list.reduce((groups, item) => {
        const group = (groups[item[property]] || []);
        group.push(item);
        groups[item[property]] = group;
        return groups;
    }, {});
} 

const getDataByYear = (wallet, startDate) => {
    let totals = []
    let first = new Date(startDate)
    let last = new Date(first.getFullYear(), first.getMonth() + 1, 0)
    for(let i = 0; i < 12; i++){
        totals.push(getTotalInRange(wallet, first, last))
        first.setMonth(first.getMonth() + 1)

        last.setDate(1)
        last.setMonth(first.getMonth() + 1)
        last.setDate(0)
    }
    return totals
}

export const getTotalInDate = (wallet, day) => {
    let result = getIncomeAndExpenseInDate(wallet, day)
    const total = result.income - result.expense
    return total
}

export const getTotalInRange = (wallet, first, last) => {
    let total = 0
    const dates = getDatesInRange(first, last)
    dates.map((iDate) => {
        total += getTotalInDate(wallet, iDate)
    })
    return total
}

export const getDataByRange = (wallet, startDate, endDate) => {
    if(startDate.getTime() === endDate.getTime())
        return [getTotalInDate(wallet, startDate)]

    let distance = diffDate(startDate, endDate)
    if(distance === 364 || distance === 365)
        return getDataByYear(wallet, startDate)

    let jump = Math.floor(distance/5)
    if(jump < 3) 
        return [getTotalInRange(wallet, startDate, endDate)]

    let totals = []
    let first = new Date(startDate)
    let last = new Date(first.getFullYear(), first.getMonth(), first.getDate() + jump)
    totals.push(getTotalInRange(wallet, first, last))

    while(last.getTime() < endDate.getTime()) {
        first.setFullYear(last.getFullYear())
        first.setDate(last.getDate() + 1)
        first.setMonth(last.getMonth())

        last.setDate(first.getDate() + jump)

        if(last.getTime() < endDate.getTime())
            totals.push(getTotalInRange(wallet, first, last))
        else
            totals.push(getTotalInRange(wallet, first, endDate))
    }
    return totals
}

export const getIncomeAndExpenseInDate = (wallet, day) => {
    let result = {
        income: 0,
        expense: 0
    }
    Object.values(wallet.transactions).map((item) => {
        let itemDate = new Date(item.date)
        if(itemDate.getTime() === day.getTime()){
            if(item.category[0] === 'i')
                result.income += item.amount
            else
                result.expense += item.amount
        }    
    })
    return result
}

export const getIncomeAndExpenseInRange= (wallet, first, last) => {
    let result = {
        income: 0,
        expense: 0
    }

    const dates = getDatesInRange(first, last)
    dates.map((iDate) => {
        let temp = getIncomeAndExpenseInDate(wallet, iDate)
        result.income += temp.income
        result.expense += temp.expense
    })
    return result
}

export const getDetailsInDate = (wallet, day) => {
    let result = []

    const transfer = groupBy(Object.values(wallet.transactions), 'date')

    if(!transfer[day.toString()])
        return

    const category = groupBy(Object.values(transfer[day.toString()]), 'category')
    let countIn = 0
    let countOut = 0

    Object.values(category).map((itemCategory) => {
        let totalAmount = 0
        let category = ''

        itemCategory.map((item) => {
            totalAmount += item.amount
            category = item.category
        })
        
        if(category[0] === 'i'){
            countIn++
            result.push({name: category, amount: totalAmount, color: addAlpha(myColor.main, 1/countIn)})
        }
        else{
            countOut++
            result.push({name: category, amount: totalAmount, color: addAlpha(myColor.main, 1/countOut)})
        }
    })
    return result
}

export const getDataOfPieChartByRange = (wallet, first, last) => {
    let tempResult = []
    const dates = getDatesInRange(first, last)
    dates.map((iDate) => {
        Array.prototype.push.apply(tempResult,getDetailsInDate(wallet, iDate)); 
    })

    const category = groupBy(tempResult, 'name')
    let result = []
    let countIn = 0
    let countOut = 0
    Object.values(category).map((itemCategory) => {
        let totalAmount = 0
        let category = ''

        itemCategory.map((item) => {
            totalAmount += item.amount
            category = item.name
        })
        
        if(category[0] === 'i'){
            countIn++
            result.push({name: category, amount: totalAmount, color: addAlpha(myColor.main, 1/countIn)})
        }
        else{
            countOut++
            result.push({name: category, amount: totalAmount, color: addAlpha(myColor.main, 1/countOut)})
        }
    })
    return result
}
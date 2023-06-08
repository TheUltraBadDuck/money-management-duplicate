import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

var AchievementArr = [
    {id: 0, name: 'Title A', icon: 'star', goal: 'you saved enough money in the allotted time'},
    {id: 1, name: 'Title B', icon: 'medal', goal: 'you used continuously for 1 month'},
    {id: 2, name: 'Title C', icon: 'check', goal: 'you saved enough money in the allotted time'},
    {id: 3, name: 'Title D', icon: 'laugh-squint', goal: 'you are a new member of a fund'},
    {id: 4, name: 'Title E', icon: 'home', goal: 'you finished the first piggy bank'},
    {id: 5, name: 'Title F', icon: 'smile', goal: 'you finished the second piggy bank'},
];


const AchievementScreen = ({route}) => {    
    
    return (
        <View style={styles.container}>
            <View style = {styles.top}>
                <FontAwesome5 name={AchievementArr[route.params.index].icon} size={90}/>
                <Text style = {{fontSize: 25, paddingTop: 10}}>{AchievementArr[route.params.index].name}</Text>
            </View>
            
            <View style = {styles.bottom}>
                <Text style = {{fontWeight: "700", fontSize: 25, paddingTop: 70, paddingLeft: 30}}> Congratulation! </Text>
                <Text style = {{fontSize: 18, paddingLeft: 30, paddingTop: 15}}> You have received {AchievementArr[route.params.index].name}</Text>
                <Text style = {{fontSize: 18, paddingLeft: 30}} >Because {AchievementArr[route.params.index].goal}. </Text>
                <Text style = {{fontSize: 17, fontWeight: "700",  paddingLeft: 30, paddingTop: 50}}>Let's try to achieve the next achievements!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    top:{
        flex: 1,
        backgroundColor: '#0060DD',
        alignItems: 'center',
        justifyContent: 'center',

    }, 
    bottom:{
        flex: 2,
        backgroundColor: "#FFF",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
});

export default AchievementScreen
export {AchievementArr}


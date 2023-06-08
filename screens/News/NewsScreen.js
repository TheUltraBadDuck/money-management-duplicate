import { SafeAreaView, StyleSheet, Text, View, SectionList, ScrollView  } from 'react-native';
import * as React from 'react';
import {  Image, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';

const topnews = require('../../datas/TodayNews.json');

// web = "https://log.vneconomy.vn/analytics.js?v=2.1"
// fetch(web).then((response) => response.json()).then((data) => '../TodayNews.json')



const NewsScreen = ({navigation}) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Searchbar style = {styles.search}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <View style = {{flexDirection: 'column', left: 20}}>
                        <Text style = {styles.today}>
                            Today
                        </Text>
                        <Text style = {styles.whatnews}>
                            What's new?
                        </Text>
                    </View>
                </View>
                    
                <SectionList horizontal = {true}
                    sections = { topnews }
                    renderItem = { ({ item }) =>
                        (<TouchableOpacity onPress={() => navigation.navigate('NewsDetail')}>
                            <View style = {styles.frame_todaynews}>
                                <Image style = {styles.picOfToday}                        
                                    source = {{uri: item.image}}
                                />
                                <Text style = {styles.styleType}>
                                    | {item.type}
                                </Text>
                                <Text style = {styles.styleContent}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>)}
                />
                
                <View style = {styles.topnews}>
                    <Text style = {styles.textTopNews}>
                        Top news
                    </Text>
                    {topnews[0].data.map((item) => {
                        return(
                            <View key={item.id} style = {{top: 5, flexDirection: 'column'}}>
                                <View style = {{marginTop: 5}}>
                                    <Text style = {styles.timeofTopnews}> {item['date']}</Text>
                                    <TouchableOpacity 
                                    onPress={() => navigation.navigate('NewsDetail')} 
                                    >
                                        <View style = {{flexDirection: 'row'}}>
                        
                                            <Image source = {{uri: item.image}}
                                            style = {styles.picOfTopnews}
                                            />

                                            <View style = {styles.frame_content_topnews}>
                                                <Text style = {styles.topnews_Title}>{item['title']}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                    )})}
                </View>
            </ScrollView>            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1
    },
    search:{
        borderRadius: 40,
        width: '90%',
        left: 20
    },
    today: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 5,
    },
    whatnews: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    frame_todaynews: {
        backgroundColor: '#DEE6F1',
        borderRadius: 20,
        height: 250,
        maxWidth:180,
        left: 10,
        marginHorizontal: 10,
    }, 
    styleType: {
        color: 'red',
        left: 10,
        top: 10
    },
    styleContent:{
        top: 20,
        marginHorizontal: 5,
        fontSize: 13
    },
    picOfToday: {
        height: '50%',
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    topnews: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 20,
        left: 10,
        width: '95%',
        flexDirection: 'column',
        marginBottom: 100
    },
    textTopNews: {
        fontWeight: "500",
        fontSize: 27,
        left: 20,
    },
    timeofTopnews: {
        fontSize: 13,
        fontWeight: "300",
        left: 10,
    },
    picOfTopnews: {
        height: 70, 
        maxWidth: 140, 
        left: 10,
        flex: 1,
    },
    frame_content_topnews: {
        left: 15,
        maxWidth: 235,
        flexDirection: 'column',
        flex: 2,
    },
    topnews_Title: {
        fontWeight: "500", 
        fontSize: 13,
    }
});

export default NewsScreen
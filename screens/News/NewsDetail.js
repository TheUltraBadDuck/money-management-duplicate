import { StyleSheet, Text, View, SectionList  } from 'react-native';
import * as React from 'react';
import {  Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




const news = require('../../datas/TodayNews.json');

const NewsDetail = ({route}) => {

    return (
        <SafeAreaView style={styles.container}>
                    <SectionList vertical = {true}
                        sections = { news }
                        renderItem = { ({item}) =>
                        (
                            <View style = {{paddingRight: 20}}>
                                
                                <Image style = {{height: 250, width: 500}}                        
                                                source = {{uri:item.image}}
                                />
                                <Text style = {{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>{item['title']}</Text>

                                <View style = {{top: 10, flexDirection: 'row'}}>
                                    <Text style = {{left: 5, fontSize: 18}}> {item['date']}</Text>
                                    <Text style = {{color: 'red', left: 40, fontSize: 18}}>|{item['type']}</Text>
                                </View>

                            <Text style = {{top: 40, fontSize: 16, paddingBottom: 90}} >{item['content']}</Text>
                                
                            </View>
                        )
                        }
                    />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
        flex: 1,
        left: 5
    },

});

export default NewsDetail
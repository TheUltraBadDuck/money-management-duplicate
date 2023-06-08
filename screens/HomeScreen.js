import { StyleSheet, Text, View, TouchableOpacity, SectionList, Image, ScrollView } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { Searchbar, Avatar, IconButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { AchievementArr } from './AchievementScreen';
import { Button1 } from '../components/Button';
import { NavAchievementBar, NavWalletBar } from '../navigators/NavTabBar';
import { Context, WalletContext } from '../components/context';
import { globalStyles } from '../assets/styles'
import myColor from '../assets/colors/colors'
import BlankRect from '../components/BlankRect';

import '../assets/languages/i18n';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';


const news = require('../datas/TodayNews.json');

const HomeScreen = ({ navigation }) => {
    const _wallet = useContext(WalletContext);
    const wallet_context= useContext(Context)
    
    // useEffect(() => {
    //     wallet_context.walletTest.forEach(e => console.log(e))
    // },[wallet_context.walletTest])

    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (query) => {
        setSearchQuery(query);
    }

    const { t } = useTranslation();

    if(_wallet.isLoading){
        return (
            <Loading/>
        )
    }
    return (
        <ScrollView style={globalStyles.container(myColor.main)}>
            {/* Top */}
            <View style={globalStyles.subContainer}>
                {/* Search bar */}
                <Searchbar
                    style={styles.search}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                {/* Information and notify */}
                <View style={globalStyles.row}>
                    <Avatar.Image
                        style={globalStyles.marginHorizontal(20)}
                        size={70}
                        source={require('../assets/images/avt/avt.png')}
                    />

                    <View style={[globalStyles.flex(2)]}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Text style={[globalStyles.titleText, globalStyles.colorText('#FFF')]}>Username</Text>
                            <View style={globalStyles.inlineText}>
                                <Text style={globalStyles.colorText('#FFF')}>Vip member</Text>
                                <Icon
                                    style={{ margin: 3 }}
                                    name="crown"
                                    type="font-awesome-5"
                                    size={15}
                                    color='yellow' />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <IconButton icon="bell-ring-outline"
                        size={30}
                        onPress={() => { }}
                        color='#FFF' />
                </View>

                {/* Total balance */}
                <View style={[globalStyles.marginVertical(10), globalStyles.centered]}>
                    <Text style={[globalStyles.h1Text, globalStyles.colorText('#FFF'), globalStyles.lightText]}>Total balance </Text>
                    <Text style={[globalStyles.h1Text, globalStyles.colorText('#FFF'), globalStyles.boldText]}>$10.000</Text>
                </View>
            </View>

            {/* Bottom */}
            <View style={[styles.bottom, { height: 640 }]}>
                {/* Transaction wallets */}
                <View style={globalStyles.flex(1)}>
                    <Text style={[globalStyles.h2Text, globalStyles.left(20)]}>Transaction wallets</Text>
                    <View style={styles.bar}>  
                        <TouchableOpacity onPress = {() => navigation.navigate('AddWallet')}>
                            <Button1 text='Add' 
                                    icon='plus'
                            />
                        </TouchableOpacity>
                        
                        <NavWalletBar
                            data = {_wallet}
                            navigation = {navigation}  
                        />
                    </View>
                </View>

                {/* Personal achievement */}
                <View style={globalStyles.flex(1)}>
                    <Text style={[globalStyles.h2Text, globalStyles.left(20)]}>Personal achievement</Text>
                    <View style={styles.bar}>
                        <NavAchievementBar
                            data={AchievementArr}
                            navigation={navigation}
                        />
                    </View>
                </View>

                {/* News */}
                <View style={globalStyles.flex(2)}>
                    <Text style={[globalStyles.h2Text, globalStyles.left(20)]}>News</Text>
                    <SectionList horizontal={true}
                        sections={news}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => navigation.navigate('News')} >
                                <Image style={[globalStyles.marginHorizontal(10), styles.image]}
                                    source={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <BlankRect />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    search: {
        marginVertical: 10,
        height: 50,
        borderRadius: 40,
        width: '90%',
    },

    bottom: {
        backgroundColor: "#FFF",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },

    bar: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: myColor.greyBorder,
        height: 80,
        borderRadius: 20,
    },

    image: {
        borderRadius: 20,
        height: 200,
        width: 300,
    }
})

export default HomeScreen
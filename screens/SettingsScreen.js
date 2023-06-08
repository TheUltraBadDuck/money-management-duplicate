//
// Screen cài đặt
//
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Modal, Alert } from 'react-native';
import { useState, useContext, useRef, useLayoutEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Cài đặt và khác
import { Context, gt, getLanguage, getCurrency } from '../components/context';
import '../assets/languages/i18n';
import { useTranslation } from 'react-i18next';



const SettingsScreen = () => {

    const context_val = useContext(Context);
    const { t } = useTranslation();

    // Setter và getter của những mục trong Cài đặt
    const [setting_buttons, setSettingsButtons] = useState([    // ĐỪNG ĐẶT {..., name: t('settings.theme.name'), ...}
        { key: 1, lang_path: 'settings_screen.theme'       , icon: 'sunny-outline' },
        { key: 2, lang_path: 'settings_screen.notification', icon: 'notifications-outline' },
        { key: 3, lang_path: 'settings_screen.language'    , icon: 'globe-outline' },
        { key: 4, lang_path: 'settings_screen.currency'    , icon: 'pricetag-outline' },
        { key: 5, lang_path: 'settings_screen.help'        , icon: 'help-circle-outline' }
    ]);

    // Hiển thị Modal trong phần Cài đặt
    const [show_theme, setShowTheme] = useState(false);
    const [show_lang,  setShowLang ] = useState(false);
    const [show_curr,  setShowCurr ] = useState(false);
    const [show_help,  setShowHelp ] = useState(false);


    // Hiển thị các modal ở dưới navigation Settings này
    const selectItem = (key) => {
        switch (key) {
            case 1: case '1': setShowTheme(true); break;
            case 2: case '2':
                context_val.updateSettings('notification');
                break;
            case 3: case '3': setShowLang(true);  break;
            case 4: case '4': setShowCurr(true);  break;
            case 5: case '5': setShowHelp(true);  break;
        }
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // var temp = {...setting_buttons};
        // temp[1]['icon'] = context_val.settings.notification ? 'notifications-outline' : 'notifications-off-outline'
        // setSettingsButtons(temp);
        Alert.alert('Notification is turned ' + (context_val.settings.notification ? 'on' : 'off') + '.')
    }, [context_val.settings.notification]);


    return (
        <View style = { [styles.container, { backgroundColor: gt('#FFF', '#222') } ] }>

            {/* Các Modal (hiện và ẩn được) */}
            <UpdatingSettingBox showing = { show_theme }   lang_path = { 'settings_screen.theme_goback' }      Setter = { setTheme }      returning = { () => setShowTheme(false) }/>
            <UpdatingSettingBox showing = { show_lang }    lang_path = { 'settings_screen.language_goback' }   Setter = { setLanguage }   returning = { () => setShowLang(false)  }/>
            <UpdatingSettingBox showing = { show_curr }    lang_path = { 'settings_screen.currency_goback' }   Setter = { setCurrency }   returning = { () => setShowCurr(false)  }/>
            <UpdatingSettingBox showing = { show_help }    lang_path = { '' }   Setter = { '' }   returning = { () => setShowHelp(false)  }/>
            
            {/* Giao diện chính */}

            <Text style = { [styles.titleText, { color: gt('#000', '#fff') }] }>{ t('settings') }</Text>

            <FlatList
                data = { setting_buttons }
                renderItem = { ({ item }) =>
                    <TouchableOpacity onPress = { () => selectItem(item.key) }>

                        <View style = { [styles.headingView, { borderColor: gt('#E0D5D5', '#707C7C') }] }>

                            <View style = { { flex: 1, alignItems: 'center' } }>
                                <Ionicons
                                    name = { item.icon }
                                    size = { 40 }
                                    color = { gt('#2380D7', '#FFF') }
                                />
                            </View>
                            <DisplayItems item = { item }/>

                        </View>

                    </TouchableOpacity>
                }
            />
        </View>
    )
}


// Hiện các khối (nền, thông báo, ngôn ngữ, ...) ngay phần cài đặt
function DisplayItems (props) {
    
    const { t } = useTranslation();

    switch (props.item['key']) {
        case 1: case '1': case 2: case '2': case 5: case '5':
            return (
                <View style = { { flex: 4 } } >
                    <Text style = { [styles.headingText, { color: gt('#2380D7', '#FFF') }] }>
                        { t(props.item['lang_path']) }
                    </Text>
                </View>
            )
        case 2: case '2':
            return (
                <View style = { { flex: 4 } } >
                    <Text style = { [styles.headingText, { color: gt('#2380D7', '#FFF') }] }>
                        { t(props.item['lang_path']) }
                    </Text>
                </View>

            )
        case 3: case '3':
            return (
                <View style = { { flex: 4 } }>
                    <Text style = { [styles.headingText, { color: gt('#2380D7', '#FFF') }] }>
                        { t(props.item['lang_path']) }
                    </Text>
                    <Text style = { [styles.normalText, { color: gt('#2380D7', '#FFF') }] }>
                        { getLanguage(true) }
                    </Text>
                </View>
            )
        case 4: case '4':
            return (
                <View style = { { flex: 4 } }>
                    <Text style = { [styles.headingText, { color: gt('#2380D7', '#FFF') }] }>
                        { t(props.item['lang_path']) }
                        </Text>
                    <Text style = { [styles.normalText, { color: gt('#2380D7', '#FFF') }] }>
                        { getCurrency(true) }
                        </Text>
                </View>
            )
        default:
            return (
                <View/>
            )
    }
}



// Hiện hộp nhỏ để thay đổi giá trị (chỉnh nền, ngôn ngữ, tiền tệ)
function UpdatingSettingBox (props) {

    const { t } = useTranslation();

    return (
        <Modal visible = { props.showing }   transparent = { true }   animationType = { 'fade' }>
            <View style = { styles.modalWholeView }>

                <View style = { styles.modalBox }>
                    
                    <View style = { [styles.modalTitleView, { backgroundColor: gt('#2380D7', '#446') }] }>
                        <TouchableOpacity onPress = { () => { props.returning(false) } }>
                            <Text style = { styles.modalTitleText }>
                                { t(props.lang_path) }
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style = { [styles.modalBottomView, { backgroundColor: gt('#FFF', '#222') }] }>
                        <props.Setter/>
                    </View>

                </View>

            </View>
        </Modal>
    )
}



// Hiện từng thông tin của cài đặt
//
// - - - Modal Nền - - -
//
function setTheme () {

    const context_val = useContext(Context);
    const { t } = useTranslation();

    // Xem phần setLanguage
    var all_theme = [
        [t('settings_screen.light'), 'light'],
        [t('settings_screen.dark'), 'dark']
    ];

    return (
        <FlatList
            data = { all_theme }
            renderItem = { ({ item }) =>
                <TouchableOpacity onPress = { () => context_val.updateSettings('theme', item[1]) }>
                    <View style = { [styles.modalNormalView, { borderColor: gt('#E0D5D5', '#707C7C') }] }>
                        <Text style = { [styles.modalNormalText, { color: gt('#2380D7', '#FFF') }] }>
                            { item[0] }
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        />
    )
}

//
// - - - Modal Ngôn ngữ - - -
//
function setLanguage () {

    const context_val = useContext(Context);
    const { t } = useTranslation();

    // Array "all_theme" chứa các element
    // Mỗi element chứa thêm array [... , ...]
    var all_lang = [
        [t('settings_screen.en'), 'en'],
        [t('settings_screen.vi'), 'vi']
    ];

    return (
        <FlatList
            data = { all_lang }
            renderItem = { ({item}) =>
                <TouchableOpacity onPress = { () => context_val.updateSettings('language', item[1]) }>
                     <View style = { [styles.modalNormalView, { borderColor: gt('#E0D5D5', '#707C7C') }] }>
                        <Text style = { [styles.modalNormalText, { color: gt('#2380D7', '#FFF') }] }>
                            { item[0] }
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        />
    )
}

//
// - - - Modal Loại tiền tệ - - -
//
function setCurrency () {

    const context_val = useContext(Context);
    const { t } = useTranslation();

    // Xem phần setLanguage
    var all_currency = [
        [t('settings_screen.vn_dong'), 'vn_dong'],
        [t('settings_screen.us_dollar'), 'us_dollar'],
        [t('settings_screen.uk_pound'), 'uk_pound'],
        [t('settings_screen.euro'), 'euro'],
        [t('settings_screen.yuan'), 'yuan'],
        [t('settings_screen.yen'), 'yen']
    ];

    return (
        <FlatList
            data = { all_currency }
            renderItem = { ({item}) =>
                <TouchableOpacity onPress = { () => context_val.updateSettings('currency', item[1]) }>
                    <View style = { [styles.modalNormalView, { borderColor: gt('#E0D5D5', '#707C7C') }] }>
                        <Text style = { [styles.modalNormalText, { color: gt('#2380D7', '#FFF') }] }>
                            { item[0] }
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        />
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10
    },

    headingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        width: 320,
        height: 80
    },

    headingText: {
        fontSize: 24,
        textAlign: 'left'
    },

    normalText: {
        fontSize: 16,
        textAlign: 'left'
    },


    // Hiện modal
    modalWholeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0008'
    },

    modalBox: {
        width: 300,
        height: 300,
        alignItems: 'stretch',
        justifyContent: 'center'
    },

    modalTitleView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    modalTitleText: {
        fontSize: 24,
        color: '#FFF',
        textAlign: 'left'
    },

    modalBottomView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 20,
        paddingBottom: 20
    },

    modalNormalView: {
        width: 250,
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
        margin: 5
    },

    modalNormalText: {
        fontSize: 16,
        textAlign: 'center'
    }

})


export default SettingsScreen;

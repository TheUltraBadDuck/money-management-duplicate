import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileStackScreen } from '../navigators/ProfileStack';
import Icon from '../Icon';
import myColor from '../assets/colors/colors';
import moment from 'moment'


import { Context } from '../components/context';
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue, getDatabase } from "firebase/database";
import firebaseApp from '../firebase';


const ProfileScreen = ({ navigation }) => {
    // get database
    const db = getDatabase(firebaseApp);

    // Manage login, logout
    const context_val = React.useContext(Context);

    const hanldeSignOut = () => {
        const auth = getAuth()
        context_val.authContext.logOut()
            .then(() => {
                //context_val.authContext.logOut();
                console.log('signed out')
            })
            .catch(error => alert(error.message))
    }

    // get information
    const [avatar, setAvatar] = useState(null);
    const [cover, setCover] = useState(null);
    const [username, setUsername] = useState(null);
    const [sex, setSex] = useState(null);
    const [quote, setQuote] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [birthday, setBirthday] = useState(null);
    let date;

    useEffect(() => {
        const userid = getAuth().currentUser.uid;
        onValue(ref(db, 'users/' + userid), (snapshot) => {
            setAvatar(snapshot.val().avatar);
            setCover(snapshot.val().cover);
            setUsername(snapshot.val().username);
            setSex(snapshot.val().sex === 'other' ? 'male-female' : snapshot.val().sex);
            setQuote(snapshot.val().quote);
            setEmail(snapshot.val().email);
            setPhone(snapshot.val().phone);

            setBirthday(snapshot.val().birthday);
            // date = new Date(birthday);
            // date.setDate(date.getDate() - 1);
            // setBirthday(date);
            // console.log(date)
            // console.log(moment(date).format('DD/MM/YYYY'))
            // date = moment(date).format('DD/MM/YYYY');
        })
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.CoverImage}>
                    <Image
                        source={{ uri: cover }}
                        style={styles.CoverImage} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: avatar }}
                        style={styles.AvatarProp}>
                    </Image>

                    <View style={styles.UserName_Gender}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>{username}</Text>
                        <Icon.Ionicons name={sex} size={25} />
                    </View>

                    <Text style={styles.Quote}>{quote}</Text>
                    {/* <Text style={styles.Quote}>finance without strategy is just number, and</Text>
                    <Text style={styles.Quote}>strategy without number is just dreaming</Text> */}

                </View>

                <View style={styles.InformationBox}>
                    <View style={styles.Text_in_InformationBox}>
                        <Text>
                            {email}
                        </Text>
                    </View>
                    <View style={styles.Icon_in_InformationBox}>
                        <Icon.MaterialCommunityIcons name='email-mark-as-unread' size={20} />
                    </View>
                </View>

                <View style={styles.InformationBox}>
                    <View style={styles.Text_in_InformationBox}>
                        <Text>
                            {phone}
                        </Text>
                    </View>
                    <View style={styles.Icon_in_InformationBox}>
                        <Icon.Ionicons name='ios-phone-portrait-outline' size={20} />
                    </View>
                </View>

                <View style={styles.InformationBox}>
                    <View style={styles.Text_in_InformationBox}>
                        <Text>
                            {moment(birthday).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                    <View style={styles.Icon_in_InformationBox}>
                        <Icon.FontAwesome name='birthday-cake' size={20} />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.buttonUpdate}
                    onPress={() => navigation.navigate('UpdateInformation')}
                >
                    <Text >Update Information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout}
                    onPress={() => { hanldeSignOut() }}
                >
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 120,
        alignItems: 'center',
    },
    CoverImage: {
        marginTop: 8,
        width: 369,
        height: 157,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    BackButton: {
        width: '5%',
        height: 100,
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    AvatarProp: {
        width: 140, height: 140,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 3,
        marginTop: -70
    },
    UserName_Gender: {
        backgroundColor: 'transparent',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: -5,
    },
    Quote: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
        fontSize: 13,
        textAlign: 'center',
        justifyContent: 'center',
    },
    InformationBox: {
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#DAE9E8',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 15,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    },
    Text_in_InformationBox: {
        width: '90%',
        alignSelf: 'flex-start',
        alignItems: 'baseline',
    },
    Icon_in_InformationBox: {
        width: '10%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    buttonUpdate: {
        width: '90%',
        height: 50,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: myColor.main,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonLogout: {
        width: '90%',
        height: 50,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ProfileScreen;
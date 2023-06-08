import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { Context, WalletContext } from '../components/context';
import myColor from '../assets/colors/colors';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendEmailVerification } from "firebase/auth";


const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true,
    });

    const context_val = React.useContext(Context);
    const wallet_array = React.useContext(WalletContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }



    const loginHandle = (email, password) => {
        if (email.length < 1) {
            alert('You forgot enter email')
        }
        else if (password.length < 1) {
            alert('You forgot enter password')
        }
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user.email)
                })
                .catch((error) => {
                    alert('Invalid email or password!')
                });
        }
    }

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                context_val.authContext.signIn('user', 'pass',user.uid);
                wallet_array.setUid(user.uid);
            }
        });
    }, [])

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                {/* Email field */}
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="at"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                </View>

                {/* Password field */}
                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                {/* Button container */}
                <TouchableOpacity>
                    <Text style={{ color: myColor.main, marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>

                    {/* Sign in Button */}
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.email, data.password) }}
                    >
                        <LinearGradient
                            colors={['#84A6FF', myColor.main]}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Sign up Button */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: myColor.main,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: myColor.main
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColor.main
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: myColor.textInput,
    },
    errorMsg: {
        color: myColor.errorMsg,
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
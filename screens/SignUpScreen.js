import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { getDatabase, ref, set } from "firebase/database";

import myColor from '../assets/colors/colors';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        isValidEmail: true,
        checkCircle: false,
        isValidPassword: false,
        isValidConfirmPassword: false,
        secureTextEntry: true,
        errorMsgPassword: false,
        confirm_secureTextEntry: true,
        errorMsgConfirm: false
    });

    const validateEmail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(text);
    };

    const textEmailChange = (val) => {
        if (validateEmail(val.trim())) {
            setData({
                ...data,
                email: val,
                checkCircle: true
            });
        } else {
            setData({
                ...data,
                email: val,
                checkCircle: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
                errorMsgPassword: false
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
                errorMsgPassword: true
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        if (val === data.password) {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: true,
                errorMsgConfirm: false
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: false,
                errorMsgConfirm: true
            });
        }
    }

    const handleValidEmail = (val) => {
        if (validateEmail(val.trim())) {
            setData({
                ...data,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

    //dang bi loi
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    }

    const handleSignUp = (email, password) => {
        if (!data.isValidEmail) {
            alert('Invalid email')
        }
        else if (!data.isValidPassword) {
            alert('Please enter correct password')
        }
        else if (!data.isValidConfirmPassword) {
            alert('Please enter correct confirm password')
        } else
            
            if (data.isValidConfirmPassword && data.isValidPassword && data.isValidEmail) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        return user;
        
                    })
                    .then((user) => {
                        const db = getDatabase();
                        set(ref(db, 'users/' + user.uid), {
                            avatar: 'https://firebasestorage.googleapis.com/v0/b/money-in-your-hand-2da44.appspot.com/o/default_cover_photo.jpg?alt=media&token=9925088e-7244-4026-a1d7-2abf238e1726',
                            cover: 'https://firebasestorage.googleapis.com/v0/b/money-in-your-hand-2da44.appspot.com/o/default_cover_photo.jpg?alt=media&token=9925088e-7244-4026-a1d7-2abf238e1726',
                            username: user.displayName,
                            sex: 'other',
                            quote: '',
                            email: user.email,
                            phone: '',
                            birthday: '',
                        });
                        navigation.goBack()
                    })
                    .catch((error) => {
                        alert('Email already exist')
                    })
            }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={myColor.main} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    {/* Email field */}
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="at"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textEmailChange(val)}
                            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                        />
                        {data.checkCircle ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidEmail ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Invalid email</Text>
                        </Animatable.View>
                    }

                    {/* Password field */}
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onEndEditing={(e) => handlePasswordChange(e.nativeEvent.text)}
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
                    {data.errorMsgPassword ?
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long</Text>
                        </Animatable.View> : null

                    }

                    {/* Confirm password field */}
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onEndEditing={(e) => handleConfirmPasswordChange(e.nativeEvent.text)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.confirm_secureTextEntry ?
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
                    {data.errorMsgConfirm ?
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Not same as password</Text>
                        </Animatable.View> : null
                    }
                    {/* Button container */}
                    <View style={styles.button}>

                        {/* Sign Up Button*/}
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                                handleSignUp(data.email, data.password)
                            }}
                        >
                            <LinearGradient
                                colors={['#84A6FF', myColor.main]}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Sign In Button*/}
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: myColor.main,
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: myColor.main
                            }]}>Sign In</Text>
                        </TouchableOpacity>

                        {/* Sign in with Google Button*/}
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                flexDirection: 'row',
                                borderColor: myColor.greyBorder,
                                borderWidth: 1,
                                marginTop: 15,
                                overflow: 'hidden'
                            }]}
                        >
                            <Image
                                style={styles.googleButton}
                                source={{ uri: ('https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1') }} />
                            <Text style={[styles.textSign, {
                                color: myColor.greyText
                            }]}>Sign in with Google</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

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
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -10,
        paddingLeft: 10,
        color: myColor.textInput,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
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
    },
    errorMsg: {
        color: myColor.errorMsg,
        fontSize: 14,
    },
    googleButton: {
        width: 50,
        height: 50,
    }
});
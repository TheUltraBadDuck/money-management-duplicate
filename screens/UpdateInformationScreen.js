import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Button,
    useWindowDimensions,
    Platform,
    Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomDatePicker from '../components/CustomDatePicker';
import * as ImagePicker from 'expo-image-picker';
import ImagePickerIcon from '../components/ImagePicker';
import moment from 'moment';
// import RNFetchBlob from 'react-native-fetch-blob';

import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref as ref_database, update } from "firebase/database";
import { getStorage, ref as ref_storage, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import firebaseApp from '../firebase';
import { async } from '@firebase/util';


const HorizontalLine = () => {
    return <View style={styles.HorizontalLine} />
}


// get database
const db = getDatabase(firebaseApp);

// get storage
const storage = getStorage(firebaseApp);


const UpdateInformationScreen = () => {
    // get useruid
    const userid = getAuth().currentUser.uid;

    // get database reference
    dbRef = ref_database(db, 'users/' + userid);

    // declare variable
    const [avatar, setAvatar] = useState(null);
    const [cover, setCover] = useState(null);
    const [username, setUsername] = useState(null);
    const [sex, setSex] = useState(null);
    const [quote, setQuote] = useState(null);
    const [phone, setPhone] = useState(null);
    const [birthday, setBirthday] = useState(new Date());

    useEffect(() => {
        onValue(ref_database(db, 'users/' + userid), (snapshot) => {
            setAvatar(snapshot.val().avatar);
            setCover(snapshot.val().cover);
            setUsername(snapshot.val().username);
            setSex(snapshot.val().sex === 'other' ? 'male-female' : snapshot.val().sex);
            setQuote(snapshot.val().quote);
            setPhone(snapshot.val().phone);
            setBirthday(snapshot.val().birthday)
        })
    }, [])

    //Gender combobox
    const [open, setOpen] = useState(false);
    const [GenderValue, setGenderValue] = useState(null);
    const [GenderItems, setGenderItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'Other' }
    ]);

    //Camera Permission, Gallery permission
    const [modalShow, setModalShow] = useState(false);
    const [defaultCover, setDefaultCover] = useState('https://firebasestorage.googleapis.com/v0/b/money-in-your-hand-2da44.appspot.com/o/default_cover_photo.jpg?alt=media&token=9925088e-7244-4026-a1d7-2abf238e1726');
    const [defaultAvatar, setDefaultAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/money-in-your-hand-2da44.appspot.com/o/default_avatar_photo.jpg?alt=media&token=588c60e9-8d70-4d03-a901-3a9985b53334');


    const pickCoverByCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        // console.log(result)

        if (!result.cancelled) {
            setDefaultCover(false);
            setCover(result.uri);
            setModalShow(!modalShow);

            // delete old image
            if (cover !== defaultCover) {
                const iamgeRef = ref_storage(storage, userid + '_cover.jpg');

                // Delete the file
                deleteObject(iamgeRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
            }

            // address inside storage
            const storageRef = ref_storage(storage, userid + '_' + 'cover' + '.jpg');

            // convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            // upload
            await uploadBytes(storageRef, bytes);

            // update database
            getDownloadURL(storageRef).then((url) => {
                update(dbRef, { cover: url }).then(() => {
                    console.log("Data updated");
                }).catch((e) => {
                    console.log(e);
                })
            })
        }
    }

    const pickCoverByGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        // console.log(result);

        if (!result.cancelled) {
            setDefaultCover(false);
            setCover(result.uri);
            setModalShow(!modalShow);

            // delete old image
            if (cover !== defaultCover) {
                const iamgeRef = ref_storage(storage, userid + '_cover.jpg');

                // Delete the file
                deleteObject(iamgeRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
            }

            // address inside storage
            const storageRef = ref_storage(storage, userid + '_' + 'cover' + '.jpg');

            // convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            // upload
            await uploadBytes(storageRef, bytes);

            // update database
            getDownloadURL(storageRef).then((url) => {
                update(dbRef, { cover: url }).then(() => {
                    console.log("Data updated");
                }).catch((e) => {
                    console.log(e);
                })
            })
        }
    }

    const pickAvatarByCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        // console.log(result)

        if (!result.cancelled) {
            setDefaultAvatar(false);
            setAvatar(result.uri);
            setModalShow(!modalShow);

            // delete old image
            if (avatar !== defaultAvatar) {
                const iamgeRef = ref_storage(storage, userid + '_avatar.jpg');

                // Delete the file
                deleteObject(iamgeRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
            }

            // address inside storage
            const storageRef = ref_storage(storage, userid + '_' + 'avatar' + '.jpg');

            // convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            // upload
            await uploadBytes(storageRef, bytes);

            // update database
            getDownloadURL(storageRef).then((url) => {
                update(dbRef, { avatar: url }).then(() => {
                    console.log("Data updated");
                }).catch((e) => {
                    console.log(e);
                })
            })
        }
    }

    const pickAvatarByGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        // console.log(result)

        if (!result.cancelled) {
            // change image
            setDefaultAvatar(false);
            setAvatar(result.uri);
            setModalShow(!modalShow);

            // delete old image
            if (avatar !== defaultAvatar) {
                const iamgeRef = ref_storage(storage, userid + '_avatar.jpg');

                // Delete the file
                deleteObject(iamgeRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
            }

            // address inside storage
            const storageRef = ref_storage(storage, userid + '_' + 'avatar' + '.jpg');

            // convert image to array of bytes
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            // update database
            getDownloadURL(storageRef).then((url) => {
                update(dbRef, { avatar: url }).then(() => {
                    console.log("Data updated");
                }).catch((e) => {
                    console.log(e);
                })
            })
        }
    }

    const updateInformation = () => {
        // check phone number
        if (phone.length != 10 && phone.length != 11 && phone.slice(0, 0) != '0') {
            Alert.alert('Invalid phone number!');
            return;
        }

        // update
        update(dbRef, {
            username: username,
            sex: GenderValue,
            quote: quote,
            phone: phone,
            birthday: birthday
        }).then(() => {
            console.log("Data updated");
        }).catch((e) => {
            console.log(e);
        })

    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View>
                    <Text style={styles.TextFont}>Cover Image:</Text>
                    <View style={styles.WrapperCoverImage}>
                        <Image
                            style={styles.CoverImage}
                            source={{ uri: cover }}
                        />
                        <ImagePickerIcon
                            ModalShow={modalShow}
                            IconPosition={styles.CameraIconCoverImage}
                            CameraFunction={pickCoverByCamera}
                            GalleryFunction={pickCoverByGallery}
                        />
                    </View>
                    <HorizontalLine />
                </View>

                <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Avatar:</Text>
                    <View style={styles.EditAvatarView}>
                        <View style={styles.WrapperAvatarImage}>
                            <Image
                                style={styles.AvatarProp}
                                source={{ uri: avatar }}
                            />
                        </View>
                        <ImagePickerIcon
                            ModalShow={modalShow}
                            IconPosition={styles.CameraIconAvatarImage}
                            CameraFunction={pickAvatarByCamera}
                            GalleryFunction={pickAvatarByGallery}
                        />
                    </View>
                    <HorizontalLine />
                </View>

                <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Username:</Text>
                    <TextInput
                        style={styles.TextInput}
                        // placeholder={username.}
                        // defaultValue={username}
                        value={username}
                        onChangeText={setUsername}
                    // onEndEditing={(newVal) => setUsername(newVal)}
                    />
                    <HorizontalLine />
                </View>

                <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Gender:</Text>
                    <DropDownPicker
                        placeholder='Select the gender'
                        defaultValue={sex}
                        style={styles.dropDownPickerStyle}
                        listMode="SCROLLVIEW"
                        open={open}
                        value={GenderValue}
                        items={GenderItems}
                        setOpen={setOpen}
                        setValue={setGenderValue}
                        setItems={setGenderItems}
                    />
                    <HorizontalLine />
                </View>

                <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Quote:</Text>
                    <TextInput
                        style={styles.TextInput}
                        multiline={true}
                        // defaultValue={quote}
                        value={quote}
                        // onEndEditing={(newVal) => setQuote(newVal)}
                        onChangeText={setQuote}
                    />
                    <HorizontalLine />
                </View>

                {/* <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Email:</Text>
                    <TextInput
                        style={styles.TextInput}
                        keyboardType={'email-address'}
                        defaultValue={email}
                    />
                    <HorizontalLine />
                </View> */}

                <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Phone number:</Text>
                    <TextInput
                        style={styles.TextInput}
                        keyboardType={'phone-pad'}
                        // defaultValue={phone}
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <HorizontalLine />
                </View>

                <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Birthday:</Text>
                    <CustomDatePicker
                        textStyle={{ fontSize: 18 }}
                        container={styles.dateContainer}
                        DatePickerStyle={styles.datePickerStyle}
                        defaultDate={Date(birthday)}
                        onDateChange={(value) => setBirthday(value)}
                    />
                    <HorizontalLine />
                </View>

                {/* <View style={styles.wrapperEdit}>
                    <Text style={styles.TextFont}>Change password:</Text>

                    <Text style={styles.TextPasswordChange}>Password:</Text>
                    <TextInput style={styles.TextInput}
                        returnKeyType='go'
                        secureTextEntry
                        autoCorrect={false}
                    />

                    <Text style={styles.TextPasswordChange}>New Password</Text>
                    <TextInput style={styles.TextInput}
                        returnKeyType='go'
                        secureTextEntry
                        autoCorrect={false}
                    />

                    <Text style={styles.TextPasswordChange}>Confirm Password</Text>
                    <TextInput style={styles.TextInput}
                        returnKeyType='go'
                        secureTextEntry
                        autoCorrect={false}
                    />

                    <View style={styles.wrapperEdit}>
                        <Button
                            title='Change Password'
                        // onPress={updateInformation}
                        />
                    </View>

                    <HorizontalLine />
                </View> */}

                <View style={styles.wrapperEdit}>
                    <Button
                        title='Update'
                        onPress={updateInformation}
                    />
                    <HorizontalLine />
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
        marginBottom: 120,
        alignItems: 'center',
    },
    wrapper: {
        width: '95%',
        height: '100%',
        margin: 10,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: '#CCCCFF',
        padding: 5,
    },
    wrapperEdit: {
        marginTop: 10
    },
    TextFont: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444488'
    },
    HorizontalLine: {
        width: '90%',
        height: 1,
        marginTop: 10,
        backgroundColor: '#CCCCFF',
        alignSelf: 'center'
    },
    WrapperCoverImage: {
        width: '80%',
        height: 163,
        marginTop: 5,
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#CCCCFF',
        padding: 2
    },
    CoverImage: {
        width: 257,
        height: 157,
        alignSelf: 'center',
        borderRadius: 12,
    },
    CameraIconCoverImage: {
        marginTop: -30,
        marginRight: 5,
        width: '12%',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 5
    },
    EditAvatarView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    WrapperAvatarImage: {
        width: 145,
        height: 145,
        marginTop: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#CCCCFF',
        padding: 2
    },
    AvatarProp: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 3,
    },
    CameraIconAvatarImage: {
        width: '10%',
        height: 28,
        marginTop: 120,
        marginLeft: -40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CCCCFF'
    },
    UsernameFont: {
        fontSize: 20,
        color: 'black'
    },
    TextInput: {
        width: '75%',
        height: 30,
        marginTop: 5,
        marginLeft: 20,
        borderWidth: 1,
        borderBottomColor: '#CCCCFF',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        fontSize: 15,
    },
    dropDownPickerStyle: {
        width: '80%',
        marginLeft: 20,
        borderRadius: 0,
        borderTopColor: 'transparent',
        borderEndColor: 'transparent',
        borderStartColor: 'transparent',
        borderBottomColor: '#CCCCFF',
    },
    dateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    datePickerStyle: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextPasswordChange: {
        marginStart: 20,
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444488'
    },
    btnCacel: {
        left: 0,
    },
    btnDone: {
        right: 0,
    }
})

export default UpdateInformationScreen;
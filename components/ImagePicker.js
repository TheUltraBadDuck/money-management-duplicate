import react, { useState, useEffect } from "react";
import { StyleSheet, Modal, TouchableOpacity, View, Text, Alert } from 'react-native';
import Icon from "../Icon";
import * as ImagePicker from 'expo-image-picker';

const ImagePickerIcon = (props) => {
    const [CameraPermission, SetCameraPermission] = useState(false);
    const [GalleryPermission, SetGalleryPermission] = useState(false);
    const [OptionShow, setOptionShow] = useState(false);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            SetGalleryPermission(galleryStatus.status === 'granted');
            SetCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    useEffect(() => {
        setOptionShow(false);
    }, [props.ModalShow])

    const CheckPermission = () => {
        if (!CameraPermission || !GalleryPermission)
            Alert.alert("Please go to setting and give permission!")
        else
            setOptionShow(true);
    }

    return (
        <View style={props.IconPosition}>
            <TouchableOpacity
                onPress={() => CheckPermission()}
            >
                <Icon.FontAwesome
                    name='camera'
                    size={25}
                />
            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType={'fade'}
                visible={OptionShow}
                supportedOrientations={['portrait']}
                onRequestClose={() => setOptionShow(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalElementWrapper}
                    >
                        <TouchableOpacity
                            style={ styles.buttonProp }
                            onPress={props.CameraFunction}
                        >
                            <Icon.Entypo
                                style={{ alignSelf: 'center' }}
                                name='camera'
                                size={18}
                            />
                            <Text
                                style={{ marginLeft: 10, fontSize: 18, fontWeight: '400' }}
                            >Máy ảnh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondButtonProp}
                            onPress={props.GalleryFunction}
                        >
                            <Icon.FontAwesome
                                style={{ alignSelf: 'center' }}
                                name='photo'
                                size={18}
                            />
                            <Text
                                style={{ marginLeft: 10, fontSize: 18, fontWeight: '400' }}
                            >Thư viện</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalElementWrapper: {
        width: 200,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4E6EB',
        borderRadius: 15
    },
    buttonProp: { 
        width: 150, 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 15, 
        backgroundColor: '#8DDFF1', 
        flexDirection: 'row' 
    },
    secondButtonProp: { 
        width: 150, 
        height: 40, 
        marginTop: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 15, 
        backgroundColor: '#8DDFF1', 
        flexDirection: 'row' 
    }
})

export default ImagePickerIcon;
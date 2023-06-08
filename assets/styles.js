import { StyleSheet, StatusBar } from "react-native";
import myColor from "./colors/colors"

export const globalStyles = StyleSheet.create({
    container: (backgroundColor = '#FFF') => ({
        flex: 1,
        backgroundColor: backgroundColor,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }),

    marginHorizontal: (value) => ({
        marginHorizontal: value,
    }),

    marginVertical: (value) => ({
        marginVertical: value,
    }),

    flex: (value) => ({
        flex: value,
    }),

    width: (value) => ({
        width: value,
    }),

    height: (value) => ({
        height: value,
    }),

    zIndex: (value) => ({
        zIndex: value,
    }),

    row: {
        flexDirection: 'row',
    },

    subContainer:{
        flex: 1,
        alignItems: 'center',
    },

    button: {
        backgroundColor: myColor.main,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    
    buttonText: {
        color: '#FFF',
        fontSize: 13,
    },

    centered: {
        justifyContent: 'center',
        alignItems: 'center',       
    },

    left: (value) => ({
        left: value,
    }),

    box: {
        borderWidth: 1,
        borderRadius: 10,
    },

    boxIconH: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    boxModal: {
        backgroundColor: '#FFF', 
        borderWidth: 1, 
        borderRadius: 20,
        width: '98%',
        paddingVertical: 10,
    },

    icon: {
        margin: 5,
    },

    titleText:{
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
    },

    h1Text: {
        fontSize: 25,
    },

    h2Text: {
        fontSize: 20,
    },

    h3Text: {
        fontSize: 15,
    },

    paragraph: {
        fontSize: 13,
    },

    iconText: {
        fontSize: 10,
    },

    boldText: {
        fontWeight: 'bold',
    },

    lightText: {
        fontWeight: '200',
    },

    inlineText: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent:'space-around',
    },

    colorText: (color = '#000') => ({
        color: color,
    }),
})
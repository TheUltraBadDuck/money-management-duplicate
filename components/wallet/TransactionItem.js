import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import myColor from '../../assets/colors/colors';

const TrancsactionItem =props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={ props.onSelect }
                style={styles.optionElement}
            >
                <Card.Title
                    title={props.title}
                    titleStyle={{
                        fontSize: 16
                    }}
                    style={{
                        height: 50,
                        justifyContent:"flex-end"
                    }}
                    left={(prop) => <Avatar.Image {...prop} size={30} source={require('../../assets/images/eat.png')} />}
                    right={(prop) => props.id === props.idSelect ? <IconButton {...prop} icon="check" color="green" /> : null}
                />
            </TouchableOpacity>
            <View style={styles.boderBottomLine} />
        </View>
    );
}

const padLeft = 20
const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "center",
    },
    optionElement:{
        height: 50,
        justifyContent:"center"
    },
    boderBottomLine: {
        height: 1,
        backgroundColor: myColor.greyBorder
    },
});

export default TrancsactionItem
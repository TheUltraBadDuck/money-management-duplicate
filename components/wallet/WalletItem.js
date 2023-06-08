import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import myColor from '../../assets/colors/colors';

const WalletItem =props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={ props.onSelect }
                style={styles.optionElement}
            >
                <Card.Title
                    title={props.name}
                    subtitle={props.balance}
                    titleStyle={{
                        fontSize: 16
                    }}
                    subtitleStyle={{
                        fontSize: 15
                    }}
                    style={{
                        height: 50,
                        justifyContent:"flex-end"
                    }}
                    left={(prop) => <Avatar.Image {...prop} size={30} source={require('../../assets/images/eat.png')} />}
                    
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
        justifyContent:"center",
        flexDirection: "column"
    },
    boderBottomLine: {
        height: 1,
        backgroundColor: myColor.greyBorder
    },
});

export default WalletItem
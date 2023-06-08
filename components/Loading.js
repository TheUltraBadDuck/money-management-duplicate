import { View, ActivityIndicator } from 'react-native';
import { globalStyles } from '../assets/styles';

const Loading = () => {
    return(
        <View style={[globalStyles.subContainer, globalStyles.centered]}>
            <ActivityIndicator size="large" color={myColor.main} />
        </View>
    )
}

export default Loading
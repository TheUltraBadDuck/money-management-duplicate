import { View } from 'react-native';

const BlankRect = ({ height = 120 }) => {
    return (
        <View style = { { width: 20, height: height, opacity: 0 } }/>
    )
}



export default BlankRect
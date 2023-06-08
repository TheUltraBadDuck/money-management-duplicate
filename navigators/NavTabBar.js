import { ScrollView } from 'react-native';
import {ListButton1} from '../components/Button';
import myIcon from '../assets/icons'

export const NavAchievementBar = (props) => {
    
    const handleOnPress = (screen, selectedId, selectedName) => {
        props.navigation.navigate(screen, {id: selectedId, name: selectedName})
    }

    return (
        <ScrollView horizontal>
            <ListButton1
                screen = {'Achievement'}
                array = {props.data}
                onSelect = {handleOnPress}
            />
        </ScrollView>
    )
}

export const NavWalletBar = (props) => {
    const basicWallet = props.data.basic
    const piggyWallet = props.data.piggy


    const handleOnPress = (screen, selectedId, selectedName) => {
        props.navigation.navigate(screen, {id: selectedId, name: selectedName})
    }

    return (
        <ScrollView horizontal>
            <ListButton1
                screen = {'Wallet'}
                array = {basicWallet}
                onSelect = {handleOnPress}
                icon = {myIcon.wallet}
            />
            <ListButton1
                screen = {'Piggy'}
                array = {piggyWallet}
                onSelect = {handleOnPress}
                icon = {myIcon.piggy}
            /> 
        </ScrollView>
    )
}

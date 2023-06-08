import { Pressable, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../assets/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import myColor from '../assets/colors/colors';

// Icon is on the top of the text
export const Button1 = (props) => {
    return (
      <View style={[globalStyles.marginHorizontal(30), globalStyles.centered]}>
        <FontAwesome5 name={props.icon} size={25}/>
        <Text style={globalStyles.h3Text}>{props.text}</Text>
      </View>
    );
}

// Icon is on the left side of the text
export const Button2 = (props) => {
  return (
    <View style={globalStyles.boxIconH}>
      <FontAwesome5 style={globalStyles.icon} name={props.icon} size={25}/>
      <Text style={globalStyles.h3Text}>{props.text}</Text>
    </View>
  );
}

// Text is on the left side of the icon
export const Button3 = (props) => {
  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.iconText}>{props.text}</Text>
      <FontAwesome5 name={props.icon} size={20}/>
    </View>
  );
}

// For navigation transaction in HomeScreen
export const ListButton1 = (props) => {
  return (
      props.array.map((item) => {
          return (
              <TouchableOpacity
                  key={item.id}
                  onPress={() => props.onSelect(props.screen, item.id, item.name)}
              >
                  <Button1                                      
                      text={item.name}                                     
                      icon={!props.icon ? item.icon : props.icon}
                  />
              </TouchableOpacity>
              );
      })
  )
}

// For dropdown menu wallet in ReportScreen
export const ListButton2 = (props) => {
  return (
    props.array.map((item) => {
      return(
          <TouchableOpacity 
              key = {item.id}
              style={props.style(props.value.id === item.id ? myColor.main : '#FFF')}
              onPress={() => props.onSelect(item)}
          >   
              <Button2
                  text={item.name}
                  icon={!props.icon ? item.icon : props.icon}
              />
          </TouchableOpacity>
      )
    })
  )
}

// For time period bar in ReportScreen
export const ListButton3 = (props) => {
  return(
    props.array.map((item) => {
      return(
          <Pressable 
              key = {item.id}
              style={props.style(props.value === item.id ? myColor.main : '#FFF')}
              onPress={() => props.onSelect(item.id)}
          >   
              <Button3
                  text={item.name}
                  icon={!props.icon ? item.icon : props.icon}
              />
          </Pressable>
      )
    })
  )
}
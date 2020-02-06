import React from 'react';
import {view } from 'react-easy-state'
import { Linking, StyleSheet, Alert, TouchableNativeFeedback, Image, Text, View, Dimensions, TouchableWithoutFeedback, FlatList, Button, BackHandler} from 'react-native';
import gameStore from './gameStore.js'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import appStore from './appStore.js'

export default class About extends React.Component {

  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: "About Tsuku",
      };
  };

  constructor(props){
    super(props)
    // this.props.navigation.navigate('Instructions')
  }

  render(){
    colors=['#364652','#BFB1C1']
    return (
        <LinearGradient
          style={[
            styles.container,
            {
              flex:1
            },
          ]}
          colors={colors}
          // colors={[ '#aa0000','#FFFCF2',]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 2.5 }}
        >
            <View style={{width:'90%', height:'90%', flexDirection:'column',}}>
                <Text style={styles.text}>
                  Made by <Text style={{fontWeight:"bold"}}>CIAOS</Text>.
                </Text>
                <Text style={styles.text}>
                  Tsuku is inspired by the gorgeous game SHöBU by Smirk & Dagger Games. 
                </Text>
                <TouchableWithoutFeedback style={{alignItems:"left"}} onPress={()=>{Linking.openURL("https://zackeberhart.tech/tsuku_privacy_policy").catch((err) => console.error('An error occurred', err))}}>
                  <Text style={styles.link}>
                    Privacy Policy
                  </Text>
                </TouchableWithoutFeedback>
            </View>
        </LinearGradient>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: 'center'
  },

  row:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    width:'100%'
  },

  text:{
    color:"white",
    fontSize: 20,
  },

  link:{
    color:"#DEDEFF",
    fontSize: 20,
    textDecorationLine: "underline"
  },

  buttons:{
      width:'70%',
      height:'70%'
  },

  button:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal:5,
    elevation:5,
    borderRadius:5,
    height:'85%'
  },

  buttonText:{
    color:'#E9EBF8',
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
    textAlignVertical:'center'
  }

});

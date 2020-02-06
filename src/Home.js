import React from 'react';
import {view } from 'react-easy-state'
import { StyleSheet, Alert, TouchableNativeFeedback, Image, Text, View, Dimensions, TouchableWithoutFeedback, FlatList, Button, BackHandler} from 'react-native';
import gameStore from './gameStore.js'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import appStore from './appStore.js'

const person = <Ionicons name="md-person" size={70} color="#E9EBF8" />
const people = <Ionicons name="md-people" size={70} color="#E9EBF8" />
const settings = <Ionicons name="md-settings" size={40} color="#E9EBF8" />
const rules = <Ionicons name="md-book" size={40} color="#E9EBF8" />


export default class Home extends React.Component {

  static navigationOptions = ({ navigation }) => {
      return {
        headerStyle: {
            backgroundColor:'#0D1B1E',
            height:Dimensions.get('window').height*.4
        },
        headerTitle: (<Image
          source={require('../assets/logo.png')}
          style={{width: Dimensions.get('window').width, }}
          resizeMode='contain'
          fadeDuration={500}
        />),
      };
  };

  constructor(props){
    super(props)
  }

  componentDidMount = () =>{
    this.props.navigation.addListener('willFocus', payload => {
      this.forceUpdate()
    })
  } 

  startGame = (useAI) => {
    if(gameStore.allMoves.length>0 || !gameStore.gameGoing){
      if(gameStore.usingAI == useAI){
        Alert.alert(
          'Start game',
          'There is currently a game in progress. Would you like to continue or start a new game?',
          [
            {text: 'Continue', onPress: () => {  
              this.props.navigation.navigate('Game', {player:(!gameStore.currentPlayer)?'Black':'White', useAI: useAI})
            }},
            {text: 'New Game', onPress: () => { 
              this.props.navigation.navigate('Game', {player:(!gameStore.currentPlayer)?'Black':'White', useAI: useAI, newGame:true})
            }},
          ],
        );
      }else if(useAI){
        Alert.alert(
          'Start game',
          'Starting a 1 Player game will end the 2-Player game in progress. Would you like to start a new game?',
          [
            {text: 'Cancel'},
            {text: 'New Game', onPress: () =>  
              this.props.navigation.navigate('Game', {player:(!gameStore.currentPlayer)?'Black':'White', useAI: useAI, newGame:true})
            },
          ],
        );
      }else{
        Alert.alert(
          'Start game',
          'Starting a 2 Player game will end the 1 Player game in progress. Would you like to start a new game?',
          [
            {text: 'Cancel'},
            {text: 'New Game', onPress: () =>  
              this.props.navigation.navigate('Game', {player:(!gameStore.currentPlayer)?'Black':'White', useAI: useAI, newGame:true})
            },
          ],
        );
      }
    }else{
      this.props.navigation.navigate('Game', {player:(!gameStore.currentPlayer)?'Black':'White', useAI: useAI, newGame:true})
    }
  }

  render(){
    colors=appStore.darkMode?['#364652','#BFB1C1']:['#E9EBF8','#8F818a']
    return (
        <LinearGradient
          style={[
            styles.container,
            {
              flex:1
            },
          ]}
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 2.5 }}
        >
            <View style={{width:'90%', height:'90%', flexDirection:'column', alignItems: 'center'}}>
                <View style={[styles.row, {flex:2}]}>
                    <TouchableNativeFeedback
                      onPress={() => this.startGame(true)}
                    >
                        <View style={[styles.button, {backgroundColor:'#E94F37'}]}>
                            <View style={{flex:1, flexDirection:'row', alignItems:"center"}}>
                            {person}
                            <Text style={[styles.buttonText, { fontSize:30}]}>  1 PLAYER</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={[styles.row, {flex:2}]}>
                    <TouchableNativeFeedback
                      onPress={() => this.startGame(false)}
                    >
                        <View style={[styles.button, {backgroundColor:'#E94F37'}]}>
                            <View style={{flex:1, flexDirection:'row', alignItems:"center"}}>
                            {people}
                            <Text style={[styles.buttonText, { fontSize:30}]}>  2 PLAYER</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={[styles.row, {flex:2}]}>
                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate('Settings')}
                    >
                        <View style={[styles.button, {backgroundColor:'#0D1B1E'}]}>
                            {settings}
                            <Text style={styles.buttonText}>  Settings</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                      onPress={() => this.props.navigation.navigate('Instructions')}
                    >
                        <View style={[styles.button, {backgroundColor:'#0D1B1E'}]}>
                            {rules}
                            <Text style={styles.buttonText}>  Rules</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
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

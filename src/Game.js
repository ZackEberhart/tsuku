import React from 'react';
import {view } from 'react-easy-state'
import { StyleSheet, Alert, Text, View, Dimensions, TouchableWithoutFeedback, FlatList, Button, BackHandler} from 'react-native';
import { Menu, MenuOptions, MenuOption,MenuTrigger,} from 'react-native-popup-menu';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import Board from './Board.js';
import gameStore from './gameStore.js'
require("./equalarr.js")()

const myIcon = <Feather style={{paddingRight:5}} name="menu" size={30} color="#E94F37" />;

const optionStyles = {
  optionsContainer: {
  },
  optionsWrapper: {
    padding: 3,
  },
  optionWrapper: {
    margin: 5,
    paddingVertical:10
  },
  optionText: {
    color: 'black',
    fontSize:18
  },
};

export default view( class Game extends React.Component {
  constructor(props){
    super(props);
    this.useAI = this.props.navigation.getParam('useAI')
    this.player= 1
    this.showAds = false
    this.state = {showingAd:false};
    this.props.navigation.setParams({ player: (!gameStore.currentPlayer)?'Black':'White'});
  }

  componentDidMount = () =>{
    this.props.navigation.setParams({ navigation: this.props.navigation});
    this.props.navigation.setParams({ newGameFunc: this.newGame});
    gameStore.findMoves()

    if(this.props.navigation.getParam('newGame')){
      this.newGame()
      this.props.navigation.setParams({ newGame: null});
    }
  } 

  newGame = () =>{
      gameStore.restart()
      gameStore.usingAI = this.useAI
      appStore.addGamePlayed()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);  
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('player')+"'s Turn",
      headerRight: (
      <Menu>
          <MenuTrigger>
          {myIcon}
          </MenuTrigger>
          <MenuOptions customStyles={optionStyles}>
            <MenuOption onSelect={() => gameStore.undoMove(navigation.getParam('useAI'))} text="Undo Move"/>
            <MenuOption onSelect={navigation.getParam('newGameFunc')} text="New Game"/>
            <MenuOption onSelect={() => navigation.getParam('navigation').navigate('Settings')} text="Settings"/>
          </MenuOptions>
        </Menu>
      ) 
    };
  };

  backHandler = () =>{
    if(!gameStore.undoMove(this.useAI)){
      Alert.alert(
          'Quit Game',
          'Quit game and return to the main menu?',
          [
            {text: 'No'},
            {text: 'Yes', onPress: () => this.props.navigation.pop()},
          ],
        );
    } else{
      this.props.navigation.setParams({ player: (!gameStore.currentPlayer)?'Black':'White'});
    }
    return true
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', gameStore.undoMove);
  }

  nextTurn = (move) =>{
    gameStore.makeMove(move)
    gameStore.nextTurn(move, this.useAI)
    this.props.navigation.setParams({ player: (!gameStore.currentPlayer)?'Black':'White'});
  }

  row = (rid) =>{
    const boards = [0, 1].map((cid, index)=>(
      <Board 
        key={index}
        rid={rid} 
        cid={cid} 
        callback={this.nextTurn}
      />
    ))
    return(
      <View style={styles.row}>
        {boards}
      </View>
    )
  }

  render(){
    showingAd = this.state.showingAd
    return (
        <LinearGradient
          style={[
            styles.container,
            {
              flex:1
            },
          ]}
          colors={appStore.darkMode?['#364652','#BFB1C1']:['#E9EBF8','#8F818a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 2 }}
          onStartShouldSetResponder = {gameStore.unfocus}
        >
          <NavigationEvents
            onDidFocus = {  payload => {BackHandler.addEventListener('hardwareBackPress', this.backHandler)}}
            onWillBlur = { payload =>{BackHandler.removeEventListener('hardwareBackPress', this.backHandler)}}
          />
          {showingAd ? (
            <View style={{position:'absolute', height:'100%', width:'100%', backgroundColor:'black', justifyContent:'center', alignItems:"center"}}>
              <Text style={{color:"white"}}> Loading ad... </Text>
            </View>
          ):(  
          <View style={styles.container} >
            <View style={styles.game}>
              {this.row(0)}
              {this.row(1)}
            </View>
            <View style={{height:60}}>
            </View>
          </View>
          )}
         </LinearGradient>
    );
  }
})




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  buttonStyle:{
    backgroundColor:"yellow",
    height:20
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  game:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    margin:1,
  },

  row:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
});


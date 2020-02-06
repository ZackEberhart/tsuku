import React from 'react';
import {view } from 'react-easy-state'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Style, Dimensions, Button, BackHandler} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo-linear-gradient'

const styles = StyleSheet.create({

  passive:{
    color: '#a2feb2',
  },
  aggressive:{
    color: '#fea2b2',
  },
  bold:{
    fontStyle:"italic"
  },
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#E9EBF8',
    alignItems:'center',
    justifyContent: 'center'
  },
  
  slide:{
    backgroundColor:'green',
    flex:1
  },

  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize:18,
    paddingHorizontal: 16,
    textAlign:'justify',
    fontWeight:"500"
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },

});

const slides = [
  {
    title: 'Tutorial',
    text: <Text>Welcome! This tutorial will teach you how to play <Text style={styles.bold}>Tsuku.</Text></Text>,
    image: require('../assets/logo.png'),
    colors: ['#E9EBF8', '#ADABAE'],
    key:"0"
  },
  {
    title: 'Objective',
    text: <Text>The goal of the game is to push all of your opponent's pieces off of any one board.
    {"\n\n"}In the game above, White has won.</Text>,
    image: require('../assets/rules/rules_1.png'),
    colors: ['#E9EBF8', '#ADABAE'],
    key:"1"
  },
  {
    title: 'Overview',
    text: <Text>At the start, the boards are arranged as shown.{"\n\n"}The game is played in alternating turns.
    Each turn consists of two moves: a "<Text style={styles.passive}>Passive</Text>" move, 
    and an "<Text style={styles.aggressive}>Aggressive</Text>" move.</Text>,
    image: require('../assets/rules/rules_2.png'),
    colors: ['#E9EBF8', '#ADABAE'],
    key:"2"
  },
  {
    title: 'Passive Move',
    text: <Text>The <Text style={styles.passive}>Passive</Text> move is played on one of the two "home boards" closest to the player.
    {"\n\n"}These boards are automatically highlighted during the <Text style={styles.passive}>Passive</Text> move.</Text>,
    image: require('../assets/rules/rules_3.png'),
    colors: ['#EFFFED', '#C9DBCE'],
    key:"3"
  },
  {
    title: 'Passive Move',
    text: <Text>The player moves one of their pieces on a home board up to two squares in any unobstructed direction. 
          It may not push or hop over any other piece of any color.{"\n\n"}The board will automatically display all allowable 
          Passive moves when a piece is selected.</Text>,
    image: require('../assets/rules/rules_4.png'),
    colors: ['#EFFFED', '#C9DBCE'],
    key:"4"
  },
  {
    title: 'Aggressive Move',
    text: <Text>After the <Text style={styles.passive}>Passive</Text> move, the player makes an <Text style={styles.aggressive}>Aggressive</Text> move on either board of the opposite color.</Text>,
    image: require('../assets/rules/rules_5.png'),
    colors: ['#FFEFEE', '#D9CBCE'],
    key:"5"
  },
  {
    title: 'Aggressive Move',
    text: <Text>The <Text style={styles.aggressive}>Aggressive</Text> move must be in the same direction and of the same distance as the passive move.</Text>,
    image: require('../assets/rules/rules_6.png'),
    colors: ['#FFEFEE', '#D9CBCE'],
    key:"6"
  },
  {
    title: 'Aggressive Move',
    text: <Text>The <Text style={styles.aggressive}>Aggressive</Text> move may push one of the opponent's pieces. Pieces can be pushed off the board in any direction.
    Only one piece can be pushed at a time.{"\n\n"}The board will automatically display any allowed <Text style={styles.aggressive}>Aggressive</Text> move 
    when a piece is selected.</Text>,
    image: require('../assets/rules/rules_7.png'),
    colors: ['#FFEFEE', '#D9CBCE'],
    key:"7"
  },
  {
    title: 'Both Moves, Kinda',
    text: <Text><Text style={styles.passive}>Passive</Text> moves can only be made if there is a corresponding <Text style={styles.aggressive}>Aggressive</Text> move available.</Text>,
    image: require('../assets/rules/rules_8.png'),
    colors: ['#FFEFEE', '#D9CBCE'],
    key:"8"
  },
  {
    title: 'Objective',
    text: <Text>The first player to push all of the opponent's pieces off of any board wins!</Text> ,
    image: require('../assets/rules/rules_1.png'),
    colors: ['#E9EBF8', '#ADABAE'],
    key:"9"
  },
];

export default class Instructions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showRealApp: false
    }
  }
  

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:"Rules"
    };
  }

  
  _renderItem = (item) => {
    textColor = appStore.darkMode?'#E9EBF8':"#0D1B1E"
    colors=appStore.darkMode?['#364652','#BFB1C1']:['#E9EBF8','#8F818a']

    return (
      <LinearGradient
          style={{flex:1, alignItems:'stretch'}}
          colors={colors}
          // colors={[ '#CCC5B9','#FFFCF2',]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 2.5 }}
        >
        <View style={{flex:.05}}/>
        <View style={{flex:.05}}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={{flex:.5}}>
          <View>
            <Image 
              source={item.image} 
              style={{width: Dimensions.get('window').width, height:'100%'}}
              resizeMode='contain'
            />
          </View>
        </View>
        <View style={{flex:.4}}>
          <Text style={[styles.text,{color:textColor}]}>{item.text}</Text>
        </View>
     </LinearGradient>
    )
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.props.navigation.pop()
  }  

  render(){
    return (
        // <AppIntroSlider slides={slides} onDone={this._onDone}/>
        <AppIntroSlider renderItem={(item)=>this._renderItem(item.item)} slides={slides} onDone={this._onDone}/>
    )
  }
}



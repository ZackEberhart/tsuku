import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback, 
  ImageBackground, Animated, Image} from 'react-native';
  
var Color = require('color');


export default class Square extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    highlight = this.props.highlighted?"#ffff88":this.props.color
    highlight = this.props.option&&appStore.showPossibleMoves?"#88ff88":highlight
    borderColor = this.props.recent&&appStore.showRecentMoves?'#88ff88':highlight
    var icon = (this.props.occupant=='b') ? require('../assets/black.png') : require('../assets/white.png')
 
    return(
      <TouchableWithoutFeedback onPressOut = {()=>this.props.callback(this.props)}>
        <View style={squareStyle(highlight, borderColor)}>
            {this.props.occupant!="" &&
              <Image source={icon} style={occupantStyle()} resizeMode="contain" fadeDuration={0}/>
            }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const occupantStyle = ()=>{
  return({
    width:undefined,
    height:undefined,
    flex:1,
  })
}

const squareStyle = (color, borderColor)=>{
  elev = (color=='#88ff88'?3:0)
  return({
    backgroundColor: color,
    borderRadius:4,
    borderColor:borderColor,
    borderWidth:3,
    flex:.5,
    margin:1.5,
    alignItems: 'stretch',
  })
}




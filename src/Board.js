import React from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground, TouchableWithoutFeedback, Animated} from 'react-native';
import {view } from 'react-easy-state'
import Square from './Square.js';
import gameStore from './gameStore.js'
import appStore from './appStore.js'

var Color = require('color');

export default view (class Board extends React.Component {
  constructor(props){
    super(props);
    this.board = gameStore.boards[this.props.rid][this.props.cid]
  }

  callback = (props) =>{
    if(gameStore.inPlay(this.props.rid, this.props.cid)){
      if(this.board.occupant(props.rid, props.cid)==gameStore.currentColor()){
        gameStore.focus(this.props, props)
      }else if(this.board.hasFocus()){
        move = {
          brid:this.props.rid, bcid:this.props.cid,
          srid:this.board.focusedSquare[0],scid:this.board.focusedSquare[1],
          trid:props.rid, tcid:props.cid
        }
        if(gameStore.legalMove(move, gameStore.currentMove) && this.board.hasMove(move, gameStore.currentMove)){
          this.props.callback(move)
        }
        gameStore.unfocus(this.props)
      }else{
        gameStore.unfocus(this.props)
      }
    }
  }

  row = (rid) =>{
    const boxes = [0, 1, 2, 3].map((cid, index)=>(
     <Square 
       key={index}
       rid={rid} 
       cid={cid} 
       callback={this.callback} 
       color={this.color}
       occupant={this.board.occupant(rid,cid)}
       highlighted={this.board.isFocused(rid,cid)}
       recent={gameStore.isRecentMove(this.props.rid, this.props.cid, rid, cid)}
       option = {this.board.isOption(rid,cid, gameStore.currentMove)}
     />
    ))
    return(
      <View style={styles.row}>
        {boxes}
      </View>
    )
  }

  render(){
    this.color = Color(appStore.boardColors[this.props.cid])
    opacity = gameStore.inPlay(this.props.rid, this.props.cid) || !appStore.fadeBoards ? 1 : .6
    return(
      <View style={[styles.board, {opacity:opacity ,backgroundColor:this.color.darken(.55).string(),borderColor:this.color.darken(.75).string()}]}>
          {this.row(0)}
          {this.row(1)}
          {this.row(2)}
          {this.row(3)}
      </View>
    );
  }
})

const styles = StyleSheet.create({
  board:{
    flexDirection: 'column',
    flex:1,
    aspectRatio:1,
    padding:1,
    margin:1,
    borderRadius:5,
    elevation:3,
    borderWidth:2,
  },
  row:{
    flexDirection: 'row',
    flex:1
  },
});





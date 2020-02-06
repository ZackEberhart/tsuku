import React from 'react';
import {view } from 'react-easy-state'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList, Modal, Button, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import SettingsList from 'react-native-settings-list';
import { TriangleColorPicker, fromHsv, toHsv } from 'react-native-color-picker'
var Color = require('color');

const Board = (props) => {
  color = Color(props.color)
  darkColor = color.darken(.55).opaquer(2).string()
  darkBorder = color.darken(.75).opaquer(2).string()
  lightColor = color.string()
  return(
  <View style={{flex:1, margin:3, flexDirection:'row'}}>
    <View style={[styles.board, {backgroundColor:darkColor,borderColor:darkBorder}]}>
      <View style={styles.boardRow}>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
      </View>
      <View style={styles.boardRow}>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
      </View>
      <View style={styles.boardRow}>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
      </View>
      <View style={styles.boardRow}>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
        <View style={[styles.boardSquare, {backgroundColor:lightColor,borderColor:lightColor}]}/>
      </View>
    </View>
  </View>
  )
}

export default class Settings extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedColorIndex:0,
      selectedColor:"#a21344",
      boardColors:appStore.boardColors,
    }
  }

  selectColorIndex = (index) => {
    this.setState( (state) => ({selectedColorIndex:index, selectedColor:state.boardColors[index]}))
  }

  selectColor = (color) => {
    color_rgb = fromHsv(color)
    console.log("selected ", color)
    this.setState((state)=>{
      colors = state.boardColors
      colors[state.selectedColorIndex] = color_rgb
      return({
        boardColors:colors,
        selectedColor:color
      })
    })
  }

  close = () =>{
    appStore.setBoardColors(this.state.boardColors)
    this.props.callback()
  }

  render(){
    return(
      <Modal
      animationType="fade"
      transparent={true}
      visible={this.props.visible}
      onRequestClose={this.close}
      onShow={()=>this.setState((state)=>{return({selectedColor:appStore.boardColors[state.selectedColorIndex], boardColors:appStore.boardColors})})}
    >
      <View 
        style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"#000000BB"}}
        // onStartShouldSetResponder = {this.close}
      >
        <View style={{width:'80%', height:'70%', borderRadius:15, backgroundColor:'#364652', elevation:5}}>
          
          <View style={{flex:.1, backgroundColor:"#0D1B1E", justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}>
            
            <TouchableOpacity
              onPress={this.close}
              style={{alignSelf:'flex-end', position:'relative', right:15, width: 30, height:30,}}
            >
              <View style={{justifyContent:"center", padding:5, borderRadius:15, backgroundColor:'#E94F37'}}>
                <Text style={{color:"#E9EBF8", fontSize:15, textAlign:"center"}}>X</Text>
              </View>
            </TouchableOpacity>
            <View style={{width:'100%', height:'100%',justifyContent:"center", position:'absolute', alignItems:'center'}}>
              <Text style={{color:"#E9EBF8", fontSize:18, fontWeight:'bold'}}>Select Board Colors</Text>
            </View>
          </View>

          <View style={{flex:.4, flexDirection:'row', alignItems:"stretch", margin:5}}>
            <TouchableOpacity style={{flex:1, flexDirection:'row', alignSelf:"center"}} onPress={()=>this.selectColorIndex(0)}>
              <Board color={this.state.boardColors[0]}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1, flexDirection:'row', alignSelf:"center"}} onPress={()=>this.selectColorIndex(1)}>
              <Board color={this.state.boardColors[1]}/>
            </TouchableOpacity>
          </View>

          <View style={{flex:.45, flexDirection:'row'}}>
            <View style={{flex:.3, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
              <TouchableOpacity onPress={()=>this.selectColorIndex(0)}>
                <View 
                  style = {{height:50, width:50, backgroundColor:this.state.boardColors[0], borderRadius:10, borderWidth:5, borderColor:this.state.selectedColorIndex?this.state.boardColors[0]:"#E9EBF8"}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.selectColorIndex(1)}>
                <View 
                  style = {{height:50, width:50, backgroundColor:this.state.boardColors[1], borderRadius:10, borderWidth:5, borderColor:this.state.selectedColorIndex?"#E9EBF8":this.state.boardColors[1]}}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: .7, padding:15}}>
              <TriangleColorPicker
                onColorChange={color => this.selectColor(color)}
                style={{flex:1}}
                color={this.state.selectedColor}
              />
            </View>
          </View>

          <View style={{flex:.05}}/>
        </View>
      </View>
    </Modal>
    )
  }
}

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

  boardRow:{
    flexDirection: 'row',
    flex:1
  },

  boardSquare:{
    borderRadius:4,
    flex:.5,
    margin:1.5,
    alignItems: 'stretch',
  }

});
import React from 'react';
import {view } from 'react-easy-state'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableHighlight, FlatList, Modal, Button, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import SettingsList from 'react-native-settings-list';
import { TriangleColorPicker } from 'react-native-color-picker'
import ColorPickerModal from './ColorPickerModal.js';
var Color = require('color');

export default class Settings extends React.Component {

	static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Settings",
    };
  };

  constructor(props){
    super(props);
    this.state={
      showColorPicker:false,
      vibration:appStore.vibration,
      showPossibleMoves:appStore.showPossibleMoves,
      showRecentMoves:appStore.showRecentMoves,
      fadeBoards:appStore.fadeBoards,
      darkMode:appStore.darkMode,
      boardColors:appStore.boardColors,
    }
  }

  hidePicker = () => {
    this.setState({showColorPicker:false})
  }

  render(){
    textColor = appStore.darkMode?'#E9EBF8':"#0D1B1E"
    return (
      <LinearGradient
          style={{flex:1}}
          colors={appStore.darkMode?['#364652','#BFB1C1']:['#E9EBF8','#BFB1C1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
        >
          <View style={styles.container}>

            <ColorPickerModal visible = {this.state.showColorPicker} callback = {()=>this.hidePicker()}/>

          	<SettingsList borderColor='#d6d5d9'>
              <SettingsList.Header headerText='Appearance' headerStyle={{color:textColor}}/>
              <SettingsList.Item
                title='Dark Mode'
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                hasNavArrow={false}
                itemWidth={50}
                hasSwitch={true}
                switchState={this.state.darkMode}
                switchOnValueChange={(val) => {
                  this.setState({darkMode:val})
                  appStore.setDarkMode(val)
                }}
              />
              <SettingsList.Item
                title='Boards'
                hasNavArrow={true}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                itemWidth={50}
                onPress={()=>{this.setState({showColorPicker:true})}}
              />
               <SettingsList.Item
                title='Pieces'
                titleInfo='Coming Soon'
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                titleStyle={{color:'gray'}}
                hasNavArrow={false}
                // hasNavArrow={true}
                itemWidth={50}
              />
              <SettingsList.Header headerText='1 Player Gameplay' headerStyle={{color:textColor}}/>
              <SettingsList.Item
                title='AI Difficulty'
                titleInfo='Coming Soon'
                titleStyle={{color:'gray'}}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                hasNavArrow={false}
                // hasNavArrow={true}
                itemWidth={50}
              />
              <SettingsList.Item
                title='Player Color'
                titleInfo='Coming Soon'
                titleStyle={{color:'gray'}}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                hasNavArrow={false}
                // hasNavArrow={true}
                itemWidth={50}
                // switchOnValueChange={(val) => appStore.setDarkMode(val)}
              />
              <SettingsList.Header headerText='Other Settings' headerStyle={{color:textColor}}/>
              <SettingsList.Item
                title='Vibration'
                hasNavArrow={false}
                itemWidth={50}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                hasSwitch={true}
                switchState={this.state.vibration}
                switchOnValueChange={(val) => {
                  this.setState({vibration:val})
                  appStore.setVibration(val)
                }}
              />
              <SettingsList.Item
                title='Fade Non-Playable Boards'
                hasNavArrow={false}
                itemWidth={50}
                hasSwitch={true}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                switchState={this.state.fadeBoards}
                switchOnValueChange={(val) => {
                  this.setState({fadeBoards:val})
                  appStore.setFadeBoards(val)
                }}
              />
              <SettingsList.Item
                hasNavArrow={false}
                itemWidth={50}
                hasSwitch={true}
                title='Show Previous Move'
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                switchState={this.state.showRecentMoves}
                switchOnValueChange={(val) => {
                  this.setState({showRecentMoves:val})
                  appStore.setShowRecentMoves(val)
                }}
              />
              <SettingsList.Item
                hasNavArrow={false}
                itemWidth={50}
                hasSwitch={true}
                title='Show Possible Moves'
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                switchState={this.state.showPossibleMoves}
                switchOnValueChange={(val) => {
                  this.setState({showPossibleMoves:val})
                  appStore.setShowPossibleMoves(val)
                }}
              />
              <SettingsList.Header headerStyle={{color:'white'}}/>
              <SettingsList.Item
                title='About'
                hasNavArrow={false}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                // titleStyle={{color:'#E94F37', fontWeight:"bold"}}
                itemWidth={50}
                onPress={() => this.props.navigation.navigate('About')}
              />
              <SettingsList.Item
                title='Reset All Settings'
                hasNavArrow={false}
                backgroundColor = {appStore.darkMode?'#E9EBF8':'white'}
                titleStyle={{color:'#E94F37', fontWeight:"bold"}}
                itemWidth={50}
                onPress={()=>{
                  Alert.alert(
                    'Reset',
                    'Reset Tsuku to the default settings?',
                    [
                      {text: 'No'},
                      {text: 'Yes', onPress: () => {
                        appStore.reset()
                        this.setState({
                          vibration:appStore.vibration,
                          showPossibleMoves:appStore.showPossibleMoves,
                          showRecentMoves:appStore.showRecentMoves,
                          fadeBoards:appStore.fadeBoards,
                          darkMode:appStore.darkMode,
                          boardColors:appStore.boardColors,
                        })
                      }},
                    ],
                  );
                }}
              />
            </SettingsList>
          </View>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'stretch',
    justifyContent: 'center',
    margin:5
  },

  row:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    width:'90%'
  },

  buttons:{
      width:'70%',
      height:'70%'
  },

  button:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal:10,
    elevation:5,
    borderRadius:5,
    height:'80%'
  },

  buttonText:{
    color:'#E9EBF8',
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold',
    textAlignVertical:'center'
  },

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
    borderWidth:3,
    flex:.5,
    margin:1.5,
    alignItems: 'stretch',
  }

});
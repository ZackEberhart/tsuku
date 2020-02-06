import {store} from 'react-easy-state'
import {AsyncStorage} from 'react-native';

appStore = store({     
	vibration:true, 
	showPossibleMoves:true,
	showRecentMoves:true,
	fadeBoards:true,
	darkMode:false,
	boardColors:["#c8c8c8", "#c93e2b"],
	pieces:"default",
	gamesPlayed:0,

	async fetchSettings(){
		try {
			const darkMode = await AsyncStorage.getItem('darkMode');
			if (darkMode !== null) appStore.darkMode=JSON.parse(darkMode)
			const vibration = await AsyncStorage.getItem('vibration');
			if (vibration !== null) appStore.vibration=JSON.parse(vibration)
			const showPossibleMoves = await AsyncStorage.getItem('showPossibleMoves');
			if (showPossibleMoves !== null) appStore.showPossibleMoves=JSON.parse(showPossibleMoves)
			const showRecentMoves = await AsyncStorage.getItem('showRecentMoves');
			if (showRecentMoves !== null) appStore.showRecentMoves=JSON.parse(showRecentMoves)
			const fadeBoards = await AsyncStorage.getItem('fadeBoards');
			if (fadeBoards !== null) appStore.fadeBoards=JSON.parse(fadeBoards)
			const boardColors = await AsyncStorage.getItem('boardColors');
			if (boardColors !== null) appStore.boardColors=JSON.parse(boardColors)
			const gamesPlayed = await AsyncStorage.getItem('gamesPlayed');
			if (gamesPlayed !== null) appStore.gamesPlayed=JSON.parse(gamesPlayed)
		} catch (error) {
			// Error retrieving data
		}
	},

	async reset(){
		appStore.vibration = true 
		appStore.showPossibleMoves = true
		appStore.showRecentMoves = true
		appStore.fadeBoards = true
		appStore.darkMode = true
		appStore.boardColors = ["#c8c8c8", "#c93e2b"]
		appStore.pieces = "default"
		try{
			await AsyncStorage.removeItem('vibration');
			await AsyncStorage.removeItem('showPossibleMoves');
			await AsyncStorage.removeItem('showRecentMoves');
			await AsyncStorage.removeItem('fadeBoards');
			await AsyncStorage.removeItem('darkMode');
			await AsyncStorage.removeItem('boardColors');
			await AsyncStorage.removeItem('pieces');
		}catch (error){

		}
	},

	async setVibration(value){
		appStore.vibration = value
		try {
			await AsyncStorage.setItem('vibration', value.toString());
		} catch (error) {
			// Error saving data
		}
	},

	async setShowPossibleMoves(value){
		appStore.showPossibleMoves = value
		try {
			await AsyncStorage.setItem('showPossibleMoves', value.toString());
		} catch (error) {
			// Error saving data
		}
	},

	async setShowRecentMoves(value){
		appStore.showRecentMoves = value
		try {
			await AsyncStorage.setItem('showRecentMoves', value.toString());
		} catch (error) {
			// Error saving data
		}
	},

	async setFadeBoards(value){
		appStore.fadeBoards = value
		try {
			await AsyncStorage.setItem('fadeBoards', value.toString());
		} catch (error) {
			// Error saving data
		}
	},

	async setBoardColors(value){
		appStore.boardColors = value
		try {
			await AsyncStorage.setItem('boardColors', JSON.stringify(value));
		} catch (error) {
			// Error saving data
		}
	},

	async addGamePlayed(){
		appStore.gamesPlayed += 1
		try {
			await AsyncStorage.setItem('gamesPlayed', appStore.gamesPlayed.toString());
		} catch (error) {
			// Error saving data
		}
	},

	async setDarkMode(value){
		appStore.darkMode = value
		try {
			await AsyncStorage.setItem('darkMode', value.toString());
		} catch (error) {
			// Error saving data
		}
	},

	async setBoardColors(value){
		appStore.boardColors = value
		try {
			await AsyncStorage.setItem('boardColors', JSON.stringify(value));
		} catch (error) {
			// Error saving data
		}
	},
})


export default appStore
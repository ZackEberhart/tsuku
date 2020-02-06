import {store} from 'react-easy-state'
import { BackHandler, Vibration, Alert} from 'react-native';
import boardStore from './boardStore.js'
import appStore from './appStore.js'

gameStore = store({     
	gameGoing:true,
	currentPlayer:1,
	currentMove:0,
	lastSide:0,
	usingAI:false,
	boards:[[boardStore(),boardStore()],[boardStore(),boardStore()]],
	lastMove:[],
	recentMoves:[],
	allMoves:[],

	nextTurn(move, useAI){
		if(winner=gameStore.gameWon(move)){
			gameStore.gameGoing = false
			 Alert.alert(
	          winner + " wins!",
          	  "Play again?",
	          [
	            {text: 'Close'},
	            {text: 'New Game', onPress: () => gameStore.restart()},
	          ],
	        );
		}else{
			if(gameStore.currentMove==0){
				gameStore.currentMove=1
				gameStore.lastSide=move.bcid
			}else{
				gameStore.currentPlayer=((gameStore.currentPlayer)?0:1),
				gameStore.currentMove=0
			}
			gameStore.findMoves()
			if(gameStore.currentPlayer==0 && useAI){
				gameStore.AITurn()
			}else{
				if(appStore.vibration) Vibration.vibrate(50)
			}
		}
		
	},

	isRecentMove(brid, bcid, srid, scid){
		if(gameStore.recentMoves && !gameStore.recentMoves.equals([])){
			for(let i = 0; i<gameStore.recentMoves.length; i++){
				let move = gameStore.recentMoves[i]
				if(brid == move.brid && bcid == move.bcid && srid == move.srid && scid == move.scid) return true
				if(brid == move.brid && bcid == move.bcid && srid == move.trid && scid == move.tcid) return true
			}
		}
		return false
	},

	makeMove(move){
		let board = gameStore.boards[move.brid][move.bcid]
		let moveMade = board.makeMove(move)
		let vr = move.trid-move.srid
		let vc = move.tcid-move.scid
		if(gameStore.lastMove.equals([])){
			gameStore.lastMove=[vr,vc]
			gameStore.allMoves.push([moveMade])
		}
		else{ 
			gameStore.lastMove=[]
			gameStore.allMoves[gameStore.allMoves.length-1].push(moveMade)
		}
		gameStore.recentMoves = gameStore.allMoves[gameStore.allMoves.length-1]
	},

	undoMove(useAI){
		let move = gameStore.allMoves.pop()
		gameStore.recentMoves = gameStore.allMoves[gameStore.allMoves.length-1]
		if(move){
			gameStore.gameGoing=true
			move.reverse().map(m=>{
				let board = gameStore.boards[m.brid][m.bcid]
				let player = board.board[m.trid][m.tcid]
				gameStore.currentMove=0
				gameStore.lastMove=[]
				gameStore.currentPlayer= ((player=="w")?1:0)
				board.undoMove(m)
				if(appStore.vibration) Vibration.vibrate(30)
			})
			gameStore.findMoves()
			gameStore.unfocus()
			if(useAI && gameStore.currentPlayer==0){
				gameStore.undoMove(useAI)
			}
			return true
		}else{
			return false	
		}
	},

	AITurn(){
		move = gameStore.AIChooseMove()
		gameStore.makeMove(move)
    	gameStore.nextTurn(move, true)
	},

	AIChooseMove(){
		moves = gameStore.getAllMoves()
		move = moves[Math.floor(Math.random()*moves.length)]
		return move
	},

	getAllMoves(){
		let ms = []
		for(let row = 0; row < gameStore.boards.length; row++){
			for(let col = 0; col < gameStore.boards[row].length; col++){
				if(gameStore.inPlay(row,col)){
					if(boardStore.currentMove) ms = ms.concat(gameStore.boards[row][col].passiveMoves)
					else ms = ms.concat(gameStore.boards[row][col].activeMoves)
				}
			}
		}
		return ms
	},

	restart(){
		gameStore.gameGoing = true
		gameStore.currentPlayer = 1
		gameStore.currentMove = 0
		gameStore.usingAI = false
		gameStore.lastSide = 0
		gameStore.focusedBoard = []
		gameStore.focusedSquare = [] 
		gameStore.lastMove = []
		gameStore.recentMoves = []
		gameStore.allMoves = []
		gameStore.boards.flat().map(board=>board.reset())
		gameStore.findMoves()
	},

	findMoves(){
		for(let row = 0; row < gameStore.boards.length; row++){
			for(let col = 0; col < gameStore.boards[row].length; col++){
				gameStore.findActiveMoves(row, col)
			}
		}
		for(let row = 0; row < gameStore.boards.length; row++){
			for(let col = 0; col < gameStore.boards[row].length; col++){
				gameStore.findPassiveMoves(row, col)
			}
		}
	},

	findActiveMoves(brow, bcol){
		let board = gameStore.boards[brow][bcol]
		let moves = []
		for(let srow = 0; srow < board.board.length; srow++){
			for(let scol = 0; scol < board.board[srow].length; scol++){
				if(board.board[srow][scol] == gameStore.currentColor()){
					for(let trow = 0; trow < board.board.length; trow++){
						for(let tcol = 0; tcol < board.board[trow].length; tcol++){
							let move = {
					          brid:Number(brow), bcid:Number(bcol),
					          srid:Number(srow), scid:Number(scol),
					          trid:Number(trow), tcid:Number(tcol)
					        }
					        if(gameStore.legalMove(move, 1)) moves.push(move)
						}
					}
				}
			}
		}
		board.setActiveMoves(moves)
	},

	findPassiveMoves(brow, bcol){
		let board = gameStore.boards[brow][bcol]
		let limitations = gameStore.findLimitations(bcol)
		let moves = []
		for(let srow = 0; srow < board.board.length; srow++){
			for(let scol = 0; scol < board.board[srow].length; scol++){
				if(board.board[srow][scol] == gameStore.currentColor()){
					for(let trow = 0; trow < board.board.length; trow++){
						for(let tcol = 0; tcol < board.board[trow].length; tcol++){
							let move = {
					          brid:Number(brow), bcid:Number(bcol),
					          srid:Number(srow), scid:Number(scol),
					          trid:Number(trow), tcid:Number(tcol)
					        }
							if(gameStore.legalMove(move, 0) && gameStore.notLimited(move, limitations)){
								moves.push(move)
							} 
							board = gameStore.boards[brow][bcol]
						}
					}
				}
			}
		}
		board.setPassiveMoves(moves)
	},

	findLimitations(scol){
		let limitations = []
		let c = (scol) ? 0 : 1
		for(let r = 0; r< gameStore.boards.length; r++){
			let board = gameStore.boards[r][c]
			board.getActiveMoveTypes().map(move=>limitations.push(move))
		}
		return limitations
	},

	notLimited(move, limitations){
		let vr = move.trid-move.srid
		let vc = move.tcid-move.scid
		let moveType = [vr,vc]
		for(let limitation of limitations){
			if(moveType.equals(limitation)) return true
		}
		return false
	},
	
	legalMove(move, currentMove){
		let vr = move.trid-move.srid
		let vc = move.tcid-move.scid
		let sr = move.srid
		let sc = move.scid
		let r = Math.sign(vr)
		let c = Math.sign(vc)
		if(!gameStore.lastMove.equals([]) && !gameStore.lastMove.equals([vr,vc])) return false
		let pusheur = ""
		let board = gameStore.boards[move.brid][move.bcid].board
		if(Math.abs(vr)>2 || Math.abs(vc)>2) return false
		if(vr!=0 && vc!=0 && Math.abs(vr)!=Math.abs(vc)) return false
		if(vr==0 && vc==0) return false
		while(vr != 0 || vc != 0){
			r = Math.sign(vr)
			c = Math.sign(vc)
			sr += r
			sc += c
			vr -= r
			vc -= c
			if(board[sr][sc]!="") pusheur = board[sr][sc]
			if(pusheur != "" && currentMove == 0) return false
			if(pusheur == board[move.srid][move.scid]) return false
			if(pusheur!="" && sr+r >= 0 && sr+r <4  && sc+c>= 0 && sc+c < 4 && board[sr+r][sc+c]!=""){
				return false
			}
		}
		return true
	},

	inPlay(rid, cid){
		if(gameStore.gameGoing){
		    if(!gameStore.currentMove) return rid==gameStore.currentPlayer
		    else return cid != gameStore.lastSide
		}
	},

	currentColor(){
		return gameStore.currentPlayer?'w':'b'
	},

	gameWon(props){
		let board = gameStore.boards[props.brid][props.bcid].board
		return board.flat().includes('w')?(board.flat().includes('b')?false:'White'):'Black'
	},

	focus(boardProps, squareProps){
		gameStore.unfocus()
		gameStore.boards[boardProps.rid][boardProps.cid].focus(squareProps.rid, squareProps.cid)
	},

	unfocus(){
		gameStore.boards.flat().map(board=>board.unfocus())
	},
})


export default gameStore
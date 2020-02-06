import {store} from 'react-easy-state'


boardStore = () => {
		return store({     
		focusedSquare:[], 
		board:[['b', 'b', 'b', 'b'],['','','',''],['','','',''],['w', 'w', 'w', 'w']],
		passiveMoves:[],
		activeMoves:[],

		setActiveMoves(moves){
			this.activeMoves = moves
		},

		setPassiveMoves(moves){
			this.passiveMoves = moves
		},

		isOption(rid,cid,currentMove){
			if(currentMove){
				for(move of this.activeMoves){
					if(move.srid == this.focusedSquare[0] && move.scid == this.focusedSquare[1] 
						&& move.trid == rid && move.tcid == cid) return true
				}
			}else{
				for(move of this.passiveMoves){
					if(move.srid == this.focusedSquare[0] && move.scid == this.focusedSquare[1] 
						&& move.trid == rid && move.tcid == cid) return true
				}
			}
			return false
		},

		makeMove(move){
			sr = move.srid
			sc = move.scid
			vr = move.trid-move.srid
			vc = move.tcid-move.scid
			dist = 0
			pusheur = 0
			
			while(vr != 0 || vc != 0){
				dist += 1
				r = Math.sign(vr)
				c = Math.sign(vc)
				if(this.board[sr+r][sc+c]!=""){
					if(sr+2*r >= 0 && sr+2*r <4  && sc+2*c>= 0 && sc+2*c < 4){
						this.board[sr+2*r][sc+2*c] = this.board[sr+r][sc+c]
					}
					if(!pusheur) pusheur = dist
				}
				this.board[sr+r][sc+c] = this.board[sr][sc]
				this.board[sr][sc] = ""
				sr += r
				sc += c
				vr -= r
				vc -= c
			}
			return {...move, pusheur:pusheur}
		},

		undoMove(move){
			tr = move.trid
			tc = move.tcid
			sr = move.srid
			sc = move.scid
			vr = move.trid-move.srid
			vc = move.tcid-move.scid
			r = Math.sign(vr)
			c = Math.sign(vc)
			this.board[sr][sc] = this.board[tr][tc]
			this.board[tr][tc] = ""
			if(move.pusheur){
				if(tr+r >= 0 && tr+r <4  && tc+c>= 0 && tc+c < 4){
					this.board[tr+r][tc+c] = ""
				}
				p = (this.board[sr][sc]=='w')?'b':'w'
				this.board[sr+move.pusheur*r][sc+move.pusheur*c] = p
			}
		},

		getActiveMoveTypes(){
			moveTypes = []
			for(move of this.activeMoves){
				vr = move.trid-move.srid
				vc = move.tcid-move.scid
				moveTypes.push([vr,vc])
			}
			return moveTypes
		},

		hasMove(move, currentMove){
			if(currentMove){
				for(let testMove of this.activeMoves){
					if(JSON.stringify(move)==JSON.stringify(testMove)) return true
				}
			}else{
				for(let testMove of this.passiveMoves){
					if(JSON.stringify(move)==JSON.stringify(testMove)) return true
				}
			}
			return false
		},

		reset(){
			this.board = [['b', 'b', 'b', 'b'],['','','',''],['','','',''],['w', 'w', 'w', 'w']]
			this.focusedSquare = []
		},

		hasFocus(){
			return this.focusedSquare.length
		},

		isFocused(rid, cid){
			return [rid, cid].equals(this.focusedSquare)
		},

		focus(rid, cid){
			this.focusedSquare = [rid, cid]
		},

		unfocus(){
			this.focusedSquare = []
		},

		occupant(rid, cid){
			return this.board[rid][cid]
		},

		
	})
}


export default boardStore
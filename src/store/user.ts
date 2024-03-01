import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
     users: [],
     user:{},
     bids:{},
     loading: false,
     payStatus:false
    
    },
    reducers:{
    loginUser(state, action){
            state.user = action.payload
        },
    paystackVerify(state, action){
        state.user = action.payload
    },
    paySuccess(state){
        state.payStatus = true
    },
    payFail(state){
        state.payStatus = false
    },
    shipping(state, action){
        state.user = action.payload
    },
     getUser(state, action){
         state.users = action.payload
     },
     startLoading(state){
         state.loading = true
     }, 
     endLoading(state){
         state.loading = false
     },
    getBids(state, action){
        state.bids = action.payload
    },
 
    }
 })
 
 export const UserActions =  userSlice.actions
 
 export default userSlice.reducer
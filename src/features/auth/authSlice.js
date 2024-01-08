import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";


const userExist = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user : userExist ? userExist : null ,
    isLoading : false ,
    isError : false ,
    isSuccess : false ,
    message : ""
}


const authSlice = createSlice({
    name : "auth" ,
    initialState,
    reducers : {

    } ,

    extraReducers : (builder) =>{
      builder
      .addCase(registerUser.pending , (state , action)=>{
        state.isLoading = true ,
        state.message = ""
      })
      .addCase(registerUser.fulfilled , (state , action)=>{
        state.isLoading = false ,
        state.isSuccess = true ,
        state.user = action.payload ,
        state.message = ""
      })
      .addCase(registerUser.rejected , (state , action)=>{
        state.isLoading = false , 
        state.isSuccess = false , 
        state.isError = true
        state.message = action.payload
      })
      .addCase(logoutUser.fulfilled , (state)=>{
        state.user = null
      })

      .addCase(loginUser.pending , (state , action)=>{
        state.isLoading = true ,
        state.message = ""
      })
      .addCase(loginUser.fulfilled , (state , action)=>{
        state.isLoading = false ,
        state.isSuccess = true ,
        state.user = action.payload ,
        // console.log(state.user)
        state.message = ""
      })
      .addCase(loginUser.rejected , (state , action)=>{
        state.isLoading = false , 
        state.isSuccess = false , 
        state.isError = true
        state.message = "Invalid Crediential"
      })

    }
})

export default authSlice.reducer

export const registerUser = createAsyncThunk("REGISTER/USER" , async(formData , thunkAPI)=>{
   try {
    return await authService.register(formData)
   } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
    
   }
})

export const logoutUser = createAsyncThunk("LOGOUT/USERS" , async()=>{
    localStorage.removeItem("user")
})

export const loginUser = createAsyncThunk("LOGIN/USER" , async(loginData)=>{
   try {
    return await authService.login(loginData)
   } catch (error) {
    console.log(error)
    
   }
  
}) 
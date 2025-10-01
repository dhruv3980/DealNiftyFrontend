import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


const link = import.meta.env.VITE_API_URL;

// login api
export const login = createAsyncThunk(
  "/login",
  async ({ email, password }, { rejectWithValue }) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
       
      },

      withCredentials: true,
    };

    try {
      const { data } = await axios.post(
        `${link}/login-user`,
        { email, password },
        options
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        // error.response?.data || {message:"Login Failed Please Try again Later"}

        {
          status: error.response?.status,
          message: error.response?.data?.message || "Profile not found",
        }
      );
    }
  }
);

// Register Api

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${link}/registeruser`,
        userData,
        config
      );

      return data;
    } catch (error) {
      
      return rejectWithValue(

        
        error.response?.data || {

          message: "Registration failed. please try again later",
        }
      );
    }
  }
);

// for getting profile
export const getProfile = createAsyncThunk(
  "getprofile",
  async (__, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${link}/profile`, {
       
        withCredentials: true, 
      });
      return data;
    } catch (error) {
     
      
      return rejectWithValue({
        
        status: error.response?.status,
        message: error.response?.data?.message || "Profile not found",
      });
    }
  }
);

// for logour user
export const logoutuser = createAsyncThunk('logout', async(_, {rejectWithValue})=>{
  try{
    const {data} = await axios.post(`${link}/logout-user`,{}, {withCredentials:true})
    return data;

  }catch(error){
    return rejectWithValue(error.response?.data||{message:"Failed to logout the user"})
  }
})

// for updating profile
export const updateProfile = createAsyncThunk('updateprofile',async(userData, {rejectWithValue})=>{
  try{
    const option={
      headers:{
        "Content-Type":"multipart/form-Data",
        
      },
     withCredentials: true,

    }

    const {data} = await axios.put(`${link}/update/profile`, userData, option);
    return data;
    

  }catch(error){
    return rejectWithValue (error.response?.data||{message:"Something wrong while update the profile"})

  }
})

// for updating password
export const updatePassword = createAsyncThunk('updatPassword', async(formData, {rejectWithValue})=>{
  try{
    const options={
      headers: {
        "Content-Type": "application/json",
       
      },
      withCredentials:true
    }
    const {data} = await axios.put(`${link}/password/update`, formData, options);
    return data;


  }
  catch(error){
    return rejectWithValue (error.response?.data||{message:"somthing wrong while updaing the password"})
  }
})

// send the token
export const sendtoken = createAsyncThunk('sendToken', async(myformdata, {rejectWithValue})=>{
  try{
    const options={
      headers:{
        "Content-Type":'application/json',
       
      }
    }
    const {data} = await axios.post(`${link}/password/forgot`, myformdata, options);
    return data;

  }catch(error){
    
    return rejectWithValue(error.response?.data|| {message:"something wrong while sending token please try again later"});
  }

})

// change password

export const changePassword = createAsyncThunk('changePassword', async({password, confirmPassword, token, rejectWithValue})=>{
  try{
    const options = {
      headers:{
        "Content-Type":'application/json',
        
      },
      withCredentials:true
    }

    const {data} = 
    await axios.post(`${link}/reset/${token}`, {password, confirmPassword}, options)
    return data;

  }catch(error){
    return rejectWithValue(error.response?.data||{message:'something wrong while updating the password'})
  }

})


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem('isAuthenticated')=='true',
    message:""
    
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },

    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.data?.user || null;
        state.success = action.payload?.success || false;
        state.isAuthenticated = Boolean(action.payload?.data?.user);

        // store in localstorage
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated))
      })
      .addCase(register.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message ||
            "Registration failed. Please try again later");
          state.user = null;
          state.isAuthenticated = false;
      });

    // login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data.user || null;
        state.success = action.payload?.success || false;
        state.isAuthenticated = action.payload?.success || false;
        state.error = null;


        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated))
      })
      .addCase(login.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Try after some time something phissy";
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
        state.success = false;
        
      });

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.data;
        state.isAuthenticated = action.payload?.success || false;

         // store in localstorage
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated))
        
      })

      .addCase(getProfile.rejected, (state, action) => {
        
        state.loading = false;
        
        // state.success = false;
        // state.isAuthenticated = false;

  //       if (action.payload?.status === 401) {
  //   // Unauthorized but DO NOT reset user/auth
  //   state.error = null;
  // } else {
  //   state.error = action.payload?.message || "Failed to load user profile";
  //   state.user = null;
  //   state.isAuthenticated = false;
  // }



    if (action.payload?.status === 401) {
    // Session expired or user not logged in
    state.error = null;
    state.user = null;
    state.isAuthenticated = false;
    state.success = false;

    // clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  } else {
    state.error = action.payload?.message || "Failed to load user profile";
    state.user = null;
    state.isAuthenticated = false;
    state.success = false;

    // also clear storage in other errors
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  }

















       
      });


      // logout casee
      builder
      .addCase(logoutuser.pending, (state, action)=>{
        state.error=null;
        state.loading=false;
      })
      .addCase(logoutuser.fulfilled, (state, action)=>{
        state.loading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated=false;


        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated')

        
          
      })
      .addCase(logoutuser.rejected, (state, action)=>{
        state.loading=false
        state.error = action.payload?.data.message || "Something wrong while logout"
      })

      // for updating the profile
      builder
      .addCase(updateProfile.pending, (state, action)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(updateProfile.fulfilled, (state, action)=>{
        state.loading=false;
        state.error=null;
        state.success=true;
        state.user =action.payload?.data;
        state.isAuthenticated=true
        state.message=action.payload?.message;


         
      })
      .addCase(updateProfile.rejected, (state, action)=>{
        state.loading = false;
        state.error= action.payload?.message||"user profile not updated"
        state.success=false;
        state.message="";
      })

      // for update the pasword
      builder.addCase(updatePassword.pending, (state,action)=>{
        state.loading=true;
        state.error=null;
      } )
      .addCase(updatePassword.fulfilled, (state, action)=>{
        state.error=null;
        state.success=action.payload?.success;
        
        state.message=action.payload?.message;
        state.loading=false;
      })
      .addCase(updatePassword.rejected, (state,action)=>{
        state.error=action.payload?.message||"Something wrong while updating the password";
        state.success = action.payload?.success||false;
        state.message="";
        state.loading=false;

      })

      // sending token
      builder.addCase(sendtoken.pending, (state, action)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(sendtoken.fulfilled, (state, action)=>{
        state.loading=false
        state.success=action.payload?.success||true;
        state.message = action.payload?.message||"Token send successfully"
      })
      .addCase(sendtoken.rejected, (state,action)=>{
        state.loading=false;
        state.success=action.payload?.success||false;
        state.error=action.payload?.message||"Email send failed"
        state.message=action.payload?.message
      })

      //changepassword
      builder.addCase(changePassword.pending, (state,action)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(changePassword.fulfilled, (state,action)=>{
        state.loading=false;
        state.success=action.payload?.success;
        state.isAuthenticated=false;
        state.message=action.payload?.message;
        state.user=null;
      })
      .addCase(changePassword.rejected, (state,action)=>{
        state.loading=false;
        state.success=action.payload?.success||false;
        state.error=action.payload?.message||"Something wrong while updating the password"
      })
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;

export default userSlice.reducer;

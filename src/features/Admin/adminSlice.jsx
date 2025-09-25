import { fabClasses } from "@mui/material/Fab";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const link = import.meta.env.VITE_API_URL;

// fetch all products
export const fetchALLProducts = createAsyncThunk(
  "admin/fetchALLProducts",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.get(`${link}/admin/products`, config);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Error, while fetching the products",
        }
      );
    }
  }
);

// create product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const config = {
        // headers:{
        //     'Content-Type':'application/json'
        // },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${link}/admin/product/create`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Something wrong while creating order",
        }
      );
    }
  }
);

// update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
  try {
    const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    };
    
    const data = await axios.put(`${link}/admin/product/${id}`,formData, config );

    return data;

  } catch (error) {
    return rejectWithValue(error?.response?.data||{message:"Somthing worng while update product"})
    
  }
  }
);

// deleteProduct
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async({id}, {rejectWithValue})=>{
  try{
    const config = {
      withCredentials:true
    }
    const {data}  = await axios.delete(`${link}/admin/product/${id}`, config)
    return data;

  }catch(error){
    return rejectWithValue(error.response?.data||{message:"Something went Wrong while delete the product"})
  }
})

// fetch all users
export const fetchALLUsers = createAsyncThunk('admin/fetchALLUsers', async(_,{rejectWithValue})=>{
  try {
    const config = {
      withCredentials:true
    }

    const {data} = await axios.get(`${link}/admin/users`, config);

    return data

    
  } catch (error) {
    rejectWithValue(error.response?.data||{message:"Something wrong while fetching the users"})
    
  }
})

// get single user details
export const fetchuser = createAsyncThunk('admin/fetchuser', async({id, rejectWithValue})=>{

  try {
    const config = {
      withCredentials:true
    }

    const {data} = await axios.get(`${link}/admin/user/${id}`, config)
    return data;
    
  } catch (error) {
    return rejectWithValue(error.response?.data || {message:"User Details not found"})
    
  }

})

// change userrole 
export const changeUserRole = createAsyncThunk('admin/changeUserRole', async({id, role})=>{
  try {
    const {data} = await axios.put(`${link}/admin/user/${id}`, {role}, {withCredentials:true})

    return data;

    
  } catch (error) {
    return rejectWithValue(error.response?.data||{message:'something wrong while updating the user role'})
    
  }
})


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    success: false,
    loading: false,
    error: null,
    product:{},
    deleteLoading:false,
    users:[],
    user:{}

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
      .addCase(fetchALLProducts.pending, (state, actions) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALLProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
      })
      .addCase(fetchALLProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something wrong while fetching products";
      })

      .addCase(createProduct.pending, (state, actions) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message;
        state.products.push(action.payload?.data);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something wrong while creating products";
      })
      // updating product
      .addCase(updateProduct.pending, (state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(updateProduct.fulfilled, (state, action)=>{
        state.loading=false;
        state.success=true;
        state.product=action.payload?.data

      })
      .addCase(updateProduct.rejected, (state, action)=>{
        state.loading=false
        state.error=action?.payload?.message||"Something wrong during updation"
      })

      // delete product
      .addCase(deleteProduct.pending, (state)=>{
        state.deleteLoading=true;
        state.error=null
      })
      .addCase(deleteProduct.fulfilled, (state, action)=>{
        state.deleteLoading=false;
        state.products = state.products.filter(product=>product._id!==action.payload?.data)
        
        state.products.filter(product=>console.log(product._id!==action?.payload))
      })
      .addCase(deleteProduct.rejected, (state, action)=>{
        state.deleteLoading=false;
        state.error=action.payload?.message||"Product deletion failed"
      })
      // fetch user
      .addCase(fetchALLUsers.pending, (state)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(fetchALLUsers.fulfilled, (state, action)=>{
        state.loading=false;
        state.users=action.payload?.data
      })
      .addCase(fetchALLUsers.rejected, (state, action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Something wrong while fetching user details"
      })

      // get single user
      .addCase(fetchuser.pending, (state)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(fetchuser.fulfilled, (state, action)=>{
        state.loading=false
        state.user = action.payload?.data
      })

      .addCase(fetchuser.rejected, (state, action)=>{
        state.loading=false;
        state.error=action.payload?.message||"something wrong while fetching the user details"
      })

      // change user role
      .addCase(changeUserRole.pending, (state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(changeUserRole.fulfilled, (state)=>{
        state.loading=false
        state.success=true
      })
      .addCase(changeUserRole.rejected, (state, action)=>{
        state.error=action.payload?.message||"Something wrong while update the role"
        state.loading=false;
      })
  },
});

export const { removeErrors, removeSuccess } = adminSlice.actions;

export default adminSlice.reducer;

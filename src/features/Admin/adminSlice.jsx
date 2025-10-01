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

// delete user
export const deleteUser = createAsyncThunk('admin/DeleteUser', async({id}, {rejectWithValue})=>{
  try {
 
    const config = {
      withCredentials:true
    }
    const {data} = await axios.delete(`${link}/admin/user/${id}`, config)
    return data;

  } catch (error) {
    return rejectWithValue(error.response?.data || {message:"User Deletion Failed"})
    
  }
})

// fetch all orders

export const fetchALLOrders = createAsyncThunk('admin/fetchOrders', async(_,{rejectWithValue})=>{
  try {
    const {data} = await axios.get(`${link}/admin/orders`, {withCredentials:true})

    return data;
    
  } catch (error) {
    return rejectWithValue(error.response?.data||{message:"Something wrong while fetching the orders"})

    
  }
})


// delete order
export const deleteOrder = createAsyncThunk('deleteOrder', async(id, {rejectWithValue})=>{
  try {
    const {data} = await axios.delete(`${link}/admin/order/${id}`, {withCredentials:true})

    return data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something Wrong while deleting the order")
    
  }
})

// update order status
export const updateOrderStatus=createAsyncThunk('updateOrderstatus', async({id, status}, {rejectWithValue})=>{

  try {

    const {data} = await axios.put(`${link}/admin/order/${id}`,{status}, {withCredentials:true});

    return data;
    
  } catch (error) {
    return rejectWithValue (error.response?.data||{message:"Something wrong while updating the status"});
    
  }

})

// fetch prodcuct reviews
export const fetchProductReviews = createAsyncThunk('admin/fetchProductReview', async(id, {rejectWithValue})=>{

  try {
    const {data} = await axios.get(`${link}/reviews?id=${id}`, {withCredentials:true})

    return data;
    
  } catch (error) {
    return rejectWithValue(error.response?.data||{message:"Something wrong while fetching reviews"})
    
  }
})

// delete reviews

export const deleteReviews = createAsyncThunk('admin/deleteReviews', async({reviewid, productid}, {rejectWithValue})=>{
  try{
    const {data} = await axios.delete(`${link}/reviews?reviewid=${reviewid}&productid=${productid}`, {withCredentials:true})

    return data;
  }catch(error){
    return rejectWithValue(error.response?.data||{message:"Try again later something wrong while deleting reviews"})
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
    user:{},
    message:null,
    orders:[],
    totalamount:0, 
    reviews:[]

  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    removemessage:(state)=>{
      state.message=null;
    }
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

      // delete user
      .addCase(deleteUser.pending, (state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(deleteUser.fulfilled, (state, action)=>{
        state.loading=false;
        state.message=action.payload?.message||"User Deleted Successfully"
      })
      .addCase(deleteUser.rejected, (state, action)=>{
        state.loading=false;
        state.error=action.payload?.message
      })

      // fetch orders
      .addCase(fetchALLOrders.pending, (state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(fetchALLOrders.fulfilled, (state, action)=>{
        state.loading=false
        state.orders=action.payload?.data.orders
       state.totalamount=action.payload?.data?.totalammount
      })
      .addCase(fetchALLOrders.rejected, (state, action)=>{
        state.error=action.payload?.message||"Something wrong while fetching the orders"
        state.loading=false
      } )

      //deleteorder
      .addCase(deleteOrder.pending, (state)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(deleteOrder.fulfilled,(state,action)=>{
        state.loading=false;
        state.message=action.payload?.data;
        state.success=action.payload?.success
      })
      .addCase(deleteOrder.rejected, (state, action)=>{
        state.error=action.payload?.message||"Something wrong while deleting the order"
        state.loading=false
      })

      // updateOrderstatus
      .addCase(updateOrderStatus.pending, (state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action)=>{
        state.loading=false;
        state.success=true;
      })
      .addCase(updateOrderStatus.rejected, (state, action)=>{
        state.loading=false;
        state.error=action?.payload?.message||"something wrong while update the order status"
      })

      // get all reviews
      .addCase(fetchProductReviews.pending, (state)=>{
        state.loading=true;
        state.error=null;

      })
      .addCase(fetchProductReviews.fulfilled, (state, action)=>{
        state.loading=false;
        state.reviews=action.payload?.data;
        state.success=true
      })
      .addCase(fetchProductReviews.rejected, (state)=>{
        state.loading=false;
        state.error=action.payload?.message||"Something wrong while fetching reviews"
      })
      //deleting reviews

      .addCase(deleteReviews.pending, (state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(deleteReviews.fulfilled, (state, action)=>{
        state.loading=false;
        state.loading=true;
        state.message=action.payload?.message||"Review deleted successfully"
      })
      .addCase(deleteReviews.rejected, (state, action)=>{
        state.loading=false;
        state.error=action.payload?.message||"Something wrong while deleting the review"
      })
  },
});

export const { removeErrors, removeSuccess, removemessage } = adminSlice.actions;

export default adminSlice.reducer;

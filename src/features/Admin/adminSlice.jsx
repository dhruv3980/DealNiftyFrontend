import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

const link =import.meta.env.VITE_API_URL

// fetch all products
export const fetchALLProducts = createAsyncThunk('admin/fetchALLProducts', async(_, {rejectWithValue})=>{

    try {
       const config = {
            headers:{
        "Content-Type":"application/json"
      },
             withCredentials: true,  

        };


        
        const {data} = await axios.get(`${link}/admin/products`, config)
        

        return data;

        
    } catch (error) {
        return rejectWithValue(error.response?.data||{message:"Error, while fetching the products"})
        
    }

})

// create product
export const createProduct = createAsyncThunk('admin/createProduct', async(formData, {rejectWithValue})=>{
    try{
     for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
        
        const config = {
            // headers:{
            //     'Content-Type':'application/json'
            // },
            withCredentials:true

        }

        const {data} = await axios.post(`${link}/admin/product/create`, formData, config);
        return data;
        

    }catch(error){
        return rejectWithValue(error.response?.data||{message:"Something wrong while creating order"})

    }
})

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null

    },

    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
        removeSuccess:(state)=>{
            state.success=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchALLProducts.pending, (state, actions)=>{
            state.loading=true;
            state.error=null;
            
        })
        .addCase(fetchALLProducts.fulfilled,(state, action)=>{
            state.loading=false;
            state.products=action.payload?.data

        })
        .addCase(fetchALLProducts.rejected,(state, action)=>{
            state.loading=false;
            state.error= action.payload?.message||"Something wrong while fetching products"
        })
    
    
        
        .addCase(createProduct.pending, (state, actions)=>{
            state.loading=true;
            state.error=null;
            
        })
        .addCase(createProduct.fulfilled,(state, action)=>{
            state.loading=false;
            state.success=action.payload?.message
            state.products.push(action.payload?.data)

        })
        .addCase(createProduct.rejected,(state, action)=>{
            state.loading=false;
            state.error= action.payload?.message||"Something wrong while creating products"
        })
    
}
})

export const {removeErrors, removeSuccess}=adminSlice.actions 

export default adminSlice.reducer
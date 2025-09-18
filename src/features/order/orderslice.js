import{ createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const link = Import.meta.env.VITE_API_URL

export const createOrder = createAsyncThunk('order/createOrder', async(order, {rejectWithValue})=>{
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }, 
            
            withCredentail:true
        }

        const {data} = await axios.post(`${link}/new/order`, config );

        return data;



    }catch(error){
        return rejectWithValue(error.response?.data || {message:"Order creating failed "})

    }
})
 const orderSlice = createSlice({
    name:'order',
    initialState:{
        success:false,
        loading:false,
        error:null,
        orders:[],
        order:{}
    },
    reducers:{
        removeErrors:(state, action)=>{
            state.error=null
        },
        removesuccess:(state, action)=>{
            state.success=false
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(createOrder.fulfilled, (state, action)=>{
            state.loading = false;
            state.order=action.payload.data;
            state.success=action.payload?.successs

        })

        .addCase(createOrder.rejected, (state, action)=>{
            state.loading = false
            state.error=action.payload?.message||"Order Creating Failed"

        })
    }
})

export const {removeErrors, removesuccess} = orderSlice.actions

export default  orderSlice.reducer
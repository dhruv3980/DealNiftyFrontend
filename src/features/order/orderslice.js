import{ createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const link = import.meta.env.VITE_API_URL

export const createOrder = createAsyncThunk('order/createOrder', async(order, {rejectWithValue})=>{
    try{
        const config = {
           headers: {
            "Content-Type": "application/json",
            },
            withCredentials:true
        }
          const {data} = await axios.post(`${link}/new/order`,order, config );

        
        return data;



    }catch(error){
        return rejectWithValue(error.response?.data || {message:"Order creating failed "})

    }
})

export const getAllMyOrders=createAsyncThunk('order/getAllMyOrders', async(_, {rejectWithValue})=>{
    try {
        const options={
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        }
        const {data} = await axios.get(`${link}/orders/user`,options)
        
        return data;
        
    } catch (error) {
        console.error("Axios error response data:", error.response?.data); 
        return rejectWithValue(error.response?.data || {message:"order Not Found"})
    }

})


// get orders details
export const getorderDetails=createAsyncThunk('order/getorderDetails', async(orderID, {rejectWithValue})=>{
        try {
        const options={
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true
        }
        const {data} = await axios.get(`${link}/order/${orderID}`,options)
        
        
        return data;
        
    } catch (error) {
       
        return rejectWithValue(error.response?.data || {message:"order Not Found"})
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
        removeSuccess:(state, action)=>{
            state.success=false
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(getAllMyOrders.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(getAllMyOrders.fulfilled, (state, action)=>{
            state.loading = false;
            state.orders=action.payload?.data;
            state.success=action.payload?.successs

        })

        .addCase(getAllMyOrders.rejected, (state, action)=>{
            state.loading = false
            state.error=action.payload?.message||"Order Creating Failed"

        })

      
        builder
        .addCase(createOrder.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(createOrder.fulfilled, (state, action)=>{
            state.loading = false;
            state.order=action.payload?.data;
            state.success=action.payload?.success

        })

        .addCase(createOrder.rejected, (state, action)=>{
            state.loading = false
            state.error=action.payload?.message||"Order Creating Failed"

        })

        builder
        .addCase(getorderDetails.pending, (state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(getorderDetails.fulfilled, (state, action)=>{
            state.loading = false;
            state.order=action.payload?.data;
            state.success=action.payload?.success

        })

        .addCase(getorderDetails.rejected, (state, action)=>{
            state.loading = false
            state.error=action.payload?.message||"Failed TO fetch order Details"

        })
    }
})

export const {removeErrors, removeSuccess} = orderSlice.actions

export default  orderSlice.reducer

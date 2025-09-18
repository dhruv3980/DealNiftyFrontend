import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const link = import.meta.env.VITE_API_URL



export const Additemtocart = createAsyncThunk('Additemtocart/cart', async({id, quantity}, {rejectWithValue})=>{
    try{
       
         const {data} = await axios.get(`${link}/product/${id}`);
        
        return {
            product:data.data._id,
            name:data.data.name,
            price:data.data.price,
            stock:data.data.stock,
            quantity,
            image:data.data.images[0].url
        }

    }catch(error){
        return rejectWithValue(error.response?.data||{message:"product not found "})
    }
   
})

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:JSON.parse(localStorage.getItem('cartItem'))||[],
        loading:false,
        success:false,
        error:null,
        message:'',
        removingId:null,
        shippingInfo:JSON.parse(localStorage.getItem('shippingInfo'))||{}

    },

    reducers:{
        removeError:(state,action)=>{
            state.error=null;
        },
        removeSuccess:(state, success)=>{
            state.success=false;
        },
        removemessage:(state, action)=>{
            state.message=null;
        },

        removeItemFromCart:(state, action)=>{
            console.log(action.payload)
            
            state.removingId=action.payload;
            state.cartItems = state.cartItems.filter(item=>item.product!=action.payload);

            localStorage.setItem('cartItem', JSON.stringify(state.cartItems));

            state.removingId=null;
        },
        saveShippingInfo:(state,action)=>{
            state.shippingInfo=action.payload
            localStorage.setItem(`shippingInfo`, JSON.stringify(state.shippingInfo))
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(Additemtocart.pending, (state, action)=>{
            state.loading = true;
            state.error=null;


        })
        .addCase(Additemtocart.fulfilled, (state, action)=>{
            const item = action.payload;
           
            const existitem = state.cartItems.find(i=> i.product==item.product);

            if(existitem){
                
                existitem.quantity = item.quantity
                state.message = `quantity updated successfully`
            }
            else{

                state.message = action.payload.name+' is added to cart successfully'
                state.cartItems.push(action.payload)

            }

            localStorage.setItem('cartItem', JSON.stringify(state.cartItems));


            state.loading = false;
            state.error=null;
            state.success=true;
            

        })

        .addCase(Additemtocart.rejected, (state, action)=>{

           
            state.error=action.payload?.message||"An error occured";
            state.loading=false;
        })

    }

    
})

export const {removeError, removeSuccess, removemessage, removeItemFromCart, saveShippingInfo} = cartSlice.actions;

export default cartSlice.reducer;


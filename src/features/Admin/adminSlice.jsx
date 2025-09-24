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

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    success: false,
    loading: false,
    error: null,
    product:{}
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
  },
});

export const { removeErrors, removeSuccess } = adminSlice.actions;

export default adminSlice.reducer;

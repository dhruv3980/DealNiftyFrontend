import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getProduct = createAsyncThunk("product/getProduct",async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {

          let link = `${API_URL}/products?page=${page}`;
          if (category) {
            link += `&category=${category}`;
          }
          if (keyword) {
            link += `&keyword=${keyword}`;
          }

          const { data } = await axios.get(link);

          return data;
    } 
    catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An Error Occured" }
      );
    }
    
  }
);

// get single product details
export const getProductDetail = createAsyncThunk(
  `product/getProductDetail`,
  async (id, { rejectWithValue }) => {
    try {
      const link = `${API_URL}/product/${id}`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "An Error Occured" }
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,

    resultPerPage: 4,
    totalPages: 0,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        // here to check if any error
        state.products = action.payload?.data?.data;
        state.loading = false;
        state.error = null;
        state.productCount = action.payload.data.productCount;

        state.totalPages = action.payload.data.totalPages;

        state.resultPerPage = action.payload.data.resultPerPage;
      })

      .addCase(getProduct.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Something went wrong");

        state.products = [];
      });

    builder
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload.data);
        state.product = action.payload?.data;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;

        console.log(action.payload);
        state.error =
          action.payload.message ||
          "Something went wrong file fatching product detail";
      });
  },
});

export const { removeErrors } = productSlice.actions;

export default productSlice.reducer;

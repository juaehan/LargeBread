import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
// 액션함수를 위한 hooks 사용
import {pending, fulfilled, rejected} from '../Action';
import axios from 'axios';

const API_URL = `http://localhost:3001`

/* 다중행 데이터 조회를 위한 비동기 함수 */
export const getList = createAsyncThunk('LargeBreadSlice/getList', async(payload,{rejectValue})=>{
  let result = null;
  
  try {
    result = await axios.get(API_URL);
  }catch(err){
    result = rejectValue(err.response);
  }
  return result;
});

/* 단일행 데이터 조회를 위한 비동기 함수 */
export const getItem  = createAsyncThunk('LargeBreadSlice/getItem', async(payload, {rejectWithValue})=>{
  let result = null;

  try{
    result= await axios.get(`${API_URL}/product/${payload?.category_id}`);
  }catch(err){
    result = rejectWithValue(err.response);
  }
  return result;
});


const LargeBreadSlice = createSlice({
  name: 'LargeBreadSlice',
  initialState: {
    data: null,       
    loading: false, 
    error:null        
  },
  reducers: {},
  extraReducers: {

  /* 다중행 데이터 조회를 위한 액션 함수 */
  [getList.pending]: pending,
  [getList.fulfilled]: fulfilled,
  [getList.rejected]: rejected,

  /* 단일행 데이터 조회를 위한 액션 함수 */
  [getItem.pending]: pending,
  [getItem.fulfilled]: fulfilled,
  [getItem.rejected]: rejected,

  },
});

export default LargeBreadSlice.reducer;

// src/redux/modules/counterSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk(
  "getTodos",
  async (payload, ThunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3004/todos");
      console.log(data);
      return ThunkAPI.fulfillWithValue(data.data);
      // Promise가 resolve 됬을 경우
    } catch (error) {
      console.log(error);
      return ThunkAPI.rejectWithValue(error);
      /* ThunkAPI. */
    }
  }
);

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
/* export const {} = todoslice.actions; */
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default postSlice.reducer;

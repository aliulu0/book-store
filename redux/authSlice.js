import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const signUp = createAsyncThunk(
  "register",
  async (authData, thunkAPI) => {
    try {
      const res = await fetch(
        "https://assign-api.piton.com.tr/api/rest/register",
        {
          method: "POST",
          body: JSON.stringify(authData),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.res.json());
    }
  }
);

export const signIn = createAsyncThunk("login", async (authData) => {
  try {
    const res = await fetch("https://assign-api.piton.com.tr/api/rest/login", {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const data = await res.json();
    console.log("data: ", data);
    if (authData.rememberMe) {
      localStorage.setItem("token", data.action_login.token);
    }
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  user: null,
  token:
    (typeof window !== "undefined" && localStorage.getItem("token")) || null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.token = localStorage.removeItem("token") || null;
    },
  },
  extraReducers: {
    // signUp

    [signUp.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
      } else {
        state.user = payload.action_register;
      }
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },

    // signIn

    [signIn.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [signIn.fulfilled]: (state, { payload: { action_login } }) => {
      state.loading = false;
      if (action_login.message) {
        state.error = action_login.message;
      } else {
        state.token = action_login.token;
      }
    },
    [signIn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

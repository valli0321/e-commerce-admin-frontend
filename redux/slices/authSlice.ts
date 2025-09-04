import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '@/lib/apiUtils';

interface UserData {
  userId: string;
  email: string;
  username: string;
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

type ApiError = {
  message: string;
};

export const verifyAuth = createAsyncThunk<UserData, void, { rejectValue: ApiError }>(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await apiGet<UserData>('/users/verify');
      return userData;
    } catch (error: any) {
      return rejectWithValue(
        error || 'Failed to verify authentication' 
      );
    }
  }
);

// Login thunk with proper typing
export const loginUser = createAsyncThunk<
  UserData,
  { email: string; password: string },
  { rejectValue: ApiError }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response: any = await apiPost<{ user: UserData }>(
        '/users/login', 
        { email, password }
      );
      return response?.data;
    } catch (error: any) {
      return rejectWithValue( 
         error || 'Login failed' 
      );
    }
  }
);

// Logout thunk with proper typing
export const logoutUser = createAsyncThunk<void, void, { rejectValue: ApiError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiPost('/users/logout');
    } catch (error: any) {
      return rejectWithValue(
        error || 'Logout failed' 
      );
    }
  }
);

export const refreshTokens = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { rejectValue: ApiError }
>(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiPost<{ 
        accessToken: string; 
        refreshToken: string 
      }>('/users/refresh-token');
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to refresh tokens' 
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify Auth
      .addCase(verifyAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || 'Verification failed';
      })
      
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Logout failed';
      })
      
      // Refresh Token
      .addCase(refreshTokens.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokens.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || 'Token refresh failed';
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isCreating: false,
  createError: null,
  currentPage: 1,
  totalPages: 1,
  userCreatedSuccessfully: false,
};

//----------------------------------Thunk para GET, que trae usuarios----------------------------------
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}`,
      {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      }
    );
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    const data = await response.json();
    return data; // Retorna el objeto completo con data, page, total_pages
  }
);

//----------------------------------Thunk para POST, que crea un nuevo usuario----------------------------------
export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser) => {
    const response = await fetch(
      'https://reqres.in/api/users',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify(newUser),
      }
    );
    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }
    const data = await response.json();
    return data; // Retorna el objeto usuario creado
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Acciones síncronas si se necesitan
    clearCreateError: (state) => {
      state.createError = null;
    },
    clearUserCreatedFlag: (state) => {
      state.userCreatedSuccessfully = false;
    },
  },
  extraReducers: (builder) => {
    //----------------------------------Reducers para fetchUsers----------------------------------
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    //----------------------------------Reducers para createUser----------------------------------
    builder
      .addCase(createUser.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
        state.userCreatedSuccessfully = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreating = false;
        state.userCreatedSuccessfully = true;
        // Agregar el usuario creado al listado local
        // La API de reqres.in retorna un objeto con id, name, job, createdAt
        // Agregamos first_name y last_name basados en name para mantener consistencia
        const createdUser = {
          id: action.payload.id,
          first_name: action.payload.name.split(' ')[0] || action.payload.name,
          last_name: action.payload.name.split(' ').slice(1).join(' ') || '',
          email: `${action.payload.name.toLowerCase().replace(/\s+/g, '')}@reqres.in`,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(action.payload.name)}`,
        };
        state.items = [createdUser, ...state.items];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.error.message;
        state.userCreatedSuccessfully = false;
      });
  },
});

export const { clearCreateError, clearUserCreatedFlag } = usersSlice.actions;

export default usersSlice.reducer;

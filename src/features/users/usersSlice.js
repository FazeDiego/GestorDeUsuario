// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Redux -> estado global para gestionar usuarios, items, status, error, paginacion, creacion de usuario
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

//----------------------------------Thunk para GET, que trae usuarios de la API----------------------------------
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
        body: JSON.stringify({ name: newUser.name, job: newUser.job }), // Solo enviar name y job a la API
      }
    );
    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }
    const data = await response.json();
    // Agregar el customAvatar al resultado para usarlo en el reducer
    return { ...data, customAvatar: newUser.customAvatar };
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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
        // Agregar el usuario creado al estado global 
        // La API de "reqres.in" nos retorna un objeto con id, name, job, createdAt
        // Agregamos un nombre y apellido basados en name para mantener consistencia
        
        // Extraer nombre y apellido del nombre completo
        const nameParts = action.payload.name.trim().split(/\s+/); // divide por espacios
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Generar iniciales: primera letra del nombre + primera letra del apellido (si existe)
        // Si solo hay nombre, será una sola inicial (ej: "Julian" → "J")
        // Si hay nombre y apellido, serán dos iniciales (ej: "Diego Martinez" → "DM")
        let initials = '';
        if (firstName) {
          initials = firstName.charAt(0).toUpperCase();
          if (lastName) {
            initials += lastName.charAt(0).toUpperCase();
          }
        }
        
        // Generar email con formato nombre.apellido@reqres.in
        let emailPrefix = firstName.toLowerCase();
        if (lastName) {
          emailPrefix += '.' + lastName.toLowerCase().replace(/\s+/g, '.');
        }
        
        const createdUser = {
          id: action.payload.id,
          first_name: firstName,
          last_name: lastName,
          email: `${emailPrefix}@reqres.in`,
          // Si hay foto personalizada, usar esa; sino generar avatar con iniciales
          avatar: action.payload.customAvatar || 
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&size=128`,
        };
        state.items = [createdUser, ...state.items]; // se agrega al inicio del array de usuarios
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

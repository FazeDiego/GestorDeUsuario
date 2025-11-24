// Gestor de Usuarios de Prueba
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import UserScreen from './src/screens/UserScreen';

export default function App() {
  return (
    <Provider store={store}>
      <UserScreen />
    </Provider>
  );
}

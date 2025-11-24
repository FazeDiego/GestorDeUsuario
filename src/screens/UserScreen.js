// src/screens/UserScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser, clearUserCreatedFlag } from '../features/users/usersSlice';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const UserScreen = () => {
  const dispatch = useDispatch();

  const { items, status, error, isCreating, createError, currentPage, totalPages, userCreatedSuccessfully } = useSelector(
    (state) => state.users
  );

  // Traer usuarios cuando la app arranca
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers(1)); // Página 1 por defecto
    }
  }, [status, dispatch]);

  // Mostrar mensaje solo cuando se crea un usuario exitosamente
  useEffect(() => {
    if (userCreatedSuccessfully) {
      Alert.alert('Éxito', 'Usuario creado exitosamente');
      dispatch(clearUserCreatedFlag());
    }
  }, [userCreatedSuccessfully, dispatch]);

  const handleCreateUser = (newUser) => {
    dispatch(createUser(newUser));
  };

  const handlePageChange = (page) => {
    dispatch(fetchUsers(page));
  };

  const isLoadingList = status === 'loading';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>

      {/* FORMULARIO DE CREACIÓN */}
      <UserForm onSubmit={handleCreateUser} isCreating={isCreating} />

      {/* Error al crear usuario */}
      {createError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al crear usuario: {createError}</Text>
        </View>
      )}

      {/* ESTADOS DE LISTADO */}
      {isLoadingList && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.stateText}>Cargando usuarios...</Text>
        </View>
      )}

      {status === 'failed' && (
        <View style={styles.stateContainer}>
          <Text style={[styles.stateText, styles.errorText]}>
            Error al obtener usuarios
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}

      {/* LISTA DE USUARIOS */}
      {!isLoadingList && status === 'succeeded' && (
        <UserList users={items} />
      )}

      {/* PAGINACIÓN */}
      {status === 'succeeded' && totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <Button
            title="← Anterior"
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoadingList}
          />
          <Text style={styles.pageText}>
            Página {currentPage} de {totalPages}
          </Text>
          <Button
            title="Siguiente →"
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoadingList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stateText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 4,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default UserScreen;

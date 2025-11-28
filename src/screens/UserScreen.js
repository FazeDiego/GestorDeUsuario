// src/screens/UserScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
  ToastAndroid,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser, clearUserCreatedFlag } from '../features/users/usersSlice';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const UserScreen = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { items, status, error, isCreating, createError, currentPage, totalPages, userCreatedSuccessfully } = useSelector(
    (state) => state.users
  );

  // Traer usuarios cuando la app arranca
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers(1)); // Se carga la pagina 1 por defecto
    }
  }, [status, dispatch]);

  // Mostrar mensaje solo cuando se crea un usuario exitosamente
  useEffect(() => {
    if (userCreatedSuccessfully) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          '✓ Usuario creado exitosamente',
          ToastAndroid.LONG
        );
      } else {
        Alert.alert('Éxito', 'Usuario creado exitosamente');
      }
      dispatch(clearUserCreatedFlag());
      // Cerrar el modal después de crear el usuario
      setIsModalVisible(false);
    }
  }, [userCreatedSuccessfully, dispatch]);

  // para crear un nuevo usuario
  const handleCreateUser = (newUser) => {
    dispatch(createUser(newUser));
  };

  // para el cambio de pagina
  const handlePageChange = (page) => {
    dispatch(fetchUsers(page)); 
  };

  const isLoadingList = status === 'loading';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>

      {/* Tipos de estado -> carga */}
      {isLoadingList && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.stateText}>Cargando usuarios...</Text>
        </View>
      )}

      {/* Tipos de estado -> error */}
      {status === 'failed' && (
        <View style={styles.stateContainer}>
          <Text style={[styles.stateText, styles.errorText]}>
            Error al obtener usuarios
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}

      {/* Lista de usuarios */}
      {!isLoadingList && status === 'succeeded' && (
        <UserList users={items} />
      )}

      {/* Paginacion simple */}
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

      {/* Botón flotante para crear usuario */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Crear Usuario</Text>
      </TouchableOpacity>

      {/* Modal con formulario de creación */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Crear Nuevo Usuario</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <UserForm onSubmit={handleCreateUser} isCreating={isCreating} />

              {/* Mostrar error si no se pudo crear el usuario */}
              {createError && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Error al crear usuario: {createError}</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  modalContent: {
    paddingHorizontal: 10,
  },
});

export default UserScreen;

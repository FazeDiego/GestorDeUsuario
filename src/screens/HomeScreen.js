// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost } from '../features/posts/postsSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { items, status, error, isCreating } = useSelector(
    (state) => state.posts
  );

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');

  // Traer publicaciones cuando la app arranca
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handlePublish = () => {
    // Validaciones básicas
    if (!title.trim() || !body.trim()) {
      setFormError('Título y contenido son obligatorios');
      return;
    }

    setFormError('');

    const newPost = {
      title: title.trim(),
      body: body.trim(),
      userId: 1, // dummy
    };

    dispatch(addPost(newPost));

    // limpiar inputs después de enviar
    setTitle('');
    setBody('');
  };

  const isLoadingList = status === 'loading';
// Funcion que se encarga de renderizar cada post
  const renderPost = ({ item }) => (
    <View style={styles.card}>
      {/*Titulo del post*/}
      <Text style={styles.postTitle}>{item.title}</Text> 
      {/*Cuerpo del post*/}
      <Text style={styles.postBody}>{item.body}</Text> 
    </View>
  );
//--Encabezado de la app 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>

      {/* ESTADOS DE LISTADO */}
      {isLoadingList && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="small" />
          <Text style={styles.stateText}>Cargando publicaciones...</Text>
        </View>
      )}

      {status === 'failed' && (
        <View style={styles.stateContainer}>
          <Text style={[styles.stateText, styles.errorText]}>
            Error al obtener publicaciones
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}

      {/* LISTA DE POSTS */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={renderPost}
        contentContainerStyle={
          items.length === 0 && !isLoadingList ? styles.emptyList : null
        }
        ListEmptyComponent={
          !isLoadingList && (
            <Text style={styles.stateText}>
              No hay publicaciones todavía.
            </Text>
          )
        }
      />

      {/* FORMULARIO */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Crear nueva publicación</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Contenido"
          value={body}
          onChangeText={setBody}
          multiline
        />

        {formError ? <Text style={styles.error}>{formError}</Text> : null}

        {error && !isLoadingList && (
          <Text style={styles.error}>Error al crear publicación: {error}</Text>
        )}

        <Button
          title={isCreating ? 'Publicando...' : 'Publicar'}
          onPress={handlePublish}
          disabled={isCreating}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  stateContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  stateText: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 14,
  },
  card: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a1a1a',
    lineHeight: 24,
  },
  postBody: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  emptyList: {
    alignItems: 'center',
    marginTop: 20,
  },
  formContainer: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  formTitle: { 
    fontSize: 19, 
    fontWeight: '600',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    fontSize: 15,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: { 
    color: '#e53e3e', 
    marginVertical: 4,
    fontSize: 13,
  },
});

export default HomeScreen;

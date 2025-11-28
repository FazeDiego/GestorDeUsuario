// src/components/UserForm.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserForm = ({ onSubmit, isCreating }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [formError, setFormError] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos permisos para acceder a tus fotos'
      );
      return;
    }

    // Abrir selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Aspecto cuadrado para foto de perfil
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!name.trim() || !job.trim()) {
      setFormError('Nombre y rol/puesto son obligatorios');
      // Mostrar toast en Android
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Por favor completa todos los campos',
          ToastAndroid.SHORT
        );
      }
      return;
    }

    setFormError('');

    const newUser = {
      name: name.trim(),
      job: job.trim(),
      customAvatar: profileImage, // Enviamos la foto personalizada si existe
    };

    onSubmit(newUser);

    // Limpia los inputs después de enviar
    setName('');
    setJob('');
    setProfileImage(null);
  };

  return (
    <View style={styles.formContainer}>
      {formError ? (
        <Text style={styles.errorText}>{formError}</Text>
      ) : null}
      
      {/* Campos de texto para nombre y job, y boton para enviar */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        editable={!isCreating}
      />

      <TextInput
        style={styles.input}
        placeholder="Rol/Puesto (Job)"
        value={job}
        onChangeText={setJob}
        editable={!isCreating}
      />

      {/* Botón para agregar foto de perfil */}
      <TouchableOpacity
        style={styles.photoButton}
        onPress={pickImage}
        disabled={isCreating}
      >
        {profileImage ? (
          <View style={styles.photoPreviewContainer}>
            <Image source={{ uri: profileImage }} style={styles.photoPreview} />
            <Text style={styles.photoButtonText}>Cambiar foto de perfil</Text>
          </View>
        ) : (
          <Text style={styles.photoButtonText}> AGREGAR FOTO DE PERFIL</Text>
        )}
      </TouchableOpacity>

      <Button
        title={isCreating ? 'Creando...' : 'Crear Usuario'}
        onPress={handleSubmit}
        disabled={isCreating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#9e9e9e',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  photoPreviewContainer: {
    alignItems: 'center',
    gap: 8,
  },
  photoPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
});

export default UserForm;

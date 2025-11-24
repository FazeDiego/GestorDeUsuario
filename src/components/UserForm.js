// src/components/UserForm.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

const UserForm = ({ onSubmit, isCreating }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = () => {
    // Validaciones básicas
    if (!name.trim() || !job.trim()) {
      setFormError('Nombre y rol/puesto son obligatorios');
      return;
    }

    setFormError('');

    const newUser = {
      name: name.trim(),
      job: job.trim(),
    };

    onSubmit(newUser);

    // Limpiar inputs después de enviar
    setName('');
    setJob('');
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Crear Nuevo Usuario</Text>

      {formError ? (
        <Text style={styles.errorText}>{formError}</Text>
      ) : null}

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
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
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
});

export default UserForm;

// src/components/UserList.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

const UserList = ({ users }) => {
  const renderUser = ({ item }) => (
    <View style={styles.card}>
      {/*//muestra la imagen solo si existe, muestra nombre y el email siempre*/}
      {item.avatar && (
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar}
        />
      )}

      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item.first_name} {item.last_name}
        </Text>
        {item.email && (
          <Text style={styles.userEmail}>{item.email}</Text>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={users} //se recibe el array actualizado con el nuevo usuario
      keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
      renderItem={renderUser}
      contentContainerStyle={
        users.length === 0 ? styles.emptyList : null
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No hay usuarios todavía.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default UserList;

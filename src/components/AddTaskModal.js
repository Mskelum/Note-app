import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskModal = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveTask = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please enter both task name and description');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
    };

    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(newTask);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Name"
        placeholderTextColor="gray"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Task Description"
        placeholderTextColor="gray"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Task" onPress={saveTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
});

export default AddTaskModal;

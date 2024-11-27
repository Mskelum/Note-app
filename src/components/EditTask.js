import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTask = ({ route, navigation }) => {
  const { task, onEditTask } = route.params;
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');

  const updateTask = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = tasksArray.map((t) =>
        t.id === task.id ? { ...t, title, description } : t
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      onEditTask();
      navigation.goBack(); // Return to the previous screen
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={updateTask}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111827' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  input: {
    backgroundColor: '#475569',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default EditTask;

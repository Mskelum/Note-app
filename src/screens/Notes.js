import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const Notes = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [reload, setReload] = useState(false); // State to trigger reloading

  useFocusEffect(
    React.useCallback(() => {
  const fetchTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const tasksArray = JSON.parse(storedTasks);
        setTasks(tasksArray);
        setFilteredTasks(tasksArray);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  fetchTasks();
}, [])
);

  // Clear all tasks
  const clearData = async () => {
    Alert.alert('Clear All Tasks', 'Are you sure you want to delete all tasks?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('tasks');
            setTasks([]);
            setFilteredTasks([]);
            navigation.navigate('Home', { reload: true }); 
          } catch (error) {
            console.error('Error clearing tasks:', error);
          }
        },
      },
    ]);
  };

  // Delete a specific task
  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Filter tasks by category
  const filterTasks = (category) => {
    if (category === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.category === category));
    }
    setFilter(category);
  };


    // Open modal to display task details
    const openModal = (task) => {
      setSelectedTask(task);
      setModalVisible(true);
    };
  


  // Render a single task
  const renderTaskItem = ({ item }) => (
    <View style={styles.task}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title || 'Untitled Task'}</Text>
        <Text style={styles.description}>{item.description || 'No description'}</Text>
      </View>
      <View style={styles.taskIcons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditTask', {
              task: item,
              onEditTask: () => setReload(!reload), // Update reload state
            })
          }
        >
          <Icon name="edit" size={24} color="#ffcc00" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Icon name="delete" size={24} color="#ff5252" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {['all', 'work', 'personal'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              filter === category && styles.activeFilterButton,
            ]}
            onPress={() => filterTasks(category)}
          >
            <Text style={styles.filterText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderTaskItem}
      />

      {/* Clear All Button */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearData}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#334155',
  },
  activeFilterButton: { backgroundColor: '#3B82F6' },
  filterText: { color: '#FFF', fontSize: 16 },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#475569',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  description: { fontSize: 14, color: '#D1D5DB', marginTop: 4 },
  taskIcons: { flexDirection: 'row', justifyContent: 'space-between', width: 60 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  clearButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  clearButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default Notes;

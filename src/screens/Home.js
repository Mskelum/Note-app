import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, IconButton, ProgressBar } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";

const Home = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from AsyncStorage when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem('tasks');
          if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
          }
        } catch (error) {
          console.error('Error loading tasks from AsyncStorage:', error);
        }
      };
      loadTasks();
    }, [])
  );

  // Save tasks to AsyncStorage whenever the tasks array changes
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to AsyncStorage:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleAddTask = async () => {
    if (title && description && category) {
      const newTask = {
        id: new Date().toISOString(),
        title,
        description,
        category,
        color: 'yellow'
      };

      // Update state and AsyncStorage
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Clear input fields and close modal
      setTitle('');
      setDescription('');
      setCategory('');
    } else {
      alert('Please fill in all fields to add a task.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.reload) {
        setTasks(); // Refetch tasks after clearing data
        navigation.setParams({ reload: false }); // Reset the reload flag
      }
    }, [route.params?.reload])
  );


  const imagePaths = [
    require('../assets/2.jpg'),
    require('../assets/3.jpg'),
    require('../assets/4.jpg'),
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Set interval for image slideshow (change image every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagePaths.length); // Loop through images
    }, 4000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>

      <View style={{ margin: 15, marginBottom: 5 }}>
        <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Task Manager</Text>
      </View>

      <View contentContainerStyle={styles.mainContent}>
        <View style={styles.imageContainer}>
          {/* Render the current image based on the state */}
          <View style={styles.priorityCard}>
            <Image
              key={currentImage}  // Ensures the image changes when state updates
              source={imagePaths[currentImage]}  // Display the current image
              style={styles.Imagecard}
            />
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today’s Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskCard}>
            <View style={[styles.statusIndicator, { backgroundColor: item.color }]} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskSubtitle}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>Add New Task</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              color='black'
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              color='black'
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Personal" value="personal" />
              </Picker>
            </View>
            <Text style={styles.selectedText}>
              Selected category: {category ? category : "None"}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.closeButton, { marginRight: 20 }]} onPress={handleAddTask}>
                <Text style={styles.closeButtonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  appBar: {
    backgroundColor: '#000000', // Black background
    justifyContent: 'center',   // Centers the content vertically
    alignItems: 'center',       // Centers the content horizontally
  },
  titleStyle: {
    color: 'white',            // White text color
    textAlign: 'center',       // Centers the title text
  },
  heading: { fontSize: 24, color: '#FFFFFF', textAlign: 'center', marginVertical: 16 },
  priorityContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  priorityCard: {
    margin: 20,
    resizeMode: 'cover',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent:'center',
    width: '90%',
    height: 200,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  Imagecard:{
    margin: 20,
    resizeMode: 'cover',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    height: 200,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  priorityText: { color: '#1E1E2E', fontWeight: 'bold', fontSize: 16 },
  taskCount: { color: '#1E1E2E', marginTop: 8 },
  sectionTitle: { color: '#A0A0B0', fontSize: 18, marginHorizontal: 16, marginVertical: 8 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  statusIndicator: { width: 8, height: '100%', borderRadius: 4 },
  taskInfo: { flex: 1, marginLeft: 16 },
  taskTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  taskSubtitle: { color: '#A0A0B0', marginVertical: 4 },
  progressBar: { height: 6, borderRadius: 4, backgroundColor: '#505060' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  label: {
    color: "gray",
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  picker: {
    color: "black",
    width: "100%",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: { color:'black',fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 13,
    right: 30,
    backgroundColor: '#6200ee',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  closeButton: { backgroundColor: 'black', borderRadius: 8, paddingVertical: 8, width: 80, marginTop: 16 },
  closeButtonText: { color: 'white', fontSize: 16, textAlign: 'center' },
});

export default Home;

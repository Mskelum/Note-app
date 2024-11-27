import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={{margin:25}}>
        <Text style={{color:'white', fontSize:25, textAlign:'center', fontWeight:'bold'}}>About Us</Text>
      </View>

      {/* About Content */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>
          This app allows you to create, manage, and filter your tasks. You can add tasks with categories such as "Work" and "Personal", and edit or delete them as needed. All data is stored locally using AsyncStorage.
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Us:</Text>
        <Text style={styles.contactText}>Email: mskelum19@gmail.com</Text>
        <Text style={styles.contactText}>Phone: +94 75 8125 068</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for using our app!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#111827',  // Dark background color
    paddingHorizontal: 16,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  aboutContainer: {
    marginBottom: 30,
  },
  aboutText: {
    fontSize: 18,
    color: '#D1D5DB',
    lineHeight: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Roboto',  // Adding a clean modern font style
  },
  contactContainer: {
    backgroundColor: '#333C47', // Slightly lighter dark background
    padding: 20,
    marginTop: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3F4F6',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#A3B1C1',
  },
  footer: {
    marginTop: 40,
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default About;

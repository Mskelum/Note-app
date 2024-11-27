import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const Navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      Navigation.replace('DashboardTabs'); // Navigate to the Home page
    }, 1000); // 3 seconds

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [Navigation]);

  return (
    <View style={styles.container}>
      {/* <FastImage
        style={styles.image}
        source={require('../../assests/loading.gif')}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
      <Text style={styles.title}>Task Reminder</Text>
      <Text style={styles.subtitle}>Your personalized assistant</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#343a40',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Splash;

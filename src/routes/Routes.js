import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Splash from "../screens/Splash";
import About from "../screens/About";
import Notes from "../screens/Notes";
import Home from "../screens/Home";
import AddTaskModal from "../components/AddTaskModal";
import { DarkModeProvider } from "../components/DarkModeContext";
import EditTask from "../components/EditTask";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#333",
      tabBarStyle: { backgroundColor: "#000" },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Notes"
      component={Notes}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="info-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="About"
      component={About}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppHome = () => {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTask}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskModal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardTabs"
            component={DashboardTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default AppHome;

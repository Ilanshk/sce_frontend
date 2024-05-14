import { StyleSheet,Button, Text, View, Image,Alert, TouchableOpacity, Pressable,Platform, TextInput,StatusBar } from 'react-native';
import React,{FC, useState} from 'react';
import StudentList from './Components/StudentList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentAddPage from './Components/StudentAddPage';
import StudentDetailsPage from './Components/StudentDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Ionicons from '@expo/vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();

const StudentsListScreen :FC = () =>{
  return(
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="RegisterPage" component={RegisterPage} options={{title:'Register to Travmies'}}/>
      <StudentsListStack.Screen name="Log In Page" component={LoginPage} options={{title:'Welcome to Travmies'}}/>
      <StudentsListStack.Screen name="StudentList" component={StudentList} options={{title:'Students List'}}/>
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{title:'Student Details'}}/>
      <StudentsListStack.Screen name="StudentAddPage" component={StudentAddPage} options={{title:'Add New Student'}}/>

    </StudentsListStack.Navigator>
  )
}
export default function App() {

  return(
  <NavigationContainer>
    
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => <Ionicons name="home" size={24} color="black"/>})}
      >
      <Tab.Screen 
        name="Home" 
        component={StudentsListScreen}
        options={{headerShown:false}}  
      />
      
      
    </Tab.Navigator>
  </NavigationContainer>
  )  
}
  
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1, //occupies entire screen
    flexDirection: 'column',
  
  }
});
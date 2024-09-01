import { StyleSheet,StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ChatPage from './Components/ChatPage';
import { io } from 'socket.io-client';

//Change to the IP address of your machine
export const socket = io('http://192.168.56.1:3000');
socket.connect();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();


export default function App() {

  return(
  <NavigationContainer>
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="LogInPage" component={LoginPage} options={{title:'Our Chat App'}}/>
      <StudentsListStack.Screen name="RegisterPage" component={RegisterPage} options={{title:'Register'}}/>
      <StudentsListStack.Screen name="ChatPage" component={ChatPage} options={{title:'Chat'}}/>
    </StudentsListStack.Navigator>
    </NavigationContainer>
  )  
}
  
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column'
  
  }
});
import { StyleSheet,Button, Text, View, Image,Alert, TouchableOpacity, Pressable,Platform, TextInput,StatusBar } from 'react-native';
import React,{FC, useState} from 'react';
import StudentList from './Components/StudentList';
//onItemsSelected:()=>void


export default function App() {

  return(
  <View style = {styles.container}>
    <StudentList />
  </View>
  )  
}
  
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1, //occupies entire screen
    flexDirection: 'column',
  
  }
});
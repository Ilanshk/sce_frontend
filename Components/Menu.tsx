import { FC } from "react";
import {View,StyleSheet, TouchableOpacity} from "react-native";
import { renderers } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const HeaderOptions:FC<{navigateToProfile:()=>void,logOutOfApp:()=>void,navigateToHome:()=>void}> =
 ({navigateToProfile,logOutOfApp,navigateToHome}) =>{
    
    return (
        <View style={styles.headerOptions}>
            <TouchableOpacity onPress={navigateToHome} >
                <Ionicons name="home" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOutOfApp}>
            <Entypo name="log-out" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToProfile}>
            <MaterialIcons name="account-circle" size={24} color="black" />
            </TouchableOpacity>
        </View>
           
         
    );

};
const styles = StyleSheet.create({
    headerOptions:{
        flexDirection:'row',
        justifyContent:'flex-end'
    }
   
})
export default HeaderOptions;





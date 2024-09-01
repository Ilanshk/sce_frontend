import { FC } from "react";
import {View,StyleSheet, TouchableOpacity} from "react-native";
import { Entypo } from '@expo/vector-icons';




const HeaderOptions:FC<{logOutOfApp:()=>void}> =({logOutOfApp}) =>{
    
    return (
        <View style={styles.headerOptions}>
            <TouchableOpacity onPress={logOutOfApp}>
            <Entypo name="log-out" size={30} color="black" />
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





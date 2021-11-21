import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign} from "@expo/vector-icons";
import colors from "../../config/colors";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    container:{
     alignSelf: "center",
     position: 'absolute',
     bottom: 60,
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
     backgroundColor: '#bc81ea',   
     height: 75,
     width: Dimensions.get('window').width - 11,
     marginLeft: 3,
     marginRight: 6,
     elevation: 10,
     overflow: "hidden",
    },

    progress: {
        height: 3,
        backgroundColor: colors.white,
        marginLeft: 10,
    },

    image:{
        width:  50,
        height: 50,
        marginHorizontal: 10,
        top: 6,
        borderRadius: 5
    },

    row: {
        flexDirection:'row',
    },

    rightContainer: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    nameContainer:{
      flexDirection: "column",
    },

    iconsContainer:{
    flexDirection: 'row',
    alignItems: "center",
    right: 20
    },

    title: {
    color: colors.white,
    fontSize: 18,
    fontWeight:'bold',
    marginTop: 6, 
    },

    artist:{
     color: 'lightgray',
     fontSize: 15,
     marginTop: 5,
     marginLeft: 5,
     
 }
})

export  default  styles;

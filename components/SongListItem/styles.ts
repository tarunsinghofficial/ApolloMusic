import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary,
        borderBottomRightRadius: 50, 
        borderTopRightRadius: 50, 
        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 25,
        justifyContent: 'space-between',
    },
  /*   firstContainer:{
        marginLeft: 10,
        alignItems: "flex-end",
        justifyContent: "center"
    }, */
    imageContainer: {
       flexDirection: 'row-reverse',
       alignItems: 'center',
       justifyContent: 'flex-end',
       padding: 3
    },
    image:{
        right: 2,
        alignSelf:"center",
        borderRadius: 36,
        width:  43,
        height: 43,
    },
    rightContainer: {
        marginLeft: 20,
        alignItems: 'flex-start',
        width: '70%'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    artist:{
        color: 'lightgray',
        fontSize: 14,
     }
})

export  default  styles;

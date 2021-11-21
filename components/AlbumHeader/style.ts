import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({

    container:{
        alignItems: "center",
        padding: 20,
    },
    image:{
        width: 200,
        height: 200,
        margin: 15,
        borderRadius: 15
    },
    name:{
        color:colors.white,
        fontSize: 30,
        fontWeight: 'bold',
    },
    creatorContainer:{
        flexDirection:"row",
        margin :10
    },
    creator:{
        color: colors.white,
        margin: 5,
        fontSize: 20,

    },
    likes:{
        justifyContent: "center",
        alignItems:"center",
        alignContent: "center",
        color:'lightgray',
        marginLeft: 7,
        fontSize: 15,
    },
    button:{
        backgroundColor: colors.primary,
        height: 60,
        width: 175,
        borderRadius:50,
        justifyContent: 'center',
        alignItems:'center',

    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,

    }

});
export default styles ;
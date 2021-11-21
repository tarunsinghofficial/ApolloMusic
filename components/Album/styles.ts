import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
    container:{
        width: 175,
        margin: 10,
    },
    image:{
        width: "100%",
        height: 175,
        borderRadius: 100
    },
    text:{
        color: colors.white,
        marginTop: 10,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default styles;

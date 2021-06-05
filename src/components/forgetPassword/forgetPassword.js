import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


export default function Forget({ navigation }) {

    const [password, setPassword] = useState("");
    const [resetpassword, setresetPassword] = useState("");

    const [hidePass, setHidePass] = useState(true);
    const [showPass, setHidePassw] = useState(true);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);
    
    const BackButtonClick = () => {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
          <TouchableOpacity style={{ top: 40, marginRight: 300 }} onPress={BackButtonClick}>
            <Icon name='chevron-left' size={25} color='#fff'></Icon>
          </TouchableOpacity>

          <Text style={styles.header}>Reestablecer contraseña</Text>
          <Icon name='lock' size={100} color='#fff' style={{top:100}}></Icon>
          <Text style={styles.title}>Ingresa una nueva contraseña</Text>
          <View style={styles.form}>
            {/* <View> */}
            <TextInput style={styles.textinput} autoCompleteType="password" placeholder="Nueva contraseña" autoCorrect={false} secureTextEntry={hidePass ? true : false} value={password} onChangeText={(password) => setPassword(password)} />
            <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
            <Icon name={hidePass ? "eye-slash" : "eye"} size={20} color="grey" />
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <Text style={styles.title}>Confirmar nueva contraseña</Text>
          <View style={styles.form}>
            {/* <View> */}
            <TextInput style={styles.textinput} autoCompleteType="password" placeholder="Confirmar contraseña" autoCorrect={false} secureTextEntry={showPass ? true : false} value={resetpassword} onChangeText={(resetpassword) => setresetPassword(resetpassword)} />
            <TouchableOpacity style={styles.icon} onPress={() => setHidePassw(!showPass)}>
            <Icon name={showPass ? "eye-slash" : "eye"} size={20} color="grey" />
            </TouchableOpacity>
            {/* </View> */}
          </View>       

          <TouchableOpacity style={styles.button} >
            <Text style={styles.btntext}>Reestablecer contraseña</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#272640",
      alignItems: "center",
    },
    header: {
        alignSelf: "flex-start",
        fontSize: 24,
        color: "#fff",
        top: 50,
        marginLeft: 40,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: "#fff",
        borderBottomWidth: 5,
    },
    title: {
        alignSelf: "flex-start",
        marginLeft: 40,
        top: 155,
        color: "#fff",
        fontWeight: "bold"
        
    },
    form: {
        justifyContent: "center",
        top: 160
    },
    textinput: {
        borderRadius: 15,
        alignSelf: "stretch",
        height: 40,
        width: 320,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#fff",
        color: "#000",
    },
    button: {
        // alignSelf: "stretch",
        alignItems: "center",
        width: 320,
        padding: 10,
        backgroundColor: "#4D194D",
        marginTop: 150,
        borderRadius: 20
    },
    btntext: {
        borderRadius: 15,
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    icon: {
        display: "flex",
        alignItems: "flex-end",
        top: -50,
        marginRight: 10,
        marginLeft: 280,
        width: 25,
        // backgroundColor: "#000" 
    }
});
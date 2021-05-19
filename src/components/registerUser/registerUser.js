import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Register({navigation}) {
  const [userName,setuserName]= useState("");
  const [name,setName]= useState("");
  const [lastname,setlastName]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const BackButtonClick = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{top: 40,marginRight: 300}} onPress={BackButtonClick}>
        <Icon name='chevron-left' size={25} ></Icon>
      </TouchableOpacity>

      <Text style={styles.header}>Registro</Text>
      <Text style={styles.title}>Nombre de usuario</Text>
        <View style={styles.form}>
              <TextInput style={styles.textinput} placeholder="Nombre de usuario" value={userName} onChangeText={(userName) => setuserName(userName)} />
        </View>
      <Text style={styles.title}>Nombre(s)</Text>
        <View style={styles.form}>
            <TextInput style={styles.textinput} placeholder="Nombre(s)" value={name} onChangeText={(name) => setName(name)} />
        </View>
      <Text style={styles.title}>Apellido(s)</Text>
        <View style={styles.form}>
            <TextInput style={styles.textinput} placeholder="Apellido(s)" value={lastname} onChangeText={(lastname) => setlastName(lastname)} />
      </View>    
      <Text style={styles.title}>Correo electrónico</Text>
      <View style={styles.form}>
            <TextInput style={styles.textinput} placeholder="Correo electrónico" value={email} onChangeText={(email) => setEmail(email)} />
      </View>
      <Text style={styles.title}>Contraseña</Text>
      <View style={styles.form}>
        {/* <View> */}
          <TextInput style={styles.textinput} autoCompleteType="password" placeholder="Contraseña" autoCorrect={false} secureTextEntry={hidePass ? true : false} value={password} onChangeText={(password) => setPassword(password)}/>
          <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
            <Icon name={hidePass ? "eye-slash" : "eye"} size={20} color="grey" />
          </TouchableOpacity>
        {/* </View> */}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btntext} >Registrarse</Text>
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
    alignSelf:"flex-start",
    fontSize: 24,
    color: "#fff",
    top: 50,
    marginLeft:40,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 5,
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: 40,
    top: 50,
    color: "#fff",
  },
  form:{
    justifyContent: "center",
    top: 50
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
    marginTop: 50,
    borderRadius: 20
  },
  btntext: {
    borderRadius: 15,
    color: "#fff",
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

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
import service from 'src/libs/service/service'

export default function Register({ navigation }) {
  const [userName, setuserName] = useState("");
  const [name, setName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistrationSuccess,
    setIsRegistrationSuccess
  ] = useState(false);



  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const BackButtonClick = () => {
    navigation.navigate("Login");
  }

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Introduzca un nombre de usuario');
      return;
    }
    if (!password) {
      alert('Introduzca una contraseña');
      return;
    }
    if (!name) {
      alert('Introduzca un nombre');
      return;
    }
    if (!lastname) {
      alert('Introduzca un apellido');
      return;
    }
    if (!email) {
      alert('Introduzca un correo electronico');
      return;
    }

    setLoading(true);
    var data = {
      username: userName,
      password: password,
      first_name: name,
      last_name: lastname,
      email: email,
    };

    service.post('users/register/create/', data)
      .then(() => {
        setLoading(false);
        alert('Usuario registrado exitosamente');
        navigation.navigate("Login")
      })
      .catch(error => {
        setLoading(false);
        console.log(error)
        alert('Error al registrar usuario');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ top: 40, marginRight: 300 }} onPress={BackButtonClick}>
        <Icon name='chevron-left' size={25} color='#fff'></Icon>
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
        <TextInput style={styles.textinput} autoCompleteType="password" placeholder="Contraseña" autoCorrect={false} secureTextEntry={hidePass ? true : false} value={password} onChangeText={(password) => setPassword(password)} />
        <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
          <Icon name={hidePass ? "eye-slash" : "eye"} size={20} color="grey" />
        </TouchableOpacity>
        {/* </View> */}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmitButton}>
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
    alignSelf: "flex-start",
    fontSize: 24,
    color: "#fff",
    top: 50,
    marginLeft: 40,
    paddingBottom:5,
    marginBottom: 8,
    borderBottomColor: "#fff",
    borderBottomWidth: 5,
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: 40,
    top: 44,
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    justifyContent: "center",
    top: 45
  },
  textinput: {
    borderRadius: 15,
    alignSelf: "stretch",
    height: 35,
    width: 320,
    marginBottom: 18,
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
    fontWeight: "bold",
    fontSize: 18
  },
  icon: {
    display: "flex",
    alignItems: "flex-end",
    top: -45,
    marginRight: 10,
    marginLeft: 280,
    width: 25,
    // backgroundColor: "#000" 
  }
});

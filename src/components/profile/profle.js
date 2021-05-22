import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as FileSystem from 'expo-file-system';
import service from 'src/libs/service/service'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function profle({ navigation }) {
  const [image, setImage] = useState("src/assets/sorus.png");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [changeImg, setChangeImg] = useState(false)

  const setValues = async () => {
    setImage(await AsyncStorage.getItem('profile_image'));
    setFirst_name(await AsyncStorage.getItem('first_name'));
    setLast_name(await AsyncStorage.getItem('last_name'));
    setEmail(await AsyncStorage.getItem('email'));
    setUsername(await AsyncStorage.getItem('username'));
  }

  useEffect(() => {
    setValues();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    navigation.setOptions({ headerShown: false });
  }, []);

  const UpdateProfile = async () => {
    if (changeImg) {
      let image64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
      setImage(`data:image/png;base64,${image64}`)
    }
    const data = {
      username,
      first_name,
      last_name,
      email,
      profile_image: image
    }

    service.patch('users/profile/update/', data)
      .then(() => {
        alert('Se han actualizado los datos')
      })
      .catch(err => {
        alert('No se pudo actualizar los datos')
        console.log(err)
      })
  }

  const BackButtonClick = () => {
    navigation.navigate("Home");
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setChangeImg(true)
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
      <View style={styles.contentMain}>
        <TouchableOpacity onPress={BackButtonClick} style={{ top: 30 }} >
          <Icon name='chevron-left' size={45} color="#fff"></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.circle}>
      </View>
      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={pickImage} >
          <Image style={styles.image} source={{ uri: image }} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.form}>
            <Text style={styles.textoPrincipal}>Nombre</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=''
                placeholderTextColor="#868686"
                value={first_name}
                onChangeText={setFirst_name}
                style={{ marginLeft: 10, width: 250 }}>
              </TextInput>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.textoPrincipal}>Apellido</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=''
                value={last_name}
                onChangeText={setLast_name}
                style={{ marginLeft: 10, width: 250 }}>
              </TextInput>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.textoPrincipal}>Email</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=''
                value={email}
                onChangeText={setEmail}
                style={{ marginLeft: 10, width: 250 }}>
              </TextInput>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.textoPrincipal}>Nombre de usuario</Text>
            <View style={styles.input}>
              <TextInput
                placeholder=''
                value={username}
                onChangeText={setUsername}
                style={{ marginLeft: 10, width: 250 }}>
              </TextInput>
            </View>
          </View>
          <TouchableOpacity onPress={UpdateProfile} style={styles.button}>
            <Text style={{ color: '#fff' }}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  contentMain: {
    flex: .9,
    flexDirection: 'row',
    backgroundColor: '#312244',
    position: 'absolute',
    width: 1500,
    height: 1500,
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 1500,
    height: 1500,
    borderRadius: 800,
    top: 160,
    left: -550
  },
  imgContainer: {
    flex: .1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    top: 80
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: '#E0E0E0',
    resizeMode: 'cover',
    borderRadius: 100,
    marginBottom: 10,
  },
  infoContainer: {
    flex: .1,
    display: 'flex',
    top: 120
  },
  textoPrincipal: {
    fontSize: 17,
    marginLeft: 5,
    marginBottom: 5
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.09)'
  },
  info: {
    padding: 40,

  },
  form: {
    marginTop: 20
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#4D194D',
    marginTop: 20,
    borderRadius: 20,
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
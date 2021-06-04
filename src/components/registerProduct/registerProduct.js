import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { faFileAlt, faMoneyCheckAlt, faSignature } from '@fortawesome/free-solid-svg-icons'

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Picker } from '@react-native-picker/picker';
import service from 'src/libs/service/service';
import CheckBox from '@react-native-community/checkbox';

export default function RegisterProduct() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [image, setImage] = useState('empty');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [stock, setStock] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState('')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  registerOffer = async () => {
    if (category.id === undefined) {
      alert('Selecciona una categoria')
      return
    }
    if (image === 'empty') {
      alert('Selecciona una imagen valida')
      return
    }
    let image64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
    image64 = `data:image/png;base64,${image64}`
    const data = {
      name: name,
      description: description,
      price: price,
      image: image64,
      start_date: new Date(),
      end_date: date,
      category: category.id,
      stock: stock,
      is_offer: toggleCheckBox
    }
    service.post('offers/product/register/', data)
      .then(_ => {
        alert('Se ha guardado la oferta')
      })
      .catch(err => {
        alert('Error al guardar la oferta')
        console.log(err)
      })
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const categories = [
    {
      name: 'Selecciona una categoria',
      id: undefined
    },
    {
      name: 'Electronica',
      id: '1'
    },
    {
      name: 'Celulares',
      id: '2'
    },
    {
      name: 'Moda',
      id: '3'
    },
    {
      name: 'Supermercado',
      id: '4'
    },
    {
      name: 'Accesorios',
      id: '5'
    },
    {
      name: 'Herramientas',
      id: '6'
    },
    {
      name: 'Juguetes',
      id: '7'
    },
  ];

  return (
    <View style={styles.contentMain}>
      <View style={styles.content_1}>
      </View>
      <View style={styles.content_2}>
        <View style={styles.imgcont}>
          <TouchableOpacity onPress={pickImage} style={styles.touchableOpaci}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>
        </View>
        <View style={styles.content_3}>
          <View style={styles.buttonDate}>
            <TouchableOpacity onPress={showDatepicker} style={styles.fecha1}>
              <Text style={styles.colorText}>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimepicker} style={styles.fecha2}>
              <Text style={styles.colorText}>{date.getHours()}:{date.getMinutes()}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          {/* Name */}
          <View style={styles.input}>
            <FontAwesomeIcon icon={faSignature} size={25} />
            <TextInput
              placeholder='Nombre del Producto'
              style={{ marginLeft: 10, width: 300, }}
              value={name}
              onChangeText={setName}>
            </TextInput>
          </View>
          {/* Description */}
          <View style={styles.input2}>
            <FontAwesomeIcon icon={faFileAlt} size={25} />
            <TextInput placeholder='Descripción' style={{ height: 50, textAlignVertical: 'top', width: 300, marginLeft: 10, }}
              multiline
              value={description}
              onChangeText={setDescription}>

            </TextInput>
          </View>
          {/* Price */}
          <View style={[styles.input, { top: 0, marginTop: 20 }]}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} size={25} />
            <TextInput placeholder='Precio' style={{ marginLeft: 10, width: 300 }}
              value={price}
              onChangeText={setPrice}
              keyboardType="number-pad"
            >
            </TextInput>
          </View>
          {/* Stock  */}
          <View style={[styles.input, { top: 0, marginTop: -10 }]}>
            <FontAwesomeIcon icon={faFileAlt} size={25} />
            <TextInput placeholder='Stock' style={{ marginLeft: 10, width: 300 }}
              value={stock}
              onChangeText={setStock}
              keyboardType="number-pad"
            >
            </TextInput>
          </View>
          {/* Is Offer  */}
          <View style={[styles.input_2, { top: 0, marginTop: -10 }]}>
            <Text style={{ marginRight: 10 }}>¿Es venta?</Text>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onCheckColor='#4D194D'
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
          </View>
          {/* Category */}
          <View>
            <Picker style={{ height: 20, width: 300, color: '#868686' }}
              selectedValue={category}
              onValueChange={setCategory}>
              {categories.map(item => <Picker.Item value={item} label={item.name} key={item.id + item.name} />)}
            </Picker>
          </View>
          <View style={styles.content_4} >
            <TouchableOpacity style={styles.buttonRegister} onPress={registerOffer}>
              <Text style={styles.colorTextButton}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </View>
  );
}

const styles = StyleSheet.create({
  contentMain: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: '#E0E0E0',
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 10,
  },
  content_1: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content_2: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 50,

  },
  content_3: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
    top: 84
  },
  imgcont: {
    alignItems: 'center',
    position: 'relative',

  },
  touchableOpaci: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 50,
    bottom: 75,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 40,
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 40,
    top: 60
  },
  input_2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 40,
    padding: 5,
    top: 60
  },
  input2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 80,
    borderBottomWidth: 1,
    marginBottom: 40,
    top: 20,
  },
  imgCircle: {
    width: 200,
    height: 200
  },
  fecha1: {
    backgroundColor: '#fff',
    width: 80,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 15,
    borderRightWidth: 1,
  },
  fecha2: {
    backgroundColor: '#fff',
    width: 80,
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 15,
    borderLeftWidth: .1,
  },
  buttonDate: {
    display: 'flex',
    flexDirection: 'row',
    top: 50
  },
  buttonRegister: {
    backgroundColor: '#fff',
    top: 30,
    width: 250,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 15,
    backgroundColor: '#4D194D',
  },
  colorText: {
    color: '#4D194D'
  },
  colorTextButton: {
    color: '#fff'
  }
});

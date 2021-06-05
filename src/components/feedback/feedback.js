import React, { useState, useEffect } from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Stars from "src/components/feedback/star";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ReviewScreen({ navigation }) {

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const BackButtonClick = () => {
    navigation.navigate("ProductView");
  }

  const sendComment = () => {
    const data = {
      title,
      comment,
      rate,
      product: 1,
      user: 1
    }

    fetch('http://10.0.2.2:8000/offers/review/create/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error()
        }
        alert('Review guardado');
      })
      .catch(_ => alert('Hubo un error al guardar la review'));
  }

  return (
    <View style={styles.container}>
      <View style={styles.backcontainer}>
      <TouchableOpacity style={{ top: 40, alignItems: "flex-start", marginLeft: 20, }} onPress={BackButtonClick}>
        <Icon name='chevron-left' size={25} color='#fff'></Icon>
      </TouchableOpacity>
      <Text style={styles.header}>Review</Text>
      </View>
      <Text style={styles.title}>Deja tu comentario</Text>
      <TextInput
        style={[styles.input, { marginBottom: 8 }]}
        placeholder="Titulo"
        value={title}
        onChangeText={setTitle}
        maxLength={50}
      />
      <TextInput
        multiline
        style={[styles.input, { height: 150, marginBottom: 10 }]}
        placeholder="Escribe tu comentario aquí"
        value={comment}
        onChangeText={setComment}
      />

      <View style={styles.ratingContainer}>
        <Text style={{fontSize: 20, fontWeight: "bold",}}>Calificación: </Text>
        <Stars changeRate={setRate} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={sendComment}
      >
        <Text style={styles.btntext}>Guardar comentario</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#faf9f9'
  },
  backcontainer:{
    flex: 1,
    width: '100%',
    maxHeight: 140,
    backgroundColor: "#4D194D",
    borderRadius: 1
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    top: 50,
    marginLeft: 20,
    paddingBottom:5,
    marginBottom: 8,
    borderBottomColor: "#fff",
    borderBottomWidth: 5,
  },
  title: {
    paddingLeft: 20,
    paddingTop: 3,
    paddingBottom: 10,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: "bold",
    color: '#000'
  },
  input: {
    width: '90%',
    borderWidth: 1.8,
    paddingLeft: 10,
    paddingTop: 5,
    padding:1,
    borderRadius: 8,
    textAlignVertical: 'top'
    
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    height: 40,
    backgroundColor: "#4D194D",
  },
  btntext: {
    borderRadius: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  ratingContainer: {
    alignSelf: "flex-start",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  icon: {
    display: "flex",
    alignItems: "flex-end",
    top: -42,
    marginRight: 101,
    marginLeft: 210,
    width: 25,
    // backgroundColor: "#000" 
  }
});

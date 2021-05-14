import React, { useState } from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Stars from "src/components/feedback/star";

export default function ReviewScreen() {

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);

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
        placeholder="Escribe tu comentario aqui"
        value={comment}
        onChangeText={setComment}
      />

      <View style={styles.ratingContainer}>
        <Text>Calificacion: </Text>
        <Stars changeRate={setRate} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={sendComment}
      >
        <Text>Guardar comentario</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'flex-start',
    fontSize: 20
  },
  input: {
    width: '90%',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 8,
    textAlignVertical: 'top'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'gray',
    width: '90%',
    height: 40,
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
});

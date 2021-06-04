import React, { useState, useEffect } from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Stars from "src/components/feedback/star";
import service from 'src/libs/service/service';

export default function ReviewScreen({ route, navigation }) {

  const [item, setItem] = useState({});
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    setItem(route.params);
    navigation.setOptions({ title: 'Comentario' })
  }, [])

  const sendComment = () => {
    service.post('offers/review/create/', {
      product: item.id,
      rate: rate,
      title: title,
      comment: comment
    })
      .then(() => {
        alert('Gracias por tu comentario');
        navigation.goBack();
      })
      .catch(err => {
        alert('Error al guardar el comentario');
        console.log(err);
      })
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

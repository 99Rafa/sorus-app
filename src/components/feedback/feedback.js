import React, { useState, useEffect } from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

const ReviewScreen = () => {

  const [comment, setComment] = useState("")
  const [title, setTitle] = useState("")

  const sendComment = () => {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deja tu comentario</Text>
      <TextInput
        style={[styles.input, { marginBottom: 8}]}
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
      <TouchableOpacity
        style={styles.button}
        onPress={sendComment}
      >
        <Text>Guardar comentario</Text>
      </TouchableOpacity>
        <Text>{comment}</Text>
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
    borderRadius: 8,
    backgroundColor: 'gray',
    width: '90%',
    height: 40,
  }
})

export default ReviewScreen
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Pagination({ response, changePage, currentPage }) {

  const getParams = (url, i) => {
    const params = url.match(/\?.*/)
    changePage(params ? params[0] : '', i)
  }

  return (
    <View style={styles.paginator_container}>
      <TouchableOpacity
        style={styles.button}
        disabled={response.previous ? false : true}
        onPress={() => getParams(response.previous, -1)}
      >
        <Icon name="chevron-left" size={25} color={response.previous ? "#000" : "#0000"} />
      </TouchableOpacity>

      <Text style={styles.page_number}>{currentPage}</Text>

      <TouchableOpacity
        style={styles.button}
        disabled={response.next ? false : true}
        onPress={() => getParams(response.next, 1)}
      >
        <Icon name="chevron-right" size={25} color={response.next ? "#000" : "#0000"} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  paginator_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom: 10
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginHorizontal: 20
  },
  page_number: {
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'Poppins'
  }
})

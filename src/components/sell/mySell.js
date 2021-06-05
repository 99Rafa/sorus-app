import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'


export default function mySell() {
  const [sell, setSell] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    makeRequest()
  })

  const makeRequest = async () => {
    setLoading(true)
    //Logicaaaa
    setLoading(false)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Mis Ventas</Text>
        {
          loading
            ? <ActivityIndicator color="#000" size="large" style={{ marginTop: 30 }} />
            : <>
              {sell.map(item => <View key={item.name}>
                <Image source={{ uri: item.image }} style={styles.imagenes} />
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.description2}>{item.vendedor}</Text>
              </View>)}
            </>
        }
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagenes: {
    width: 350,
    height: 200,
    marginTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  description: {
    backgroundColor: '#444',
    color: 'white',
    fontWeight: "bold",
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  description2: {
    backgroundColor: '#444',
    color: 'white',
    fontWeight: "bold",
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});
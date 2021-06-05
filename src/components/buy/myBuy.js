import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import service from 'src/libs/service/service'


export default function mySell() {

  const [sell, setSell] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    makeRequest()
  }, [])

  const makeRequest = async () => {
    setLoading(true)
    service.get('sales/buys/')
      .then(res => {
        setSell(res)
      })
      .catch(err => {

      })
    setLoading(false)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Mis Compras</Text>
        {
          loading
            ? <ActivityIndicator color="#000" size="large" style={{ marginTop: 30 }} />
            : <>
              {sell.map(item => <View key={item.name + item.price}>
                <Image source={{ uri: item.image }} style={styles.imagenes} />
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.description2}>{item.price}</Text>
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
    paddingBottom: 30
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
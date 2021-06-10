import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import service from 'src/libs/service/service'


export default function Buys({ navigation }) {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigation.setOptions({ title: 'Compras' })
    makeRequest()
  }, [])

  const makeRequest = async () => {
    setLoading(true)
    service.get('sales/buys/')
      .then(res => {
        setItems(res)
      })
      .catch(err => {
        alert('Error al cargar las compras')
        console.log(err)
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
              {
                items.length > 0
                  ? <>
                    {
                      items.map(item => <View key={item.product.name + item.product.price}>
                        <Image source={{ uri: item.product.image }} style={styles.imagenes} />
                        <Text style={styles.description}>{item.product.name}</Text>
                        <Text style={styles.description}>$ {item.product.price.toFixed(2)}</Text>
                        <Text style={styles.description2}>Ref: {item.reference}</Text>
                      </View>)
                    }
                  </>
                  : <Text>Aun no tienes compras</Text>
              }
            </>
        }
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#212F45',
    color: 'white',
    fontFamily: 'Poppins',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  description2: {
    backgroundColor: '#212F45',
    color: 'white',
    fontFamily: 'Poppins',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});
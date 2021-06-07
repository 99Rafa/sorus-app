import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import service from 'src/libs/service/service'


export default function Sells({ navigation }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigation.setOptions({ title: 'Ventas' })
    makeRequest()
  }, [])

  const makeRequest = async () => {
    setLoading(true)
    await service.get('sales/sells/')
      .then(res => {
        setItems(res)
      })
      .catch(err => {
        alert('Error al cargar las ventas')
        console.log(err)
      })
    setLoading(false)
  }

  const formatDate = date => {
    const d = new Date(date)
    const day = d.getDate().length == 1 ? d.getDate() : '0' + d.getDate()
    const month = d.getMonth().length == 1 ? d.getMonth() : '0' + d.getMonth()
    return `${day}/${month}/${d.getFullYear()}`
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Mis Ventas</Text>
        {
          loading
            ? <ActivityIndicator color="#000" size="large" style={{ marginTop: 30 }} />
            : <>
              {items.map(item => <View key={item.product.name}>
                <View style={styles.sale}>
                  <Text style={styles.description}>{item.product.name}</Text>
                  <Text style={styles.description}>Ref: {item.reference}</Text>
                  <Text style={styles.description}>{formatDate(item.buy_date)}</Text>
                </View>
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
    alignItems: 'center',
  },
  sale: {
    width: 350,
    backgroundColor: '#212F45',
    borderRadius: 10,
    marginTop: 10
  },
  description: {
    color: 'white',
    fontFamily: 'Poppins',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
  }
});
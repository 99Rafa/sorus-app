import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import service from 'src/libs/service/service';

const Item = ({ item }) => (
  <View style={styles.item} key={item.title + item.comment}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={{ fontFamily: 'Poppins' }}>{item.comment}</Text>
  </View>
);

export default function opinions({ navigation, route }) {

  const [rate, setRate] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const item = route.params
    navigation.setOptions({ headerShown: false });
    service.post('offers/review/list/', {
      product: item.id
    })
      .then(res => {
        setItems(res)
        if (res.length > 0) {
          const total = res.reduce((acum, item) => acum + item.rate, 0)
          setRate((total / res.length).toFixed(1))
        }
      })
      .catch(err => {
        alert('Error al cargar comentarios')
        console.log(err)
      })
  }, []);

  const BackButtonClick = () => {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
      <View style={styles.contentMain}>
        <TouchableOpacity onPress={BackButtonClick} style={{ top: 30 }} >
          <Icon name='chevron-left' size={45} color="#fff" ></Icon>
        </TouchableOpacity>
        <Text style={{ top: 50, left: 10, fontSize: 23, fontFamily: 'Poppins', color: '#fff' }}>Opiniones del Producto</Text>
      </View>
      <View style={styles.contentMain1}>
        <Text style={styles.number}>{rate}</Text>
        <FontAwesomeIcon icon={faStar} size={25} color={rate > 0 ? 'orange' : null} />
        <FontAwesomeIcon icon={faStar} size={25} color={rate > 1 ? 'orange' : null} />
        <FontAwesomeIcon icon={faStar} size={25} color={rate > 2 ? 'orange' : null} />
        <FontAwesomeIcon icon={faStar} size={25} color={rate > 3 ? 'orange' : null} />
        <FontAwesomeIcon icon={faStar} size={25} color={rate > 4 ? 'orange' : null} />
      </View>
      <View style={styles.contentMain2}>
        <SafeAreaView style={styles.container}>
          {
            items.length > 0
              ? <FlatList
                data={items}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.title + item.comment}
              />
              : <Text style={{ alignSelf: 'center', marginTop: 20 }}>Este producto aun no tiene comentarios</Text>
          }

        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentMain: {
    flex: .2,
    flexDirection: 'row',
    backgroundColor: '#312244',
    width: 1500,
    height: 1500,
  },
  contentMain1: {
    flex: .05,
    flexDirection: 'column',
    padding: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: .6
  },
  contentMain2: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    display: 'flex',
    backgroundColor: '#fff',
  },
  number: {
    fontSize: 60,
  },
  title: {
    fontSize: 23,
    fontFamily: 'Poppins'
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    borderRadius: 20,
    elevation: 24,
  },
})
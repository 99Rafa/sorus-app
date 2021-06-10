import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import service from 'src/libs/service/service'

export default function Categories({ category, setCategory }) {

  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = () => {
    service.get('offers/product/categories/')
      .then(response => {
        setCategoryData(response)
      })
      .catch(error => {
        alert('Error al cargar las categorias')
        console.log(error)
      });
  }


  return (
    <View style={styles.carrusel}>
      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <RenderItem
          item={item}
          category={category}
          setCategory={setCategory}
        />}
        contentContainerStyle={styles.fake_post}
      />
    </View>
  )
}

function RenderItem({ item, category, setCategory }) {

  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (category === item.id) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [category])

  const selectCategory = () => {
    if (selected) {
      setSelected(false)
      setCategory('')
    } else {
      setSelected(true)
      setCategory(item.id)
    }
  }

  return (
    <TouchableOpacity style={[styles.carrusel]} onPress={selectCategory} >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected ? '#006466' : '#312244'
        }}
      >
        <Icon name={item.icon_name} size={25} color='#fff' />
      </View>

      <Text
        style={{
          color: "#272640",
          fontSize: 12,
          fontFamily: 'Poppins'
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "coral",
    shadowOpacity: 0,
    borderWidth: 0,
  },
  carrusel: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})
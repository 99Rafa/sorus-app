import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Categories() {

  const [categoryData, setCategoryData] = useState([
    {
      id: 1,
      name: "Celulares",
      icon: "mobile-alt"
    },
    {
      id: 2,
      name: "Moda",
      icon: "tshirt"
    },
    {
      id: 3,
      name: "Accesorios",
      icon: "ring"
    },
    {
      id: 4,
      name: "Juguetes",
      icon: "car"
    },
  ])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.carrusel
        ]}
      //llamar
      // onPress={() => onSelectCategory(item)}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#312244'  //(selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
          }}
        >
          <Icon name={item.icon} size={25} color='#fff'/>
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

  return (
    <View style={styles.carrusel}>
      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={styles.fake_post}
      />
    </View>
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
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})
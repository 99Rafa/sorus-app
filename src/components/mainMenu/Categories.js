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
      name: "Electronicos",
      icon: "bell"
    },
    {
      id: 2,
      name: "Supermercado",
      icon: "bell"
    },
    {
      id: 3,
      name: "Moda",
      icon: "bell"
    }
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
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#666'  //(selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
          }}
        >
          <Icon name={item.icon} size={25} />
        </View>

        <Text
          style={{
            //marginTop: SIZES.padding,
            color: "coral"//(selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
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
    backgroundColor: '#B1B1B1',
    flex: 1,
    width: '100%',
    borderRadius: 8,
  },
})
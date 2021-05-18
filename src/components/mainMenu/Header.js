import React from 'react'

import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import Animated from 'react-native-reanimated'


const { Value } = Animated


class Header extends React.Component {

 
  constructor(props) {
    super(props)


    this._scroll_y = new Value(0)
  }

  render() {

    const _diff_clamp_scroll_y = Animated.diffClamp(this._scroll_y, 0, 50)

    const _header_height = Animated.interpolateNode(_diff_clamp_scroll_y, {
      inputRange: [0, 50],
      outputRange: [50, 0],
      extrapolate: 'clamp'
    })

    const _header_transalte_y = Animated.interpolateNode(_diff_clamp_scroll_y, {
      inputRange: [0, 50],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    })

    const _header_opacity = Animated.interpolateNode(_diff_clamp_scroll_y, {
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    //para asignar
    function onSelectCategory(category) {
      //filtrar ofertas
      let ofertastList = ofertasData.filter(a => a.categories.includes(category.id))

      setRestaurants(OfertasList)

      setSelectedCategory(category)
  }
    
    const categoryData = [
      {
          id: 1,
          name: "Electronicos",
          icon: <Icon name="bell"  />
      },
      {
          id: 2,
          name: "Supermercado",  
          icon: <Icon name="bell"  />       
      },
      {
          id: 3,
          name: "Moda",    
          //<Icon name="bell" size={25} color="#000" />
          icon: <Icon name="bell"  />
      }
      
    ]
  
    function rendercategory() {
      
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
                          backgroundColor: '#222'  //(selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                      }}
                  >
                      <Image
                          source={item.icon}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30
                              
                          }}
                      >
                        
                        </Image>
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
          <View style={ styles.carrusel }>
  
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
  


    return (
      <SafeAreaView style={styles.safe_area_view}>

        <Animated.View
          style={[
            styles.header,
            {
              height: _header_height,
              transform: [{ translateY: _header_transalte_y }],
              opacity: _header_opacity
            }
          ]}
        >
                     
      

                     
        </Animated.View>
        <Text >Categorias</Text>
        {rendercategory()}
        <Animated.ScrollView
          style={[
            styles.scroll_view,
            {

            }
          ]}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={5}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this._scroll_y } }
            }
          ])}
        >
          <View style={[styles.fake_post, { backgroundColor: '#222' }]} />
          <View style={[styles.fake_post, { backgroundColor: '#333' }]} />
          <View style={[styles.fake_post, { backgroundColor: '#444' }]} />
          <View style={[styles.fake_post, { backgroundColor: '#555' }]} />
          <View style={[styles.fake_post, { backgroundColor: '#666' }]} />

        </Animated.ScrollView>
      </SafeAreaView>
    )
  }
}

export default Header

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  fake_icon_box: {
    backgroundColor: '#c4e6eb',
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll_view: {
    flex: 1
  },
  fake_post: {
    height: 250,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginRight: 10,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: "coral",
    shadowOpacity: 0,
    borderWidth: 0,
  },
  carrusel: {
    backgroundColor: '#B1B1B1',
    
    flex: 1,
    width:  '100%',
    borderRadius: 8,
  },
})
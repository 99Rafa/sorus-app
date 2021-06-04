import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import Header from 'src/components/mainMenu/Header'
import ProductItem from 'src/components/mainMenu/ProductItem';
import Pagination from 'src/components/mainMenu/Pagination'
import service from 'src/libs/service/service'
import Categories from "src/components/mainMenu/Categories";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Body({ navigation }) {

  const [_scroll_y,] = useState(new Animated.Value(0));
  const [products, setProducts] = useState([])
  const [productsTop, setProductsTop] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [response, setResponse] = useState({})
  const [trigger, setTrigger] = useState(true)
  const [category, setCategory] = useState()
  const [query, setQuery] = useState('')
  const [hot, setHot] = useState(false)

  useEffect(() => {
    handleSearch()
    makeRequestTop()
  }, [query, category, hot])

  useEffect(() => {
    let b = false;
    const interval = setInterval(() => {
      b = !b;
      setTrigger(b)
    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [])

  const listUrl = 'offers/product/list/'

  const handleSearch = () => {
    let url = listUrl + '?';
    if (hot) {
      url += `hot=1&`
    }
    if (category) {
      url += `category=${category}&`
    }
    if (query) {
      url += `query=${query}`
    }
    setCurrentPage(1)
    makeRequest(url)
  }

  const changePage = (params, i) => {
    const url = listUrl + params
    setCurrentPage(currentPage + i)
    makeRequest(url)
  }

  const makeRequest = async url => {
    setLoading(true)
    await service.get(url)
      .then(response => {
        setResponse(response);
        setProducts(response.results);
      })
      .catch(error => {
        alert("Error al cargar las ofertas");
        console.log(error);
      });
    setLoading(false)
  }

  const makeRequestTop = async () => {
    setLoading(true)
    await service.get('offers/product/list_top/')
      .then(response => {
        setProductsTop(response);
      })
      .catch(error => {
        alert("Error al cargar las ofertas");
        console.log(error);
      });
    setLoading(false)
  }

  const handlePress = item => {
    navigation.navigate("ProductView", item)
  }

  const [selected, setSelected] = useState(false)

  return (
    <SafeAreaView style={styles.safe_area_view}>
      <Header scroll_y={_scroll_y} setQuery={setQuery} />
      <Animated.ScrollView
        style={styles.scroll_view}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={5}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: _scroll_y } } }])}
      >
        <Categories category={category} setCategory={setCategory} />
        {
          loading
            ? <ActivityIndicator color="#000" size="large" style={{ marginTop: 30 }} />
            : <>
              <Text style={styles.titles}>Top</Text>
              {productsTop.map((item) => <ProductItem item={item} key={item.name + item.price} handlePress={handlePress} trigger={trigger} />)}
            </>
        }

        {
          loading
            ? <ActivityIndicator color="#000" size="large" style={{ marginTop: 30 }} />
            : <>
              <View style={styles.top}>
                <Text style={styles.titles}>Generales</Text>
                <TouchableOpacity onPress={() => setHot(!hot)}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: hot ? '#006466' : '#312244',
                      marginLeft: 10
                    }}
                  >
                    <Icon name={'hotjar'} size={25} color='#fff' />
                    <Text style={{ color: "#fff", fontSize: 12, fontFamily: 'Poppins' }}>Hot</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {products.map((item) => <ProductItem item={item} key={item.name + item.price} handlePress={handlePress} trigger={trigger} />)}

              <Pagination response={response} changePage={changePage} currentPage={currentPage} />
            </>
        }

      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1
  },
  scroll_view: {
    flex: 1,
  },
  fake_post: {
    height: 100,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  titles: {
    paddingLeft: 20,
    fontSize: 18,
    fontFamily: 'PoppinsBold',
    color: '#312244'
  },
  top: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

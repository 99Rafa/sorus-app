import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import Animated from 'react-native-reanimated'
import Header from 'src/components/mainMenu/Header'
import ProductItem from 'src/components/mainMenu/ProductItem';
import Pagination from 'src/components/mainMenu/Pagination'
import service from 'src/libs/service/service'
import Categories from "src/components/mainMenu/Categories";

export default function Body({ navigation }) {

  const [_scroll_y,] = useState(new Animated.Value(0));
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [response, setResponse] = useState({})
  const [trigger, setTrigger] = useState(true)
  const [category, setCategory] = useState()
  const [query, setQuery] = useState('')

  useEffect(() => {
    handleSearch()
  }, [query, category])

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

  const handlePress = item => {
    navigation.navigate("ProductView", item)
  }

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
  }
});

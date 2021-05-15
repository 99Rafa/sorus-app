import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import Animated from 'react-native-reanimated'
import Header from 'src/components/mainMenu/Header'
import ProductItem from 'src/components/mainMenu/ProductItem';
import Pagination from 'src/components/mainMenu/Pagination'
import service from 'src/libs/service/service'

export default function Body() {

  const [_scroll_y,] = useState(new Animated.Value(0));
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [response, setResponse] = useState({})
  const [query, setQuery] = useState('')

  useEffect(() => {
    handleSearch()
  }, [query])

  const handleSearch = async () => {
    setLoading(true)
    let offers = {}
    if (query === "") {
      offers = await service.get('offers/product/list/')
    } else {
      offers = await service.post('offers/product/query/', query)
    }
    if (!offers.error) {
      setResponse(offers)
      setProducts(offers.results)
      setLoading(false)
      setCurrentPage(1)
    } else {
      alert('Error al cargar ofertas')
    }
    setLoading(false)
  }

  const changePage = async i => {
    setLoading(true)
    let offers = {}
    if (query === "") {
      offers = await service.get(`offers/product/list/?page=${currentPage + i}`)
    } else {
      offers = await service.post(`offers/product/query/?page=${currentPage + i}`, query)
    }
    if (!offers.error) {
      setCurrentPage(currentPage + i)
      setResponse(offers)
      setProducts(offers.results)
      setLoading(false)
    } else {
      alert('Error when loading offers')
    }
    setLoading(false)
  }

  const handlePress = item => {

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

        {
          loading
            ? <ActivityIndicator color="#000" size="large" style={{ marginTop: 30 }} />
            : <>
              {products.map((item) => <ProductItem item={item} key={item.name + item.price} handlePress={handlePress} />)}

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

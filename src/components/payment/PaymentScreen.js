import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from "react-native-webview";
import Icon from 'react-native-vector-icons/FontAwesome5'
import userData from 'src/libs/user/userData';
import Star from 'src/components/feedback/star';
import service from 'src/libs/service/service';

export default function PaymentScreen({ route, navigation }) {

  const [javaScript, setJavaScript] = useState('');
  const [success, setSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [product, setProduct] = useState(false);
  const [stars, setStars] = useState(0);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: "Pago" })
    const { id, name, price, type } = route.params
    setProductId(id)
    setJavaScript(`
    document.getElementById('type').value="${type}";
      document.getElementById('sku').value="${id}";
      document.getElementById('price').value="${price}";
      document.getElementById('name').value="${name}";
      document.getElementById('user').value="${userData.id}";
      document.productForm.submit();
    `);
  }, []);

  const handleStateChange = data => {
    if (data.title === "product") {
      setSuccess(true)
      setProduct(true)
    } else if (data.title === 'subscription') {
      setSuccess(true)
    } else if (data.title === "cancel" | data.title === 'Error') {
      setCancel(true)
    }
  }

  const handlePress = () => {
    setLoading(true)
    service.post('users/add_stars/', {
      product: productId,
      stars: stars
    })
      .then(() => {
        alert('Gracias por tu calificación')
        navigation.goBack()
      })
      .catch(err => {
        alert('Error al calificar vendedor')
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <View style={{ flex: 1 }}>
      {
        !success & !cancel
          ? <WebView
            source={{ uri: 'http://10.0.2.2:3000/' }}
            onNavigationStateChange={handleStateChange}
            injectedJavaScript={javaScript}
            onError={() => setCancel(true)}
          />
          : <View style={{ flex: 1, alignItems: 'center' }}>

            <Icon name={success ? "check-circle" : "times-circle"} size={150} color='#4D194D' style={styles.icon} />
            <Text style={styles.text}>{success ? "El pago fue exitoso" : "El pago fue rechazado"}</Text>

            {
              product
                ? <View style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
                  <Text>Dale una calificación al vendedor!</Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }} >
                    <Star changeRate={setStars} />
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading ? true : false} >
                    <Text style={{ color: '#fff', fontFamily: 'Poppins' }}>Calificar</Text>
                  </TouchableOpacity>
                </View>
                : false
            }

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins' }}>Regresar</Text>
            </TouchableOpacity>
          </View>
      }


    </View >
  )
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 40
  },
  text: {
    fontFamily: 'Poppins'
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#4D194D',
    marginTop: 20,
    borderRadius: 20,
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
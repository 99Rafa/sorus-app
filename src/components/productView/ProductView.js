import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

export default function ProductView({ route, navigation }) {

  const [item, setItem] = useState({})

  useEffect(() => {
    setItem(route.params);
    navigation.setOptions({ headerShown: false });
  }, [])

  return <Container>
    <StatusBar barStyle='light-content' />
    <ProductBackground source={{ uri: item.image }}>
      <SafeAreaView>
        <MenuBar>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back>
              <AntDesign name="arrowleft" size={32} color="#FFF" />
              <Text style={{ marginLeft: 10, fontSize: 20 }}>Volver</Text>
            </Back>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Review")}>
            <AntDesign name="star" size={32} color="#FFF" style={{ marginTop: 30 }} />
          </TouchableOpacity>
        </MenuBar>
        <MainProduct>
          <Text style={{ fontSize: 32 }}>{item.name}</Text>
          <Divider />
          <Text style={{ fontSize: 24 }}>Categoria</Text>
          <Text style={{ fontSize: 24 }}>{item.price}</Text>
        </MainProduct>
        <Button>
          <Text style={{ fontSize: 20 }}>IR A LA OFERTA</Text>
        </Button>
      </SafeAreaView>
    </ProductBackground>
    <DescriptionContainer>
      <Text dark style={{ fontSize: 24 }}>Descripcion</Text>
      <Text dark>{item.description}</Text>

    </DescriptionContainer>
  </Container>;
}

const Container = styled.View`
    flex: 1;
    background-color: #FFF;
`;

const Text = styled.Text`
    color: ${(props) => (props.dark ? "#000" : "#FFF")};
    font-family: "Poppins";
    fontWeight: bold;
`;

const ProductBackground = styled.ImageBackground`
    width: 100%;
    height: 70%;
`;

const MenuBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
`;

const Back = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 30px;
`;

const MainProduct = styled.View`
    padding: 0 32px;
    margin: 200px 0 32px 0;
`;

const Divider = styled.View`
    border-bottom-color: #FFF;
    border-bottom-width: 2px;
    width: 150px;
    margin 8px 0;
`;

const Button = styled.TouchableOpacity`
    margin: -17px 0 48px 32px;
    background-color: rgba(49, 18, 69, 1);
    align-self: flex-start;
    padding: 6px 18px;
    border-radius: 100px;
`;

const DescriptionContainer = styled.View`
    margin-top: -30px;
    padding: 32px;
    background-color: #FFF;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
`;

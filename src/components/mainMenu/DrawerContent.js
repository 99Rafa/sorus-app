import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import service from 'src/libs/service/service';
import { getInfoUser } from 'src/libs/service/profile/getInfoUser';

export default function DrawerContent({ navigation, ...props }) {
  const [first_name, setFirst_name] = useState("");
  const [email, setEmail] = useState("");
  const [last_name, setLast_name] = useState("");
  const [image, setImage] = useState("src/assets/sorus.png")

  const logout = () => {
    service.post('users/logout/')
      .then(async _ => {
        await AsyncStorage.clear()
        navigation.navigate("Login")
      })
      .catch(err => {
        alert('Error al iniciar sesión')
        console.log(err)
      })
  }

  useEffect(() => {
    GetInfoUser();
  }, []);

  GetInfoUser = async () => {
    const response = await getInfoUser();
    const data = response.data;
    if (response !== 'Error') {
      await AsyncStorage.setItem('username', data.username);
      await AsyncStorage.setItem('first_name', data.first_name);
      setFirst_name(data.first_name)
      await AsyncStorage.setItem('last_name', data.last_name);
      setLast_name(data.last_name)
      await AsyncStorage.setItem('email', data.email);
      setEmail(data.email)
      await AsyncStorage.setItem('profile_image', data.profile_image);
      setImage(data.profile_image);
      console.log('Se ha obtenido la información');
    } else {
      console.log('No se pudo obtener los datos');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: image ? image : '000'
                }}
                size={60}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{first_name} {last_name}
                </Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>0</Paragraph>
                <Caption style={styles.caption}>Publications</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>35</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Menu"
              onPress={() => { navigation.navigate("Home") }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Perfil"
              onPress={() => { navigation.navigate("Profile") }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="bookmark-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Mis Ofertas"
              onPress={() => { navigation.navigate("UpdateOffer") }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="tag-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Subir Oferta"
              onPress={() => { navigation.navigate('RegisterProduct') }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-check-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Support"
              onPress={() => { }}
            />
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section styles={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Cerrar Sesión"
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

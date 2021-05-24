import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import service from 'src/libs/service/service';
import userData from 'src/libs/user/userData';

export default function DrawerContent({ navigation, ...props }) {

  const logout = () => {
    service.post('users/logout/')
      .then(async () => {
        await AsyncStorage.clear()
        navigation.pop()
        navigation.navigate('Login')
      })
      .catch(err => {
        alert('Error al iniciar sesión')
        console.log(err)
      })
  }

  useEffect(() => {
    GetInfoUser();
  }, []);

  GetInfoUser = () => {
    service.get('users/profile/info/')
      .then(response => {
        userData.setValues(response.data)
      })
      .catch(error => {
        console.log('No se pudieron cargar los datos del usuario')
        console.log(error)
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: userData.profile_image ? userData.profile_image : '#000'
                }}
                size={60}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{userData.first_name} {userData.last_name}
                </Title>
                <Caption style={styles.caption}>{userData.email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>0</Paragraph>
                <Caption style={styles.caption}>Publicaciones</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>35</Paragraph>
                <Caption style={styles.caption}>Ventas</Caption>
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
    fontSize: 15,
    marginTop: 3,
    fontFamily: 'PoppinsBold'
  },
  caption: {
    fontSize: 12.5,
    lineHeight: 14,
    fontFamily: 'Poppins'
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

import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Body from 'src/components/mainMenu/Body'
import DrawerContent from 'src/components/mainMenu/DrawerContent';

const Drawer = createDrawerNavigator();

export default function MenuStack({ navigation }) {

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [])

  return <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={Body} />
  </Drawer.Navigator>
}

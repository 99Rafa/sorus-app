import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  SafeAreaView,
} from 'react-native'

import Header from 'src/components/mainMenu/Header'
import { DrawerContent } from 'src/components/mainMenu/DrawerContent';

const Drawer = createDrawerNavigator();

class MenuStack extends React.Component {
  componentDidMount(){
    this.props.navigation.setOptions({headerShown: false})
  }
  render() {
    return <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Header} />
    </Drawer.Navigator>


  }
}

export default MenuStack;
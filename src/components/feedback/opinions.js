import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        description: 'sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        description: 'sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        description: 'sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72ss',
        title: 'Third Item',
        description: 'sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
    },
];


const Item = ({ item }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={{ fontFamily: 'Poppins' }}>{item.description}</Text>
    </View>
);

export default function opinions({ navigation }) {
    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    });

    const BackButtonClick = () => {
        navigation.goBack();
    }

    const stars = [
        useState("#000"),
        useState("#000"),
        useState("#000"),
        useState("#000"),
        useState("#000")
    ]

    return (
        <View style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
            <View style={styles.contentMain}>
                <TouchableOpacity onPress={BackButtonClick} style={{ top: 30 }} >
                    <Icon name='chevron-left' size={45} color="#fff" ></Icon>
                </TouchableOpacity>
                <Text style={{ top: 50, left: 10, fontSize: 23, fontFamily: 'Poppins', color: '#fff' }}>Opiniones del Producto</Text>
            </View>
            <View style={styles.contentMain1}>
                <Text style={styles.number}>4.5</Text>
                <FontAwesomeIcon icon={faStar} size={25} />
                <FontAwesomeIcon icon={faStar} size={25} />
                <FontAwesomeIcon icon={faStar} size={25} />
                <FontAwesomeIcon icon={faStar} size={25} />
                <FontAwesomeIcon icon={faStar} size={25} />
            </View>
            <View style={styles.contentMain2}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentMain: {
        flex: .2,
        flexDirection: 'row',
        backgroundColor: '#312244',
        width: 1500,
        height: 1500,
    },
    contentMain1: {
        flex: .05,
        flexDirection: 'column',
        padding: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderBottomColor: '#000',
        borderBottomWidth: .6
    },
    contentMain2: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        display: 'flex',
        backgroundColor: '#fff',
    },
    number: {
        fontSize: 60,
    },
    title: {
        fontSize: 23,
        fontFamily: 'Poppins'
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        borderRadius:20,
        elevation: 24,
    },
})
import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity, TextInput, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignature, faMoneyCheckAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { register } from 'src/libs/service/registerProducts/registerProductsService';
import * as FileSystem from 'expo-file-system';

export default function RegisterProduct() {
    const [image, setImage] = useState('src/assets/canasta.png');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    registerOffert = async () => {
        const image64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
        image64 = 'data:image/png;base64,' + image64;
        const data = {
            name: name,
            description: description,
            base_price: price,
            image: image64,
            start_date: new Date(),
            end_date: date
        }
        const response = await register(data);
        if (response !== 'Error') {
            alert('Se ha guardado la oferta')
        } else {
            alert('No se pudo registrar la oferta')
        }
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.contentMain}>
            <View style={styles.content_1}>
            </View>
            <View style={styles.content_2}>
                <View style={styles.imgcont}>
                    <TouchableOpacity onPress={pickImage} style={styles.touchableOpaci}>
                        <Image style={styles.image} source={{ uri: image }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.content_3}>
                    <View style={styles.buttonDate}>
                        <TouchableOpacity onPress={showDatepicker} style={styles.fecha1}>
                            <Text style={styles.colorText}>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showTimepicker} style={styles.fecha2}>
                            <Text style={styles.colorText}>{date.getHours()}:{date.getMinutes()}</Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style={styles.input}>
                        <FontAwesomeIcon icon={faSignature} size={25} />
                        <TextInput
                            placeholder='Nombre del Producto'
                            style={{ marginLeft: 10, width: 250 }}
                            value={name}
                            onChangeText={setName}>
                        </TextInput>
                    </View>
                    <View style={styles.input2}>
                        <FontAwesomeIcon icon={faFileAlt} size={25} />
                        <TextInput placeholder='Descripción' style={{ height: 80, textAlignVertical: 'top', width: 250, marginLeft: 10 }}
                            multiline
                            value={description}
                            onChangeText={setDescription}>

                        </TextInput>
                    </View>
                    <View style={styles.input}>
                        <FontAwesomeIcon icon={faMoneyCheckAlt} size={25} />
                        <TextInput placeholder='Precio' style={{ marginLeft: 10, width: 250 }}
                            value={price}
                            onChangeText={setPrice}>
                            $
                        </TextInput>
                    </View>
                    <View style={styles.content_4} >
                        <TouchableOpacity style={styles.buttonRegister} onPress={registerOffert}>
                            <Text style={styles.colorTextButton}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        backgroundColor: '#E0E0E0',
        resizeMode: 'cover',
        borderRadius: 20,
        marginBottom: 10,
    },
    content_1: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content_2: {
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 50,

    },
    content_3: {
        flex: .1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 60
    },
    contentMain: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,

    },
    imgcont: {
        alignItems: 'center',
        position: 'relative',

    },
    touchableOpaci: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 50,
        bottom: 75,
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        width: 250,
        height: 40,
        padding: 5,
        borderBottomWidth: 1,
        marginBottom: 40,
        top: 50
    },
    input2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: 250,
        height: 80,
        borderBottomWidth: 1,
        marginBottom: 40,
        top: 40
    },
    imgCircle: {
        width: 200,
        height: 200
    },
    fecha1: {
        backgroundColor: '#fff',
        width: 80,
        height: 40,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 15,
        borderRightWidth: 1,
    },
    fecha2: {
        backgroundColor: '#fff',
        width: 80,
        height: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 15,
        borderLeftWidth: .1,
    },
    buttonDate: {
        display: 'flex',
        flexDirection: 'row',
        top: 40
    },
    buttonRegister: {
        backgroundColor: '#fff',
        top: 60,
        width: 250,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 15,
        backgroundColor: '#4D194D',
    },
    colorText: {
        color: '#4D194D'
    },
    colorTextButton: {
        color: '#fff'
    }
})

import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateProduct } from 'src/libs/service/registerProducts/updateOfferService';
import { getInfoOffer } from 'src/libs/service/registerProducts/getInfoOfferService';
import * as FileSystem from 'expo-file-system';
import CheckBox from '@react-native-community/checkbox';


export default function updateOffer({ navigation }) {
    const [selectedItem,] = useState({});
    const [category, setCategory] = useState({});
    const [offers, setOffers] = useState([])
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState("src/assets/sorus.png");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [changeImg, setChangeImg] = useState(false);
    const [stock, setStock] = useState("");
    const [isOffer, setIsOffer] = useState(false)

    useEffect(() => {
        GetInfoOfer();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        navigation.setOptions({ headerShown: false });
    }, []);

    const Update = async () => {
        if (category.id === undefined) {
            alert('Selecciona una categoria')
            return
        }
        let image64 = "";
        if (changeImg) {
            image64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
            image64 = `data:image/png;base64,${image64}`;
        }
        const data = {
            name,
            description,
            price,
            stock,
            is_offer: isOffer,
            image: changeImg ? image64 : image,
            end_date: date,
            id: id,
            category: category.id
        }

        const response = await updateProduct(data);
        if (response !== 'Error') {
            alert('Se han actualizado los datos');
        } else {
            alert('No se pudo actualizar los datos');
        }
    }

    const GetInfoOfer = async () => {
        const response = await getInfoOffer();
        if (response !== 'Error') {
            setOffers(response);
        } else {
            console.log('No se pudo obtener los datos');
        }
    }

    const BackButtonClick = () => {
        navigation.navigate("Home");
    }

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setChangeImg(true);
            setImage(result.uri);
        }
    };

    const setInfo = item => {
        setImage(item.image);
        setName(item.name);
        setDescription(item.description)
        setDate(new Date(item.end_date));
        setPrice(item.price.toString())
        setId(item.id.toString());
        compareIdCategory(item.category);
        setStock(item.stock.toString());
        setIsOffer(item.is_offer);
    }

    const compareIdCategory = (item) => {
        for (let c of categories) {
            if (c.id == item) {
                setCategory(c)
            }
        }
    }

    const categories = [
        {
            name: 'Selecciona una categoria',
            id: undefined
        },
        {
            name: 'Electronica',
            id: '1'
        },
        {
            name: 'Celulares',
            id: '2'
        },
        {
            name: 'Moda',
            id: '3'
        },
        {
            name: 'Supermercado',
            id: '4'
        },
        {
            name: 'Accesorios',
            id: '5'
        },
        {
            name: 'Herramientas',
            id: '6'
        },
        {
            name: 'Juguetes',
            id: '7'
        },
    ];

    return (
        <View style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
            <View style={styles.contentMain}>
                <TouchableOpacity onPress={BackButtonClick} style={{ top: 30 }} >
                    <Icon name='chevron-left' size={45} color="#fff" ></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.circle}>
            </View>
            <View style={styles.imgContainer}>
                <TouchableOpacity onPress={pickImage} >
                    <Image style={styles.image} source={{ uri: image }} />
                </TouchableOpacity>
            </View>
            <View style={styles.cont_1}>
                <Picker style={styles.style_picker}
                    selectedValue={selectedItem}
                    onValueChange={setInfo}>
                    {offers.map(item => <Picker.Item value={item} label={item.name} key={item.name + item.price} />)}
                </Picker>
            </View>
            <View style={styles.cont_2}>
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
                <View style={{ top: 40 }}>
                    <View style={styles.form}>
                        <Text style={styles.textoPrincipal}>Nombre del Producto</Text>
                        <View style={styles.input}>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder=''
                                placeholderTextColor="#868686"
                                style={{ marginLeft: 10, width: 250 }}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textoPrincipal}>Descripción</Text>
                        <View style={styles.input2}>
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                placeholder=''
                                placeholderTextColor="#868686"
                                multiline
                                style={{ marginLeft: 10, width: 250 }}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textoPrincipal}>Precio</Text>
                        <View style={styles.input}>
                            <TextInput
                                value={price}
                                onChangeText={setPrice}
                                placeholder=''
                                keyboardType="number-pad"
                                placeholderTextColor="#868686"
                                style={{ marginLeft: 10, width: 250 }}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textoPrincipal}>Stock</Text>
                        <View style={styles.input}>
                            <TextInput
                                value={stock}
                                onChangeText={setStock}
                                placeholder=''
                                keyboardType="number-pad"
                                placeholderTextColor="#868686"
                                style={{ marginLeft: 10, width: 250 }}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.form_2}>
                        <Text style={styles.textoPrincipal}>¿Es oferta?</Text>
                        <CheckBox
                            disabled={false}
                            value={isOffer}
                            onCheckColor='#4D194D'
                            onValueChange={(newValue) => setIsOffer(newValue)}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.textoPrincipal}>Categoria</Text>
                        <Picker style={styles.style_picker2}
                            selectedValue={category}
                            onValueChange={setCategory}>
                            {categories.map(item => <Picker.Item value={item} label={item.name} key={item.id + item.name} />)}
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={Update}>
                        <Text style={{ color: '#fff' }}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    contentMain: {
        flex: .9,
        flexDirection: 'row',
        backgroundColor: '#312244',
        position: 'absolute',
        width: 1500,
        height: 1500,
    },
    contentMain1: {
        flex: 1,
        flexDirection: 'column',
    },
    cont_1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cont_2: {
        flex: 2.8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    style_picker: {
        height: 100,
        width: 200,
        borderWidth: 1,
        borderColor: '#000',
        color: '#fff'
    },
    style_picker2: {
        height: 40,
        width: 300,
        color: '#868686'
    },
    circle: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 1500,
        height: 1500,
        borderRadius: 800,
        top: 160,
        left: -550
    },
    imgContainer: {
        flex: .1,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        top: 120
    },
    image: {
        width: 120,
        height: 120,
        backgroundColor: '#E0E0E0',
        resizeMode: 'cover',
        borderRadius: 20,
        marginBottom: 10,
    },
    textoPrincipal: {
        fontSize: 17,
        marginLeft: 5,
        marginBottom: 5
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.09)'
    },
    form: {
        marginTop: 3
    },
    form_2: {
        marginTop: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: '#4D194D',
        marginTop: 5,
        borderRadius: 20,
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonDate: {
        display: 'flex',
        flexDirection: 'row',
        top: 40
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
    input2: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 5,
        width: 300,
        height: 60,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.09)'
    },
})

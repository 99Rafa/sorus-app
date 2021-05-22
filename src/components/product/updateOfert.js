import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateOfer } from 'src/libs/service/registerProducts/updateOferService';
import { getInfoOfer } from 'src/libs/service/registerProducts/getInfoOferService';
import * as FileSystem from 'expo-file-system';


export default function updateOfert({ navigation }) {
    const [selectedItem, setSelectedItem] = useState({});
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
        if(changeImg){
            let image64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
            setImage (`data:image/png;base64,${image64}`)
        }        
        const data = {
            name,
            description,
            price,
            image,
            end_date: date,
            id: id
        }

        const response = await updateOfer(data);
        if (response !== 'Error') {
            alert('Se han actualizado los datos');
        } else {
            alert('No se pudo actualizar los datos');
        }
    }

    const GetInfoOfer = async () => {
        const response = await getInfoOfer();
        if (response !== 'Error') {
            setOffers(response);
            console.log('Se ha obtenido la información');
        } else {
            console.log('No se pudo obtener los datos');
        }
    }

    const BackButtonClick = () => {
        navigation.navigate("Menu");
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
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
            <View style={styles.contentMain}>
                <TouchableOpacity onPress={BackButtonClick} style={{ top: 30 }} >
                    <Icon name='chevron-left' size={45}></Icon>
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
        flex: 2.4,
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
        marginTop: 20
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: '#4D194D',
        marginTop: 30,
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
        paddingTop: 5,
        width: 300,
        height: 80,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.09)'
    },
})

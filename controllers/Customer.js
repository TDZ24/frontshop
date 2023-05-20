import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../assets/styles/styles';
import axios from 'axios';



export default function Customer() {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")
    const [idSearch, setIdsearch] = useState("")
    // configuración del formulario
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });

    const onSave = async(data) => {

        let nombre = data.firstName;
        let apellidos = data.lastName;
        const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
            nombre,
            apellidos,
        })
        setIsError(false);
        setMessage("Cliente agregado correctamente");
        seetTimeout(()=>{
            setMessage("")
        },2000)
        reset();
    };

    const onSearch = async(data)=>{
    }
    
    return (
        <View style={styles.container}>
            <Text>Actualización de Clientes</Text>
            <TextInput
            label="Id del cliente a buscar"
            mode="outlined"
            value={idSearch}
            onChangeText={idSearch => setIdsearch(idSearch)}
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Nombre Completo"
                        mode="outlined"
                        style={{ backgroundColor: 'powderblue' }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="firstName"
            />
            {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Apellidos"
                        mode="outlined"
                        style={{ marginTop: 10 }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="lastName"
            />
            {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligatorio</Text>}
            <Text style={{color: isError ? 'red' : 'green'}}>{message}</Text>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <Button
                    icon="content-save"
                    mode="contained" onPress={handleSubmit(onSave)}>
                    Guardar
                </Button>
                <Button
                    style={{ backgroundColor: 'orange', marginLeft: 10 }}
                    icon="card-search-outline"
                    mode="contained" onPress={() => console.log('Pressed')}
                    onPress={onSearch}>
                    Buscar
                </Button>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <Button
                    icon="pencil-outline"
                    mode="contained" onPress={() => console.log('Pressed')}>
                    Actualizar
                </Button>
                <Button
                    style={{ backgroundColor: 'red', marginLeft: 10 }}
                    icon="delete-outline"
                    mode="contained" onPress={() => console.log('Pressed')}>
                    Eliminar
                </Button>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <Button
                    icon="view-list"
                    mode="contained" onPress={() => console.log('Pressed')}>
                    Listar
                </Button>

            </View>
        </View>
    )
}
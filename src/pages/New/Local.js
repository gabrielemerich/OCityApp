import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    SafeAreaView,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as firebase from 'firebase';
import 'firebase/firestore';

export const Local = ({ route, navigation }) => {
    const [point, setPoint] = useState(route.params?.point);

    const firestore = firebase.firestore();

    function handleNavigateBack() {
        navigation.navigate('Info', { point: point });
    }

    function newPoint(point) {
        firestore.collection('points').doc().set(point).then(res => {
            console.log(res);
        }, err => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log(point)
    }, [point]);

    function setLocation(details) {
        const { lat, lng } = details.geometry.location;
        setPoint({ ...point, latitude: lat, longitude: lng, endereco: details.formatted_address })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <View style={styles.backButton}>
                            <TouchableOpacity>
                                <Ionicons name="ios-arrow-back" onPress={handleNavigateBack} color="#184820" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.title}>Localização</Text>
                            <Text style={styles.description}>Preencha os campos abaixo com informações relacionadas ao endereço do ponto.</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ width: 170, height: 170 }} source={require('../../assets/img/marker.png')} />
                    </View>
                    <View>

                        <Text style={styles.labelInput}>ENDEREÇO</Text>

                        <View style={{
                            height: 200,
                            marginTop: 20, marginLeft: -8
                        }}>
                            <GooglePlacesAutocomplete
                                placeholder='Digite a rua, número e bairro.'
                                fetchDetails={true}
                                styles={{
                                    textInputContainer: {
                                        backgroundColor: 'transparent',
                                        borderTopColor: 'transparent',
                                        borderBottomColor: 'transparent',
                                        maxWidth: 500

                                    },
                                    textInput: {
                                        borderWidth: 1,
                                        borderColor: '#184820',
                                        height: 40
                                    },

                                }}

                                enablePoweredByContainer={false}
                                onPress={(data, details = null) => setLocation(details)}
                                onFail={error => console.error(error)}
                                onNotFound={() => console.log(teste)}
                                query={{
                                    key: 'AIzaSyBLxt4ah56AjrHnMVs-io8vItNAz_LiTOY',
                                    language: 'pt',
                                }}
                            />
                        </View>

                        <RectButton style={styles.button}>

                            <Text style={styles.buttonText} onPress={() => newPoint(point)}>
                                FINALIZAR
                        </Text>
                            <View>
                                <Text style={styles.buttonIcon}>
                                    <Ionicons name="md-checkmark-circle" color="#fff" size={32} />
                                </Text>
                            </View>
                        </RectButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        padding: 20 + Constants.statusBarHeight,
        justifyContent: "flex-end",

    },
    title: {
        fontSize: 25,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    description: {
        color: 'black',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_300Light',
        width: 245
    },
    headerTitle: {

        flexDirection: 'row'
    },
    backButton: {
        width: 50,
        position: "relative",
        borderRadius: 30,
        height: 50,
        backgroundColor: '#ddd',
        paddingLeft: 17,
        paddingTop: 9,
        left: -15,
        top: 30
    },
    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#184820',
        padding: 9,
        marginTop: 10,
        fontSize: 16,
    },

    labelInput: {
        color: 'black',
        fontFamily: 'Roboto_500Medium',
        marginBottom: -20,
        marginTop: 6
    },
    button: {
        backgroundColor: '#184820',
        height: 60,
        flexDirection: 'row',
        borderRadius: 30,
        overflow: 'hidden',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        left: -30
    }

});
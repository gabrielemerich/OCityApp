import React, { useState, useEffect } from 'react';
import { Point } from '../../models/Point';
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


export const New = ({ route, navigation }) => {

    const [point, setPoint] = useState(new Point);

    useEffect(() => {
        if (route.params?.point) {
            setPoint(route.params?.point)
        }
    }, [route.params?.point]);

    //const navigation = useNavigation();

    function handleNavigateBack() {
        navigation.goBack();
    }

    function prox() {
        navigation.navigate('Info', { point: point });
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
                            <Text style={styles.title}>Novo Ponto</Text>
                            <Text style={styles.description}>Preencha os campos abaixo para cadastrar um novo ponto de venda.</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ width: 170, height: 170 }} source={require('../../assets/img/shop.png')} />
                    </View>

                    <View>
                        <Text style={styles.labelInput}>NOME</Text>
                        <TextInput

                            style={styles.input}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder="Digite o nome"
                            placeholderTextColor="#999"
                            value={point.nome}
                            onChangeText={value => { setPoint({ ...point, nome: value }) }}
                        />
                        <Text style={styles.labelInput}>TELEFONE</Text>
                        <TextInput
                            style={styles.input}
                            autoCorrect={false}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            value={point.telefone}
                            placeholder="Digite o telefone"
                            placeholderTextColor="#999"
                            onChangeText={value => { setPoint({ ...point, telefone: value }) }}
                        />
                        <Text style={styles.labelInput}>CATEGORIA</Text>
                        <TextInput
                            style={styles.input}
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={point.categoria}
                            placeholder="Escolha uma categoria"
                            placeholderTextColor="#999"
                            onChangeText={value => { setPoint({ ...point, categoria: value }) }}
                        />

                        <RectButton style={styles.button} >
                            <Text style={styles.buttonText} onPress={() => prox()}>
                                PRÓXIMO
                            </Text>
                            <View>
                                <Text style={styles.buttonIcon}>
                                    <Ionicons name="ios-arrow-dropright-circle" color="#fff" size={32} />
                                </Text>
                            </View>
                        </RectButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}
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
        maxWidth: 310,
        fontFamily: 'Roboto_300Light',
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
        marginBottom: -5,
        marginTop: 6
    },
    button: {
        backgroundColor: '#184820',
        height: 60,
        flexDirection: 'row',
        borderRadius: 30,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 25,


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
    },
});
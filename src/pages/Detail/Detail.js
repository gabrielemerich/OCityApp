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
    Platform,
    BackHandler,
    FlatList
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

export const Detail = ({ route, navigation }) => {
    const categories = [
        { id: '1', name: 'Leite' },
        { id: '2', name: 'Ovos' },
        { id: '3', name: 'Vegetais' },
        { id: '4', name: 'Queijo' },
        { id: '5', name: 'Doces' },
        { id: '6', name: 'Outros' },
    ];
    function handleNavigateBack() {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <View style={styles.backButton}>
                    <TouchableOpacity>
                        <Ionicons name="ios-arrow-back" onPress={handleNavigateBack} color="#184820" size={30} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>Informações</Text>
                    <Text style={styles.description}>Confira abaixo, informações do ponto de venda.</Text>
                </View>
            </View>
            <View style={{ borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image style={{ width: 130, height: 130 }} source={require('../../assets/img/notfound.png')} />
            </View>
            <Text style={styles.title}>Ponto do seu Zé</Text>
            <SafeAreaView>
                <FlatList contentContainerStyle={styles.list} numColumns="3" data={categories} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={{ textAlign: 'center', color: 'black', marginTop: 2 }}><Entypo name="check" color="#184820" size={12} /> Ovos</Text>
                    </TouchableOpacity>
                )} keyExtractor={item => item.id}>

                </FlatList>
            </SafeAreaView>
            <Text style={styles.descriptionText}>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</Text>

            <Text style={styles.adress}>Endereço</Text>
            <Text style={styles.adressDescription}>R. Tabajaras - Nossa Sra. do Carmo, Sete Lagoas - MG, 35700-447, Brasil</Text>
            <RectButton style={styles.button} >

                <Text style={styles.buttonText} onPress={() => { }}>
                    REALIZAR CHAMADA
</Text>
                <View>
                    <Text style={styles.buttonIcon}>
                        <Ionicons name="ios-call" color="#fff" size={25} />
                    </Text>
                </View>
            </RectButton>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 10 + Constants.statusBarHeight,

    },
    adress: {
        fontSize: 22,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 20
    },
    adressDescription: {
        fontSize: 15,
        fontFamily: 'Roboto_500Medium',
        marginTop: 5
    },
    list: {
        alignItems: 'center',
        marginTop: 8
    },
    item: {
        backgroundColor: '#ddd',
        marginVertical: 3,
        marginHorizontal: 3,
        width: 94,
        height: 25,
        borderRadius: 3,

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
    descriptionText: {
        color: 'black',
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'Roboto_300Light',
        textAlign: 'justify',

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
        height: 40,
        flexDirection: 'row',
        borderRadius: 30,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 25,
        width: 250
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        left: -30
    },

    selectButton: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CCC',
        borderStyle: 'dashed',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectButtonText: {
        fontSize: 16,
        color: '#666',
    }
});
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
    BackHandler
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Point } from '../../models/Point';

export const Info = ({route, navigation}) => {
    
    const [point, setPoint] = useState(route.params?.point); 
   
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          function(){
              
              return true;
          }
        );
        return () => backHandler.remove();
      }, []);

      
    function handleNavigateBack() {
        navigation.navigate('New', { point: point });
    }

    function prox() {
       navigation.navigate('Local', { point: point });
    }
    
    useEffect(() => {
        if (route.params?.point) {
          setPoint(route.params?.point)
        }
      }, [route.params?.point]);
    

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
                            <Text style={styles.title}>Informações</Text>
                            <Text style={styles.description}>Preencha os campos abaixo com uma simples descrição e uma foto do seu ponto de venda.</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor:'#ddd', borderRadius:4, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ width: 170, height: 170 }} source={require('../../assets/img/photo.png')} />
                    </View>
                    <View>
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>SELECIONAR <Text style={{fontWeight:'bold'}}>FOTO</Text></Text>
                    </TouchableOpacity>
                        <Text style={styles.labelInput}>DESCRIÇÃO</Text>
                        <TextInput
                            style={styles.input}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder="Descreva aqui características do ponto, como produtos a venda e horário de atendimento."
                            placeholderTextColor="#999"
                            multiline={true}
                            maxLength={150}
                            value={point.descricao}
                            onChangeText={value => { setPoint({...point, descricao: value})}}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        //paddingTop: 20 + Constants.statusBarHeight,
        justifyContent: "flex-end",
        padding: 70 + Constants.statusBarHeight,
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
        width:245
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
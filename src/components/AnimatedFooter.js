import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    TouchableHighlight
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';


import BottomSheet from 'reanimated-bottom-sheet';
import { RectButton } from 'react-native-gesture-handler';

const AnimatedFooter = () => {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [openSheet, setOpenSheet] = useState(true);

    function navigateNewPoint() {
        navigation.navigate('New');
    }

    function handleSelectItem(id) {
        const alreadySelected = selectedItems.findIndex(item => item === id);
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }


    }

    const categories = [
        { id: '1', name: 'Leite e Derivados', img: require('../assets/img/icons/milk.png') },
        { id: '2', name: 'Ovos', img: require('../assets/img/icons/eggs.png') },
        { id: '3', name: 'Verduras e Legumes', img: require('../assets/img/icons/salada.png') },
        { id: '4', name: 'Frutas', img: require('../assets/img/icons/fruit.png') },
        { id: '6', name: 'Massas', img: require('../assets/img/icons/massa.png') },
        { id: '5', name: 'Doces', img: require('../assets/img/icons/cake.png') }

    ];


    renderHeader = () => {
        return (
            <View>
                <Text style={styles.labelSheet}>
                    <Text>{openSheet ? 'DESLIZE PARA BAIXO ' : 'DESLIZE PARA CIMA '}</Text> <FontAwesome name={openSheet ? "chevron-down" : "chevron-up"} color="#8A878A" size={14} />
                </Text>

            </View>

        );
    }

    renderContent = () => {
        return (
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.welcome}>Seja Bem-Vindo</Text>
                    <Text style={styles.description}>Selecione uma das categorias abaixo para visualizar os pontos de venda ou cadastre um novo ponto.</Text>
                </View>
                <SafeAreaView>
                    <FlatList contentContainerStyle={styles.list} numColumns="3" data={categories} renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.6} onPressIn={() => handleSelectItem(item.id)} style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]}>
                            <Image style={{ width: 32, height: 32 }} source={item.img} />
                        </TouchableOpacity>
                    )} keyExtractor={item => item.id}>

                    </FlatList>
                </SafeAreaView>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                    <RectButton style={styles.button} onPress={() => navigateNewPoint()}>

                        <Text style={styles.buttonText}>
                            NOVO PONTO
                    </Text>
                        <View>
                            <Text style={styles.buttonIcon}>
                                <FontAwesome name="plus-circle" color="white" size={32} />
                            </Text>
                        </View>
                    </RectButton>

                    <RectButton style={styles.buttonSearch}>
                        <Text><FontAwesome name="search" size={23} /></Text>
                    </RectButton>

                </View>

            </View>);
    }
    return (
        <BottomSheet
            snapPoints={[450, 50, 50]}

            renderContent={() => renderContent()}
            renderHeader={() => renderHeader()}
            initialSnap={[0]}
            onOpenEnd={() => { setOpenSheet(true) }}
            onCloseEnd={() => { setOpenSheet(false) }}
        />

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    list: {
        alignItems: 'center',
        marginTop: 15
    },
    item: {
        backgroundColor: '#DDDDDD',
        padding: 27,
        marginVertical: 5,
        marginHorizontal: 5,
        width: 90,
        height: 80,
        borderRadius: 6,

    },
    selectedItem: {
        borderColor: '#184820',
        borderWidth: 2,
    },
    labelSheet: {
        textAlign: "center",
        color: '#8A878A',
        backgroundColor: '#fff',
        paddingVertical: 6,
        backgroundColor: '#F0F0F0',
        height: 30,
        fontSize: 12,
        textAlignVertical: "top",
        fontFamily: 'Roboto_500Medium'

    },
    welcome: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 25,
        color: '#000',
        marginTop: 25,
        marginLeft: -100
    },
    description: {
        fontSize: 17,
        color: '#000',
        textAlign: "justify",

        width: 290,
        marginTop: 5,
        fontFamily: 'Roboto_300Light',

    },
    button: {
        backgroundColor: '#184820',
        height: 60,
        flexDirection: 'row',
        borderRadius: 40,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 21,
        width: 230,

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
    buttonSearch: {
        width: 57,
        height: 57,
        backgroundColor: '#C4C4C4',
        borderRadius: 30,
        marginLeft: 5,
        marginTop: 21,
        padding: 17,

    }
});
export default AnimatedFooter;
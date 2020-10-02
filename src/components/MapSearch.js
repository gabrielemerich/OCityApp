import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Constants from 'expo-constants';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomSheet from 'reanimated-bottom-sheet';
import { RectButton } from 'react-native-gesture-handler';
// import { Container } from './styles';


const MapSearch = (props) => {

  const categories = [
    { id: '1', name: 'Leite' },
    { id: '2', name: 'Ovos' },
    { id: '3', name: 'Vegetais' },
    { id: '4', name: 'Queijo' },
    { id: '5', name: 'Doces' },
    { id: '6', name: 'Outros' },
  ];

  renderHeader = () => {
    return (
      <View>
        <Text style={styles.labelSheet}>
        <Text>ARRASTE PRA CIMA  </Text> <FontAwesome  name="chevron-up" color="#8A878A" size={12} />
        </Text>
        
      </View>
      
    );
  }
  renderContent = () => {
    return (
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <SafeAreaView>
          <FlatList contentContainerStyle={styles.list} numColumns="3" data={categories} renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Text ><FontAwesome name="envira" size={32} /></Text>
            </TouchableOpacity>
          )} keyExtractor={item => item.id}>

          </FlatList>
        </SafeAreaView>
        <Text style={styles.welcome}>Seja Bem-Vindo</Text>
        <Text style={styles.description}>Selecione uma das categorias acima para visualizar os pontos de venda ou cadastre um novo ponto.</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <RectButton style={styles.button} onPress={() => { }}>

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
        
      </View>)
  }

  autoComplete = () => {
    return (

      <GooglePlacesAutocomplete
        placeholder='Pesquisar'
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        onFail={error => console.error(error)}
        query={{
          key: 'AIzaSyBLxt4ah56AjrHnMVs-io8vItNAz_LiTOY',
          language: 'pt',
        }}
      />
    );
  }

  return (


    <BottomSheet
      snapPoints={[450, 100, 90]}
      renderContent={() => renderContent()}
      renderHeader={() => renderHeader()}
      initialSnap={1}


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
  labelSheet: {
    textAlign: "center",
    color: '#8A878A',
    backgroundColor: '#fff',
    paddingVertical: 6,
    backgroundColor: '#F0F0F0',
    height: 24,
    fontSize: 10,
    textAlignVertical: "top"
    
  },

  welcome: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 25,
    color: '#000',
    marginLeft: 36,
    marginTop: 25
  },
  description: {
    fontSize: 17,
    color: '#000',
    textAlign: "justify",
    marginLeft: 36,
    width: 290,
    marginTop: 5,
    fontFamily: 'Roboto_400Regular',

  },
  button: {
    backgroundColor: '#184820',
    height: 60,
    flexDirection: 'row',
    borderRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 25,
    width: 230,
    marginLeft: 36
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
    marginTop: 25,
    padding:17,
    
  }
});
export default MapSearch;
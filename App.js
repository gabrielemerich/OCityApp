import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,Platform, StatusBar} from 'react-native';

import { Roboto_400Regular, Roboto_500Medium, Roboto_300Light } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import {AppLoading} from 'expo';
import Routes from './src/routes';
import * as firebase from 'firebase';
import {firebaseConfig}  from './src/services/config/fbConfig';
import ignoreWarnings from 'react-native-ignore-warnings';

export default function App() {
  ignoreWarnings('Setting a timer');
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
    Roboto_300Light
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  firebase.initializeApp(firebaseConfig);

  return (
    
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
    <StatusBar translucent={true} backgroundColor="black"/>
     {/* <View style={{flex:0.5, bottom:-40}}>
      
  </View>*/}
    <Routes></Routes>
    
    
   </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

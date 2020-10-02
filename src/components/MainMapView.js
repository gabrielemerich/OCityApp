import React, { useEffect, useState } from 'react';
import { View, ShadowPropTypesIOS, StyleSheet, Dimensions, Alert,Text, Image} from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import * as Location from 'expo-location'
import { AntDesign } from '@expo/vector-icons';
import 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { Container } from './styles';

const MainMapView = () => {
    const navigation = useNavigation();
    const [points, setPoints] = useState([]);
    const [initialPosition, setInitialPosition] = useState([0, 0]);

    const firestore = firebase.firestore();

    const region = {
        latitude: initialPosition[0],
        longitude: initialPosition[1],
        latitudeDelta: 0.014,
        longitudeDelta: 0.014
    }

    function handleNavigateToDetail(id){
        navigation.navigate('Detail',{ point_id: id});
    }

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ops...', 'Precisamos de sua permissão para obter a localização!');
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            setInitialPosition([latitude, longitude]);
        }
        loadPosition();
    }, []);

    useEffect(() => {
        firestore.collection("points").onSnapshot(function (snapshot) {
            setPoints(snapshot.docs);

        });
    }, [])


    function getPoints() {
        firestore.collection("points").get().then(res => {
            setPoints(res.docs);
        });
    }

    return (
        <View style={styles.container}>
            <MapView
                region={region}
                style={styles.mapStyle}
                showsUserLocation={true}
            >
                {points.map(point => (
                    <MapView.Marker
                        key={point.id}
                        onPress={() => handleNavigateToDetail(point.id)}
                        coordinate={{
                            latitude: point.data().latitude,
                            longitude: point.data().longitude,
                        }}>
                        <View>
                            <Image style={styles.mapMarkerImage} source={require('../assets/img/markermap.png')}></Image>
                            <Text style={styles.mapMarkerTitle}><AntDesign name="caretdown"  color="#184820" size={25} /></Text>
                        </View>
                    </MapView.Marker>
                ))}

            </MapView>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mapMarker: {
        width: 50,
        height: 50,
    },


    mapMarkerImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 20,
        textAlign: "center"
       
        
    }
});
export default MainMapView;
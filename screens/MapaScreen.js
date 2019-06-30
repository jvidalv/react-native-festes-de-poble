import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

export default function MapViewModal({event}) {
  const [localitzacioActual, setlocalitzacioActual] = useState(null);
  const [localitzacioPermisos, setlocalitzacioPermisos] = useState(null);
  const [mapRegion, setmapRegion] = useState(null);

  useEffect( () => {
    const demanarPermisos = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setlocalitzacioPermisos('Permisos denegats')
      } else {
        setlocalitzacioPermisos(true)
      }

      let location = await Location.getCurrentPositionAsync({});
      setlocalitzacioActual(JSON.stringify(location))
      setmapRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1122, longitudeDelta: 0.0821 });
    }
    demanarPermisos()
 }, []);

    return (
      <View style={{flex: 1}}>
        {
          localitzacioActual === null ?
          <View>
            <Text>Buscant la teva situació actual...</Text>
          </View> :
          localitzacioPermisos === false ?
            <View><Text>Permisos de localització denegats.</Text></View> :
            mapRegion === null ?
            <View><Text>No es possible localitzar la teva posició</Text></View> :
            <MapView
              toolbarEnabled={false}
              loadingEnabled={true}
              mapType="hybrid"
              style={{flex: 1, width: '100%', height: 250}}
              initialRegion={{ latitude: event.coordenades.latitude, longitude:  event.coordenades.longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0121 }}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <MapView.Marker
                coordinate={{latitude:event.coordenades.latitude, longitude:event.coordenades.longitude}}
              />
            </MapView>
        }
      </View>
    )
}

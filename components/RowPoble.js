import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from './NavigationService.js';
import Colors from '../constants/Colors';

export default function RowPoble({ poble }) {

  const guardarPoble = () => {
    const guardar = async () => {
      await AsyncStorage.setItem('poble', JSON.stringify(poble))
      NavigationService.navigate('AuthLoading');
    }
    guardar()
  }

  return (
    <TouchableOpacity
      style={[styles.pobleContainer, { backgroundColor : ( poble.id % 2 ? Colors.llistat1: Colors.llistat2 )}]}
      onPress={guardarPoble}
      delayPressIn={50}
      >
      <Image source={{uri: poble.imatge}}  style={styles.pobleImatge}/>
      <View style={styles.pobleTextContainer}>
        <Text style={{fontSize: 26}}>
          {poble.nom}
        </Text>
        <Text style={{fontSize: 12}}>
          {poble.estat}
        </Text>
      </View>
      <View style={styles.pobleIconaDreta}>
        <Ionicons name="md-arrow-forward" size={24} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pobleContainer : {
   flexDirection: 'row', flex: 1, minHeight:70, padding: 10,
   borderRadius: 5, marginVertical: 2
  },
  pobleImatge : {
    resizeMode: 'contain', alignItems: 'flex-start',  width: '15%'
  },
  pobleTextContainer : {
    justifyContent: 'center', marginLeft: 10, flex: 1
  },
  pobleIconaDreta :{
    justifyContent: 'center', alignItems: 'center', marginLeft: 10, width: '12%'
  }
});

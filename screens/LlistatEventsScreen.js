import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';
import RowEsdeveniment  from '../components/RowEsdeveniment';

const AnarAlEvent = ( event ) => {
  NavigationService.navigate('Event', { event });
}

const AnarAContacta = ( ) => {
  NavigationService.navigate('Contactar');
}


export default function LlistatEventsScreen( props ) {
  const { dia } = props.navigation.state.params;
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      { dia.events.map((event, index) => <RowEsdeveniment
        key={event.id}
        index={index}
        event={event}
        callback={() => AnarAlEvent(event)}
      />)}
    </ScrollView>
    <TouchableOpacity
      onPress={AnarAContacta}
      style={styles.footer}>
      <Text style={styles.textFooter}>
        Trobes a faltar algun esdeveniment?
      </Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  scrollContainer: {
    flex: 1,
  },
  footer : {
    alignItems: 'center',
    backgroundColor: Colors.corporatiu,
    padding: 10,
  },
  textFooter : {
    color: Colors.titolsPantalles,
    fontFamily: 'mon-medium',
  }
});

LlistatEventsScreen.navigationOptions = ({navigation}) => {
  const { dia } = navigation.state.params;
  return {
    title: dia.nom_especial ? dia.nom_especial : dia.noms.nom_dalt + ' ' + dia.noms.nom_baix,
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerRight: (
       <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10, width: 120}}>
         <TouchableOpacity
            onPress={() => navigation.openDrawer()}
           >
             <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles} />
         </TouchableOpacity>
       </View>
     )
  }
};

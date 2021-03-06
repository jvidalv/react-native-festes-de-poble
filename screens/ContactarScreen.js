import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as WebBrowser from 'expo-web-browser';
import {Ionicons} from '@expo/vector-icons';
import Urls from '../constants/Urls';
import {usePoble} from "../helpers/Storage";
import Colors from '../constants/Colors';
import logoNegre from '../assets/images/fem-poble-negre.png';
import logoBlanc from '../assets/images/fem-poble-blanc.png';

function enviarFormulari(setLoading, setResponse, nom, telefon, email, missatge, visibilitat, pobleid) {
    setLoading(true)
    const fetchFormulari = async () => {
        const response = await fetch(Urls.contactar, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: nom,
                    telefon: telefon,
                    email: email,
                    missatge: missatge,
                    origen: 0,
                    visibilitat: visibilitat,
                    poble_id: pobleid,
                })
            }
        ).then((response) => response.ok ? true : false)
        setResponse(response)
        setLoading(false)
    }
    fetchFormulari()
}

export default function ContactarScreen(props) {
    const visibilitat = props.navigation.getParam('visibilitat');
    const [loadingPoble, poble] = usePoble();
    const [errorEmail, setErrorEmail] = useState(false)
    const [nom, setNom] = useState("")
    const [telefon, setTelefon] = useState("")
    const [email, setEmail] = useState("")
    const [missatge, setMissatge] = useState("")
    const [boto, setVisibilitatBoto] = useState(false)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        if (email && email.length > 4) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            setErrorEmail(!reg.test(email))
        }
        setVisibilitatBoto(nom.length > 1 && (telefon || (email && email.length > 4)) && !errorEmail && missatge);
    }, [nom, telefon, email, missatge]); // Nomes sexecuta si canvia algun destos camps

    return (
        <View style={styles.container}>
            {!loading && response === null ? <View style={styles.containerContent}>
                    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}} extraScrollHeight={50}
                                             enableOnAndroid={true}>
                        <Text style={styles.textExplicacio}>
                            Trobes a faltar el teu poble o algún esdeveniment?
                        </Text>
                        <Text style={styles.textExplicacio}>
                            Pots contactar amb nosaltres omplint el formulari.
                        </Text>
                        <View style={styles.hr}/>
                        <View style={styles.form}>
                            <View style={styles.formInput}>
                                <Text style={styles.textInput}>
                                    Nom i cognom
                                </Text>
                                <TextInput
                                    onChangeText={(text) => setNom(text)}
                                    autoCompleteType="name"
                                    style={styles.input}
                                    maxLength={40}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textInput}>
                                    Telèfon
                                </Text>
                                <TextInput
                                    onChangeText={(text) => setTelefon(text)}
                                    autoCompleteType="tel"
                                    keyboardType="numeric"
                                    style={styles.input}
                                    maxLength={12}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textInput}>
                                    Correu electrònic
                                </Text>
                                <TextInput
                                    onChangeText={(text) => setEmail(text)}
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    style={styles.input}
                                    maxLength={40}
                                />
                                {errorEmail ? <Text style={styles.textError}> Email no és vàlid! </Text> : null}
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textInput}>
                                    Missatge
                                </Text>
                                <TextInput
                                    onChangeText={(text) => setMissatge(text)}
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    multiline={true}
                                    blurOnSubmit={true}
                                    maxLength={1000}
                                    style={[styles.input, styles.area]}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                    {boto ? <View style={styles.botoContainer}>
                            <TouchableOpacity
                                style={styles.boto}
                                onPress={() => enviarFormulari(setLoading, setResponse, nom, telefon, email, missatge, visibilitat, poble ? poble.id : null)}>
                                <Text style={styles.botoText}>
                                    Enviar
                                </Text>
                                <Ionicons name="md-arrow-dropright-circle" size={18} color="white"/>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
                : response === null ? <View style={styles.resultsContainer}>
                        <ActivityIndicator color="white" size="large"/>
                    </View>
                    : response ? <View style={styles.resultsContainer}>
                            <Image source={logoNegre} style={styles.logoNegre}/>
                            <Text style={{fontSize: 22, fontFamily: 'mon-black', textAlign: 'center'}}>Gràcies per
                                participar :)</Text>
                            <Text style={{fontSize: 20, fontFamily: 'mon-medium', textAlign: 'center'}}>Ens posarem en
                                contacte el més prompte possible</Text>
                        </View>
                        : <View style={styles.resultsContainer}>
                            <Image source={logoNegre} style={styles.logoNegre}/>
                            <Text style={{fontSize: 22, fontFamily: 'mon-black', textAlign: 'center'}}>Hi ha hagut un
                                error :(</Text>
                            <Text style={{fontSize: 20, fontFamily: 'mon-medium', textAlign: 'center'}}>Torna-ho a
                                provar més tard</Text>
                            <Text style={{fontSize: 18, fontFamily: 'open-sans', textAlign: 'center'}}>Disculpa les
                                molèsties</Text>
                        </View>}
            <View style={styles.ContainerBottom}>
                <TouchableOpacity
                    onPress={handleVidalFun}
                    style={styles.botoBottom}>
                    <Image source={logoBlanc} style={styles.logo}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function handleVidalFun() {
    WebBrowser.openBrowserAsync(
        'https://www.fempoble.app'
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.llistat1
    },
    containerContent: {
        padding: 10,
    },
    textExplicacio: {
        fontSize: 16, fontFamily: 'open-sans'
    },
    hr: {
        borderWidth: 1,
        borderColor: Colors.fondo,
        marginTop: 15,
        marginBottom: 10,
        opacity: 0.5,
    },
    form: {
        marginVertical: 5,
        flex: 1,
    },
    formInput: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    textInput: {
        fontFamily: 'open-bold'
    },
    input: {
        backgroundColor: Colors.llistat2,
        padding: 10,
        width: '100%',
        height: 40,
        marginTop: 5,
        marginBottom: 5,
    },
    area: {
        height: 60,
        textAlignVertical: 'top'
    },
    botoContainer: {
        flex: 1, alignItems: 'flex-end'
    },
    boto: {
        backgroundColor: Colors.corporatiu,
        padding: 10,
        height: 40,
        borderRadius: 5,
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    botoText: {
        textAlign: 'right', color: Colors.titolsPantalles, 'textTransform': 'uppercase', marginHorizontal: 10
    },
    ContainerBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Colors.corporatiu,
        borderTopWidth: 25,
        borderColor: Colors.llistat1
    },
    botoBottom: {
        flex: 1, alignItems: 'center', justifyContent: 'center', maxHeight: 35,
    },
    textFooter: {
        textAlign: 'center', fontFamily: 'newrotic', color: 'white'
    },
    textFooterBottom: {
        textAlign: 'center', fontSize: 12, color: 'white'
    },
    botoMenu: {
        flexDirection: "row", justifyContent: "flex-end", paddingRight: 10, width: 120
    },
    resultsContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 20
    },
    textError: {
        position: 'absolute',
        right: 10,
        top: 35,
        color: Colors.roigos,
        fontSize: 11,
        fontFamily: 'open-sans',
        fontWeight: 'bold'
    },
    logo: {
        resizeMode: 'contain', alignItems: 'center', alignSelf: 'center', width: '25%',
    },
    logoNegre: {
        resizeMode: 'contain', width: 140, height: 80
    },
});

ContactarScreen.navigationOptions = (props) => {
    const amagarMenu = props.navigation.getParam("amagarMenu");
    return {
        title: 'Contactar',
        headerStyle: {
            backgroundColor: Colors.corporatiu,
        },
        headerTintColor: Colors.titolsPantalles,
        headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        headerRight: (
            amagarMenu ? null : <TouchableOpacity style={styles.botoMenu} onPress={() => props.navigation.openDrawer()}>
                <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles}/>
            </TouchableOpacity>
        )
    }
};

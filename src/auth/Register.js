import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PhoneInput from 'react-native-phone-number-input';

const Register = ({ navigation }) => {
    const phoneInput = useRef(null);
    const [user, setUser] = useState({
        name:'',
        email:'',
        phone:'',
        password:''
    });

    const signup = () => {

        const {name, email, password, phone} = user
        if(name && password && email && phone){
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firestore()
                    .collection("users")
                    .doc(email)
                    .set({
                        name:name,
                        email:email,
                        phone:phone,
                        message:`Hey, ${name} is in emergency and needs your help.`,
                        userid:auth().currentUser.uid
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }
    
                if (error.code === 'auth/invalid-email') {
                    Alert.alert("This email address is invalid!");
                }
    
                console.log(error);
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{color:"#eb3b5a", fontWeight:'bold', fontSize:30, paddingHorizontal:50,}}>Signup!</Text>
            <Text style={{color:"#fff", fontWeight:'bold', fontSize:12, marginBottom:30, paddingHorizontal:50,}}>Get help whenever you need it.</Text>

            <View style={styles.signin}>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={user.phone}
                        defaultCode="IN"
                        layout="first"
                        withShadow
                        textContainerStyle={{ paddingVertical: 0 }}
                        onChangeFormattedText={(txt) => setUser({...user, phone:txt})}
                    />

                    <View style={styles.input}>
                        <TextInput placeholder="Name" placeholderTextColor="#d1d8e0" style={styles.text} value={user.name} onChangeText={(txt) => setUser({...user, name:txt})} />
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder="Email" placeholderTextColor="#d1d8e0" keyboardType="email-address" style={styles.text} value={user.email} onChangeText={(txt) => setUser({...user, email:txt})} />
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder="Password" placeholderTextColor="#d1d8e0" style={styles.text} value={user.password} onChangeText={(txt) => setUser({...user, password:txt})} />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => signup()}>
                        <Text style={{color:"#fff", fontWeight:'bold', fontSize:17}}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={{marginTop:25, flexDirection:'row', marginBottom:40}}>
                        <Text style={{fontWeight:'bold', color:"#ffffff"}}>Already have an Account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{fontWeight:'bold', color:'#eb3b5a'}}>Signin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        backgroundColor:"#080f16"
    },
    signin: {
        width:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    input: {
        width:"87%",
        height:45,
        borderWidth:1,
        borderColor:"#eb3b5a",
        marginTop:15,
        borderRadius:30,
        paddingHorizontal:20
    },
    text:{
        color:"#ffffff",
    },
    btn: {
        width:"87%",
        height:50,
        backgroundColor:"#eb3b5a",
        borderRadius:30,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Register

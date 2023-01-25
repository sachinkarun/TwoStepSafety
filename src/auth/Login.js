import React,{ useState } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const login = () => {
        auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log("Logged in")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(

        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#080f16" />

            <Text style={{color:"#fff", fontWeight:'bold', fontSize:30, paddingHorizontal:30}}>Hello!</Text>
            <Text style={{color:"#fff", fontWeight:'bold', fontSize:26, paddingHorizontal:30}}>Welcome Back</Text>
         
            <View style={styles.login}>

                <View style={styles.input}>
                    <TextInput placeholder="Email" keyboardType="email-address"  placeholderTextColor="#d1d8e0" style={{color:"#ffffff"}} value={user.email} onChangeText={(txt) => setUser({...user, email:txt})} />
                </View>

                <View style={styles.input}>
                    <TextInput placeholder="Password" placeholderTextColor="#d1d8e0" style={{color:"#ffffff"}} value={user.password} onChangeText={(txt) => setUser({...user, password:txt})} />
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => login()}>
                    <Text style={{color:"#fff", fontWeight:'bold', fontSize:20}}>Login</Text>
                </TouchableOpacity>

                <View style={{marginTop:10, flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold', color:"#ffffff"}}>Don't have an Account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{fontWeight:'bold', color:'#eb3b5a'}}>Signup</Text>
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
    login: {
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

export default Login
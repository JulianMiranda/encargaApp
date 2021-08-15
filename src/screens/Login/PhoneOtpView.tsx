import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import ApiStack from './PhoneOtp';

export default function PhoneOtpView() {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [reqId, setReqId] = useState('');/* 
    const [valid, setValid] = useState(''); */
    console.log(reqId);
    
    return (
        <View >
            <TextInput placeholder="Entra numero de telefono"  value={phone} onChangeText={setPhone} />
            <TouchableOpacity onPress={()=> ApiStack.sendOtp(phone).then((reqId: any)=> setReqId(reqId))}>
                <Text>Enviar Otp</Text>
            </TouchableOpacity>

            <TextInput placeholder="Entra numero de Otp" value={code} onChangeText={setCode} />
            <TouchableOpacity onPress={()=> ApiStack.verifyOtp(reqId, code).then((resp)=> console.log(resp)
            )}>
                <Text>Revisar Otp</Text>
            </TouchableOpacity>
           {/*  <Text>{valid ? 'Si es valido' : 'No es valido'}</Text> */}
        </View>
    )
}

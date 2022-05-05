import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';

export default function Name(props: any) {
  const {signUpPhone} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSave = () => {
    setLoading(true);
    signUpPhone(name.trim(), props.user);
  };
  return (
    <View style={loginStyles.screen}>
      <Text style={loginStyles.title}>Nombre y Apellido</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ej: Juan Pérez"
        style={{...loginStyles.inputName, color: 'black'}}
      />
      {loading ? (
        <View style={{marginTop: 33}}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={name.trim().length > 2 ? 0.8 : 1}
          style={{
            padding: 1,
            paddingHorizontal: 10,
            borderRadius: 50,
            marginTop: 30,
            backgroundColor: name.trim().length > 2 ? '#b80204' : '#f1b2b3',
            alignSelf: 'center',
          }}
          onPress={name.trim().length > 2 ? () => handleSave() : () => {}}>
          <Text style={loginStyles.textButton}>Guardar</Text>
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...loginStyles.button,
          backgroundColor: name.trim().length > 0 ? colors.card : '#abcffa',
        }}
        onPress={
          name.trim().length > 0 ? () => signUpPhone(name.trim()) : () => {}
        }>
        <Text style={loginStyles.textButton}>Guardar</Text>
      </TouchableOpacity> */}
    </View>
  );
}

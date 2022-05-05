import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      <View style={{marginTop: 50}}>
        <View
          style={{
            backgroundColor: '#f1f1f1',
            borderRadius: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 50}}
          />
          <Text style={{...loginStyles.title, marginTop: 15}}>
            Hagamos tu perfil
          </Text>
        </View>
      </View>
      <Text style={loginStyles.title}>Nombre y Apellido</Text>
      <TextInput
        autoFocus
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
        placeholder="Ejemplo: Juan Pérez"
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
            ...styles.button,
            backgroundColor:
              name.trim().length > 2 ? colors.primary : '#f1b2b3',
          }}
          onPress={name.trim().length > 2 ? () => handleSave() : () => {}}>
          <Text style={styles.buttonText}>Guardar</Text>
          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {position: 'absolute', right: 14, top: 10},
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
});

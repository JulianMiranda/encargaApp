import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../context/theme/ThemeContext';

interface Props {
  relleno: Relleno;
  setRelleno: (relleno: Relleno) => void;
}
interface Relleno {
  noone: boolean;
  refresco: boolean;
  maquina: boolean;
  golosina: boolean;
  plantilla: boolean;
  lapicero: boolean;
}
type RellenoType =
  | 'noone'
  | 'refresco'
  | 'maquina'
  | 'golosina'
  | 'plantilla'
  | 'lapicero';
export const Relleno = ({relleno, setRelleno}: Props) => {
  const {refresco, maquina, golosina, noone, lapicero, plantilla} = relleno;
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const handleButton = (type: RellenoType) => {
    if (noone && type !== 'noone') {
      console.log({
        ...relleno,
        noone: false,
        [type]: !relleno[type],
      });
      return setRelleno({
        ...relleno,
        noone: false,
        [type]: !relleno[type],
      });
    }
    switch (type) {
      case 'refresco':
        setRelleno({...relleno, refresco: !refresco});
        break;
      case 'maquina':
        setRelleno({...relleno, maquina: !maquina});
        break;
      case 'golosina':
        setRelleno({...relleno, golosina: !golosina});
        break;
      case 'lapicero':
        setRelleno({...relleno, lapicero: !lapicero});
        break;
      case 'plantilla':
        setRelleno({...relleno, plantilla: !plantilla});
        break;
      case 'noone':
        if (noone) {
          console.log('selec');
          setRelleno({...relleno, noone: false});
        } else {
          console.log('Solo Noone');
          setRelleno({
            refresco: false,
            maquina: false,
            golosina: false,
            plantilla: false,
            lapicero: false,
            noone: true,
          });
        }

        break;
    }
  };
  return (
    <View
      style={{
        justifyContent: 'space-evenly',
        marginLeft: 30,
        paddingBottom: 30,
      }}>
      <Text style={{fontSize: 16, fontWeight: '700'}}>
        Si su peso no alcanza el máximo, desea:
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 5,
          paddingLeft: 5,
        }}
        onPress={() => handleButton('noone')}>
        <Icon
          name={noone ? 'check-circle-outline' : 'circle-outline'}
          size={22}
          color={noone ? colors.card : '#e0e0e0'}
          style={{
            marginRight: 10,
          }}
        />
        <Text>Dejar como está</Text>
      </TouchableOpacity>
      <View style={{padding: 5}}>
        <Text style={{fontWeight: '700'}}>Rellenar con:</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}
          onPress={() => handleButton('refresco')}>
          <Icon
            name={refresco ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={refresco ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Refresco en polvo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}
          onPress={() => handleButton('maquina')}>
          <Icon
            name={maquina ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={maquina ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Máquinas Dorco</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}
          onPress={() => handleButton('golosina')}>
          <Icon
            name={golosina ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={golosina ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Confituras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}
          onPress={() => handleButton('plantilla')}>
          <Icon
            name={plantilla ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={plantilla ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Plantillas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 5,
          }}
          onPress={() => handleButton('lapicero')}>
          <Icon
            name={lapicero ? 'check-circle-outline' : 'circle-outline'}
            size={22}
            color={lapicero ? colors.card : '#e0e0e0'}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Lapiceros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

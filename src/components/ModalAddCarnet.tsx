import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

interface Props {
  title: string;
  body: string;
  openModal: boolean;
  isLoading: boolean;
  setOpenModal: (action: boolean) => void;
  onConfirmModal: () => void;
  setBody: (action: string) => void;
}

export const ModalAddCarnet = ({
  title,
  body,
  setBody,
  isLoading,
  openModal,
  setOpenModal,
  onConfirmModal,
}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const [isVisible, setIsVisible] = useState(false);
  const [name, onName] = useState('');

  const closeModal = () => {
    setIsVisible(false);
    setOpenModal(false);
  };
  useEffect(() => {
    if (openModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [openModal]);
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      statusBarTranslucent={true}>
      <View style={styles.mainContainer}>
        <View style={styles.shadowContainer}>
          <Text style={styles.title}>{title}</Text>

          <TextInput
            placeholder="CM002278985BA"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              fontSize: 18,
              top: Platform.OS === 'ios' ? 0 : 2,
            }}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            value={body}
            onChangeText={setBody}
          />
          {/* <TextInput   onChangeText={onChangeText}
                        placeholder="CM002278985BA"
        value={text} style={{ fontSize: 16, fontWeight: '300', marginBottom: 20,marginTop: 10, }}/>
                        */}
          {isLoading && (
            <View style={{flex: 1}}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cancelButton}
              onPress={closeModal}>
              <Text style={{color: '#000', fontSize: 16}}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{...styles.confirmButton, backgroundColor: colors.card}}
              onPress={onConfirmModal}>
              <Text style={{color: '#ffffff', fontSize: 16}}>Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    width: 300,
    height: 200,
    padding: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#eeebeb',
    marginTop: 20,
    padding: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  confirmButton: {
    marginTop: 20,
    padding: 4,
    marginLeft: 30,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

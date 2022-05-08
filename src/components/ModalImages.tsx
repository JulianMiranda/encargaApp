import React from 'react';
import {Image as Imagen} from '../interfaces/Image.interface';
import {
  Modal,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FadeInImage} from './FadeInImage';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  images: Imagen[];
}
const {width, height} = Dimensions.get('window');
export const ModalImages = ({isVisible, setIsVisible, images}: Props) => {
  return (
    <>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        visible={isVisible}
        style={{flex: 1}}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}>
        <ImageViewer
          imageUrls={images}
          onSwipeDown={() => setIsVisible(false)}
          enableSwipeDown
          backgroundColor={'rgba(0,0,0,0.92)'}
          useNativeDriver
          enablePreload
          renderHeader={() => (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 40,
                left: 20,
                zIndex: 9999999999,
              }}
              onPress={() => setIsVisible(false)}>
              <Icon name="close-circle-outline" size={26} color="white" />
            </TouchableOpacity>
          )}
          renderImage={(image: ImageViewer) => {
            console.log(image.source.uri);
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FadeInImage
                  uri={image.source.uri}
                  style={{
                    flex: 1,
                    width: width * 0.8,
                    height: height * 0.8,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              /*  <Text style={{color: 'white'}}> {JSON.stringify(image)}</Text> */
            );
          }}
          loadingRender={() => <ActivityIndicator color="black" size={32} />}
        />
      </Modal>
    </>
  );
};

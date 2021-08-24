import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Button, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    title: string;
    body: string;
    openModal: boolean;
    isLoading: boolean;
    setOpenModal:(action: boolean)=>void;
    onConfirmModal:()=>void;
  }

export const ModalComponent = ({title, body, isLoading, openModal, setOpenModal, onConfirmModal}: Props) => {

    const {
        theme: {colors},
      } = useContext(ThemeContext);
   
    const [isVisible, setIsVisible] = useState(false);
    const closeModal = ()=>{
        setIsVisible(false);
        setOpenModal(false);
    }
    useEffect(() => {
       if(openModal){
        setIsVisible(true)
       } else {
           setIsVisible(false);
       }
    }, [openModal]);
    return (
        <Modal
                animationType="fade"
                visible={ isVisible }
                transparent={ true }
             
            >

                {/* Background negro */}
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    {/* Contenido del modal */}
                    <View style={{
                        width: 300,
                        height: 200,
                        padding: 15,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: 0.25,
                        elevation: 10,
                        borderRadius: 8
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold',fontFamily: 'Merienda-Regular', }}>{title}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '300', marginBottom: 20,marginTop: 10,fontFamily: 'Merienda-Regular', }}>{body}</Text>
                        {isLoading && <View style={{flex:1}}>
                            <ActivityIndicator color={colors.primary}/>
                        </View>}
                        
                        <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity
                        activeOpacity={0.8}
                        style={{backgroundColor: '#eeebeb', marginTop: 20, padding: 6,borderRadius: 8,paddingHorizontal: 12}}
                        onPress={closeModal}
                        ><Text style={{color: '#000',fontFamily: 'Merienda-Regular', fontSize: 16}}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        activeOpacity={0.8}
                        style={{backgroundColor: colors.card, marginTop: 20, padding: 4, marginLeft: 30,borderRadius: 8,paddingHorizontal: 10}}
                        onPress={onConfirmModal}
                        ><Text style={{color: '#ffffff',fontFamily: 'Merienda-Regular', fontSize: 16}}>Aceptar</Text>
                        </TouchableOpacity>
                        </View>
                       
                    </View>


                </View>

            </Modal>

    )
}

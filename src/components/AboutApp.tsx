import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export const AboutApp = () => {
  return (
    <ScrollView>
      <Text style={{...styles.text, fontSize: 18}}>
        • enCarga es una Agencia de Envíos radicada en Ecuador con destino a
        Cuba.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Hacemos envíos para uso personal, o con fines comerciales. Su compra
        se convertirá en por mayor al alcanzar o sobrepasar los 6 artículos de
        un mismo producto, o bien los 5 bultos en su compra total.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Cada articulo marcado con una Triple A (AAA) significa que es una
        copia exacta a la marca original, y a su vez la calidad es similar a la
        original.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Algunos artículos que exceden los 10kg no son entregados en su
        domicilio; dichos productos deben ser retirados por el remitente en la
        oficina de Aduanas de Cuba de su provincia.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Al finalizar su compra un asesor le contactará vía WhatsApp lo antes
        posible para ultimar los detalles de su pedido.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Al realizar su compra será considerada como finalizada, cualquier
        pedido extra o fuera de tiempo será considerada una compra posterior
        futura.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • El pago lo realizará una vez terminada y embalada su compra.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Su compra será realizada en el momento indicado debido al orden lógico
        de compras mediante nuestra aplicación.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • En caso de desear algún producto no mostrado en nuetra tienda, favor
        comunicarse con un asesor vía WhatsApp o Correo Electrónico.
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • Con gusto le atenderemos por mensaje de texto al WhatsApp
        +593962914922 o +593983597192, o al correo jmirandauria@gmail.com
      </Text>
      <Text style={{...styles.text, fontSize: 18}}>
        • enCarga se reserva el derecho de admisión tanto de clientes como de
        pedidos.
      </Text>

      <Text style={{...styles.text, fontSize: 20, textAlign: 'right'}}>
        Agradecemos su confianza.
      </Text>
      <Text
        style={{
          ...styles.text,
          fontSize: 20,
          textAlign: 'right',
          marginBottom: 70,
        }}>
        Gracias por preferir enCarga
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'left',
    marginVertical: 20,
  },
});

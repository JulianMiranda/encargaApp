import {useState, useEffect, useContext} from 'react';
import {Linking} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';

export const useShop = () => {
  const {car, emptyCar, makeShop} = useContext(ShopContext);
  const {prices} = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  let totalReCalc = 0;
  const [cantPaq, setCantPaq1] = useState(1);
  const [cantPaqOS, setCantPaqOS] = useState({
    oneandhalf: 0,
    twoKg: 0,
    threeKg: 0,
    fourKg: 0,
    fiveKg: 0,
    sixKg: 0,
    sevenKg: 0,
    eightKg: 0,
    nineKg: 0,
    tenKg: 0,
  });

  const [weigth, setWeigth] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const confirmModal = () => {
    switch (handleOpt) {
      case 0:
        emptyCarConfirmed();
        break;
      case 1:
        makeShopConfirmed();
        break;

      default:
        break;
    }
  };
  const emptyCarConfirmed = () => {
    emptyCar();
    setOpenModal(false);
  };

  const makeShopConfirmed = async () => {
    setisLoading(true);
    await makeShop(total, description);
    setisLoading(false);
    setOpenModal(false);
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 📦 *enCarga*, he realizado una compra!&phone=+593962914922',
    );
  };

  const makeShopFunction = () => {
    setHandleOpt(1);
    setTitle('¡¡¡Gracias por su compra!!!');
    setBody('Para confirmar contactaremos con un administrador');
    setOpenModal(true);
  };

  const emptyCarConfirm = () => {
    setHandleOpt(0);
    setTitle('Vaciar carrito');
    setBody('¿Está seguro que desea vaciar el carrito?');
    setOpenModal(true);
  };

  useEffect(() => {
    let totalCalc = 0;
    let totalWeight = 1;
    let kilos = {
      oneandhalf: 0,
      twoKg: 0,
      threeKg: 0,
      fourKg: 0,
      fiveKg: 0,
      sixKg: 0,
      sevenKg: 0,
      eightKg: 0,
      nineKg: 0,
      tenKg: 0,
    };
    car.forEach(function (item) {
      if (item.subcategory.weight < 1440) {
        console.log('menor 1.5');
        if (cantPaq < 5) {
          const valor = item.cantidad * item.subcategory.price;
          totalCalc += valor;
        } else {
          const valor = item.cantidad * item.subcategory.priceGalore;
          totalCalc += valor;
        }
        totalWeight += item.cantidad * item.subcategory.weight;
      } else {
        if (item.subcategory.weight > 1440 && item.subcategory.weight < 2000) {
          kilos.twoKg = kilos.twoKg + item.cantidad;
        }
        if (item.subcategory.weight > 1999 && item.subcategory.weight < 3000) {
          kilos.threeKg = kilos.threeKg + item.cantidad;
        }
        if (item.subcategory.weight > 2999 && item.subcategory.weight < 4000) {
          kilos.fourKg = kilos.fourKg + item.cantidad;
        }
        if (item.subcategory.weight > 3999 && item.subcategory.weight < 5000) {
          kilos.fiveKg = kilos.fiveKg + item.cantidad;
        }
        if (item.subcategory.weight > 4999 && item.subcategory.weight < 6000) {
          kilos.sixKg = kilos.sixKg + item.cantidad;
        }
        if (item.subcategory.weight > 5999 && item.subcategory.weight < 7000) {
          kilos.sevenKg = kilos.sevenKg + item.cantidad;
        }
        if (item.subcategory.weight > 6999 && item.subcategory.weight < 8000) {
          kilos.eightKg = kilos.eightKg + item.cantidad;
        }
        if (item.subcategory.weight > 7999 && item.subcategory.weight < 9000) {
          kilos.nineKg = kilos.nineKg + item.cantidad;
        }
        if (item.subcategory.weight > 8999) {
          kilos.tenKg = kilos.tenKg + item.cantidad;
        }
      }
    });

    setTotal(totalCalc);
    setWeigth(totalWeight);

    if (totalWeight > 0) {
      const cant = totalWeight / 1440;
      if (totalWeight < 1400) {
        kilos.oneandhalf = 1;
        setCantPaq1(1);
      } else if (cant < 2) {
        kilos.oneandhalf = 2;
        setCantPaq1(2);
      } else {
        kilos.oneandhalf = Math.ceil(cant);
        setCantPaq1(Math.ceil(cant));
      }
    }
    setCantPaqOS(kilos);
  }, [cantPaq, car, weigth]);

  for (const property in cantPaqOS) {
    totalReCalc = totalReCalc + cantPaqOS[property];
  }

  console.log('totalReCalc', totalReCalc);
  return {
    isLoading,
    cantPaqOS,
    total,
    cantPaq,
    weigth,
    openModal,
    title,
    totalReCalc,
    body,
    handleOpt,
    description,
    prices,
    confirmModal,
    emptyCarConfirm,
    makeShopFunction,
    setOpenModal,
  };
};

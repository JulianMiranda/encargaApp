import {useState, useEffect, useContext} from 'react';
import {Linking} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';

export const useShop = () => {
  const {car, emptyCar, makeShop} = useContext(ShopContext);
  const {prices} = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  let totalPaqReCalc = 0;
  let totalMoneyReCalc = 0;
  let totalProductMoney = 0;
  const [cantPaqOS, setCantPaqOS] = useState({
    oneandhalfkgPrice: 0,
    twokgPrice: 0,
    threekgPrice: 0,
    fourkgPrice: 0,
    fivekgPrice: 0,
    sixkgPrice: 0,
    sevenkgPrice: 0,
    eigthkgPrice: 0,
    ninekgPrice: 0,
    tenkgPrice: 0,
  });

  const [weigth, setWeigth] = useState(0);
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
    let totalWeight = 0;
    let kilos = {
      oneandhalfkgPrice: 0,
      twokgPrice: 0,
      threekgPrice: 0,
      fourkgPrice: 0,
      fivekgPrice: 0,
      sixkgPrice: 0,
      sevenkgPrice: 0,
      eigthkgPrice: 0,
      ninekgPrice: 0,
      tenkgPrice: 0,
    };
    car.forEach(function (item) {
      if (totalPaqReCalc < 5) {
        const valor = item.cantidad * item.subcategory.price;
        totalCalc += valor;
      } else {
        const valor = item.cantidad * item.subcategory.priceGalore;
        totalCalc += valor;
      }
      if (item.subcategory.weight < 1440) {
        if (
          item.subcategory.aviableSizes &&
          item.subcategory.aviableSizes.length > 0
        ) {
          let sizeTotal = 0;
          item.subcategory.aviableSizes.forEach(function (size) {
            sizeTotal += parseInt(size.peso.toString(), 10);
          });
          const mediaWeight = sizeTotal / item.subcategory.aviableSizes.length;
          totalWeight += item.cantidad * mediaWeight;
        } else {
          totalWeight += item.cantidad * item.subcategory.weight;
        }
      } else {
        if (item.subcategory.weight > 1440 && item.subcategory.weight <= 2000) {
          kilos.twokgPrice = kilos.twokgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 2000 && item.subcategory.weight <= 3000) {
          kilos.threekgPrice = kilos.threekgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 3000 && item.subcategory.weight <= 4000) {
          kilos.fourkgPrice = kilos.fourkgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 4000 && item.subcategory.weight <= 5000) {
          kilos.fivekgPrice = kilos.fivekgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 5000 && item.subcategory.weight <= 6000) {
          kilos.sixkgPrice = kilos.sixkgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 6000 && item.subcategory.weight <= 7000) {
          kilos.sevenkgPrice = kilos.sevenkgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 7000 && item.subcategory.weight <= 8000) {
          kilos.eigthkgPrice = kilos.eigthkgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 8000 && item.subcategory.weight <= 9000) {
          kilos.ninekgPrice = kilos.ninekgPrice + item.cantidad;
        }
        if (item.subcategory.weight > 9000) {
          kilos.ninekgPrice = kilos.ninekgPrice + item.cantidad;
        }
      }
    });
    setTotal(totalCalc);
    setWeigth(totalWeight);

    if (totalWeight > 0) {
      const cant = totalWeight / 1440;
      if (totalWeight < 1400) {
        kilos.oneandhalfkgPrice = 1;
      } else if (cant < 2) {
        kilos.oneandhalfkgPrice = 2;
      } else {
        kilos.oneandhalfkgPrice = Math.ceil(cant);
      }
    }
    setCantPaqOS(kilos);
  }, [totalPaqReCalc, car, weigth]);

  for (const property in cantPaqOS) {
    totalPaqReCalc = totalPaqReCalc + cantPaqOS[property];
    totalMoneyReCalc =
      totalMoneyReCalc + prices[property] * cantPaqOS[property];
  }
  totalProductMoney = total;
  return {
    isLoading,
    cantPaqOS,
    total,
    weigth,
    openModal,
    title,
    totalPaqReCalc,
    totalMoneyReCalc,
    totalProductMoney,
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

import {useState, useEffect, useContext} from 'react';
import {Linking} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';
import {discount} from '../utils/discount';
import {discountGalore} from '../utils/discountGalore';

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
    eightkgPrice: 0,
    ninekgPrice: 0,
    tenkgPrice: 0,
    elevenkgPrice: 0,
    twelvekgPrice: 0,
    thirteenkgPrice: 0,
    fourteenkgPrice: 0,
    fifteenkgPrice: 0,
    sixteenkgPrice: 0,
    seventeenkgPrice: 0,
    eighteenkgPrice: 0,
    nineteenkgPrice: 0,
    twentykgPrice: 0,
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
      eightkgPrice: 0,
      ninekgPrice: 0,
      tenkgPrice: 0,
      elevenkgPrice: 0,
      twelvekgPrice: 0,
      thirteenkgPrice: 0,
      fourteenkgPrice: 0,
      fifteenkgPrice: 0,
      sixteenkgPrice: 0,
      seventeenkgPrice: 0,
      eighteenkgPrice: 0,
      nineteenkgPrice: 0,
      twentykgPrice: 0,
    };
    car.forEach(function (item) {
      if (item.subcategory.weight <= 20000) {
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
      }

      if (totalWeight > 5000 || item.cantidad > 5) {
        const valor =
          item.cantidad *
          discountGalore(
            item.subcategory.priceGalore,
            item.subcategory.priceGaloreDiscount,
          );
        totalCalc += valor;
      } else {
        const valor =
          item.cantidad *
          discount(item.subcategory.price, item.subcategory.priceDiscount);
        totalCalc += valor;
      }
    });
    setTotal(totalCalc);
    setWeigth(totalWeight);

    if (totalWeight > 0) {
      const cant = totalWeight / 1000;
      const cant20 = totalWeight / 20000;
      console.log(
        'Calculo de TotalWeight: ' +
          totalWeight +
          ' Ceil: ' +
          Math.ceil(cant20),
      );
      const sobrante = totalWeight - (Math.ceil(cant20) - 1) * 20000;
      console.log('Sobrante', sobrante);

      if (sobrante < 1440) {
        kilos.oneandhalfkgPrice = 1;
      } else if (sobrante > 1440 && sobrante <= 2000) {
        kilos.twokgPrice = 1;
      } else if (sobrante > 2000 && sobrante <= 3000) {
        kilos.threekgPrice = 1;
      } else if (sobrante > 3000 && sobrante <= 4000) {
        kilos.fourkgPrice = 1;
      } else if (sobrante > 4000 && sobrante <= 5000) {
        kilos.fivekgPrice = 1;
      } else if (sobrante > 5000 && sobrante <= 6000) {
        kilos.sixkgPrice = 1;
      } else if (sobrante > 6000 && sobrante <= 7000) {
        kilos.sevenkgPrice = 1;
      } else if (sobrante > 7000 && sobrante <= 8000) {
        kilos.eightkgPrice = 1;
      } else if (sobrante > 8000 && sobrante <= 9000) {
        kilos.ninekgPrice = 1;
      } else if (sobrante > 9000 && sobrante <= 10000) {
        kilos.tenkgPrice = 1;
      } else if (sobrante > 10000 && sobrante <= 11000) {
        kilos.elevenkgPrice = 1;
      } else if (sobrante > 11000 && sobrante <= 12000) {
        kilos.twelvekgPrice = 1;
      } else if (sobrante > 12000 && sobrante <= 13000) {
        kilos.thirteenkgPrice = 1;
      } else if (sobrante > 13000 && sobrante <= 14000) {
        kilos.fourteenkgPrice = 1;
      } else if (sobrante > 14000 && sobrante <= 15000) {
        kilos.fifteenkgPrice = 1;
      } else if (sobrante > 15000 && sobrante <= 16000) {
        kilos.sixteenkgPrice = 1;
      } else if (sobrante > 16000 && sobrante <= 17000) {
        kilos.seventeenkgPrice = 1;
      } else if (sobrante > 17000 && sobrante <= 18000) {
        kilos.eighteenkgPrice = 1;
      } else if (sobrante > 18000 && sobrante <= 19000) {
        kilos.nineteenkgPrice = 1;
      } else {
      }
      if (totalWeight > 20000) {
        kilos.twentykgPrice = Math.ceil(cant20 - 1);
      }
      if (sobrante > 19000) {
        kilos.twentykgPrice = kilos.twentykgPrice + 1;
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

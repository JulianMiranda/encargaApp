import {CantPaqOS} from '../interfaces/CantPaq.interface';

interface Resp {
  problem: boolean;
  message: string;
}
export const CheckWeigth = (
  weigth: number,
  cantPaqOS: CantPaqOS,
  warning: boolean,
  setWarning: any,
): Resp => {
  console.log(cantPaqOS.twentykgPrice);
  const finalWeigth =
    cantPaqOS.twentykgPrice === 0
      ? weigth
      : weigth - 20000 * cantPaqOS.twentykgPrice;
  if (finalWeigth > 0 && finalWeigth < 1300) {
    return {
      problem: true,
      message: 'Su paquete debe tener al menos 1 500 gramos',
    };
  } else if (finalWeigth > 1500 && finalWeigth < 1900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 2 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 2000 && finalWeigth < 2900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 3 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 3000 && finalWeigth < 3900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 4 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 4000 && finalWeigth < 4900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 5 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 5000 && finalWeigth < 5900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 6 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 6000 && finalWeigth < 6900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 7 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 7000 && finalWeigth < 7900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 8 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 8000 && finalWeigth < 8900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 9 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 9000 && finalWeigth < 9900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 10 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 10000 && finalWeigth < 10900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 11 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 11000 && finalWeigth < 11900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 12 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 13000 && finalWeigth < 13900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 14 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 14000 && finalWeigth < 14900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 15 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 15000 && finalWeigth < 15900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 16 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 16000 && finalWeigth < 16900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 17 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 17000 && finalWeigth < 17900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 18 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 18000 && finalWeigth < 18900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 19 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else if (finalWeigth > 19000 && finalWeigth < 19900 && warning) {
    setWarning(false);
    return {
      problem: true,
      message:
        'Puede aprovechar mejor su paquete de 20 Kg, si continúa su paquete llegara bajo de peso',
    };
  } else {
    return {problem: false, message: ''};
  }
};

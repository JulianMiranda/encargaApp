import {useContext, useState} from 'react';
import {AuthContext} from '../context/auth/AuthContext';
import {formatToCurrency} from '../utils/formatToCurrency';

type Currency = 'CUP' | 'MLC';

export const useMoney = () => {
  const {prices} = useContext(AuthContext);
  const [sender, setSender] = useState('');
  const [reciber, setReciber] = useState('');
  const [currency, setCurrency] = useState<Currency>('CUP');

  const setSenderFunction = (newsender: string) => {
    const newsenderstr = newsender.replace(',', '');
    if (
      sender.includes('.') &&
      newsenderstr.charAt(newsenderstr.length - 1) === '.' &&
      newsenderstr.length > sender.length
    )
      return;
    if (
      sender.includes('.') &&
      newsenderstr.charAt(newsenderstr.length - 4) === '.'
    )
      return;
    if (newsenderstr.startsWith('0')) return;
    if (newsenderstr.startsWith('.')) return;

    setSender(newsenderstr);
    if (newsenderstr !== '') {
      if (currency === 'CUP') {
        const conv = formatToCurrency(Number(newsenderstr) * prices.mn);
        setReciber(conv.slice(1));
      } else {
        const conv = formatToCurrency(
          (Number(newsenderstr) * 100) / prices.mlc,
        );
        setReciber(conv.slice(1));
      }
    } else {
      setReciber('');
    }
  };

  const setReciberFunction = (newreciber: string) => {
    const newstr = newreciber.replace(',', '');
    if (
      reciber.includes('.') &&
      newreciber.charAt(newreciber.length - 1) === '.' &&
      newreciber.length > reciber.length
    )
      return;
    if (
      reciber.includes('.') &&
      newreciber.charAt(newreciber.length - 4) === '.'
    )
      return;
    if (newreciber.startsWith('0')) return;
    if (newreciber.startsWith('.')) return;
    setReciber(newstr);
    if (newreciber !== '') {
      if (currency === 'CUP') {
        const conv = formatToCurrency(Number(newstr) / prices.mn);
        setSender(conv.slice(1));
      } else {
        const conv = formatToCurrency((Number(newstr) / 100) * prices.mlc);
        setSender(conv.slice(1));
      }
    } else {
      setSender('');
    }
  };

  const setCUPFunc = () => {
    setCurrency('CUP');
    const newsenderstr = sender.replace(',', '');
    const conv = formatToCurrency(Number(newsenderstr) * prices.mn);
    setReciber(conv.slice(1));
  };

  const setMLCFunc = () => {
    setCurrency('MLC');
    const newsenderstr = sender.replace(',', '');
    const conv = formatToCurrency((Number(newsenderstr) * 100) / prices.mlc);
    setReciber(conv.slice(1));
  };

  return {
    setSenderFunction,
    setReciberFunction,
    setCUPFunc,
    setMLCFunc,
    sender,
    reciber,
    currency,
  };
};

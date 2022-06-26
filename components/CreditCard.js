import React from "react";
import {
  Container,
  InputWrapper,
  Button,
  TextInput,
} from "@mantine/core";

import {
  Calendar,
  CurrencyRubel,
  Key,
  Number as Num1,
} from "tabler-icons-react";
import { useEffect, useState } from "react";

export default function CreditCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [amount, setAmount] = useState("");
  //состояние фокусировки
  const [cardNumberDirty, setCardNumberDirty] = useState(false);
  const [CVVDirty, setCVVDirty] = useState(false);
  const [expDateDirty, setExpDateDirty] = useState(false);
  const [amountDirty, setAmountDirty] = useState(false);

  //состояние ошибок
  const [cardNumberError, setCardNumberError] = useState(
    'Поле "Card number" не может быть пустым'
  );
  const [expirationDateError, setExpirationDateError] = useState(
    'Поле "Expiration Date" не может быть пустым'
  );
  const [CVVError, setCVVError] = useState('Поле "CVV" не может быть пустым');
  const [amountError, setamountError] = useState("Введите сумму");

  //состояние валидности формы. нет ошибок. все поля заполнены. и тогда кнопка активна
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (cardNumberError || expirationDateError || CVVError || amountError) {
      setFormValid(false);
    } else setFormValid(true);
  }, [cardNumberError, expirationDateError, CVVError, amountError]);

  //Функции - обработчики формы
  function handleCardNumber(e) {
    const { value } = e.target;
    e.target.value =
      value
        .replace(/[^+\d]/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || "";

    setCardNumber(e.target.value);

    if (e.target.value.length < 19 || e.target.value.length > 19) {
      setCardNumberError("Только цифры. Длина значения 16");
      if (e.target.value.length === 0) {
        setCardNumberError('Поле "Card number" не может быть пустым');
      }
    } else {
      setCardNumberError("");
    }
  }
  function handleExpDate(e) {
    setExpDate(e.target.value);

    if (e.target.value.length === 0) {
      setExpirationDateError('Поле "Expiration date" не может быть пустым');
    } else {
      setExpirationDateError("");
    }
  }

  function handleAmount(e) {
    const { value } = e.target;
    e.target.value =
      value
        .replace(/[^+\d]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        // ?.join(".")
        // .substr(0, 19) || "";
    
    setAmount(e.target.value);

    const reg = /^\d*\.?\d*$/;
    if (!reg.test(String(e.target.value).toLowerCase())) {
      setamountError('В сумму только цифры и может быть одна "точка"');
    } else {
      setamountError("");
    }
  }

  function handleCVV(e) {
    setCVV(e.target.value.replace(/[^+\d]/g, ""));

    if (e.target.value.length < 3) {
      setCVVError("В CVV должно быть 3 цифры");
    } else {
      setCVVError("");
    }
  }

  async function createGood(e) {
    e.preventDefault();
    setAmount("");
    setCVV("");
    setCardNumber("");
    setExpDate("");
    setAmountDirty(false);
    setCVVDirty(false);
    setCardNumberDirty(false);
    setExpDateDirty(false);
    setFormValid(false)
    setCardNumberError('Поле "Card number" не может быть пустым')
    setCVVError('Поле "CVV" не может быть пустым')
    setExpirationDateError('Поле "Expiration Date" не может быть пустым')
    setamountError('Введите сумму')

    let card = {
      cardNumber,
      expDate,
      CVV,
      amount,
      published: false,
      createdAt: new Date().toISOString(),
  };
  // save the post
  let response = await fetch('/api/cards', {
      method: 'POST',
      body: JSON.stringify(card),
  });

  // get the data
  let data = await response.json();

  if (data.success) {
      // reset the fields
      
      // set the message
      return console.log(data.user);
  } else {
      // set the error
      return  console.log(data.message);
  }


  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "CardNumber":
        setCardNumberDirty(true);
        break;
      case "CVV":
        setCVVDirty(true);
        break;
      case "ExpData":
        setExpDateDirty(true);
        break;
      case "Amount":
        setAmountDirty(true);
        break;
    }
  };
  return (
    <Container
      size={600}
      px={20}
      style={{ background: "lightblue", borderRadius: 20 }}
    >
      <InputWrapper
      
        id="input-demo"
        required
        label="Credit card information"
        description="Please enter your credit card information, we need some money"
      >
        <TextInput
        style={{ marginTop: 20}}
          label="Card Number"
          icon={<Num1 />}
          placeholder="0000 0000 0000 0000"
          maxLength="19"
          radius="md"
          size="md"
          onChange={handleCardNumber}
          value={cardNumber}
          error={cardNumberDirty && cardNumberError ? cardNumberError : null}
          onBlur={(e) => blurHandler(e)}
          name="CardNumber"
          autoComplete="cc-nuber"
        />

        <TextInput
        style={{ marginTop: 20}}
          label="Expiration Date"
          icon={<Calendar />}
          radius="md"
          size="md"
          onChange={handleExpDate}
          type="month"
          value={expDate}
          error={
            expDateDirty && expirationDateError ? expirationDateError : null
          }
          onBlur={(e) => blurHandler(e)}
          name="ExpData"
        />
        <TextInput
        style={{ marginTop: 20}}
          label="CVV"
          icon={<Key />}
          placeholder="123"
          radius="md"
          size="md"
          onChange={handleCVV}
          value={CVV}
          error={CVVDirty && CVVError ? CVVError : null}
          name="CVV"
          onBlur={(e) => blurHandler(e)}
          maxLength="3"
        />
        <TextInput
        style={{ marginTop: 20}}
          label="Amount"
          icon={<CurrencyRubel />}
          placeholder="10.000"
          radius="md"
          size="md"
          onChange={handleAmount}
          error={amountDirty && amountError ? amountError : null}
          name="Amount"
          onBlur={(e) => blurHandler(e)}
          value={amount}
          maxLength="7"
        />
      </InputWrapper>
      <Button
        style={{ marginTop: 30, marginBottom: 20 }}
        variant="light"
        position="right"
        color="teal"
        loaderPosition="right"
        onClick={createGood}
        disabled={formValid?false:true}
        
      >
        Submit
      </Button>
      {expDate}
      {amount}
      formvalid {formValid}
    </Container>
  );
}

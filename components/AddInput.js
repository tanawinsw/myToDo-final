import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-native-date-picker'

import AntDesign from "react-native-vector-icons/AntDesign";
import { tsConstructSignatureDeclaration } from "@babel/types";

export default function AddInput({ submitHandler,dateHandler}) {
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const onChangeText = (text) => {
    setValue(text);
  };
  return (
    <ComponentContainer>
      <InputContainer>
        <Input
          value={value}
          placeholder="Add Task..." onChangeText={onChangeText} />
      </InputContainer>
      <CalendarButton onPress={() => setOpen(true)} >
        <AntDesign name="calendar" size={24} color="midnightblue" />
      </CalendarButton>
      
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          if(!value || setValue == ''){
            alert('please add task');
            return;
          }else{
            dateHandler(date)
            setValue(submitHandler(value, date,));
          }
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <SubmitButton
        onPress={() => {
          if(!value || setValue == ''){
            alert('please add task');
            return;
          }else{
            setValue(submitHandler(value, date,));
          }
        }}
      >
        <AntDesign name="plus" size={24} color="midnightblue" />
      </SubmitButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-family: Poppins-Regular;
  font-size: 20px;
  background-color: white;
  width: 250px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 20px;
  border-radius: 50px;
`;

const CalendarButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 50px;
`;
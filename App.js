import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList, Alert } from "react-native";
import styled from "styled-components";
import AddInput from './components/AddInput';
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";

import database from '@react-native-firebase/database'

export default function App() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState('')
  const [selectedDate,setSelectedDate]=useState('')

  let today = new Date().toISOString().slice(0, 10);


  useEffect(() => {
    tasksFromDBGetter()
  }, [])


  const tasksFromDBGetter = async () => {
    database().ref("Tasks").on('value', (snapshot) => {
      if (snapshot) {
        let array = [];
        snapshot.forEach((items) => {
          let value = items.val();
          value.key = items.key
          array.push(value);
        })

        setData(array)
      }
    })
  }

  const dateHandler=async(date)=>{
    setSelectedDate(date)
  }

  const submitHandler = (value, date) => {

    console.log("selectedDate",selectedDate)

    // database().ref("Tasks").push({
    //   value,
    //   date:date?date:"",
    //   today
    // })

  };

  const onChangeText = async (value) => {
    setValue(value)
  }

    const deleteItem = (item) => {
      Alert.alert (
        'Delete',
        'Are you sure?',
        [
          {
            text: 'Yes', onPress: () =>{             
              let id = item.key;
              database().ref("Tasks").child(id).remove()
              console.log('Pressed yes')
            }
          },
          {
            text: 'No', onPress: () =>{
              console.log('Pressed no')
            }
          }
        ]
      )
  };

  const searchItem = (keyword) => {
    setSearchValue(keyword)
  }

  //////////Search filter

  const dataSearch = data.filter((item) => {
    return searchValue ?
      item.value.includes(searchValue) : true
  })

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#FFC300" />
      </View>

      
      <View>
        <FlatList
          data={dataSearch}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={() => deleteItem(item)} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} onChangeText2={onChangeText} 
          dateHandler={dateHandler}
          />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: #C1E1C1;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
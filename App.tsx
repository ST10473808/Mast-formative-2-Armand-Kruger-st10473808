import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, } from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  // State for the text input
  const [ dishName, setDishName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ price, setPrice ] = React.useState('');


  // State for the dropdown picker
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Starters', value: 'starters'},
    {label: 'Main Course', value: 'main_course'},
    {label: 'Desserts', value: 'desserts'},
  ]);
  return (
    // ScrollView allows the content to be scrollable,
    <ScrollView>
    <View style={styles.container}>
      <Text>Chef Cristofels menu</Text>

      <Image source={require('./assets/food.jpg')}
       style={{ width: 200, height: 200 }} />
      <StatusBar style="auto" />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 20 }}
        onChangeText={text => setDishName(text)}
        value={dishName}
        placeholder="Dish name"
      />

      <DropDownPicker style={styles.dropdownContainer}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode='SCROLLVIEW'
      />

       <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 20 }}
        onChangeText={text => setDescription(text)}
        value={description}
        placeholder="Description of the dish"
      />

       <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 20 }}
        onChangeText={text => setPrice(text)}
        value={price}
        placeholder="Price of the dish"
      />

    </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    width: 200,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    
  },
});

// What i used so far to help me code my app
//https://hossein-zare.github.io/react-native-dropdown-picker-website/docs
//https://reactnative.dev/docs

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';


export default function App() {
  // State for the text input
  const [ dishName, setDishName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ price, setPrice ] = React.useState('');

  // State for storing dishes
  const [dishes, setDishes] = React.useState([]);

  // State for the dropdown picker
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Starters', value: 'starters'},
    {label: 'Main Course', value: 'main_course'},
    {label: 'Desserts', value: 'desserts'},
  ]);
  return (
    // ScrollView allows the content to be scrollable

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

      <Button title="Add Dish" onPress={() => {
        if (dishName.trim() && description.trim() && price.trim() && value) {

          // Adds the new dish to the dishes array

          setDishes([...dishes, { dishName, description, price, category: value }]);

          // Clears the form

          setDishName('');
          setDescription('');
          setPrice('');
          setValue(null);
        } else {
          alert('Please fill in all fields');
        }
      }} />

      <Text style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>Menu Items:</Text>
      <FlatList
        data={dishes}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.dishName}</Text>
            <Text style={{ color: 'black', marginVertical: 5 }}>{item.description}</Text>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Price: R{item.price}</Text>
            <Text style={{ color: 'blue', fontSize: 12, marginTop: 5 }}>Category: {item.category}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
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
  card: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    backgroundColor: '#f9f9f9',
    width: 300,
  },
});

// What i used so far to help me code my app
//https://hossein-zare.github.io/react-native-dropdown-picker-website/docs
//https://reactnative.dev/docs

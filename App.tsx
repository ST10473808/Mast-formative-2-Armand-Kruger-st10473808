import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, FlatList,ImageBackground} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { dishes as initialDishes, Dish } from './data/dishes';

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
    alignSelf: 'center',
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
  loginButton: {
    backgroundColor: '#4169E1',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
});

type Item = {
  label: string;
  value: string;
};

export default function App() {

  // State for the text input

  const [ dishName, setDishName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ price, setPrice ] = React.useState('');
  const [screen, setScreen] = React.useState('login');
  const [userType, setUserType] = React.useState('');

  // State for storing dishes

  const [dishes, setDishes] = React.useState<Dish[]>(initialDishes);

  // State for the dropdown picker

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Dish['category'] | null>(null);
  const [items, setItems] = React.useState<Item[]>([
    {label: 'Starters', value: 'starters'},
    {label: 'Main', value: 'main'},
    {label: 'Desserts', value: 'desserts'},
  ]);

  // If the user is on the login screen, show the login options

  if( screen === 'login') {
  return ( 
    
      <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 30 }}>
          Chef Cristofel
        </Text>
        
        
        <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          setUserType('guest');
          setScreen('guestMenu');
        }}
        >
          
          <Text>Guest Login</Text>
          
          </TouchableOpacity>
        
          <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            setUserType('chef');
            setScreen('chefMenu');
          }}
            >
              <Text>Chef Login</Text>
              </TouchableOpacity>
      </View>
      );
    }

    if (screen === 'chefMenu') {
    return(

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
        <View style={{ marginTop: 20 }}>
      <Button title="Add Dish" onPress={() => {
        if (dishName.trim() && description.trim() && price.trim() && value) {

          // Adds the new dish to the dishes array

          setDishes(prev => [
            ...prev,
            {
              id: String(prev.length + 1),
              name: dishName,
              description,
              price: price.startsWith('R') ? price : `R${price}`,
              category: value,
            },
          ]);

          //Clears the form/user input after adding a dish

          setDishName('');
          setDescription('');
          setPrice('');
          setValue(null);
        } else {
          alert('Please fill in all fields');
        }
      }} /> 
    </View>

      <Text style={{ marginTop: 20, fontSize: 20, color: 'gray', fontWeight: 'bold' }}>Total Dishes: {dishes.length}</Text>

      <Text style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>Menu Items:</Text>
      <FlatList
        data={dishes}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'black', marginVertical: 5 }}>{item.description}</Text>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.price}</Text>
            <Text style={{ color: 'blue', fontSize: 12, marginTop: 5 }}>Category: {item.category}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

    </View>

    </ScrollView>
  );
}

//Place holder for the guest menu, which is currently just a view.

if (screen === 'guestMenu') {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Guest Menu View</Text>
      <Text>PlaceHolder</Text>
    </View>
  );
}
}

// What i used so far to help me code my app
//https://hossein-zare.github.io/react-native-dropdown-picker-website/docs
//https://reactnative.dev/docs
//https://reactnative.dev/docs/flatlist
// Fatima Shaik.
//https://stackoverflow.com/questions/71892161/handling-array-length-in-react
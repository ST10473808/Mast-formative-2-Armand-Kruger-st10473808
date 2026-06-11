import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, FlatList,ImageBackground} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { dishes as initialDishes, Dish } from './data/dishes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  CategoryButton: {
    backgroundColor: '#4169E1',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },

  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
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
  const [selectedCategory, setSelectedCategory] = React.useState('all')

// State for storing dishes

  const [dishes, setDishes] = React.useState<Dish[]>([]);

// Load dishes from AsyncStorage when the app starts

  React.useEffect(() => {
    const loadDishes = async () => {
      const storedDishes = await AsyncStorage.getItem('dishes');
      if (storedDishes) {
        setDishes(JSON.parse(storedDishes));

      } else {
        setDishes(initialDishes);
      }
    };
    loadDishes();
  }, []);

  // Save dishes to AsyncStorage whenever they change

  React.useEffect(() => {
    AsyncStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  // State for the dropdown picker

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Dish['category'] | null>(null);
  const [items, setItems] = React.useState<Item[]>([
    {label: 'Starters', value: 'starters'},
    {label: 'Main', value: 'main'},
    {label: 'Desserts', value: 'desserts'},
  ]);

  // Function to delete a dish by its id

  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(dish => dish.id !== id));
  }

 // Filter dishes based on the selected category. If 'all' is selected, show all dishes.

const filteredDishes = selectedCategory === 'all' ? dishes : dishes.filter(dish => dish.category === selectedCategory);
  
// Function to calculate the average price of a list of dishes, which is used to display the average price in the chef menu.

const calculateAveragePrice = (list: Dish[]) => {
  if (!list || list.length === 0) return 'R0.00';
  const total = list.reduce((sum, dish) => {
    const priceNumber = Number(String(dish.price).replace(/[^0-9.-]+/g, ''));
    return sum + (isNaN(priceNumber) ? 0 : priceNumber);
  }, 0);
  return `R${(total / list.length).toFixed(2)}`;
};


// Calculate the average price of the dishes and store it in a variable to be displayed in the chef menu.

const averagePrice = calculateAveragePrice(filteredDishes);

  // If the user is on the login screen, show the login options

  if( screen === 'login') {
  return ( 

      <ImageBackground source={require('./assets/food.jpg')} style={styles.ImageBackground} resizeMode="cover">

      <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 30 }}>
          Chef Cristofel's menu
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
            setScreen('mainMenu');
          }}
            >
              <Text>Chef Login</Text>
              </TouchableOpacity>
      </View>
      </ImageBackground>
      );
    }


    if (screen === 'mainMenu') {
      return (

          <ScrollView>

    <View style={styles.container}>

      <Text>Chef Cristofels menu</Text>

      <Image source={require('./assets/food.jpg')}
       style={{ width: 200, height: 200 }} />
      <StatusBar style="auto" />
   
      <Text style={{ marginTop: 20, fontSize: 20, color: 'gray', fontWeight: 'bold' }}>Total Dishes: {dishes.length}</Text>

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
        Categories:
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'all' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={{ color: 'white' }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'starters' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('starters')}
        >
          <Text style={{ color: 'white' }}>Starters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'main' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('main')}
        >
          <Text style={{ color: 'white' }}>Main</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'desserts' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('desserts')}
        >
          <Text style={{ color: 'white' }}>Desserts</Text>
        </TouchableOpacity>

      </View>

          <Text style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>Menu Items:</Text>

          <Text style={{ marginTop: 10, fontSize: 16, color: 'green', fontWeight: 'bold' }}>
            Average Price ({selectedCategory}): {averagePrice}</Text>

      <FlatList
        data={filteredDishes}
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

      {/*Button to reset the menu to the initial dishes*/}

        <Button title="Reset Menu" onPress={() => setDishes(initialDishes)} />

      {/*Button to navigate to the chef menu*/}

       <Button title='Chef Menu' onPress={() => setScreen('chefMenu')} />

      {/*Button to navigate back to the login screen*/}

       <Button title='Login' onPress={() => setScreen('login')} />

  </ScrollView>
   
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

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
        Categories
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'all' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={{ color: 'white' }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'starters' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('starters')}
        >
          <Text style={{ color: 'white' }}>Starters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'main' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('main')}
        >
          <Text style={{ color: 'white' }}>Main</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'desserts' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('desserts')}
        >
          <Text style={{ color: 'white' }}>Desserts</Text>
        </TouchableOpacity>

      </View>

          <Text style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>Menu Items:</Text>

          <Text style={{ marginTop: 10, fontSize: 16, color: 'green', fontWeight: 'bold' }}>
             Average Price ({selectedCategory}): {averagePrice}</Text>

      <FlatList
        data={filteredDishes}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'black', marginVertical: 5 }}>{item.description}</Text>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.price}</Text>
            <Text style={{ color: 'blue', fontSize: 12, marginTop: 5 }}>Category: {item.category}</Text>
            
            {/*Delete button for each dish, which calls the deleteDish function with the dish's id when pressed*/}

            <View style={{ marginTop: 10 }}>
              <Button title="Delete" color="red" onPress={() => deleteDish(item.id)} />
            </View>
          </View>
        )}

        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

    </View>
    
       {/*Button to reset the menu to the initial dishes*/}

        <Button title="Reset Menu" onPress={() => setDishes(initialDishes)} />

      {/*Button to navigate to the chef menu*/}

    <Button title='Main Menu' onPress={() => setScreen('mainMenu')} />

    </ScrollView>
  );
}

if (screen === 'guestMenu') {
  return(
    
          <ScrollView>

    <View style={styles.container}>

      <Text>Chef Cristofels menu</Text>

      <Image source={require('./assets/food.jpg')}
       style={{ width: 200, height: 200 }} />
      <StatusBar style="auto" />
   
      <Text style={{ marginTop: 20, fontSize: 20, color: 'gray', fontWeight: 'bold' }}>Total Dishes: {dishes.length}</Text>

          <Text style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>Menu Items:</Text>

          <Text style={{ marginTop: 10, fontSize: 16, color: 'green', fontWeight: 'bold' }}>
            Average Price ({selectedCategory}): {averagePrice}</Text>

      <FlatList
        data={filteredDishes}
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

      {/*Button to navigate to the filter menu*/}

       <Button title='Filter Menu' onPress={() => setScreen('filterMenu')} />

        {/*Button to navigate back to the login screen*/}

        <Button title='Login' onPress={() => setScreen('login')} />

  </ScrollView>
  
    );
}

   if (screen === 'filterMenu') {
      return (

          <ScrollView>

    <View style={styles.container}>

      <Text>Chef Cristofels menu</Text>

      <Image source={require('./assets/food.jpg')}
       style={{ width: 200, height: 200 }} />
      <StatusBar style="auto" />
   
      <Text style={{ marginTop: 20, fontSize: 20, color: 'gray', fontWeight: 'bold' }}>Total Dishes: {dishes.length}</Text>

      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
        Categories:
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'all' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={{ color: 'white' }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'starters' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('starters')}
        >
          <Text style={{ color: 'white' }}>Starters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'main' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('main')}
        >
          <Text style={{ color: 'white' }}>Main</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.CategoryButton, selectedCategory === 'desserts' && { backgroundColor: '#6495ED' }]}
          onPress={() => setSelectedCategory('desserts')}
        >
          <Text style={{ color: 'white' }}>Desserts</Text>
        </TouchableOpacity>

      </View>

          <Text style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>Menu Items:</Text>

          <Text style={{ marginTop: 10, fontSize: 16, color: 'green', fontWeight: 'bold' }}>
            Average Price ({selectedCategory}): {averagePrice}</Text>

      <FlatList
        data={filteredDishes}
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
     

      {/*Button to navigate to the guest menu*/}

       <Button title='Main Menu' onPress={() => setScreen('guestMenu')} />

  </ScrollView>
   
      );
    }

}

// What i used so far to help me code my app
//https://hossein-zare.github.io/react-native-dropdown-picker-website/docs
//https://reactnative.dev/docs
//https://reactnative.dev/docs/flatlist
// Fatima Shaik.
//https://stackoverflow.com/questions/71892161/handling-array-length-in-react
//https://medium.com/@mahesh.nikate/storing-data-permanently-in-react-native-using-asyncstorage-2025-91a79b104fdb
//https://reactnative.dev/docs/flatlist?utm
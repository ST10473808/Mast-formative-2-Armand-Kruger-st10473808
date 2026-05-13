export interface Dish {
  id: string;
  name: string;
  category: 'starters' | 'main' | 'desserts';
  description: string;
  price: string;
}

export const dishes: Dish[] = [
  { id: '1', name: 'Pineapple Pizza', category: 'main', description: 'Pineapple on a pizza', price: 'R120.99' },
  { id: '2', name: 'Garlic Bread', category: 'starters', description: 'Crispy bread with garlic butter', price: 'R60.99' },
  { id: '3', name: 'Salad', category: 'starters', description: 'Lettuce with cheese and tomatoes', price: 'R80.99' },
  { id: '4', name: 'Creamy chicken pasta', category: 'main', description: 'Creamy chicken with pasta mixed with onions and greek yogurt', price: 'R180.99' },
  { id: '5', name: 'Chocolate Cake', category: 'desserts', description: 'Rich and decadent chocolate', price: 'R99.99' },
  { id: '6', name: 'Milk Tart', category: 'desserts', description: 'South African desert', price: 'R89.99' },
];

// This code is here because i was not sure if the predifended courses as meant as in starter, mains and desserts or 
// if it was meant as in the courses of a meal, so i just added a few dishes to each category.
//Plus with this it is easy to  see if the app is scrollable
// Only down side is when the user adds a new dish it will be added to the end of the list.
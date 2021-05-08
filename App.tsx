import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Top from './components/Top';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import Post from './components/Post';
import Search from './components/Search';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Post">
        <Stack.Screen name="Top" component={Top} />
        <Stack.Screen name="CategoryList" component={CategoryList} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
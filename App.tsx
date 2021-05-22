import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Top from './components/Top';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import Post from './components/Post';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';
import Single from './components/Single';
import Mylist from './components/Mylist';
import Result from './components/Result';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Top" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Top" component={Top} />
        <Stack.Screen name="CategoryList" component={CategoryList} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Single" component={Single} />
        <Stack.Screen name="Mylist" component={Mylist} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
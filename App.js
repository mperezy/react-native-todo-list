import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@components/Login/login';
import TodoList from '@components/TodoList/todoList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='TodoList' component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

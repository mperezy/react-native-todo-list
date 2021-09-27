import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import store from '@reduxStore/store/index';
import Login from '@components/Login/login';
import TodoList from '@components/TodoList/todoList';

// eslint-disable-next-line no-undef
window.store = store;
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='TodoList' component={TodoList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

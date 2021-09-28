import React, { useEffect, useState } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { auth } from '@services/firebase';
import { useDispatch } from 'react-redux';
import { setUserData, unsetUserData } from '@reduxStore/slices/userSlice';
import { setUserData2LS } from '@utils/localStorageFuncs';
import styles from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }));
          navigation.replace('TodoList');
        } else {
          dispatch(unsetUserData());
        }
      }),
    [navigation]
  );

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCreds) => {
        const { user } = userCreds;

        setUserData2LS(user.uid, user.email);
      })
      .catch((error) => {
        alert(error.message);
        console.log({ exception: error.message });
      });
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log({ user });
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        alert(error.message);
        console.log({ exception: error.message });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image style={styles.loginImage} source={require('@assets/adaptive-icon.png')} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutLine]}>
          <Text style={styles.buttonOutLineText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

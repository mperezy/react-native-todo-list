import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import auth from '../../services/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('TodoList');
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCreds) => {
        const { user } = userCreds;
        console.log(`Logged in with: ${user.email}`);
      })
      .catch((error) => console.log({ exception: error.message }));
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
      // eslint-disable-next-line no-undef
      .catch((error) => console.log({ exception: error.message }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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

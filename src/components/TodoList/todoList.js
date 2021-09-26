import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Text,
  View,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Task from '../Task/task';
import auth from '../../services/firebase';

const TodoList = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const { currentUser } = auth;
  const userLogged = currentUser.email;

  const scrollViewRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animating: true });
  }, [taskItems]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log({ exception: error.message });
      });
  };

  const completeTask = (index) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <View style={styles.something}>
        <View style={styles.tasksWrapper}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <View style={styles.navWrapper}>
            <Text style={styles.sectionTitle}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Today's tasks of {userLogged.substring(0, userLogged.indexOf('@'))}
            </Text>
            <TouchableOpacity onPress={handleSignOut}>
              <View style={styles.navButtonContainer}>
                <Text style={styles.navButton}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.items}>
              {taskItems.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TodoList;

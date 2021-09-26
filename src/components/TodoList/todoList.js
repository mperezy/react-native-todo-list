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
import Task from '@components/Task/task';
import { auth } from '@services/firebase';
import { getTasksByUserId } from '@services/database';
import styles from './styles';

const TodoList = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const { currentUser } = auth;
  const userLogged = currentUser.email;

  const scrollViewRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    getTasksByUserId(currentUser.uid)
      .then((data) => {
        setTaskItems(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
      <View style={styles.tasksWrapper}>
        <View style={styles.navWrapper}>
          <Text style={styles.sectionTitle}>
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

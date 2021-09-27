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
import { useDispatch, useSelector } from 'react-redux';
import { callFirebase, selectTasks } from '@reduxStore/slices/taskSlice';
import { clearUserDataFromLS } from '@utils/localStorageFuncs';
import { selectUserEmail } from '@reduxStore/slices/userSlice';
import styles from './styles';

const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callFirebase());
  }, []);

  const userEmail = useSelector(selectUserEmail);
  const tasks = useSelector(selectTasks);

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

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
        clearUserDataFromLS();
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
            Today's tasks of {userEmail.substring(0, userEmail.indexOf('@'))}
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
            {tasks.map((item, index) => (
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

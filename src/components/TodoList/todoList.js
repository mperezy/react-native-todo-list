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
import { auth, taskCollection } from '@services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTask2Firebase,
  getTasksFromFirebase,
  deleteTaskFromFirebase,
  selectTasks,
} from '@reduxStore/slices/taskSlice';
import { clearUserDataFromLS } from '@utils/localStorageFuncs';
import { selectUserEmail } from '@reduxStore/slices/userSlice';
import styles from './styles';

const TodoList = () => {
  const [task, setTask] = useState('');

  const userEmail = useSelector(selectUserEmail);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const scrollViewRef = useRef();
  const navigation = useNavigation();

  /* Refresh automatically the todo list  */
  useEffect(() => {
    taskCollection.onSnapshot(() => {
      dispatch(getTasksFromFirebase());
    });
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animating: true });
  }, [tasks]);

  const handleAddTask = () => {
    if (!['ios', 'android'].includes(Platform.OS)) {
      Keyboard.dismiss();
    }
    if (task) {
      dispatch(setTask2Firebase({ task }));
      setTask('');
    } else {
      alert('Please enter a task in text input.');
    }
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

  const completeTask = (taskId) => dispatch(deleteTaskFromFirebase({ taskId }));

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
            {tasks.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => completeTask(item.id)}>
                <Task text={item.task} />
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

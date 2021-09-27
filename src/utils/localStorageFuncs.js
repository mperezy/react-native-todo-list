import AsyncStorage from '@react-native-async-storage/async-storage';

const isObject = (value) => typeof value === 'object';

const storeData = async (key, value) => {
  try {
    const finalValue = isObject(value) ? JSON.stringify(value) : value.toString();
    await AsyncStorage.setItem(key, finalValue);
  } catch (e) {
    console.log({ asyncStorageException: e });
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return isObject(value) ? JSON.parse(value) : value;
    }
  } catch (e) {
    console.log({ asyncStorageException: e });
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log({ asyncStorageException: e });
  }
};

const setUserData2LS = (userId, email) => {
  storeData('todoList.userId', userId).then((data) => data);
  storeData('todoList.email', email).then((data) => data);
};

const getUserDataFromLS = () => ({
  userId: getData('todoList.userId'),
  email: getData('todoList.email'),
});

const clearUserDataFromLS = () => {
  removeItem('todoList.userId').then((res) => res);
  removeItem('todoList.email').then((res) => res);
};

export { setUserData2LS, getUserDataFromLS, clearUserDataFromLS };

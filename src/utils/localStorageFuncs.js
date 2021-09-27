const setUserData2LS = (userId, email) => {
  localStorage.setItem('todoList.userId', userId);
  localStorage.setItem('todoList.email', email);
};

const getUserDataFromLS = () => ({
  userId: localStorage.getItem('todoList.userId'),
  email: localStorage.getItem('todoList.email'),
});

const clearUserDataFromLS = () => {
  localStorage.clear('todoList.userId');
  localStorage.clear('todoList.email');
};

export { setUserData2LS, getUserDataFromLS, clearUserDataFromLS };

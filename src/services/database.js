import { taskCollection } from '@services/firebase';

const getTasksByUserId = async (userId) => {
  const tasks = [];

  await taskCollection
    .where('uid', '==', userId)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data().task);
      })
    )
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return tasks;
};

const sendTask2Firebase = async (taskText, userId) => {
  taskCollection
    .add({
      task: taskText,
      uid: userId,
    })
    .then(() => console.log('A new task was added in database.'))
    .catch(() => console.log('Something went wrong trying to add a new task in database.'));
};

export { getTasksByUserId, sendTask2Firebase };

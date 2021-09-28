import { taskCollection } from '@services/firebase';
import firebase from 'firebase';

const sortBy = (obj1, obj2, field, kind) => {
  const x = kind === 'asc' ? 1 : -1;
  return obj1[field] < obj2[field] ? -1 * x : obj1[field] > obj2[field] ? 1 * x : 0;
};

const getTasksByUserId = async (userId) => {
  const tasks = [];

  await taskCollection
    .where('uid', '==', userId)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        tasks.push({
          id: doc.id,
          task: doc.data().task,
          createdAt: doc.data().createdAt,
        })
      )
    )
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return tasks.sort((x, y) => sortBy(x, y, 'createdAt', 'asc'));
};

const sendTask2Firebase = async (taskText, userId) => {
  await taskCollection
    .add({
      task: taskText,
      uid: userId,
      createdAt: new Date().getTime(),
    })
    .then(() => console.log('A new task was added in database.'))
    .catch(() => console.log('Something went wrong trying to add a new task in database.'));
};

const deleteTaskById = async (taskId) => {
  await taskCollection
    .doc(taskId)
    .delete()
    .then(() => console.log('A task was deleted from database.'))
    .catch(() => console.log('Something went wrong trying to delete a task from database.'));
};

export { getTasksByUserId, sendTask2Firebase, deleteTaskById };

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
const writeTask = async (taskText, userId) => {};

export { getTasksByUserId, writeTask };

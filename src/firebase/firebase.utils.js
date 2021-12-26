import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvvv5xqHf7cBjka8c4bvzl0tu_OLNy6Qg",
  authDomain: "financial-management-app.firebaseapp.com",
  projectId: "financial-management-app",
  storageBucket: "financial-management-app.appspot.com",
  messagingSenderId: "1002166492797",
  appId: "1:1002166492797:web:45270f15ee77a256f31b14"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createFiscalMonthlyDocument = async (path, tableName, data) => {
  const docRef = firestore.doc(`${path}/${tableName}`);
  const snapShot = await docRef.get();

  if(!snapShot.exists) {
    try {
      await docRef.set({
        ...data,
      });
    } catch(error) {
      console.log('error creating collection', error.message);
    }
  }

  return docRef;
}

export const readFiscalMonthlyDocument = async (path, tableName) => {
  const docRef = firestore.collection(path).doc(tableName);
  const snapshot = await docRef.get();

  if (snapshot.exists) {
      return snapshot.data();
  } else {
      console.log('path and tables dont exist')
      throw new Error("path and table donn't exist");
  }
}

export const updateFiscalMonthlyDocument = async (path, tableName, items) => {
  const docRef = firestore.collection(path).doc(tableName);

  try {
    await docRef.set({
      ...items,
    });
  } catch(error) {
    console.log(`error updating collection ${path}/${tableName}`, error.message);
  }

  return docRef;
}

export const addTableToOverview = async (path, tableInfo) => {
  const docRef = firestore.collection(path).doc('Overview');
  const snapShot = await docRef.get();
  const data = snapShot.data();

  try {
    await docRef.set({
      ...[...Object.values(data), tableInfo],
    }, {
      merge: true,
    });
  } catch(error) {
    console.log(`error updating collection ${path}/Overview`, error.message);
  }

  return docRef.get();
}

export const updateMetaTable = async (tables) => {
  const docRef = firestore.collection('meta').doc('tables');

  try {
    await docRef.set({
      ...tables,
    });
  } catch(error) {
    console.log(`error updating collection meta/tables`, error.message);
  }

  return docRef.get();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  return collections.docs.map(doc => {
    const { expenses, deposits } = doc.data();

    return {
      expenses,
      deposits,
    }
  })[0];
}

export const firestore = firebase.firestore();

export default firebase;

import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvvv5xqHf7cBjka8c4bvzl0tu_OLNy6Qg",
  authDomain: "financial-management-app.firebaseapp.com",
  databaseURL: "https://financial-management-app.firebaseio.com",
  projectId: "financial-management-app",
  storageBucket: "financial-management-app.appspot.com",
  messagingSenderId: "1002166492797",
  appId: "1:1002166492797:web:45270f15ee77a256f31b14"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createFiscalMonthlyDocument = async (path, tableName, expenses) => {
  const docRef = firestore.doc(`${path}/${tableName}`);
  const snapShot = await docRef.get();

  if(!snapShot.exists) {
    try {
      await docRef.set({
        ...expenses,
      });
    } catch(error) {
      console.log('error creating collection', error.message);
    }
  }

  return docRef;
}

export const updateFiscalMonthlyDocument = async (path, tableName, items) => {
  const docRef = firestore.collection(path).doc(tableName);

  try {
    await docRef.update({
      ...items,
    });
  } catch(error) {
    console.log(`error updating collection ${path}/${tableName}`, error.message);
  }

  return docRef;
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

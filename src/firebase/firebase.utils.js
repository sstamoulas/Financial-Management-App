import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvY_kpNHghmgENrcxU_N88qUN5W4ng1Wc",
  authDomain: "yiayia-s-budgeting-app.firebaseapp.com",
  projectId: "yiayia-s-budgeting-app",
  storageBucket: "yiayia-s-budgeting-app.appspot.com",
  messagingSenderId: "922245754332",
  appId: "1:922245754332:web:a8aaf3b95415bdf4e47319",
  measurementId: "G-QC31VKKFBR"
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

  return snapshot.data();
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

export const addTableToOverview = async (path, tableInfo) => {
  const docRef = firestore.collection(path).doc('Overview');
  const snapShot = await docRef.get();
  const data = snapShot.data();

  try {
    await docRef.set({
      tables: [...data.tables, tableInfo],
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
    await docRef.update({
      tables,
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

import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';


export const createDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        // console.log("Document written with ID: ", docRef.id)
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error)
        throw error
    }
}
export const readDocuments = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = [];
        querySnapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() })
        });
        return documents;
    } catch (error) {
        console.error("Error reading documents: ", error);
        throw error
    }
};
export const readUserDocuments = async (collectionName, userId) => {
    try {
        const q = query(collection(db, collectionName), where("userID", "==", userId));
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() })
        });
        return documents;
    } catch (error) {
        console.error("Error reading documents: ", error);
        throw error
    }
}

export const updateDocument = async (collectionName, docId, newData) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, newData);
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
};

export const deleteDocument = async (collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef)
        // console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
        throw error;
    }
};
export const readDocument = async(collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    } else {
        console.log("No such document!");
        return null
    }
}
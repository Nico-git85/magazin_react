import { initializeApp } from 'firebase/app';
import  { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDF3eEBwO71wXzsOmKLV-mAEj4ElO_D-Is",
    authDomain: "magazine-db.firebaseapp.com",
    projectId: "magazine-db",
    storageBucket: "magazine-db.appspot.com",
    messagingSenderId: "528279420258",
    appId: "1:528279420258:web:d79b5960d56fcf36e4c03b"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);


  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid);

const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email }= userAuth;
    const createdAt = new Date();

      try {
      await setDoc( userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }
    return userDocRef

  }
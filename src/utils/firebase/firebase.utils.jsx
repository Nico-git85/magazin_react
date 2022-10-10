import { initializeApp } from 'firebase/app';
import  { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';


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


  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect (auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
   if(!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){ 
    const { displayName, email }= userAuth;
    const createdAt = new Date();

      try {
      await setDoc( userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }
    return userDocRef
  
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password)

  }
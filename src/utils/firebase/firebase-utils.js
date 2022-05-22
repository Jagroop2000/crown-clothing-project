import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore , doc , getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCct4wKLAAOcXskkZeUmefUyJW4mmTrxwI",
    authDomain: "crown-clothing-db-d92a6.firebaseapp.com",
    projectId: "crown-clothing-db-d92a6",
    storageBucket: "crown-clothing-db-d92a6.appspot.com",
    messagingSenderId: "437486181522",
    appId: "1:437486181522:web:0eec430c134630bf1f5a4b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt :"select_account"
});


export const auth = getAuth();
export const  signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db =  getFirestore();

export const createUSerDocumentsFromAuth = async(userAuth) => {

    const userDocRef = doc(db , 'users' , userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try{
            await  setDoc(userDocRef ,{
                displayName , email , createdAt
            });
        } catch(error){
            console.log("error creating the user"  , error.message);
        }
    }

    return userDocRef;

}
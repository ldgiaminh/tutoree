import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASQurCPE-hfDmTx6L0EyotrBHgAODalZc",
  authDomain: "edu2gether-362515.firebaseapp.com",
  projectId: "edu2gether-362515",
  storageBucket: "edu2gether-362515.appspot.com",
  messagingSenderId: "887705149592",
  appId: "1:887705149592:web:3c7a4e0511c1282d7a70ed",
  measurementId: "G-G66D6ZQ9Z4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   const dispatch = useDispatch();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result);
//       dispatch(loginGoogleAction(result.user.accessToken));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

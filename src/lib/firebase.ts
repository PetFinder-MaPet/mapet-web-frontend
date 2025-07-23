import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAixs2wd7GKidSu_f_gc8KI4B3fnOtaIhw",
  authDomain: "mapet-usuarios.firebaseapp.com",
  projectId: "mapet-usuarios",
  storageBucket: "mapet-usuarios.appspot.com", // 
  messagingSenderId: "599956892201",
  appId: "1:599956892201:web:8034957cbd709d703f0a38",
  measurementId: "G-P762ZBYL1W"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

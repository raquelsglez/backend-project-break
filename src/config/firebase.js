// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword} = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABn5Ke9t5ARoM9irTrfw6OBxa2z0R6qzM",
  authDomain: "ejercicio-tienda-e4995.firebaseapp.com",
  projectId: "ejercicio-tienda-e4995",
  storageBucket: "ejercicio-tienda-e4995.appspot.com",
  messagingSenderId: "588306111891",
  appId: "1:588306111891:web:ce0df4f285e01c4f7b9c66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginEmailPassword = async (req, res) =>{

  const loginEmail = req.body.email
  const loginPassword = req.body.pwd

  try{
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    req.session.palabraSecreta = process.env.PALABRA_SECRETA
    res.redirect("/dashboard")
  }catch{
    res.redirect("/login?error=1")
  }
}

const registerEmailPassword = async (req, res) =>{

  const registerEmail = req.body.email
  const registerPassword = req.body.pwd

  try{
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    res.redirect("/register?confirmation=1")

  } catch{
    res.redirect("/register?error=1")
  }
}

const logout = async (req, res) =>{
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/products');
  });

}



module.exports = { 
  loginEmailPassword,
  registerEmailPassword,
  logout,
};

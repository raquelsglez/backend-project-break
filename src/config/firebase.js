const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword} = require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ejercicio-tienda-e4995.firebaseapp.com",
  projectId: "ejercicio-tienda-e4995",
  storageBucket: "ejercicio-tienda-e4995.appspot.com",
  messagingSenderId: "588306111891",
  appId: "1:588306111891:web:ce0df4f285e01c4f7b9c66"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginEmailPassword = async (req, res, next) =>{

  const loginEmail = req.body.email
  const loginPassword = req.body.pwd

  try{
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    req.session.palabraSecreta = process.env.PALABRA_SECRETA;
    res.redirect("/dashboard");
  }catch (error){
    const code = 7;
    const page = 'login';
    next({error, code, page});
  }
}

const registerEmailPassword = async (req, res, next) =>{

  const registerEmail = req.body.email;
  const registerPassword = req.body.pwd;

  try{
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    res.redirect("/register?confirmation=1");
  } catch (error){
    const code = 8;
    const page = 'register';
    next({error, code, page});
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

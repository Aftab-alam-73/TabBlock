import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { useSignInMutation } from "../redux/api/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/state/userSlice";
import toast from "react-hot-toast";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [SignIn] = useSignInMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate=useNavigate();

  const signInWithGoogle = () => {
    setLoading(true);
    const auth = getAuth(app);
    auth.languageCode = "it";
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const payload = {
          username: result.user.displayName!,
          email: result.user.email!,
          profile: result.user.photoURL!,
        };

        SignIn(payload)
          .unwrap()
          .then((response) => {
            toast.success("Logged in successfully");
            dispatch(setUser(response.data)); // Update Redux state
            navigate("/")
          })
          .catch((error) => {
            toast.error("Failed to sign in");
            console.error("Failed to sign in", error);
          })
          .finally(() => setLoading(false)); 
      })
      .catch((error) => {
        console.error("Error during Google Sign-In: ", error);
        toast.error("Google sign-in failed");
        setLoading(false)
      });
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="flex flex-col gap-5 p-4 shadow-md bg-white rounded-md mobile:p-2">
        <h1 className="text-2xl font-bold mobile:text-xl sm:text-wrap">
          Welcome To The TabBlock Application👋
        </h1>
        <div className="flex items-center gap-3 justify-center">
          <p className="text-xl font-semibold">Log In With Google</p>
          <img src="/logo.jpg" alt="logo" className="w-9 h-9" />
        </div>
        {loading ? (
          <p className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md text-center font-semibold">Logging in...</p>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md font-semibold"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;

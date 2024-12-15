import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { useSignInMutation } from "../redux/api/authSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/state/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [SignIn]=useSignInMutation()
  const dispatch=useDispatch();

    const siginInWithGoogle=()=>{
        const auth=getAuth(app);
        auth.languageCode = 'it';
        const provider=new GoogleAuthProvider();
        signInWithPopup(auth,provider).then((result)=>{
          const payload= {
            username:result.user.displayName!,
            email:result.user.email!,
            profile:result.user.photoURL!
           }
           console.log("Payload: ",payload)
           SignIn(payload)
           .unwrap()
           .then((response)=>{
             toast.success("Logged in successfully")
            dispatch(setUser(response.data));
           })
           .catch((error)=>{
            toast.error("Failed to sign in")
             console.log("Failed to sign in", error);
           })
           
         
        }).catch((error)=>{
          console.log("error: ",error);
        })
      }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="flex flex-col gap-5 p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-bold sm:text-xl sm:text-wrap"> Welcome To The Utilize Application👋 </h1>
        <div className="flex items-center gap-3 justify-center">
        <p className="text-xl font-semibold">Log In With Google </p>
          <img src="/logo.jpg" alt="logo" className="w-9 h-9" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md font-semibold" onClick={siginInWithGoogle}>Login with Google</button>
      </div>
    </div> 
  )
}

export default Login
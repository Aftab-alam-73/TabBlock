import { useDispatch } from "react-redux";
import { useLogOutMutation } from "../redux/api/authSlice"
import toast from "react-hot-toast";
import { clearUser } from "../redux/state/userSlice";

interface HeaderPropsType{
   
    setSearchInput:(value:string)=>void, 
 
}

const Header = ({setSearchInput}:HeaderPropsType) => {
    
    const [Logout]=useLogOutMutation();
    const dispatch=useDispatch();
    const handleLogout=()=>{
        Logout("")
        .unwrap()
        .then(()=>{
            toast.success("Logged out successfully");
            dispatch(clearUser());
        })
        .catch((error)=>{
            toast.error("Failed to log out")
            console.log("Failed to log out", error);
        })
       
    }
  return (
    <div className="bg-blue-600 p-4 flex justify-between ">
        <span className="text-3xl font-bold text-white">TabLock</span>
        <input onChange={(e)=>setSearchInput(e.target.value)} type="text" placeholder='Search...' className="outline-none border-none p-3 rounded-md"/>
        <button onClick={handleLogout} className="bg-white rounded-md text-blue-500 border-none px-4">Logout</button>
    </div>
  )
}

export default Header
import { BrowserRouter as Router , Route,Routes } from "react-router-dom"
import { lazy, Suspense } from "react";
const Home =lazy(()=>import("./pages/Home"));
const Application =lazy(()=>import("./pages/Application")) ;
const Login =lazy(()=>import("./pages/Login")) ;
import { useSelector } from "react-redux";
import { RootState } from "./redux/state/store";
import { Navigate } from "react-router-dom";

const App = () => {
  const  user=useSelector((state:RootState)=>state.user);
  
  const ProtectedRoute=({children}:{children:React.ReactNode})=>{
     if(!user.id) return <Navigate to={'/login'}/>
     return children;
  }
  const ProtectedLoginRoute=({children}:{children:React.ReactNode})=>{
    if(user.id) return <Navigate to={'/'}/>
    return children;
 }

  return (
    <Router>
      <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/"  element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/application/:id" element={<ProtectedRoute><Application/></ProtectedRoute>} />
        <Route path="/login"  element={<ProtectedLoginRoute><Login/></ProtectedLoginRoute>}/>
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App
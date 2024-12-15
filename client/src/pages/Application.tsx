import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppCard from "../components/AppCard";
import socket from "../utility/socket";
import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import { useAddAuditLogMutation } from "../redux/api/auditSlice";
import toast from "react-hot-toast";

const Application = () => {
  const user = useSelector((state: RootState) => state.user);
  const [AddAuditLog]=useAddAuditLogMutation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const app:{id:string,app_name:string} = state?.app;
  console.log("App:",app.id);
  const [conflict, setConflict] = useState(false); // State to handle conflict visibility
  useEffect(()=>{
   if(conflict && user.id!=null){
  // Log audit action
  AddAuditLog({
    
      user_id: user.id,
      action_type: "tab_conflict",
      details: {
        app_id: app.id,
        app_name: app.app_name,
      },
    
  })
  .unwrap()
  .then(()=>{toast.success("Activity Log added successfully!")})
  .catch(()=>{toast.error(" Failed To Add Activity Log")})

}
if(!conflict && user.id!=null){
  // Log audit action
  AddAuditLog({
    
      user_id: user.id,
      action_type: "app_selection",
      details: {
        app_id: app.id,
        app_name: app.app_name,
      },
    
  })
  .unwrap()
  .then(()=>{toast.success("Activity Log added successfully!")})
  .catch(()=>{toast.error(" Failed To Add Activity Log")})
}
  },[user.id,conflict])

  useEffect(() => {
    if (!app) {
      navigate("/"); // Redirect to home if no app is selected
      return;
    }
    // Emit an event to notify the server that this app is opened
    socket.emit("open-app", { userId: user.id, appId: app.id });

    // Listen for "tab-conflict" events (only for the second tab)
    socket.on("tab-conflict", ({ appId }) => {
      if (appId === app.id) {
        setConflict(true); // Show the conflict modal only in the conflicting tab
      }
    });

    // Listen for "force-logout" events
    socket.on("force-logout", ({ appId }) => {
      if (appId === app.id) {
         
        navigate("/");
      }
    });

    // Clean up listeners and notify the server when the component unmounts
    return () => {
      socket.emit("close-app", { userId: user.id, appId: app.id });
      socket.off("tab-conflict");
      socket.off("force-logout");
    };
  }, [app, navigate, user.id]);

  // Handle conflict response actions (logout in the other tab or cancel)
  const handleConflictResponse = (action: "logout-other" | "cancel") => {
    if (action === "logout-other") {
      socket.emit("logout-other-tab", { userId: user.id, appId: app.id });
      setConflict(false);
      navigate("/"); // Redirect to home page
    } else {
      navigate("/"); // Redirect to home page
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1 className="text-center font-semibold">
        You have selected <span className="font-bold">{app?.app_name}</span>
      </h1>
      <AppCard app={app} />

      {conflict && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 font-medium">
              This app ({app?.app_name}) is already opened in another tab.
            </p>
            <p className="mb-6">What would you like to do?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleConflictResponse("logout-other")}
              >
                Log out of the other tab
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => handleConflictResponse("cancel")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;

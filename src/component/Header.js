import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

export const Header = () => {
  const user = useSelector((state) => state.user);;
  const navigate = useNavigate();

  const handleLogOut = ()=> {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log("Error", error);
    });
   
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-6 py-4 flex items-center justify-between shadow-md">
      <img
        className="w-32 md:w-44"
        alt="Netflix Logo"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />

      {user && (
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-10 rounded-full object-cover border border-white"
            src={user?.photoURL}
            alt="Profile"
          />
          <button className="text-white font-medium hover:underline transition"
           onClick={handleLogOut}>
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};
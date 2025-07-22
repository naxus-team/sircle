import { useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLangs } from '../../context/LanguageContext';
import { Link } from "react-router-dom";

const Main = () => {
  const { l } = useLangs();

  useEffect(() => {
    document.title = l('app.0.name');
  }, []);

  if (!useAuth) {
    return <p>حدث خطأ، يرجى إعادة تحميل الصفحة.</p>;
  }

  const { user } = useAuth();
  return (
    <div className="w-full">
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button> */}
      {user ? (


        <div>
          
        </div>



      ) : (
        <Link to="/login">
          <button>تسجيل الدخول</button>
        </Link>
      )
      }
    </div>
  );
};

export default Main;

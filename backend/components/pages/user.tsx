import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDate } from '../../context/DateContext';
import { useLangs } from '../../context/LanguageContext';
import { useUser } from "../../context/UserContext";
import Navigate_User from "../navigate_user";

const Profile = () => {
  const { l } = useLangs();
  const { username } = useParams<{ username: string }>();
  const { user, fetchUser } = useUser();
  const { formatRelativeDate } = useDate();
  

  useEffect(() => {
    if (username) fetchUser(username);
  }, [username]);

  if (!user) { return <p>⏳ تحميل البيانات...</p> };

  return (
    <>
      <div className="p-2">
        <div className="relative flex justify-center items-center h-[64px] rounded-xl">
          <div className="absolute top-5">
            <div className="flex justify-center items-end mb-4">
              <div className="w-[96px] relative flex justify-center">
                <img className=" w-[96px] rounded-full shadow-[0_0_0_6px_rgba(255,255,255,1)]" src={`/${user.image}.jpg`} />
                <div className="absolute ltr:right-1 rtl:left-1 bottom-1 w-[16px] h-[16px] bg-[rgba(16,185,129,1)] rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1)]"></div>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center text-sm p-md px-4 h-[28px] b-sColor-1 t-sColor rounded-full ">{l('user.0.role.0.teacher')} - {l('user.0.spec.0.arabiclang')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-24">
        <div className="flex">

          <div>
            <div className="flex justify-center text-3xl p-sm t-sColor my-2">
              {user.firstname} {user.lastname}
            </div>
            <div className="flex justify-center text-lg p-normal t-sColor-5">
              @{user.username}
            </div>

            <div className="flex justify-center t-sColor-5 p-md text-sm my-4">
              الوصف
            </div>
            <div className="flex justify-center text-base p-md t-sColor-7">
              {user.bio}
            </div>
            <div className="flex mt-5">
              <div className="flex items-center gap-5 shadow-xl p-3 rounded-xl mx-5 min-w-[512px]">
                <div className="t-sColor-5 p-md text-sm">
                  تاريخ الإنضمام
                </div>
                <div className="text-sm p-normal t-sColor">
                  {formatRelativeDate(user.createdat)}
                </div>
                <div className="t-sColor-5 p-md text-sm">
                  رقم الهاتف
                </div>
                <div className="text-sm p-normal t-sColor">
                  20-{user.mobile}+
                </div>
                <div className="t-sColor-5 p-md text-sm">
                  البلد/المحافظة
                </div>
                <div className="text-sm p-normal t-sColor">
                  مصر، القاهرة
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

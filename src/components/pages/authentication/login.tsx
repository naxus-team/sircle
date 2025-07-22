import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useLangs } from '../../../context/LanguageContext';
import { useNavigate } from "react-router-dom";
const env = process.env;

function Login() {
    const auth = useContext(AuthContext);
    const { l } = useLangs();


    const { fetchUser } = useContext(AuthContext)!;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const navigate = useNavigate();

    const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    useEffect(() => {
        console.log(process.env.API_BASE_URL);

    }, [])

    const blurAllButtons = () => {
        // الحصول على جميع الأزرار في الصفحة
        const buttons = document.querySelectorAll('button');

        // تطبيق blur على كل زر
        buttons.forEach((button) => {
            button.blur();
        });
    };

    const toggleTypePassword = () => {
        blurAllButtons();
        setPasswordType((type) => (type === "password" ? "text" : "password"));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const response = await fetch(`${process.env.API_BASE_URL}/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        const data = await response.json();
        if (data) {
            console.warn(data);
            if (data.message) {
                console.warn(data.uuid);

                fetchUser(data.uuid);
            } else {
                blurAllButtons();
                const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
                isMobileDevice && confirm("هل حدث خطأ في تسجيل الدخول؟")
            }
        }
    };

    if (!auth) {
        return <p>حدث خطأ، يرجى إعادة تحميل الصفحة.</p>;
    }

    const { user } = auth;

    const moveHandler = (event: MouseEvent, button: HTMLButtonElement) => {
        const { x, y } = button.getBoundingClientRect();
        button.style.setProperty("--x", `${event.clientX - x - 150}`);
        button.style.setProperty("--y", `${event.clientY - y - 95}`);
    };



    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
        document.title = l('login.0.login') + ' ' + l('app.0.name');

        const buttons = Object.values(buttonRefs.current);

        // دالة لإضافة مستمعات الأحداث
        const addEventListeners = () => {
            buttons.forEach((button) => {
                if (button) {
                    const move = (event: MouseEvent) => moveHandler(event, button);
                    button.addEventListener("mousemove", move);
                }
            });
        };

        // دالة لإزالة مستمعات الأحداث (التنظيف)
        const removeEventListeners = () => {
            buttons.forEach((button) => {
                if (button) {
                    const move = (event: MouseEvent) => moveHandler(event, button);
                    button.removeEventListener("mousemove", move);
                }
            });
        };

        // إضافة المستمعات عند تحميل المكون
        addEventListeners();

        // تنظيف المستمعات عند إزالة المكون
        return () => {
            removeEventListeners();
        };
    }, [user, navigate]);

    const setButtonRef = useCallback((key: string) => (el: HTMLButtonElement | null) => {
        buttonRefs.current[key] = el;
    }, []);


    return (
        <>
            <div className={`flex ${!user ? 'show' : 'hidden'}`}>
                <div className="flex justify-center w-full">
                    <div className="min-w-[256px] h-full mt-10 p-5">
                        <div className="fade-anim start-anim">
                            <div className="flex items-center justify-center text-nowrap mb-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={175.72} height={24.02} viewBox="0 0 175.72 24.02" className="fill-sColor">
                                        {/* <linearGradient id="lg_1_" gradientUnits="userSpaceOnUse" x1="9.339" y1="13.2757" x2="9.339" y2="2.2499">
                                        <stop offset="0" style={{ stopColor: "#000914", stopOpacity: 0 }} />
                                        <stop offset="1" style={{ stopColor: "#000914" }} />
                                    </linearGradient>
                                    <path className="lg1" d="M3.87,5.42c1.86-2.29,4.46-3.61,7.18-3.89l6.14-0.03c0,0.56-0.03,1.1-0.09,1.64c-0.95,0.61-1.81,1.37-2.56,2.29
	c-1.78,2.21-2.51,5.2-2.32,7.82c-2.52,2.35-5.84,3.58-9.49,3.86H2.72C0.8,13.45,1.11,8.84,3.87,5.42z"/>
                                    <linearGradient id="lg_2_" gradientUnits="userSpaceOnUse" x1="25.6468" y1="11.0847" x2="25.6468" y2="21.8209">
                                        <stop offset="0" style={{ stopColor: "#000914", stopOpacity: 0 }} />
                                        <stop offset="1" style={{ stopColor: "#000914" }} />
                                    </linearGradient>
                                    <path className="lg2" d="M31.12,18.88c-1.86,2.29-4.46,3.61-7.18,3.89L17.8,22.8c0-0.56,0.03-1.1,0.09-1.64
	c0.95-0.61,1.81-1.37,2.56-2.29c1.78-2.21,2.51-5.2,2.32-7.82c2.52-2.35,5.84-3.58,9.49-3.86h0.01
	C34.19,10.85,33.88,15.46,31.12,18.88z"/> */}
                                        <g>
                                            <path d="M45.5,12.45c0-5.14,3.74-8.71,8.76-8.71c3.17,0,5.74,1.42,7.18,3.38l-3.02,1.97
		c-0.89-1.22-2.38-1.99-4.15-1.99c-3,0-5.11,2.18-5.11,5.35c0,3.14,2.09,5.35,5.09,5.35c1.82,0,3.43-0.82,4.34-2.33l2.93,2.06
		c-1.54,2.3-4.25,3.62-7.27,3.62C49.22,21.17,45.5,17.59,45.5,12.45z"/>
                                            <path d="M64.03,2.85h3.31v18h-3.31V2.85z" />
                                            <path d="M69.81,14.78c0-3.74,2.74-6.36,6.5-6.36c3.77,0,6.53,2.59,6.53,6.36c0,3.77-2.76,6.38-6.53,6.38
		C72.55,21.17,69.81,18.55,69.81,14.78z M79.44,14.78c0-1.94-1.25-3.29-3.12-3.29s-3.12,1.32-3.12,3.29c0,1.97,1.25,3.29,3.12,3.29
		S79.44,16.75,79.44,14.78z"/>
                                            <path d="M96.48,8.73v12.12h-3l-0.14-1.46c-0.79,1.1-2.06,1.78-3.62,1.78c-2.57,0-4.56-1.82-4.56-4.66V8.73h3.31v7.15
		c0,1.42,1.01,2.21,2.23,2.21s2.47-0.84,2.47-2.35V8.73H96.48z"/>
                                            <path d="M111.53,2.85v18h-2.98l-0.14-1.66c-0.84,1.22-2.16,1.97-3.84,1.97c-3.14,0-5.74-2.64-5.74-6.41
		c0-3.74,2.59-6.34,5.83-6.34c1.51,0,2.76,0.55,3.58,1.51V2.85H111.53z M108.45,14.78c0-1.97-1.27-3.29-3.12-3.29
		s-3.12,1.32-3.12,3.29c0,1.97,1.27,3.29,3.12,3.29C107.16,18.07,108.45,16.8,108.45,14.78z"/>
                                            <path d="M114.04,12.45c0-5.14,3.74-8.71,8.76-8.71c3.17,0,5.74,1.42,7.18,3.38l-3.02,1.97
		c-0.89-1.22-2.38-1.99-4.15-1.99c-3,0-5.11,2.18-5.11,5.35c0,3.14,2.09,5.35,5.09,5.35c1.82,0,3.43-0.82,4.34-2.33l2.93,2.06
		c-1.54,2.3-4.25,3.62-7.27,3.62C117.76,21.17,114.04,17.59,114.04,12.45z"/>
                                            <path d="M132.57,2.85h3.31v18h-3.31V2.85z" />
                                            <path d="M149.85,13.63v7.22h-2.98l-0.14-1.61c-0.94,1.27-2.54,1.92-4.06,1.92c-2.16,0-4.22-1.3-4.22-3.79
		c0-2.74,2.52-3.82,4.9-3.82c0.96,0,2.14,0.14,3.22,0.46v-0.26c0-1.66-0.86-2.42-2.64-2.42c-1.18,0-2.42,0.34-3.48,1.13l-1.25-2.35
		c1.27-0.96,3.14-1.68,5.4-1.68C148.05,8.42,149.85,10.13,149.85,13.63z M146.56,16.08c-0.86-0.26-1.8-0.38-2.59-0.38
		c-1.22,0-2.18,0.43-2.18,1.46c0,0.89,0.72,1.37,1.78,1.37C145.03,18.53,146.54,17.57,146.56,16.08z"/>
                                            <path d="M152.01,19.51l1.03-2.42c1.06,0.89,3.07,1.37,4.68,1.37c0.96,0,2.09-0.19,2.09-1.2c0-0.7-0.89-0.89-2.38-1.15
		c-2.98-0.53-4.9-1.13-4.9-3.65c0-3.12,2.9-4.03,5.4-4.03c1.82,0,3.55,0.53,4.8,1.42l-1.03,2.4c-0.94-0.67-2.38-1.1-3.79-1.1
		c-1.39,0-1.97,0.41-1.97,1.13c0,0.55,0.38,0.72,1.8,0.98c2.98,0.53,5.35,1.06,5.35,3.77c0,2.66-2.3,4.15-5.54,4.15
		C155.71,21.17,153.31,20.54,152.01,19.51z"/>
                                            <path d="M164.64,19.51l1.03-2.42c1.06,0.89,3.07,1.37,4.68,1.37c0.96,0,2.09-0.19,2.09-1.2c0-0.7-0.89-0.89-2.38-1.15
		c-2.98-0.53-4.9-1.13-4.9-3.65c0-3.12,2.9-4.03,5.4-4.03c1.82,0,3.55,0.53,4.8,1.42l-1.03,2.4c-0.94-0.67-2.38-1.1-3.79-1.1
		c-1.39,0-1.97,0.41-1.97,1.13c0,0.55,0.38,0.72,1.8,0.98c2.98,0.53,5.35,1.06,5.35,3.77c0,2.66-2.3,4.15-5.54,4.15
		C168.33,21.17,165.93,20.54,164.64,19.51z"/>
                                        </g>
                                        <path d="M34.93,10.76c-0.34-3.19-1.9-6.06-4.39-8.08C28.41,0.95,25.73,0,22.98,0c0,0,0,0,0,0l-0.44,0l-0.46,0
	L10.92,0.05l-0.15,0.01c-3.2,0.34-6.07,1.9-8.08,4.39c-2.02,2.49-2.95,5.63-2.61,8.82c0.34,3.19,1.9,6.06,4.39,8.08
	c2.14,1.73,4.82,2.68,7.56,2.68l0.45,0l0.46,0l11.16-0.05l0.15-0.01c3.2-0.34,6.07-1.9,8.08-4.39
	C34.34,17.08,35.27,13.95,34.93,10.76z M29.99,17.69c-1.49,1.85-3.62,3.01-6,3.29l-3.57,0.01c0.49-0.43,0.96-0.9,1.38-1.41
	c2.03-2.5,2.96-5.63,2.61-8.82c-0.09-0.82-0.83-1.41-1.65-1.33c-0.82,0.09-1.42,0.83-1.33,1.65c0.26,2.39-0.44,4.74-1.96,6.61
	c-1.72,2.12-4.27,3.34-7.01,3.34l0,0l-0.45,0c-2.08,0-4.04-0.7-5.67-2.01c-1.87-1.52-3.04-3.67-3.3-6.06
	C2.8,10.56,3.49,8.21,5.01,6.34c1.49-1.85,3.62-3.02,6-3.29l3.57-0.02c-0.49,0.43-0.96,0.9-1.38,1.41c-2.03,2.5-2.96,5.63-2.61,8.82
	c0.08,0.77,0.73,1.34,1.49,1.34c0.05,0,0.11,0,0.16-0.01c0.82-0.09,1.42-0.83,1.33-1.65c-0.26-2.39,0.44-4.74,1.96-6.61
	C17.25,4.22,19.8,3,22.53,3c0,0,0,0,0,0h0l0.45,0c0,0,0,0,0,0c2.08,0,4.04,0.7,5.67,2.01c1.87,1.52,3.04,3.67,3.3,6.06
	C32.2,13.46,31.51,15.81,29.99,17.69z"/>
                                    </svg>
                                    {/* <div className="flex justify-center p-normal text-xl font-sm rounded-full t-sColor">{l('login.0.login')}</div> */}
                                </div>
                            </div>


                            <div className="pt-8"></div>
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div className='flex'>
                                    <div className="p-sm text-xs pb-1">{l('login.0.email')} {l('common.0.or')} {l('login.0.mobile')}</div>
                                </div>
                                <div className="flex">
                                    <div className="pointer-events-none absolute l-0 mx-3 h-[36px] flex justify-items-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-sColor-5">
                                            <rect className="fill-transparent" width="16" height="16" />
                                            <g>
                                                <path d="M1105.23,595.89h-9.5a3.25,3.25,0,0,0-3.25,3.25v5a3.26,3.26,0,0,0,3.25,3.25h9.5a3.25,3.25,0,0,0,3.25-3.25v-5A3.24,3.24,0,0,0,1105.23,595.89Zm1.75,8.25a1.75,1.75,0,0,1-1.75,1.75h-9.5a1.76,1.76,0,0,1-1.75-1.75v-5a1.75,1.75,0,0,1,1.75-1.75h9.5a1.75,1.75,0,0,1,1.75,1.75Z" transform="translate(-1092.48 -593.64)" />
                                                <path d="M1103.63,599.11l-2.15,1.93a1.76,1.76,0,0,1-1.92.06l-2.22-2a.76.76,0,0,0-1.06.06.75.75,0,0,0,.06,1.06l2.3,2a3.2,3.2,0,0,0,1.82.56,3.46,3.46,0,0,0,1.94-.62l2.23-2a.75.75,0,1,0-1-1.12Z" transform="translate(-1092.48 -593.64)" />
                                            </g>
                                        </svg>


                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={`${l('login.0.input.0.email')}`}
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="ltr:pl-10 rtl:pr-10 w-full p-normal text-sm t-ph p-2 px-2 border rounded-xl b-sColor-1 transition delay-50 hover-sw-1 focus-inset-i-15"
                                        required
                                    />
                                </div>
                                <div className="py-2"></div>
                                <div className='flex'>
                                    <p className="text-xs p-sm pb-1">{l('login.0.password')}</p>
                                </div>
                                <div className="flex">
                                    <div className="pointer-events-none absolute mx-3 h-[36px] flex justify-items-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-sColor-5">
                                            <g>
                                                <rect className="fill-transparent" width="16" height="16" />
                                                <path d="M1095.26,577.38h-5.55a3.25,3.25,0,0,0-3.25,3.25v4a3.25,3.25,0,0,0,3.25,3.25h5.55a3.26,3.26,0,0,0,3.25-3.25v-4A3.26,3.26,0,0,0,1095.26,577.38Zm1.75,7.3a1.76,1.76,0,0,1-1.75,1.75h-5.55a1.75,1.75,0,0,1-1.75-1.75v-4a1.75,1.75,0,0,1,1.75-1.75h5.55a1.76,1.76,0,0,1,1.75,1.75Z" transform="translate(-1084.48 -571.93)" />
                                                <path d="M1089.29,576.62a.75.75,0,0,0,.75-.75,2.45,2.45,0,0,1,4.89,0,.75.75,0,1,0,1.5,0,3.95,3.95,0,0,0-7.89,0A.75.75,0,0,0,1089.29,576.62Z" transform="translate(-1084.48 -571.93)" />
                                            </g>
                                        </svg>

                                    </div>
                                    <input
                                        type={passwordType}
                                        name="email"
                                        placeholder={`${l('login.0.input.0.password')}`}
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="p-normal w-full text-sm t-ph p-2 px-10 border rounded-xl b-sColor-1 transition delay-50 hover-sw-1 focus-inset-i-15"
                                        required
                                    />
                                    <div className="pointer-events-none absolute flex items-center ltr:right-1 rtl:left-1 h-[36px] w-[32px] flex justify-center items-center">
                                        <div className="relative w-full flex">
                                            <button type="button" onClick={toggleTypePassword} ref={setButtonRef("b2")} className=" pointer-events-auto w-[28px] min-w-[28px] hover-b-sColor-1 h-[28px] flex justify-center rounded-[10px] items-center cursor-pointer overflow-hidden">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-sColor">
                                                    <rect className="fill-transparent" width="16" height="16" />
                                                    {passwordType === 'password' ? (
                                                        <g>
                                                            <path d="M8,1.43C3.59,1.43,0,4.38,0,8s3.59,6.57,8,6.57s8-2.95,8-6.57S12.41,1.43,8,1.43z M8,13.07c-3.58,0-6.5-2.28-6.5-5.07
		S4.42,2.93,8,2.93S14.5,5.2,14.5,8S11.58,13.07,8,13.07z"/>
                                                            <path d="M8,4.49C6.07,4.49,4.49,6.07,4.49,8S6.06,11.5,8,11.5c1.93,0,3.5-1.57,3.5-3.5S9.93,4.49,8,4.49z M8,10.01
		c-1.11,0-2.01-0.9-2.01-2C5.99,6.9,6.89,6,8,6c1.11,0,2,0.9,2,2.01C10,9.11,9.11,10.01,8,10.01z"/>
                                                        </g>
                                                    ) : (
                                                        <path d="M8,11.66c-4.41,0-8-2.95-8-6.57c0-0.41,0.34-0.75,0.75-0.75S1.5,4.67,1.5,5.09c0,2.8,2.92,5.07,6.5,5.07s6.5-2.28,6.5-5.07
	c0-0.41,0.34-0.75,0.75-0.75S16,4.67,16,5.09C16,8.71,12.41,11.66,8,11.66z"/>
                                                    )}

                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex items-center ml-1 p-sm text-[12px] t-mColor cursor-pointer">
                                        {l('login.0.forget')}
                                    </div>
                                </div>
                                <div className="py-1"></div>
                                <div className="relative">
                                    <button
                                        ref={setButtonRef("b1")}
                                        type="submit"
                                        className="flex justify-center w-full b-sColor hover-b-sColor focus-b-sColor disabled-b-sColor p-md transition delay-50 tracking-wide cursor-pointer text-white py-[10px] min-h-[38px] rounded-xl text-sm" disabled={false ? true : false}>

                                        {false ? (
                                            <div className="loader">
                                                <div className="square" id="sq1"></div>
                                                <div className="square" id="sq2"></div>
                                                <div className="square" id="sq3"></div>
                                                <div className="square" id="sq4"></div>
                                                <div className="square" id="sq5"></div>
                                                <div className="square" id="sq6"></div>
                                                <div className="square" id="sq7"></div>
                                                <div className="square" id="sq8"></div>
                                                <div className="square" id="sq9"></div>
                                            </div>
                                        ) : l('login.0.login')}
                                        <div className="light"></div>
                                    </button>
                                </div>
                            </form>
                            <div className="pt-5"></div>
                            <div className="flex text-[13px] p-normal t-sColor-5">
                                {l('login.0.a_account')}
                                <div className="flex items-center ltr:ml-1 rtl:mr-1 p-sm t-mColor cursor-pointer">
                                    {l('login.0.b_account')}
                                </div>
                            </div>
                            {/* <div className="pt-10"></div>
                            <div className="t-sColor text-xs p-md">© {new Date().getFullYear()} {l('app.0.company')} {l('app.0.inc')}</div> */}
                        </div >
                    </div>
                </div>
                {/* <div className="flex w-full h-dvh relative">

                    <div className="w-[calc(100%-10px)] b-sColor-05 relative m-2 rounded-xl">
                        <span className="loader"></span>
                    </div>
                </div> */}
            </div >
        </>
    )
}

export default Login

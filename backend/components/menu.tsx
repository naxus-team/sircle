// components/Menu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useDB } from '../context/DBContext';
import { EncryptionProvider, useEncryption } from "../context/EncryptionContext";
import { useLangs } from '../context/LanguageContext';
import { useAuth } from "../context/AuthContext";
import { useSearch } from './../context/SearchContext';
import { usePopup } from './../context/PopupContext';



interface Item {
    id?: number;
    name: string;
}

interface MenuProps {
    variant?: "default" | "user" | "class" | "dms" | "search" | "alt";
}

const Menu: React.FC<MenuProps> = ({ variant = "default" }) => {

    //DB
    const { add, getAll, remove } = useDB();
    const [items, setItems] = useState<Item[]>([]);
    const storeName = "myItems"; // اسم الجدول
    //

    const { show } = usePopup();



    const dropMenuAccount = useRef<HTMLDivElement>(null);
    const btndropMenuAccount = useRef<HTMLButtonElement>(null);

    const dropMenuUser = useRef<HTMLDivElement>(null);
    const btndropMenuUser = useRef<HTMLButtonElement>(null);

    const activity = useRef<HTMLDivElement>(null);
    const btnactivity = useRef<HTMLButtonElement>(null);

    const [showActivity, setShowActivity] = useState<boolean>(false);
    const [showDropMenuAccount, setShowDropMenuAccount] = useState<boolean>(false);

    const [showDropMenuUser, setShowDropMenuUser] = useState<boolean>(false);


    const [inputValue, setInputValue] = useState<string>(''); // تحديد نوع inputValue
    const { query, search, results, loading, error } = useSearch();
    const navigate = useNavigate();
    const { l } = useLangs();
    const { user, logout } = useAuth();
    const targetInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {

        //DB

        loadItems();

        // دالة التعامل مع ضغطة Enter
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // منع السلوك الافتراضي
                if (targetInputRef.current) {
                    targetInputRef.current.focus(); // نقل التركيز إلى حقل البحث
                    console.log('تم التركيز على حقل البحث');
                    search(inputValue); // استدعاء دالة البحث

                }
            }
        };
        // إضافة مستمع الحدث على المستند
        document.addEventListener('keydown', handleKeyDown);

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropMenuAccount.current &&
                !dropMenuAccount.current.contains(event.target as Node) &&
                btndropMenuAccount.current &&
                !btndropMenuAccount.current.contains(event.target as Node)
            ) {
                setShowDropMenuAccount(false);
            }

            if (
                activity.current &&
                !activity.current.contains(event.target as Node) &&
                btnactivity.current &&
                !btnactivity.current.contains(event.target as Node)
            ) {
                setShowActivity(false);
            }

            if (
                dropMenuUser.current &&
                !dropMenuUser.current.contains(event.target as Node) &&
                btndropMenuUser.current &&
                !btndropMenuUser.current.contains(event.target as Node)
            ) {
                setShowDropMenuUser(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // تنظيف المستمع عند تفكيك المكون
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);

        };
    }, []); // مصفوفة اعتماد فارغة لتشغيل useEffect مرة واحدة فقط


    //DB
    const loadItems = async () => {
        const data = await getAll<Item>(storeName);
        setItems(data);
    };

    const handleAdd = async () => {
        await add<Item>(storeName, { name: "عنصر جديد" });
        loadItems();
    };

    const handleDelete = async (id: number) => {
        await remove(storeName, id);
        loadItems();
    };

    //


    return (
        <>
            <div className="flex flex-col text-2xl justify-between min-w-[60px] h-auto py-3 pt-0">
                <div className="flex flex-col items-center space-y-2">
                    <div className=' rounded-xl w-[24px] relative flex items-center justify-center group'>
                        <button onClick={() => navigate(`/c/5488682787883861`)} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden ${variant === 'class' ? 'duration-50 bg-sColor/20 dark:bg-xColor/20' : 'hover:bg-sColor08 hover:dark:bg-xColor/10'}`} tabIndex={-1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={16.27} viewBox="0 0 24 16.27" className="transition duration-150 stroke-sColor stroke-2-round fill-transparent">
                                <rect className="fill-transparent stroke-transparent" width="24" height="16.27" />

                                <g>
                                    <g>
                                        <path className={`transition ${variant === 'class' ? 'fill-xColor dark:fill-sColor' : 'transparent'} duration-150`} d="M8.59,15.26h0.31l7.56-0.03c1.81-0.2,3.56-1.07,4.8-2.6c2.47-3.06,2-7.54-1.06-10.02
			c-1.32-1.06-2.91-1.59-4.49-1.59h-0.31h-0.31L7.54,1.05c-1.82,0.19-3.56,1.07-4.8,2.6c-2.47,3.06-2,7.54,1.06,10.02
			c1.32,1.06,2.91,1.59,4.49,1.59L8.59,15.26z" />
                                    </g>
                                    <path className={`transition duration-150 fill-transparent `} d="M15.41,1.01c-2.07,0-4.13,0.91-5.54,2.64C8.63,5.18,8.12,7.07,8.32,8.88" />
                                    <path className={`transition duration-150 fill-transparent `} d="M8.59,15.26c2.07,0,4.13-0.91,5.54-2.64c1.24-1.53,1.75-3.42,1.55-5.24" />
                                </g>
                            </svg>


                        </button>
                        <div className="pointer-events-none z-[9999999] space-x-1 rtl:space-x-reverse  flex items-center absolute ltr:left-[50px] rtl:right-[50px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                            <div className='text-xColor p-md text-xs'>{l('app.0.name')}</div>
                        </div>
                        {false && (
                            <div className='
                        absolute ltr:left-16 ltr:top-0
                        z-[999999] w-[320px] h-auto rounded-xl shadow-xl bg-white
                        overflow-hidden
                        
                        '
                                style={{ boxShadow: " 0 0 0 1px rgba(2,0,3,.08), 0 10px 25px -5px rgba(2, 0, 3, 0.08), 0 8px 10px -6px rgba(2, 0, 3, 0.08)" }}>
                                <div>
                                    <div className='flex items-center px-4 h-[48px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={19.157} height={16} viewBox="0 0 19.157 16" className="min-w-[24px] stroke-sColor fill-transparent stroke-15-round">
                                            <g>
                                                <rect className="fill-transparent stroke-transparent" width="19.157" height="16" />
                                                <g>
                                                    <path d="M12,9H4C2.34,9,1,7.66,1,6V4c0-1.66,1.34-3,3-3h8c1.66,0,3,1.34,3,3v2C15,7.66,13.66,9,12,9z" />
                                                    <line x1="6" y1="15" x2="10" y2="15" />
                                                    <line x1="4" y1="12" x2="12" y2="12" />
                                                </g>

                                            </g>
                                        </svg>
                                        <span className='text-base p-md t-sColor'>{l('classes.0.classes')}</span>
                                        <div className='w-full'></div>
                                        <div className='flex space-x-2 rtl:space-x-reverse'>
                                            <Link to={'/settings/notifi'} className='flex items-center justify-center min-w-[32px] h-[32px] hover:bg-sColor08 hover:dark:bg-xColor08 transition duration-100 rounded-lg'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor-7 fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M8.67,14.99c0.77-0.05,1.43-0.56,1.68-1.29c0.19-0.62,0.83-0.99,1.46-0.84c0.76,0.14,1.53-0.18,1.95-0.81
		c0.24-0.34,0.45-0.71,0.63-1.09c0.34-0.69,0.24-1.53-0.27-2.11c-0.44-0.48-0.44-1.21,0-1.68c0.51-0.59,0.62-1.43,0.27-2.11
		C14.21,4.66,14,4.3,13.76,3.95c-0.43-0.64-1.2-0.95-1.95-0.81C11.5,3.21,11.19,3.16,10.91,3c-0.28-0.15-0.49-0.4-0.59-0.71
		C10.07,1.57,9.4,1.06,8.63,1H7.36C6.59,1.05,5.92,1.56,5.67,2.3C5.48,2.92,4.84,3.28,4.21,3.14C3.45,2.99,2.69,3.31,2.26,3.95
		C2.01,4.3,1.79,4.68,1.61,5.07C1.27,5.76,1.37,6.59,1.88,7.17c0.44,0.48,0.44,1.21,0,1.68c-0.51,0.59-0.61,1.42-0.27,2.11
		c0.18,0.38,0.39,0.75,0.63,1.09c0.43,0.64,1.2,0.95,1.95,0.81c0.31-0.09,0.64-0.05,0.92,0.11c0.28,0.15,0.49,0.41,0.59,0.71
		c0.25,0.73,0.92,1.23,1.68,1.29c0.21,0,0.42,0,0.64,0C8.23,15,8.45,15,8.67,14.99z"/>
                                                        <circle cx="7.99" cy="7.99" r="2.34" />
                                                    </g>
                                                </svg>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                                <div className='h-[calc(100%-88px)] w-full p-4 overflow-auto'>
                                    <Link to={'/c/5488682787883861'} className='flex items-center w-full h-[60px] space-x-4 rtl:space-x-reverse px-2
                                    rounded-xl
                                    hover:bg-sColor08 hover:dark:bg-xColor/10
                                    '>
                                        <div className='flex items-center'>
                                            <img className='min-w-[38px] h-[38px] rounded-full' src='/1.jpg' />
                                        </div>
                                        <div>
                                            <div className='text-sm p-md space-y-2'>
                                                <div>
                                                    مستر/أحمد خضر
                                                </div>
                                                <div className='flex space-x-2 rtl:space-x-reverse'>
                                                    <div className='flex space-x-[-4px] rtl:space-x-reverse'>
                                                        <img className='min-w-[18px] h-[18px] rounded-full shadow-[0_0_0_2px_rgba(255,255,255,1)]' src='/default.jpg' />
                                                        <img className='min-w-[18px] h-[18px] rounded-full shadow-[0_0_0_2px_rgba(255,255,255,1)]' src='/2.jpg' />
                                                        <img className='min-w-[18px] h-[18px] rounded-full shadow-[0_0_0_2px_rgba(255,255,255,1)]' src='/default.png' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>



                    {/* <div className="flex justify-center items-center h-[48px]">
                        <div className="flex w-[232px]">
                            <div className="pointer-events-none absolute mx-2.5 h-[32px] flex justify-items-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-2-round">
                                    <g>
                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                        <circle cx="6.25" cy="6.25" r="5.25" />
                                        <line x1="9.96" y1="9.96" x2="15" y2="15" />
                                    </g>
                                </svg>

                            </div>
                            <input

                                className="relative px-8 p-normal text-sm t-ph p-2 border rounded-lg sw-inset-15 h-sw-inset-15 transition delay-50 f-sw-inset-15 w-full h-[32px]"
                                placeholder={`${l('search.0.input.0.search')}`}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                ref={targetInputRef}
                            ></input>
                            <div className="pointer-events-none absolute ltr:ml-[calc(232px-28px)] rtl:mr-[calc(232px-28px)] w-[16px] h-[32px] flex justify-center items-center">
                                <div className="flex items-center justify-center relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor stroke-15-round fill-transparent">
                                        <g>
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <polyline points="13.27,3.87 13.27,9.13 2.73,9.13 " />
                                            <polyline points="5.73,6.13 2.73,9.13 5.73,12.13 " />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {true &&
                        (
                            <div className="p-4">
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                {results.length > 0 && (
                                    <ul className="mt-4 space-y-2">
                                        {results.map((result, index) => (
                                            <li key={index} className="border p-2 rounded">
                                                {result.title || result.name || 'نتيجة بدون عنوان'}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {!loading && results.length === 0 && query && !error && (
                                    <p className="mt-2">لا توجد نتائج مطابقة.</p>
                                )}
                            </div>
                        )
                    } */}

                    {/* <div className='rounded-full relative flex items-center justify-center group'>

                        <button onClick={() => navigate("/search/")} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden ${variant === 'search' ? 'duration-50 bg-sColor/20 dark:bg-xColor/20' : 'hover:bg-sColor08 hover:dark:bg-xColor/10'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className={`stroke-15-round stroke-sColor ${variant === 'search' ? 'fill-sColor' : 'fill-transparent'}`}>
                                <g>
                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                    <circle cx="6.25" cy="6.25" r="5.25" />
                                    <line x1="9.96" y1="9.96" x2="15" y2="15" />
                                </g>
                            </svg>
                        </button>
                        <div className="pointer-events-none z-[9999999] flex items-center absolute ltr:left-[58px] rtl:right-[58px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                            {l('common.0.search')}
                        </div>
                    </div> */}

                    <div className='rounded-full relative flex items-center justify-center group'>
                        <button onClick={() => navigate("/")} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden ${variant === 'alt' ? 'duration-50 bg-sColor/20 dark:bg-xColor/20' : 'hover:bg-sColor08 hover:dark:bg-xColor/10'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className={`stroke-15-round ${variant === 'alt' ? 'fill-sColor stroke-sColor' : 'fill-transparent'}`}>
                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                <g>
                                    <path className={`${variant === 'alt' ? 'stroke-sColor dark:stroke-xColor fill-sColor dark:fill:xColor' : 'stroke-sColor'}`} d="M11.43,15H4.57c-1.23,0-2.28-0.91-2.46-2.13L1.36,7.63C1.26,6.81,1.55,6,2.16,5.44l4.17-3.8c0.95-0.86,2.39-0.86,3.33,0
		l4.17,3.8c0.61,0.55,0.9,1.37,0.79,2.18l-0.75,5.24C13.71,14.09,12.66,15,11.43,15z"/>
                                    <path className={`${variant === 'alt' ? 'stroke-xColor dark:stroke-sColor fill-transparent' : 'fill-transparent stroke-sColor'}`} d="M6.14,12.52c0-1.37,0.49-2.48,1.86-2.48l0,0c1.37,0,1.86,1.11,1.86,2.48" />
                                </g>

                            </svg>
                            {/* <div className="pointer-events-none absolute flex ltr:left-0 rtl:right-0 retreat transition delay-400 duration-50 opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="stroke-sColor stroke-2-round fill-transparent">
                                <rect className="delay-none duration-50 fill-transparent stroke-transparent" width="24" height="24" />
                                <g>
                                    <polyline points="17.11,3 18.75,7.5 14.25,9.14 " />
                                    <path d="M18.75,18.68C17.32,20.12,15.34,21,13.16,21c-4.37,0-7.91-3.54-7.91-7.91s3.54-7.91,7.91-7.91
c2.18,0,4.16,0.88,5.59,2.32"/>
                                </g>
                            </svg>
                        </div> */}

                        </button>
                        <div className="pointer-events-none z-[9999999] flex items-center absolute ltr:left-[58px] rtl:right-[58px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                            {l('common.0.home')}
                        </div>
                    </div>
                    <div className='rounded-full relative flex items-center justify-center group'>
                        <button onClick={() => navigate("/dms/")} className={`relative flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer ${variant === 'dms' ? 'duration-50 bg-sColor/20 dark:bg-xColor/20' : 'hover:bg-sColor08 hover:dark:bg-xColor/10'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className={`${variant === "dms" ? 'fill-sColor dark:fill-xColor' : 'fill-transparent'} stroke-sColor stroke-[1.5px]`}>
                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                <path d="M1.03,7c-0.14,1.04,0.26,2.52,0.61,3.55c0.34,1.03,0.35,2.15-0.06,3.15c0,0.01-0.01,0.02-0.01,0.02
	c-0.17,0.41,0.24,0.81,0.65,0.65c0.01,0,0.02-0.01,0.02-0.01c1-0.41,2.12-0.4,3.15-0.06c1.03,0.35,2.51,0.74,3.55,0.61
	c4.28-0.56,7.43-5.16,5.48-9.71c-0.7-1.64-2.03-2.97-3.67-3.67C6.19-0.43,1.59,2.71,1.03,7z"/>
                                <g>
                                    <circle className={`${variant === "dms" ? 'fill-xColor dark:fill-sColor' : 'fill-sColor dark:fill-xColor'} stroke-transparent`} cx="8" cy="8" r="1.1" />
                                    <circle className={`${variant === "dms" ? 'fill-xColor dark:fill-sColor' : 'fill-sColor dark:fill-xColor'} stroke-transparent`} cx="11.19" cy="8" r="1.1" />
                                    <circle className={`${variant === "dms" ? 'fill-xColor dark:fill-sColor' : 'fill-sColor dark:fill-xColor'} stroke-transparent`} cx="4.81" cy="8" r="1.1" />
                                </g>
                            </svg>
                        </button>
                        <div className="pointer-events-none z-[9999999] flex items-center absolute ltr:left-[58px] rtl:right-[58px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                            {l('common.0.dms')}
                        </div>
                        {/* {variant !== 'dms' && (
                                <div className='w-[10px] h-[10px] rounded-full bg-mColor text-xColor text-xs p-sm flex justify-center absolute items-center ltr:left-0 rtl:right-0 bottom-0'></div>
                            )} */}

                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='w-[24px] h-[2px] rounded-full bg-sColor08 dark:bg-xColor08'></div>

                    </div>
                    {variant === 'class' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className={`rounded-full relative flex items-center justify-center ${!showDropMenuUser && 'group'}`}>
                            <button ref={btndropMenuUser} onClick={() => setShowDropMenuUser(!showDropMenuUser && true)} className={`relative flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer bg-sColor08 dark:bg-xColor08 hover:bg-sColor/20 dark:hover:bg-xColor/20`}>
                                <div className={`relative after:absolute after:top-0 after:left-0 after:w-full after:rounded-xl after:h-full after:shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)] dark:after:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] after:content-[''] `}>
                                    <img className="pointer-events-none rounded-xl w-[38px] h-[38px] transition delay-50" src={`/logo96.jpg`} />
                                </div>
                                <div className="pointer-events-none z-[9999999] space-x-1 flex items-center absolute  ltr:left-[58px] rtl:right-[58px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                                    <span className='text-xColor p-md text-xs'>Harvard University</span>
                                </div>
                            </button>

                            {showDropMenuUser && (
                                <motion.div
                                    ref={dropMenuUser}
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.1, ease: "easeOut" }}
                                    className={`
                        absolute ltr:left-14 rtl:right-14 bottom-[-%50]
                        z-[999999] w-[256px] h-auto h-auto rounded-xl shadow-xl p-1
                        bg-xColor/70 dark:bg-sColor/70 backdrop-blur-xl
                        overflow-hidden
                        
                        
                        `}
                                    style={{ boxShadow: " 0 0 4px 1px rgba(2,0,3,.1),  0 8px 8px -2px rgba(2, 0, 3, 0.1)" }}>
                                    <div>
                                        {/* <button onClick={() => { navigate(`/${user.username}`); setShowDropMenuAccount(false); }} className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                                <div className='mx-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>
                                                            <path d="M8,1c1.97,0,3.57,1.6,3.57,3.57S9.97,8.14,8,8.14s-3.57-1.6-3.57-3.57S6.03,1,8,1z M8,10.82c2.76,0,5,0.94,5,2.09
	S10.76,15,8,15s-5-0.94-5-2.09S5.24,10.82,8,10.82z"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <span className='text-sm p-normal text-sColor'>{l('common.0.view_profile')}</span>
                                            </button> */}
                                        {/* <div className='min-w-full h-[1px] bg-sColor08 my-1'></div> */}
                                        <button onClick={() => logout()} className='space-x-2 rtl:space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-msColor/20'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-msColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>

                                                        <path d="M6,8h9 M12.5,10.5L15,8l-2.5-2.5 M9,11.05c0,1.15-0.78,2.15-1.89,2.43l-3,0.75C2.53,14.62,1,13.42,1,11.8V4.2
		c0-1.63,1.53-2.82,3.11-2.43l3,0.75C8.22,2.8,9,3.8,9,4.95"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-msColor'>
                                                {l('common.0.leaving')}
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}


                    {variant === 'user' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            className={`rounded-full relative flex items-center justify-center ${!showDropMenuUser && 'group'}`}>
                            <button ref={btndropMenuUser} onClick={() => setShowDropMenuUser(!showDropMenuUser && true)} className={`relative flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer bg-sColor08 dark:hover:bg-xColor/20`}>
                                <div className='relative'>
                                    <img className="pointer-events-none rounded-full w-[28px] h-[28px] transition delay-50" src={`/${user.image}.jpg`} />
                                </div>
                                <div className="pointer-events-none z-[9999999] space-x-1 flex items-center absolute  ltr:left-[58px] rtl:right-[58px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                                    {user.username && (
                                        <span className='text-xColor p-md text-xs'>({l('common.0.you_male')})</span>
                                    )}
                                    <span className='text-xColor p-md text-xs'>
                                        @{user.username}</span>
                                </div>
                            </button>
                            <div className='pointer-events-none status offline ltr:right-1 rtl:left-1 bottom-1'></div>

                            {showDropMenuUser && (
                                <motion.div
                                    ref={dropMenuUser}
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.1, ease: "easeOut" }}
                                    className={`
                        absolute ltr:left-14 rtl:right-14 bottom-[-%50]
                        z-[999999] w-[256px] h-auto h-auto rounded-xl shadow-xl p-1
                        bg-xColor/70 dark:bg-sColor/70 backdrop-blur-xl
                        overflow-hidden
                        
                        
                        `}
                                    style={{ boxShadow: " 0 0 4px 1px rgba(2,0,3,.1),  0 8px 8px -2px rgba(2, 0, 3, 0.1)" }}>
                                    <div>
                                        {/* <button onClick={() => { navigate(`/${user.username}`); setShowDropMenuAccount(false); }} className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                                <div className='mx-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>
                                                            <path d="M8,1c1.97,0,3.57,1.6,3.57,3.57S9.97,8.14,8,8.14s-3.57-1.6-3.57-3.57S6.03,1,8,1z M8,10.82c2.76,0,5,0.94,5,2.09
	S10.76,15,8,15s-5-0.94-5-2.09S5.24,10.82,8,10.82z"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <span className='text-sm p-normal text-sColor'>{l('common.0.view_profile')}</span>
                                            </button> */}
                                        {/* <div className='min-w-full h-[1px] bg-sColor08 my-1'></div> */}
                                        <button onClick={() => logout()} className='space-x-2 rtl:space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-msColor/20'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-msColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>

                                                        <path d="M6,8h9 M12.5,10.5L15,8l-2.5-2.5 M9,11.05c0,1.15-0.78,2.15-1.89,2.43l-3,0.75C2.53,14.62,1,13.42,1,11.8V4.2
		c0-1.63,1.53-2.82,3.11-2.43l3,0.75C8.22,2.8,9,3.8,9,4.95"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-msColor'>إبلاغ عن @{user.username}</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}



                </div>
                <div className='flex flex-col items-center space-y-2'>
                    {/* 
                    <button onClick={() => navigate("/")} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden ${variant === 'alt' ? 'duration-50 hover-retreat' : 'h-stroke-sColor-3'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="stroke-sColor-3 stroke-2-round">
                            <rect className="fill-transparent stroke-transparent" width="24" height="24" />
                            <g>
                                <path className="fill-white" d="M13.03,23c1.21-0.08,2.25-0.88,2.64-2.02c0.3-0.97,1.3-1.55,2.29-1.32c1.19,0.22,2.4-0.28,3.07-1.28
  c0.38-0.54,0.71-1.12,0.99-1.72c0.54-1.09,0.38-2.4-0.42-3.32c-0.69-0.75-0.69-1.9,0-2.64c0.8-0.93,0.97-2.24,0.43-3.32
  c-0.28-0.61-0.61-1.19-0.99-1.74c-0.68-1-1.89-1.5-3.07-1.27c-0.48,0.11-0.98,0.03-1.41-0.21c-0.44-0.23-0.77-0.63-0.92-1.11
  c-0.4-1.15-1.45-1.95-2.66-2.04h-2C9.76,1.09,8.71,1.89,8.32,3.05c-0.3,0.97-1.3,1.55-2.29,1.32c-1.19-0.23-2.4,0.27-3.07,1.27
  C2.57,6.2,2.23,6.79,1.94,7.4C1.4,8.49,1.57,9.79,2.36,10.71c0.69,0.75,0.69,1.9,0,2.64c-0.8,0.92-0.96,2.23-0.42,3.32
  c0.28,0.6,0.61,1.18,0.99,1.72c0.68,1,1.89,1.5,3.07,1.28c0.49-0.14,1.01-0.08,1.45,0.18c0.44,0.24,0.77,0.64,0.92,1.11
  c0.4,1.14,1.44,1.94,2.64,2.02c0.33,0,0.66,0,1,0C12.35,23.02,12.69,23.02,13.03,23z"/>
                                <circle cx="11.97" cy="12" r="3.68" className="stroke-sColor stroke-2-round fill-white" />

                            </g>
                        </svg>
                    </button> */}
                    {/* 
                    <div className="relative  min-w-[2px] min-h-[16px] rounded-full b-sColor-1 mx-2"></div>


                    <div className='flex justify-center'>

                        <button onClick={() => navigate("/")} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden h-stroke-sColor-7`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="fill-transparent stroke-sColor-7 stroke-2-round">
                                <rect className="fill-transparent stroke-transparent" width="24" height="24" />
                                <g>
                                    <line x1="7" y1="17" x2="17" y2="17" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className='flex justify-center'>

                        <button onClick={() => navigate("/")} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden h-stroke-sColor-7`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="fill-transparent stroke-sColor-7 stroke-2-round">
                                <rect className="fill-transparent stroke-transparent" width="24" height="24" />
                                <g>
                                    <polyline points="12.01,7 17,7 17,11.99 " />
                                    <polyline points="11.99,17 7,17 7,12.01 " />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div className='flex justify-center'>

                        <button onClick={() => navigate("/")} className={`flex items-center justify-center transition duration-100 rounded-xl min-w-[38px] h-[38px] cursor-pointer overflow-hidden h-stroke-sColor-7`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="fill-transparent stroke-sColor-7 stroke-2-round">
                                <rect className="fill-transparent stroke-transparent" width="24" height="24" />
                                <g>
                                    <polyline points="17,17 12,12 17,7 " />
                                    <polyline points="7,7 12,12 7,17 " />
                                </g>
                            </svg>
                        </button>
                    </div> */}

                    <div className={`rounded-full relative min-w-[32px] min-h-[32px] flex justify-center ${!showDropMenuAccount && 'group'}`}>
                        <button ref={btndropMenuAccount} onClick={() => setShowDropMenuAccount(!showDropMenuAccount && true)} className={`relative flex items-center h-[28px] w-[28px] justify-center transition delay-50 rounded-full cursor-pointer after:absolute after:w-full after:h-full  after:block after:bg-transparent after:transition after:durection-50 hover:after:bg-sColor1 after:rounded-full`}>
                            <div className='relative'>
                                <img className="pointer-events-none rounded-full w-[28px] h-[28px] transition delay-50" src={`/${user.image}.jpg`} />
                            </div>
                            <div className="pointer-events-none z-[9999999] space-x-1 rtl:space-x-reverse  flex items-center absolute  ltr:left-[58px] rtl:right-[58px] transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                                <span className='text-xColor p-normal text-xs'>{l('common.0.account')}</span> <span className='text-xColor p-md text-xs'>@{user.username}</span>
                            </div>
                        </button>
                        <div className='status online ltr:right-0 rtl:left-0 bottom-0'></div>
                        {showDropMenuAccount && (
                            <motion.div
                                ref={dropMenuAccount}
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.1, ease: "easeOut" }}
                                className={`
                        absolute  ltr:left-[58px] rtl:right-[58px] bottom-0
                        z-[999999] w-[256px] h-auto h-auto rounded-xl
                        bg-xColor/70 dark:bg-sColor/70 backdrop-blur-xl
                       
                        
                        
                        `}
                                style={{ boxShadow: " 0 0 4px 1px rgba(2,0,3,.1),  0 8px 8px -2px rgba(2, 0, 3, 0.1)" }}>
                                <div>

                                    {/* <button onClick={() => { navigate(`/${user.username}`); setShowDropMenuAccount(false); }} className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                        <div className='mx-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                <g>
                                                    <path d="M8,1c1.97,0,3.57,1.6,3.57,3.57S9.97,8.14,8,8.14s-3.57-1.6-3.57-3.57S6.03,1,8,1z M8,10.82c2.76,0,5,0.94,5,2.09
	S10.76,15,8,15s-5-0.94-5-2.09S5.24,10.82,8,10.82z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <span className='text-sm p-normal text-sColor'>{l('common.0.view_profile')}</span>
                                    </button>
                                    <div className='min-w-full h-[1px] bg-sColor08 my-1'></div> */}
                                    <div className='p-1'>
                                        <button className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                            <div className='mx-1'>
                                                <div className='rounded-full w-[10px] h-[10px] bg-[green] mx-[3px]'></div>
                                            </div>
                                            <span className='text-sm p-normal text-sColor dark:text-xColor'>{l('common.0.status')}</span>
                                            <div className='w-full'></div>
                                            <div className='flex items-center px-2 rounded-lg bg-[green]/20 text-[green] text-xs p-sm h-[20px] whitespace-nowrap'>{l('status.0.online_male')}</div>
                                        </button>
                                    </div>
                                    <div className='min-w-full h-[1px] bg-sColor08 dark:bg-xColor08'></div>
                                    <div className='flex items-center space-x-1 rtl:space-x-reverse p-1'>
                                        <div className={`rounded-full relative flex justify-center w-full items-center justify-center ${!showActivity && 'group'}`}>
                                            <button className={`relative flex items-center justify-center rounded-lg w-full h-[38px] cursor-pointer hover:bg-sColor08 hover:dark:bg-xColor/10`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-transparent stroke-sColor stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M1.21,10.33C1.07,9.78,1,9.21,1,8.63c0-3.87,3.13-7,7-7s7,3.13,7,7c0,0.59-0.07,1.16-0.21,1.7 M11.92,14.3
	L11.92,14.3c0.93,0.27,1.9-0.27,2.16-1.2l0.64-2.24c0.27-0.93-0.27-1.9-1.2-2.16l0,0c-0.93-0.27-1.9,0.27-2.16,1.2l-0.64,2.24
	C10.45,13.07,10.99,14.04,11.92,14.3z M5.28,12.14L4.64,9.9C4.37,8.97,3.41,8.43,2.48,8.7l0,0c-0.93,0.27-1.47,1.23-1.2,2.16
	l0.64,2.24c0.27,0.93,1.23,1.47,2.16,1.2l0,0C5.01,14.04,5.55,13.07,5.28,12.14z"/>
                                                    </g>
                                                </svg>

                                            </button>
                                            <div className="pointer-events-none z-[9999999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-[1px] ltr:group-hover:translate-x-[-1px]">
                                                {l('controls.0.off_sound')}
                                            </div>
                                        </div>
                                        <div className='min-w-[2px] h-[32px] bg-sColor08 dark:bg-xColor08'></div>
                                        <div className={`rounded-full relative flex justify-center w-full items-center justify-center ${!showActivity && 'group'}`}>
                                            <button className={`relative flex items-center justify-center rounded-lg min-w-full h-[38px] cursor-pointer hover:bg-sColor08 hover:dark:bg-xColor/10`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-transparent stroke-sColor stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M10.5,6.5v-3C10.5,2.12,9.38,1,8,1h0C6.62,1,5.5,2.12,5.5,3.5v3C5.5,7.88,6.62,9,8,9h0
	C9.38,9,10.5,7.88,10.5,6.5z"/>
                                                        <path d="M13.26,6.85c0,2.9-2.35,5.26-5.26,5.26h0c-2.9,0-5.26-2.35-5.26-5.26 M8,12.1V15" />
                                                    </g>
                                                </svg>

                                            </button>
                                            <div className="pointer-events-none z-[9999999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-[1px] ltr:group-hover:translate-x-[-1px]">
                                                {l('controls.0.off_mic')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <button className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                        <div className='mx-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                <g>
                                                    <path d="M8.47,14.04l3.26-7.41L15,14.04 M9.41,11.91h4.63 M1,3.93h8.12 M4.45,1.96v1.97 M2.54,11.55
	c-0.09,0,5.64-2.45,5.64-7.61 M2.81,7.74c0,0,0.46,1.63,2.87,3.33"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <span className='text-sm p-normal text-sColor'>{l('common.0.lang')}</span>
                                        <div className='w-full'></div>
                                        <div className='flex items-center px-2 rounded-lg text-sColor bg-sColor08 text-xs p-sm h-[20px]'>{l('langs.0.ar')}</div>
                                    </button> */}

                                    <div className='min-w-full h-[1px] bg-sColor08'></div>
                                    <div className='flex items-center space-x-1 rtl:space-x-reverse p-1'>
                                        <div className={`rounded-full relative flex justify-center w-full items-center justify-center ${!showActivity && 'group'}`}>
                                            <button className={`relative flex items-center justify-center rounded-lg w-full h-[38px] cursor-pointer hover:bg-sColor08 hover:dark:bg-xColor/10`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-transparent stroke-sColor stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M11.35,8.01c0,1.84-1.49,3.34-3.34,3.34S4.67,9.85,4.67,8.01s1.49-3.34,3.34-3.34S11.35,6.16,11.35,8.01z
	 M8.01,1v1.31 M3.06,3.05l0.87,0.87 M1.01,8l1.31,0 M3.93,12.08l-0.87,0.87 M8,15l0-1.31 M12.95,12.95l-0.87-0.87 M14.99,8.01
	l-1.31,0 M12.94,3.06l-0.87,0.87"/>
                                                    </g>
                                                </svg>

                                            </button>
                                            <div className="pointer-events-none z-[9999999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-[1px] ltr:group-hover:translate-x-[-1px]">
                                                {l('controls.0.lightmode')}
                                            </div>
                                        </div>
                                        <div className={`rounded-full relative flex justify-center w-full items-center justify-center ${!showActivity && 'group'}`}>
                                            <button className={`relative flex items-center justify-center rounded-lg min-w-full h-[38px] cursor-pointer hover:bg-sColor08 hover:dark:bg-xColor/10`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-transparent stroke-sColor stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M12.08,10.92H3.92C2.31,10.92,1,9.61,1,8V4.5c0-1.61,1.31-2.92,2.92-2.92h8.17C13.69,1.58,15,2.89,15,4.5V8
	C15,9.61,13.69,10.92,12.08,10.92z M8,10.92v3.5 M10.33,14.42H5.67"/>
                                                    </g>
                                                </svg>

                                            </button>
                                            <div className="pointer-events-none z-[9999999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-[1px] ltr:group-hover:translate-x-[-1px]">
                                                {l('common.0.default')}
                                            </div>
                                        </div>
                                        <div className={`rounded-full relative flex justify-center w-full items-center justify-center ${!showActivity && 'group'}`}>
                                            <button className={`relative flex items-center justify-center rounded-lg min-w-full h-[38px] cursor-pointer hover:bg-sColor08 hover:dark:bg-xColor/10`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-transparent stroke-sColor stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M11.13,10.62c-3.18,0-5.76-2.58-5.76-5.76c0-0.84,0.19-1.64,0.51-2.37c-2,0.9-3.39,2.91-3.39,5.24
	c0,3.18,2.58,5.76,5.76,5.76c2.33,0,4.34-1.39,5.24-3.39C12.78,10.44,11.98,10.62,11.13,10.62z"/>
                                                    </g>
                                                </svg>

                                            </button>
                                            <div className="pointer-events-none z-[9999999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-[1px] ltr:group-hover:translate-x-[-1px]">
                                                {l('controls.0.darkmode')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='min-w-full h-[1px] bg-sColor08 dark:bg-xColor08'></div>
                                    <div className='p-1'>
                                        <button className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M12,13.5H4c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2h8c1.1,0,2,0.9,2,2v7C14,12.6,13.1,13.5,12,13.5z M4.99,6.21
	h0.01 M7.99,6.21h0.01 M10.99,6.21h0.01 M4.99,8.21h0.01 M7.99,8.21h0.01 M10.99,8.21h0.01 M5.76,11.02h4.5"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-sColor dark:text-xColor dark:text-xColor dark:text-xColor'>{l('common.0.key_shortcuts')}</span>
                                        </button>
                                        <button className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M8.67,14.99c0.77-0.05,1.43-0.56,1.68-1.29c0.19-0.62,0.83-0.99,1.46-0.84c0.76,0.14,1.53-0.18,1.95-0.81
		c0.24-0.34,0.45-0.71,0.63-1.09c0.34-0.69,0.24-1.53-0.27-2.11c-0.44-0.48-0.44-1.21,0-1.68c0.51-0.59,0.62-1.43,0.27-2.11
		C14.21,4.66,14,4.3,13.76,3.95c-0.43-0.64-1.2-0.95-1.95-0.81C11.5,3.21,11.19,3.16,10.91,3c-0.28-0.15-0.49-0.4-0.59-0.71
		C10.07,1.57,9.4,1.06,8.63,1H7.36C6.59,1.05,5.92,1.56,5.67,2.3C5.48,2.92,4.84,3.28,4.21,3.14C3.45,2.99,2.69,3.31,2.26,3.95
		C2.01,4.3,1.79,4.68,1.61,5.07C1.27,5.76,1.37,6.59,1.88,7.17c0.44,0.48,0.44,1.21,0,1.68c-0.51,0.59-0.61,1.42-0.27,2.11
		c0.18,0.38,0.39,0.75,0.63,1.09c0.43,0.64,1.2,0.95,1.95,0.81c0.31-0.09,0.64-0.05,0.92,0.11c0.28,0.15,0.49,0.41,0.59,0.71
		c0.25,0.73,0.92,1.23,1.68,1.29c0.21,0,0.42,0,0.64,0C8.23,15,8.45,15,8.67,14.99z"/>
                                                        <circle cx="7.99" cy="7.99" r="2.34" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-sColor dark:text-xColor'>{l('common.0.settings')}</span>
                                        </button>
                                    </div>
                                    <div className='min-w-full h-[1px] bg-sColor08 dark:bg-xColor08'></div>
                                    <div className='p-1'>
                                        <button className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M6,6.33c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2v0.94 M8,11.67L8,11.67 M8,1C4.13,1,1,4.13,1,8s3.13,7,7,7
	s7-3.13,7-7S11.87,1,8,1z"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-sColor dark:text-xColor'>{l('common.0.help')}</span>
                                        </button>
                                        <button className='space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M8,3.93v3.62 M8,9.69L8,9.69 M10.51,12.52h1.08c1.2,0,2.17-0.97,2.17-2.17V3.17c0-1.2-0.97-2.17-2.17-2.17H4.41
	c-1.2,0-2.17,0.97-2.17,2.17v7.17c0,1.2,0.97,2.17,2.17,2.17h1.08c0.47,0,0.91,0.23,1.18,0.61L8,15l1.33-1.87
	C9.6,12.74,10.04,12.52,10.51,12.52z"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-sColor dark:text-xColor'>{l('common.0.send_feedback')}</span>
                                        </button>
                                    </div>
                                    <div className='min-w-full h-[1px] bg-sColor08 dark:bg-xColor08'></div>
                                    <div className='p-1'>
                                        <button
                                            onClick={() => {
                                                setShowDropMenuAccount(false);
                                                show({
                                                    type: 'logout',
                                                    title: 'Logout',
                                                    message: 'Do you really want to logout?',
                                                    onConfirm: () => logout(),
                                                });
                                            }}
                                            className='space-x-2 rtl:space-x-2 rtl:space-x-reverse px-2 w-full flex items-center h-[32px] rounded-lg text-sm p-md text-sColor/70 dark:text-xColor/70 hover:bg-msColor/20'>
                                            <div className='mx-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-msColor fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>

                                                        <path d="M6,8h9 M12.5,10.5L15,8l-2.5-2.5 M9,11.05c0,1.15-0.78,2.15-1.89,2.43l-3,0.75C2.53,14.62,1,13.42,1,11.8V4.2
		c0-1.63,1.53-2.82,3.11-2.43l3,0.75C8.22,2.8,9,3.8,9,4.95"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className='text-sm p-normal text-msColor'>{l('common.0.logout')}</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* <button onClick={logout} className="flex items-center justify-center hover-sw-inset-1 h-fill-sColor-3 transition delay-50  w-full h-[38px] rounded-xl cursor-pointer overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="fill-sColor-6">
            <rect className="fill-transparent" width="24" height="24" />
            <g>
              <circle cx="11.97" cy="12.02" r="4.01" />
              <path d="M55.34,365.87a3.28,3.28,0,0,0-2.2-2.88,2.12,2.12,0,0,1-1.44-2.5,3.32,3.32,0,0,0-1.4-3.35,12.43,12.43,0,0,0-1.87-1.08,3.29,3.29,0,0,0-3.62.46,2.12,2.12,0,0,1-2.88,0,3.3,3.3,0,0,0-3.61-.46,12.63,12.63,0,0,0-1.89,1.08,3.3,3.3,0,0,0-1.38,3.35,2.21,2.21,0,0,1-.23,1.53,2.07,2.07,0,0,1-1.21,1,3.33,3.33,0,0,0-2.22,2.9v2.18A3.3,3.3,0,0,0,33.61,371a2.13,2.13,0,0,1,1.44,2.5,3.29,3.29,0,0,0,1.38,3.35,12.27,12.27,0,0,0,1.92,1.11,3.3,3.3,0,0,0,3.61-.46,2.12,2.12,0,0,1,2.88,0,3.29,3.29,0,0,0,3.62.46,11.63,11.63,0,0,0,1.87-1.08,3.32,3.32,0,0,0,1.4-3.35,2,2,0,0,1,.2-1.58,2.11,2.11,0,0,1,1.21-1,3.28,3.28,0,0,0,2.2-2.88c0-.36,0-.72,0-1.09A7.88,7.88,0,0,0,55.34,365.87Zm-12,7.66A6.51,6.51,0,1,1,49.88,367,6.53,6.53,0,0,1,43.37,373.53Z" transform="translate(-31.39 -355)" className="fill-sColor-3" />
            </g>
          </svg>
        </button> */}

            </div >
            {/* <div className="h-screen min-w-[1px] b-sColor-08"></div> */}

        </>
    );
};

export default Menu;
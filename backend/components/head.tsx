// components/Menu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLangs } from '../context/LanguageContext';



const Head: React.FC = () => {
    const { l } = useLangs();
    const activity = useRef<HTMLDivElement>(null);
    const btnactivity = useRef<HTMLButtonElement>(null);

    const [showActivity, setShowActivity] = useState<boolean>(false);

    useEffect(() => {


        const handleClickOutside = (event: MouseEvent) => {
            if (
                activity.current &&
                !activity.current.contains(event.target as Node) &&
                btnactivity.current &&
                !btnactivity.current.contains(event.target as Node)
            ) {
                setShowActivity(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        // تنظيف المستمع عند تفكيك المكون
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

        };
    }, []); // مصفوفة اعتماد فارغة لتشغيل useEffect مرة واحدة فقط


    return (
        <>
            <div className="flex items-center justify-center w-full h-[38px] bg-xColor dark:bg-[rgba(44,44,44)]">
                <div className="relative flex items-center">
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse transition duration-100 bg-sColor04 dark:bg-xColor04 hover:bg-sColor08 dark:hover:bg-xColor08 text-xs p-lt w-[228px] h-[26px] rounded-lg shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,.1)] focus:shadow-[inset_0_0_0_2px_rgba(10,106,255,1)]">
                        <span>{l('common.0.search')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 16 16" className={`stroke-15-round stroke-sColor fill-transparent`}>
                            <g>
                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                <circle cx="6.25" cy="6.25" r="5.25" />
                                <line x1="9.96" y1="9.96" x2="15" y2="15" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className='flex items-center space-x-1 rtl:space-x-reverse absolute ltr:right-4 rtl:left-4'>
                    <div className={`rounded-full relative flex items-center justify-center ${!showActivity && 'group'}`}>
                        <button className={`relative flex items-center justify-center transition duration-100 rounded-lg min-w-[28px] h-[28px] cursor-pointer hover:bg-sColor08 dark:hover:bg-xColor08`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="fill-transparent stroke-sColor/70 dark:stroke-xColor/70 stroke-15-round">
                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                <g>
                                    <path d="M6,6.33c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2v0.94 M8,11.67L8,11.67 M8,1C4.13,1,1,4.13,1,8s3.13,7,7,7
	s7-3.13,7-7S11.87,1,8,1z"/>
                                </g>

                            </svg>

                        </button>
                        <div className="pointer-events-none z-[9999999] flex items-center absolute top-[48px] transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                            {l('common.0.help')}
                        </div>
                    </div>
                    <div className={`rounded-full relative flex items-center justify-center ${!showActivity && 'group'}`}>
                        <button ref={btnactivity} onClick={() => setShowActivity(!showActivity ? true : false)} className={`relative flex items-center justify-center transition duration-100 rounded-lg min-w-[28px] h-[28px] cursor-pointer hover:bg-sColor08 dark:hover:bg-xColor08`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="fill-transparent stroke-sColor/70 dark:stroke-xColor/70 stroke-15-round">
                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                <g>
                                    <path d="M8,12.09H4.33c-1.25,0-2.2-1.12-1.99-2.35l0.42-1.39C3.11,7.2,3.35,6.01,3.58,4.83C4.01,2.63,5.63,1,8,1l0,0l0,0
		c2.37,0,3.99,1.63,4.42,3.83c0.24,1.18,0.46,2.37,0.81,3.53l0.42,1.39c0.2,1.23-0.74,2.35-1.99,2.35H8L8,12.09z"/>
                                    <path d="M6.3,14.29c0.94,0.94,2.46,0.94,3.4,0" />
                                </g>

                            </svg>

                        </button>
                        <div className="pointer-events-none z-[9999999] flex items-center absolute top-[48px] ltr:right-0 rtl:left-0 transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 group-hover:scale-100 rtl:group-hover:translate-x-1 ltr:group-hover:translate-x-[-1px]">
                            {l('common.0.activity')}
                        </div>
                        {showActivity && (
                            <motion.div
                                ref={activity}
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.1, ease: "easeOut" }}
                                className='
                        absolute top-[38px] ltr:right-0 rtl:left-0 top-0
                        z-[999999] w-[480px] h-[526px] rounded-xl shadow-xl bg-white
                       
                        
                        '
                                style={{ boxShadow: " 0 0 4px 1px rgba(2,0,3,.1),  0 8px 8px -2px rgba(2, 0, 3, 0.1)" }}>
                                <div>
                                    <div className='flex items-center px-2 h-[48px]'>

                                        <span className='text-base p-md t-sColor mx-2'>{l('common.0.activity')}</span>
                                        <div className='w-full'></div>
                                    </div>
                                    <div className='flex items-center h-[38px]'>

                                        <div className='flex items-center relative h-[38px]'>
                                            <button className='flex justify-center items-center text-sm p-normal text-sColor px-8 h-[24px] pointer-events-none'>
                                                {l('common.0.all')}
                                            </button>
                                            <span className='absolute bottom-[-2px] w-full h-[2px] bg-sColor rounded-full'></span>
                                        </div>
                                        <div className='flex items-center relative h-[38px] group cursor-pointer'>

                                            <button className='flex justify-center items-center text-sColor/70 text-sm p-normal px-4 h-[24px] group-hover:text-sColor'>
                                                {l('common.0.unreads')}
                                            </button>
                                            <span className='absolute bottom-[-2px] w-full h-[2px] rounded-full group-hover:bg-sColor/10'></span>

                                        </div>
                                        <div className='flex items-center relative h-[38px] group cursor-pointer'>

                                            <button className='flex justify-center items-center text-sColor/70 text-sm p-normal px-4 h-[24px] group-hover:text-sColor'>
                                                {l('common.0.mentions')}
                                            </button>
                                            <span className='absolute bottom-[-2px] w-full h-[2px] rounded-full group-hover:bg-sColor/10'></span>

                                        </div>

                                    </div>
                                </div>
                                <div className='w-full min-h-[2px] bg-sColor08'></div>
                                <div className='h-[calc(100%-88px)] w-full p-4 overflow-auto'>
                                    <div className='flex w-full h-[72px] space-x-4 rtl:space-x-reverse
                                    rounded-lg
                                    '>
                                        <div>
                                            <img className='min-w-[38px] h-[38px] rounded-full' src='/default.jpg' />
                                        </div>
                                        <div>
                                            <div className='space-y-2'>
                                                <div className='text-sm space-x-1 rtl:space-x-reverse'><span className='p-lt text-sColor/70'>{l('autoreply.0.welcome')}</span><span className='p-normal text-sColor'><Link to={'/abalkhodari'} className='hover:underline'>@abalkhodari</Link></span><span className='p-lt text-sColor/70'>{l('autoreply.0.act1')}</span></div>
                                                <div className='flex items-center text-xs space-x-1 rtl:space-x-reverse'>

                                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" className="stroke-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="12" height="12" />
                                                        <g>
                                                            <path className="stroke-sColor-5 fill-transparent" d="M11,6c0,2.76-2.24,5-5,5S1,8.76,1,6s2.24-5,5-5S11,3.24,11,6z M6,6V4.24 M6,6h1.76" />

                                                        </g>
                                                    </svg>
                                                    <span className='p-md t-sColor-5'>
                                                        17 days ago</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Head;
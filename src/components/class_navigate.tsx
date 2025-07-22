// components/Menu.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClass } from '../context/ClassContext';
import { useLangs } from '../context/LanguageContext';



const Navigate = () => {
    const { l } = useLangs();
    const { classData } = useClass();


    return (
        <div className='flex rounded-xl h-full'>
            <div className='relative space-y-1 ltr:pr-[1px] rtl:pl-[1px]'>
                <div>
                    <div className="flex items-center relative min-w-[300px] h-[38px] space-x-2 rtl:space-x-reverse px-4 ltr:rounded-tl-xl rtl:rounded-tr-xl bg-sColor04 dark:bg-xColor04">
                        <div className='flex justify-center'>
                            <div className='text-base p-normal light:text-sColor dark:text-xColor text-nowrap'>{classData?.class_name}</div>
                        </div>
                        {/* <div className='flex items-center justify-center'>
                                <div className='relative flex items-center justify-center text-xs p-normal light:text-sColor dark:text-xColor light:bg-sColor dark:bg-xColor/10 rounded-lg px-3 h-[24px] space-x-1 rtl:space-x-reverse'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" className="min-w-[12px] stroke-sColor fill-transparent stroke-1-round">
                                        <g>
                                            <rect className="fill-transparent stroke-transparent" width="12" height="12" />
                                            <g>
                                                <path d="M8.06,11H3.94c-0.81,0-1.47-0.66-1.47-1.47V6.59c0-0.81,0.66-1.47,1.47-1.47h4.12c0.81,0,1.47,0.66,1.47,1.47
v2.94C9.53,10.34,8.87,11,8.06,11z"/>
                                                <path d="M8.06,5.12H3.94V3.06C3.94,1.92,4.86,1,6,1h0c1.14,0,2.06,0.92,2.06,2.06V5.12z" />
                                            </g>

                                        </g>
                                    </svg>
                                    <span>{l('common.0.closed')}</span>
                                </div>
                            </div> */}
                        <div className='w-full'></div>
                        <div className='flex items-center justify-center space-x-2 rtl:space-x-reverse'>


                            <div className='flex justify-center relative rounded-full group'>
                                <button className='flex items-center justify-center w-[16px] h-[32px] rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-transparent fill-sColor">
                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                        <g>

                                            <path d="M9.5,8c0,0.83-0.67,1.5-1.5,1.5S6.5,8.83,6.5,8S7.17,6.5,8,6.5S9.5,7.17,9.5,8z M9.5,13.5C9.5,14.33,8.83,15,8,15
	s-1.5-0.67-1.5-1.5S7.17,12,8,12S9.5,12.67,9.5,13.5z M9.5,2.5C9.5,3.33,8.83,4,8,4S6.5,3.33,6.5,2.5S7.17,1,8,1S9.5,1.67,9.5,2.5z"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <div className="pointer-events-none z-[9999] flex items-center absolute top-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-1 group-hover:scale-100 group-hover:translate-y-0">
                                    {l('common.0.options')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[calc(100%)] h-[1px] bg-sColor/10 dark:bg-xColor/10'></div>
                </div>
                <div>
                    <div className="relative min-w-[300px]">

                        <div className='py-2 px-3 rtl:space-x-reverse space-y-3 w-full'>
                            <div className='flex'>
                                <div className="flex items-center t-sColor-7 text-xs px-2 space-x-2 rtl:space-x-reverse group cursor-pointer">
                                    <span className='p-md text-sColor/70 dark:text-xColor/70 group-hover:text-sColor dark:group-hover:text-xColor dark:text-xColor'>{l('common.0.general')}</span>
                                    <div className="pointer-events-none flex justify-center items-center rtl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 10 10" className="stroke-sColor/70 dark:stroke-xColor/70 group-hover:stroke-sColor dark:group-hover:stroke-xColor fill-transparent stroke-[1px] ">
                                            <g>
                                                <rect className="fill-transparent stroke-transparent" width="10" height="10" />
                                                <g>
                                                    <polyline points="9.17,2.92 5,7.08 0.83,2.92 " />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <div className='flex items-center'>
                                    <button className='flex items-center w-full h-[32px] rounded-lg bg-sColor/15 dark:bg-xColor/15 px-3 space-x-2 rtl:space-x-reverse'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className={`fill-transparent stroke-sColor/70 dark:stroke-xColor/70 stroke-[1.5px]`}>
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <path d="M12.08,1L9.75,15 M3.92,15L6.25,1 M1,5.08h14 M15,10.92H1" />
                                        </svg>
                                        <span className='text-sm p-normal light:text-sColor dark:text-xColor'>{l('common.0.discussion')}</span>
                                    </button>
                                </div>
                                <div className='flex items-center'>
                                    <button className='flex items-center w-full h-[32px] rounded-lg hover:bg-sColor08 hover:dark:bg-xColor/10 px-3 space-x-2 rtl:space-x-reverse'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="fill-transparent stroke-sColor/70 dark:stroke-xColor/70 stroke-15-round">
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <g>
                                                <path d="M3.52,11.39H3c-1.1,0-2-0.9-2-2V6.61c0-1.1,0.9-2,2-2h0.52c0.55,0,1.08-0.23,1.46-0.63l1.03-1.09
	c1.24-1.32,3.46-0.44,3.46,1.37v7.47c0,1.81-2.21,2.69-3.46,1.37l-1.03-1.09C4.6,11.61,4.07,11.39,3.52,11.39z M13.14,12.49
	c2.48-2.48,2.48-6.5,0-8.98 M11.86,9.5c0.57-0.92,0.57-2.09,0-3"/>
                                            </g>
                                        </svg>
                                        <span className='text-sm p-normal light:text-sColor dark:text-xColor'>{l('common.0.voice_chat')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='py-2 px-3 rtl:space-x-reverse space-y-3 w-full'>
                            <div className='flex'>
                                <div className="flex items-center t-sColor-7 text-xs px-2 space-x-2 rtl:space-x-reverse group cursor-pointer">
                                    <span className='p-md text-sColor/70 dark:text-xColor/70 group-hover:text-sColor dark:group-hover:text-xColor dark:text-xColor'>{l('common.0.peoples')}</span>
                                    <div className="pointer-events-none flex justify-center items-center rtl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 10 10" className="stroke-sColor/70 dark:stroke-xColor/70 group-hover:stroke-sColor dark:group-hover:stroke-xColor fill-transparent stroke-[1px] ">
                                            <g>
                                                <rect className="fill-transparent stroke-transparent" width="10" height="10" />
                                                <g>
                                                    <polyline points="9.17,2.92 5,7.08 0.83,2.92 " />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <div className='flex items-center group'>
                                    <div className='flex items-center w-full h-[32px] px-3 space-x-2 rtl:space-x-reverse'>
                                        <img className='min-w-[24px] h-[24px] rounded-full' src='/default.jpg' />
                                        <span className='text-sm p-normal light:text-sColor dark:text-xColor'>
                                            @seiffekry
                                        </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-[2px]">
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <g>
                                                <circle cx="8" cy="8" r="6" />
                                            </g>
                                        </svg>
                                        <div className='flex absolute ltr:right-4 rtl:left-4 rounded-full hidden group-hover:block'>
                                            <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-transparent fill-sColor">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>

                                                        <path d="M9.5,8c0,0.83-0.67,1.5-1.5,1.5S6.5,8.83,6.5,8S7.17,6.5,8,6.5S9.5,7.17,9.5,8z M9.5,13.5C9.5,14.33,8.83,15,8,15
	s-1.5-0.67-1.5-1.5S7.17,12,8,12S9.5,12.67,9.5,13.5z M9.5,2.5C9.5,3.33,8.83,4,8,4S6.5,3.33,6.5,2.5S7.17,1,8,1S9.5,1.67,9.5,2.5z"
                                                        />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center group'>
                                    <div className='flex items-center w-full h-[38px] px-3 space-x-2 rtl:space-x-reverse'>
                                        <img className='min-w-[24px] h-[24px] rounded-full' src='/default2.jpg' />
                                        <span className='text-sm p-normal light:text-sColor dark:text-xColor'>@abalkhodari</span>
                                    </div>
                                    <div className='flex absolute ltr:right-4 rtl:left-4 rounded-full hidden group-hover:block'>
                                        <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 hover:dark:bg-xColor/10'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-transparent fill-sColor">
                                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                <g>

                                                    <path d="M9.5,8c0,0.83-0.67,1.5-1.5,1.5S6.5,8.83,6.5,8S7.17,6.5,8,6.5S9.5,7.17,9.5,8z M9.5,13.5C9.5,14.33,8.83,15,8,15
	s-1.5-0.67-1.5-1.5S7.17,12,8,12S9.5,12.67,9.5,13.5z M9.5,2.5C9.5,3.33,8.83,4,8,4S6.5,3.33,6.5,2.5S7.17,1,8,1S9.5,1.67,9.5,2.5z"
                                                    />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='flex justify-center absolute ltr:right-[-1px] rtl:left-[-1px] top-0 bottom-0 min-w-[1px]'>
                        <div className='absolute w-[3px] h-full cursor-e-resize group'>
                            <div className="w-[1px] h-full bg-sColor/10 dark:bg-xColor/10 transition-all duration-100 delay-150 group-hover:w-[3px] group-hover:bg-mColor ltr:group-hover:translate-x-[-1px] rtl:group-hover:translate-x-[1px]"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigate;
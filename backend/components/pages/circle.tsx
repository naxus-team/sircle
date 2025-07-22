// components/Menu.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClass } from '../../context/ClassContext';
import { useLangs } from '../../context/LanguageContext';
import { useDate } from '../../context/DateContext';

import Navigate_Class from "../class_navigate";
import * as shiki from 'shiki';  // Import everything from Shiki




const Circle = () => {
    const { l } = useLangs();
    const { classData } = useClass();
    const { formatRelativeDate } = useDate();
    const [html, setHtml] = useState('');

    const content = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const code = `#include <iostream> // إستدعاء مكتبة
    int main() { // الدالة
    std:cout << "Hello World" << std:endl; // عنصر المكتبة
    return false; // سيناريو النهاية
}`;
        const lang = 'cpp';
        const theme = 'github-light';  // The theme you want to use

        // Use createHighlighter with the correct options
        shiki.createHighlighter({
            langs: ['cpp'],  // Ensure TypeScript is loaded
            themes: [theme],   // Correct usage of 'themes' instead of 'theme'
        }).then((highlighter) => {
            const result = highlighter.codeToHtml(code, {
                lang: lang,
                theme: theme,  // This part can stay as 'theme'
            });

            const lines = result.split('\n');
            const linesWithNumbers = lines.map((line, index) => {
                return `<span class="line-number">${index + 1}</span> | ${line}`;
            }).join('\n');

            setHtml(result); // Store the highlighted HTML
        });
    }, []);

    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // إنشاء الاتصال الآمن عبر WebSocket
        const ws = new WebSocket('wss://192.168.1.100:3000');

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            // إضافة الرسالة القادمة إلى القائمة
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        setSocket(ws);

        // تنظيف عند إغلاق المكون
        return () => {
            ws.close();
        };
    }, []);

    const handleSendMessage = () => {
        if (socket && message.trim() !== '') {
            socket.send(message);
            setMessage(''); // مسح المدخل بعد الإرسال
        }
    };

    return (
        <>
            <Navigate_Class />
            <div className="w-full h-full flex flex-col">
                {/* منطقة المحتوى */}
                <div className='relative flex items-center min-h-[38px] px-4 w-full'>
                    <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className={`fill-transparent stroke-sColor/70 dark:stroke-xColor/70 stroke-[1.5px]`}>
                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                            <path d="M12.08,1L9.75,15 M3.92,15L6.25,1 M1,5.08h14 M15,10.92H1" />
                        </svg>
                        <span className='text-sm p-normal light:text-sColor dark:text-xColor'>{l('common.0.discussion')}</span>
                    </div>
                </div>
                <div className='w-full min-h-[1px] bg-sColor/10 dark:bg-xColor/10'></div>
                <div className='h-full flex flex-col overflow-auto'>
                    <div className="flex-1 overflow-y-auto px-2 
                    scrollbar-thin scroll-smooth flex flex-col-reverse
dark:[color-scheme:dark]
  " ref={content}>




                        <div className="flex space-x-3 rtl:space-x-reverse p-2 rounded-lg group">
                            <div>
                                <img className="min-w-[32px] h-[32px] rounded-full" src="/default.jpg" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                    <span className="text-sm p-normal text-sColor dark:text-xColor">@seiffekry</span>
                                </div>
                                <div className='flex items-center space-x-1 rtl:space-x-reverse'>
                                    <span className='text-xs p-normal text-sColor/70 dark:text-xColor/70'>{l('common.0.mention_to')}</span><span className='flex items-center px-2 py-1 shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] text-xs p-normal rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08 '>@abalkhodari</span>
                                </div>
                                <div className="select-text text-sm p-lt text-sColor dark:text-xColor space-y-2">
                                    <span>دي رسالة ترحيبية من C++</span>
                                    <div className="flex space-x-2 rtl:space-x-reverse items-center start-0 select-text p-4 overflow-auto text-xs rounded-xl shadow-[0_0_0_1px_rgba(2,0,3,.1)]">
                                        <div className='flex'>
                                            <div className='w-[24px] select-none'>
                                                <div className="flex justify-center text-sColor/70 line-number pb-[.5px]">1</div>
                                                <div className="flex justify-center text-sColor/70 line-number pb-[.5px]">2</div>
                                                <div className="flex justify-center text-sColor/70 line-number pb-[.5px]">3</div>
                                                <div className="flex justify-center text-sColor/70 line-number pb-[.5px]">4</div>
                                                <div className="flex justify-center text-sColor/70 line-number pb-[.5px]">5</div>

                                            </div>
                                        </div>
                                        <div dir="ltr" dangerouslySetInnerHTML={{ __html: html }} />

                                    </div>
                                </div>

                                <div className='flex space-x-1 rtl:space-x-reverse'>
                                    <div className='flex relative rounded-full group'>
                                        <button className='flex items-center space-x-1 rtl:space-x-reverse justify-center px-2 h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08 shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)]'>
                                            <span className='text-sm text-sColor dark:text-xColor p-normal'>👍</span>
                                        </button>
                                    </div>
                                    <div className='hidden group-hover:block'>
                                        <div className='flex items-center space-x-1 rtl:space-x-reverse'>

                                            <div className='flex relative rounded-full group'>
                                                <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>

                                                            <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="5.49" cy="5.88" r="1.52" />
                                                            <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="10.51" cy="5.88" r="1.52" />
                                                            <path d="M15,8c0,3.87-3.13,7-7,7s-7-3.13-7-7s3.13-7,7-7S15,4.13,15,8z M6.52,10.15c0,0.82,0.66,1.48,1.48,1.48
        s1.48-0.66,1.48-1.48"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className='flex relative rounded-full group'>
                                                <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>
                                                            <path d="M11.6,14c-1.35,0.81-2.99,1.18-4.73,0.91c-2.96-0.46-5.35-2.88-5.79-5.84C0.27,3.62,5.76-0.87,11.37,1.79
        c2.27,1.08,3.63,3.48,3.63,6v0.09c0,1.19-0.74,2.29-1.88,2.57C11.47,10.83,10,9.59,10,8.01c0,1.38-1.12,2.5-2.5,2.5S5,9.39,5,8.01
        s1.12-2.5,2.5-2.5S10,6.63,10,8.01V5.69"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                            <span className="text-xs p-normal text-sColor/70 dark:text-xColor/70">{formatRelativeDate('2025-03-17 00:04:16')}</span>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>



                        <div className="flex space-x-3 rtl:space-x-reverse p-2 rounded-lg group">
                            <div>
                                <img className="min-w-[32px] h-[32px] rounded-full" src="/default.jpg" />
                                <div className='flex justify-center h-full py-1'>
                                    <div className='w-[2px] h-[calc(100%-16px)] rounded-full bg-sColor/10 dark:bg-xColor/10'></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                    <span className="text-sm p-normal text-sColor dark:text-xColor">@seiffekry</span>


                                </div>
                                <div className='flex items-center space-x-1 rtl:space-x-reverse'>
                                    <span className='text-xs p-normal text-sColor/70 dark:text-xColor/70'>{l('common.0.mention_to')}</span><span className='flex items-center px-2 py-1 shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] text-xs p-normal rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08 '>@abalkhodari</span>
                                </div>
                                <div className="select-text text-sm p-lt text-sColor dark:text-xColor space-y-2">
                                    <span>ده نيوتن</span>
                                    <div className="relative after:absolute after:top-0 after:left-0 after:w-full after:rounded-lg after:h-full after:shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)] dark:after:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] after:content-['*']">
                                        <img className='rounded-lg max-h-[256px]' src='/inst.jpg' />
                                    </div>
                                </div>

                                <div className='flex space-x-1 rtl:space-x-reverse'>
                                    <div className='flex relative rounded-full group'>
                                        <button className='flex items-center space-x-1 rtl:space-x-reverse justify-center px-2 h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08 shadow-[inset_0_0_0_1px_rgba(2,0,3,.1)]'>
                                            <span className='text-sm text-sColor dark:text-xColor p-normal'>👍</span>
                                        </button>
                                    </div>
                                    <div className='hidden group-hover:block'>
                                        <div className='flex items-center space-x-1 rtl:space-x-reverse'>

                                            <div className='flex relative rounded-full group'>
                                                <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>

                                                            <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="5.49" cy="5.88" r="1.52" />
                                                            <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="10.51" cy="5.88" r="1.52" />
                                                            <path d="M15,8c0,3.87-3.13,7-7,7s-7-3.13-7-7s3.13-7,7-7S15,4.13,15,8z M6.52,10.15c0,0.82,0.66,1.48,1.48,1.48
        s1.48-0.66,1.48-1.48"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className='flex relative rounded-full group'>
                                                <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>
                                                            <path d="M11.6,14c-1.35,0.81-2.99,1.18-4.73,0.91c-2.96-0.46-5.35-2.88-5.79-5.84C0.27,3.62,5.76-0.87,11.37,1.79
        c2.27,1.08,3.63,3.48,3.63,6v0.09c0,1.19-0.74,2.29-1.88,2.57C11.47,10.83,10,9.59,10,8.01c0,1.38-1.12,2.5-2.5,2.5S5,9.39,5,8.01
        s1.12-2.5,2.5-2.5S10,6.63,10,8.01V5.69"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="flex space-x-3 rtl:space-x-reverse p-2 rounded-lg group">
                            <div>
                                <img className="min-w-[24px] h-[24px] rounded-full" src="/default2.jpg" />
                            </div>
                            <div>
                                <div className="space-x-2 rtl:space-x-reverse flex items-center min-h-[24px]">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                        <span className="text-sm p-normal text-sColor dark:text-xColor">@abalkhodari</span>
                                        <span className='text-sm p-lt text-sColor/70 dark:text-xColor/70'>{l('circle.0.mg2')}</span>
                                    </div>
                                    <div className='hidden group-hover:block'>

                                        <div className='flex space-x-1 rtl:space-x-reverse'>
                                            <div className='flex relative rounded-full group'>
                                                <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>

                                                            <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="5.49" cy="5.88" r="1.52" />
                                                            <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="10.51" cy="5.88" r="1.52" />
                                                            <path d="M15,8c0,3.87-3.13,7-7,7s-7-3.13-7-7s3.13-7,7-7S15,4.13,15,8z M6.52,10.15c0,0.82,0.66,1.48,1.48,1.48
        s1.48-0.66,1.48-1.48"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className='flex relative rounded-full group'>
                                                <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                        <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                        <g>
                                                            <path d="M11.6,14c-1.35,0.81-2.99,1.18-4.73,0.91c-2.96-0.46-5.35-2.88-5.79-5.84C0.27,3.62,5.76-0.87,11.37,1.79
        c2.27,1.08,3.63,3.48,3.63,6v0.09c0,1.19-0.74,2.29-1.88,2.57C11.47,10.83,10,9.59,10,8.01c0,1.38-1.12,2.5-2.5,2.5S5,9.39,5,8.01
        s1.12-2.5,2.5-2.5S10,6.63,10,8.01V5.69"/>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="flex space-x-3 rtl:space-x-reverse p-2 rounded-lg group">
                            <div>
                                <img className="min-w-[24px] h-[24px] rounded-full" src="/default.jpg" />
                            </div>
                            <div className="space-x-2 rtl:space-x-reverse flex items-center min-h-[24px]">
                                <div className="flex items-center">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                        <span className="text-sm p-normal text-sColor dark:text-xColor">@seiffekry</span>
                                        <span className='text-sm p-lt text-sColor/70 dark:text-xColor/70'>{l('circle.0.mg1')}</span>
                                    </div>
                                </div>

                                <div className='hidden group-hover:block'>

                                    <div className='flex space-x-1 rtl:space-x-reverse'>
                                        <div className='flex relative rounded-full group'>
                                            <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>

                                                        <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="5.49" cy="5.88" r="1.52" />
                                                        <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="10.51" cy="5.88" r="1.52" />
                                                        <path d="M15,8c0,3.87-3.13,7-7,7s-7-3.13-7-7s3.13-7,7-7S15,4.13,15,8z M6.52,10.15c0,0.82,0.66,1.48,1.48,1.48
        s1.48-0.66,1.48-1.48"/>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className='flex relative rounded-full group'>
                                            <button className='flex items-center justify-center w-[24px] h-[24px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor08'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                                    <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                    <g>
                                                        <path d="M11.6,14c-1.35,0.81-2.99,1.18-4.73,0.91c-2.96-0.46-5.35-2.88-5.79-5.84C0.27,3.62,5.76-0.87,11.37,1.79
        c2.27,1.08,3.63,3.48,3.63,6v0.09c0,1.19-0.74,2.29-1.88,2.57C11.47,10.83,10,9.59,10,8.01c0,1.38-1.12,2.5-2.5,2.5S5,9.39,5,8.01
        s1.12-2.5,2.5-2.5S10,6.63,10,8.01V5.69"/>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>



                    </div>

                    {/* مربع الكتابة السفلي */}
                    <div className='p-2 pt-0'>
                        <div className="relative w-full shadow-[inset_0_0_0_1px_rgba(2,0,3,0.15)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] rounded-lg p-2 px-3 space-y-2">
                            <textarea className="text-sColor dark:text-xColor p-lt w-full min-h-[16px] max-h-[40vh] resize-none text-sm bg-transparent outline-none dark:placeholder:text-xColor/40"
                                placeholder={`${l('discussion.0.add_comment')}`}
                            />
                            <div className='flex'>

                                <div className='flex justify-center relative rounded-full group'>
                                    <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor/10'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <g>
                                                <path d="M2.45,6.11V4.98V4.71C2.45,2.66,4.11,1,6.16,1l0,0c2.05,0,3.71,1.66,3.71,3.71v1.25v2.79
                c0,1.02-0.84,1.86-1.86,1.86l0,0c-1.02,0-1.86-0.84-1.86-1.86V5.96 M2.45,6.12v3.33c0,3.19,2.7,5.76,5.93,5.54
                c2.95-0.2,5.18-2.79,5.18-5.74V1.13"/>
                                            </g>
                                        </svg>
                                    </button>
                                    <div className="pointer-events-none z-[9999] flex items-center absolute bottom-12 ltr:left-0 rtl:right-0 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-0 group-hover:scale-100 group-hover:translate-y-[2px]">
                                        {l('common.0.upload')}
                                    </div>
                                </div>

                                <div className='flex justify-center relative rounded-full group'>
                                    <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor/10'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <g>

                                                <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="5.49" cy="5.88" r="1.52" />
                                                <circle className='stroke-transparent fill-sColor/70 dark:fill-xColor/70' cx="10.51" cy="5.88" r="1.52" />
                                                <path d="M15,8c0,3.87-3.13,7-7,7s-7-3.13-7-7s3.13-7,7-7S15,4.13,15,8z M6.52,10.15c0,0.82,0.66,1.48,1.48,1.48
            s1.48-0.66,1.48-1.48"/>
                                            </g>
                                        </svg>
                                    </button>
                                    <div className="pointer-events-none z-[9999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-0 group-hover:scale-100 group-hover:translate-y-[2px]">
                                        {l('common.0.emojis')}
                                    </div>
                                </div>

                                <div className='flex justify-center relative rounded-full group'>
                                    <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor/10'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <g>
                                                <path d="M11.6,14c-1.35,0.81-2.99,1.18-4.73,0.91c-2.96-0.46-5.35-2.88-5.79-5.84C0.27,3.62,5.76-0.87,11.37,1.79
            c2.27,1.08,3.63,3.48,3.63,6v0.09c0,1.19-0.74,2.29-1.88,2.57C11.47,10.83,10,9.59,10,8.01c0,1.38-1.12,2.5-2.5,2.5S5,9.39,5,8.01
            s1.12-2.5,2.5-2.5S10,6.63,10,8.01V5.69"/>
                                            </g>
                                        </svg>
                                    </button>
                                    <div className="pointer-events-none z-[9999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-0 group-hover:scale-100 group-hover:translate-y-[2px]">
                                        {l('common.0.mention')}
                                    </div>
                                </div>

                                <div className='flex justify-center relative rounded-full group'>
                                    <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 dark:hover:bg-xColor/10'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor/70 dark:stroke-xColor/70 fill-transparent stroke-15-round">
                                            <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                            <g>
                                                <path d="M5.3,11.37L1,8l4.3-3.37 M10.7,11.37L15,8l-4.3-3.37" />

                                            </g>
                                        </svg>
                                    </button>
                                    <div className="pointer-events-none z-[9999] flex items-center absolute bottom-12 transform w-max h-[26px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-xl opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-0 group-hover:scale-100 group-hover:translate-y-[2px]">
                                        {l('common.0.script')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Circle;
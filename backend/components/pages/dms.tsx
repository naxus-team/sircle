import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useLangs } from '../../context/LanguageContext';
import { Socket } from 'phoenix';

const DMS: React.FC = () => {
  const { l } = useLangs();


  useEffect(() => {
    window.document.title = `${l('app.0.name')} | ${l('dms.0.dms')}`;
  }, []);

  return (
    <>
      <div className='flex items-center w-full h-[52px] px-2 space-x-3 rtl:space-x-reverse'>
        <div className='relative'>
          <img className='min-w-[32px] h-[32px] rounded-full' src='/default.jpg' />
          <div className='status online ltr:right-0 rtl:left-0 bottom-0'></div>
        </div>
        <div className='relative group'>
          <Link to='/abalkhodari'>
            <div className='text-sm p-md text-sColor whitespace-nowrap'>Abdulrahman Al-Khodari</div>
          </Link>
          <div className="pointer-events-none z-[9999] flex items-center absolute top-9 transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-1 group-hover:scale-100 group-hover:translate-y-0">
            @abalkhodari
          </div>
        </div>
        <div className='w-full'></div>
        <div className='flex items-center space-x-2 rtl:space-x-reverse'>
          <div className='flex justify-center rounded-full relative group'>
            <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 hover:dark:bg-xColor/10'>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                <g>

                  <circle cx="6.25" cy="6.25" r="5.25" />
                  <line x1="9.96" y1="9.96" x2="15" y2="15" />
                </g>
              </svg>
            </button>
            <div className="pointer-events-none z-[9999] flex items-center absolute top-12 transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-1 group-hover:scale-100 group-hover:translate-y-0">
              {l('dms.0.search_message')}
            </div>
          </div>
          <div className='flex justify-center rounded-full relative group'>
            <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 hover:dark:bg-xColor/10'>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                <g>

                  <path d="M5.2,10.8C0.12,5.72,0.84,3.39,1.38,2.64c0.07-0.12,1.77-2.66,3.58-1.17c4.51,3.72-1.2,3.19,2.59,6.98
	c3.79,3.79,3.27-1.92,6.98,2.59c1.49,1.82-1.05,3.52-1.17,3.58C12.61,15.16,10.28,15.88,5.2,10.8z"/>

                </g>
              </svg>
            </button>
            <div className="pointer-events-none z-[9999] flex items-center absolute top-12 transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-1 group-hover:scale-100 group-hover:translate-y-0">
              {l('dms.0.create_call')}
            </div>
          </div>
          <div className='flex relative rounded-full group'>
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
            <div className="pointer-events-none z-[9999] flex items-center absolute ltr:right-0 rtl:left-0 top-12 transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-1 group-hover:scale-100 group-hover:translate-y-0">
              {l('dms.0.more')}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='w-full h-[1px] bg-sColor08'></div> */}
      <div className='w-full h-[calc(100%-116px)]'>
        {/* / */}
      </div>
      <div className='relative w-full p-2'>
        <div className='flex items-center space-x-2 rtl:space-x-reverse px-3 h-[48px] rounded-lg bg-xColor'

          style={{ boxShadow: " 0 0 0 1px rgba(2,0,3,.1)" }}>
          <input className='placeholder:text-sColor/70 w-full h-full p-normal text-sm text-sColor' placeholder={`${l('common.0.message')} @seiffekry`} />
          <div className='flex relative justify-center rounded-full group'>
            <button className='flex items-center justify-center w-[32px] h-[32px] rounded-lg hover:bg-sColor08 hover:dark:bg-xColor/10'>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor fill-transparent stroke-15-round">
                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                <g>

                  <circle className='stroke-transparent fill-sColor' cx="5.49" cy="5.88" r="1.52" />
                  <circle className='stroke-transparent fill-sColor' cx="10.51" cy="5.88" r="1.52" />
                  <path d="M15,8c0,3.87-3.13,7-7,7s-7-3.13-7-7s3.13-7,7-7S15,4.13,15,8z M6.52,10.15c0,0.82,0.66,1.48,1.48,1.48
	s1.48-0.66,1.48-1.48"/>
                </g>
              </svg>
            </button>
            <div className="pointer-events-none z-[9999] flex items-center absolute ltr:right-0 rtl:left-0 bottom-14 transform w-max h-[28px] px-3 bg-sColor/70 backdrop-blur-xl text-xColor p-normal text-xs rounded-lg opacity-0 transition duration-100 group-hover:opacity-100 scale-90 translate-y-0 group-hover:scale-100 group-hover:translate-y-[2px]">
              {l('common.0.emojis')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DMS;
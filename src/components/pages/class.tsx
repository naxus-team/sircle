import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";


import { useLangs } from '../../context/LanguageContext';
import { useDate } from '../../context/DateContext';
import Circle from './circle';


import { useClass } from "../../context/ClassContext"; // استيراد الـ Provider نفسه

import Navigate_Class from "../class_navigate";

import * as shiki from 'shiki';  // Import everything from Shiki




const Class: React.FC = () => {
  const { l } = useLangs();

  const { class_code } = useParams<{ class_code: string }>();
  const { classData, fetchClass } = useClass();




  useEffect(() => {
    if (class_code) {
      fetchClass(class_code);
    }
  }, [class_code]);

  useEffect(() => {
    window.document.title = `${classData?.class_name != undefined ? `${classData?.class_name} •` : ''} ${l('app.0.name')}`;
  }, [classData]);


  return (
    <>
      {false ? (
        <>
          <div className='flex items-center justify-center w-full'>
            {classData?.class_code ? (
              <div className='space-y-8'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-center w-full'>
                    <img className="pointer-events-none rounded-3xl w-[96px] h-[96px] transition delay-50" src={`/logo.jpg`} />
                  </div>
                  <div>
                    <div className='flex justify-center'>
                      <span className='text-xl text-sColor dark:text-xColor p-normal'>{classData?.class_name}</span>
                    </div>
                  </div>
                </div>

                <div className='flex justify-center'>
                  <button className='flex items-center justify-center bg-sColor dark:bg-xColor px-4 h-[32px] rounded-2xl hover:bg-sColor/90 dark:hover:bg-xColor/90'>
                    <span className='text-xColor dark:text-sColor text-sm p-md'>
                      {l('common.0.join')}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-center w-[96px]'>
                <span className="loader"></span>
              </div>
            )}


          </div>
        </>
      ) : (
        <>
          <Circle />
        </>
      )}

    </>
  );
};

export default Class;
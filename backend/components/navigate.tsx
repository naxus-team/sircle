// components/Menu.tsx
import { Link } from 'react-router-dom';
import { useLangs } from '../context/LanguageContext';

const Navigate = () => {
    const { l } = useLangs();

    return (
        <div className='relative flex h-full'>
            <div className="relative min-w-[300px]">
                <div className="p-2 px-3">
                    {/* <div>
                            <button className="flex items-center relative h-[38px] rounded-lg before:absolute before:-inset-0 before:block before:bg-transparent before:transform-gpu before:scale-95 hover:before:scale-100 before:transition before:durection-25 hover:before:bg-sColor08 before:rounded-lg cursor-pointer w-full">
                                <div className='flex items-center z-10'>
                                    <div className="mx-3 w-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="stroke-sColor stroke-15-round fill-transparent">
                                            <g>
                                                <rect className="fill-transparent stroke-transparent" width="16" height="16" />
                                                <g className="stroke-sColor">
                                                    <circle cx="6.21" cy="4.57" r="3.57" />
                                                    <ellipse cx="6.21" cy="12.91" rx="5" ry="2.09" />
                                                </g>
                                                <path d="M12,2.05c0.9,0.47,1.51,1.42,1.51,2.5c0,1.09-0.61,2.03-1.51,2.5" />
                                                <path d="M11.93,9.81c1.67,0.25,2.86,0.91,2.86,1.69c0,0.49-0.47,0.93-1.23,1.25" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="t-sColor text-sm p-normal">{l('peoples.0.teachers')}</div>
                                </div>
                            </button>

                            <button className="flex items-center relative h-[38px] rounded-lg before:absolute before:-inset-0 before:block before:bg-transparent before:transform-gpu before:scale-95 hover:before:scale-100 before:transition before:durection-25 hover:before:bg-sColor08 before:rounded-lg cursor-pointer w-full">
                                <div className="mx-3 w-[16px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={19.157} height={16} viewBox="0 0 19.157 16" className="stroke-sColor fill-transparent stroke-15-round">
                                        <g>
                                            <rect className="fill-transparent stroke-transparent" width="19.157" height="16" />
                                            <g>
                                                <circle cx="9.58" cy="4.57" r="3.57" />
                                                <ellipse cx="9.58" cy="12.91" rx="5" ry="2.09" />
                                            </g>

                                            <path d="M15.36,2.05c0.9,0.47,1.51,1.42,1.51,2.5c0,1.09-0.61,2.03-1.51,2.5" />
                                            <path d="M15.3,9.81c1.67,0.25,2.86,0.91,2.86,1.69c0,0.49-0.47,0.93-1.23,1.25" />
                                            <path d="M3.8,2.05c-0.9,0.47-1.51,1.42-1.51,2.5c0,1.09,0.61,2.03,1.51,2.5" />
                                            <path d="M3.86,9.81C2.19,10.06,1,10.72,1,11.5c0,0.49,0.47,0.93,1.23,1.25" />


                                        </g>
                                    </svg>
                                </div>
                                <div className="t-sColor text-sm p-normal">
                                    {l('peoples.0.classmates')}
                                </div>
                            </button>
                        </div>
                        <div className='w-full h-[1px] bg-sColor/10 my-2'></div> */}
                    <div className='flex items-center space-x-3 rtl:space-x-reverse p-3 bg-sColor08 rounded-lg'>
                        <div className='relative'>
                            <img className='w-[38px] h-[38px] rounded-full' src='/default.jpg' />
                            <div className='status online ltr:right-0 rtl:left-0 bottom-0'></div>

                        </div>
                        <div>
                            <div className='p-md text-sm text-sColor'>
                                @abalkhodari
                            </div>
                            <div className='p-normal text-sm text-sColor/70'>
                                عامل ايه؟
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center absolute ltr:right-0 rtl:left-0 top-0 bottom-0 w-[8px] cursor-e-resize group'>
                <div className="w-[1px] h-full bg-sColor/10 transition-all duration-100 delay-150 group-hover:w-[3px] group-hover:bg-mColor"></div>
            </div>
        </div>
    );
};

export default Navigate;
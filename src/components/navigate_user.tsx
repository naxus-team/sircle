// components/Menu.tsx
import { useAuth } from "../context/AuthContext";
import { useLangs } from '../context/LanguageContext';

const Navigate_User = () => {
    const { l } = useLangs();
    const { user } = useAuth();

    return (
        <>
            <div className="relative min-w-[282px]">
                <div className="flex justify-center items-center w-full h-[48px]">
                    <div className="flex w-[262px]">
                        <div className="pointer-events-none absolute mx-3 h-[32px] flex justify-items-center items-center">
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
                            placeholder={`${l('search.0.input.0.search_query', { n: user.username })}`}>
                        </input>
                        <div className="pointer-events-none absolute ltr:right-5 rtl:left-5 w-[16px] h-[32px] flex justify-center items-center">
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
                <div className="w-full h-[1px] b-sColor-1"></div>



            </div>
            <div className="min-h-full min-w-[1px] b-sColor-1"></div>
        </>
    );
};

export default Navigate_User;
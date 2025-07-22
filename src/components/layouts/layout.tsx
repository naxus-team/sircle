import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../head";
import Menu from "../menu";
import Navigate from "../navigate";
const Layout = ({ children, variant }: { children: React.ReactNode; variant?: "user" | "class" | "dms" | "search" | "alt" }) => {
    const { user } = useAuth();



    if (!user) {
        return <>{children}</>;
    }

    const safeVariant = ["alt", "class", "user", "dms"].includes(variant ?? "") ? variant : "search";

    return <div className="forward-anim overflow-none">
        <Header />
        <div className="relative flex dark:bg-[rgba(44,44,44)]">
            <Menu
                variant={safeVariant}
            />
            <div className={`relative flex m-2 mt-0 ltr:ml-0 rtl:mr-0 w-full h-[calc(100vh-46px)]  ${(variant === "class" || variant === "dms") && 'space-x-2 rtl:space-x-reverse'}`}>
                {variant === "dms" && (
                    <Navigate />
                )}

                <div className="flex w-full rounded-xl shadow-[0_0_0_1px_rgba(2,0,3,.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,.1)]">
                    {children}
                </div>
            </div>

            <div className="pointer-events-none absolute left-0 top-0 bottom-0 right-0 l-fog"></div>
        </div>
    </div>
        ;
};

export default Layout;
import React, { useEffect } from "react";
import useTitle from "./../../../../hooks/useTitle";
import { useNavigate } from "react-router";
import like from "../../../../../public/images/auth/register/like.gif"
import checked from "../../../../../public/images/auth/register/checked.png"

const RegisterSuccess = () => {
    useTitle("Registration Successful | SquareCraft");
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="w-full flex items-center justify-center h-screen">
          
                <div className="flex items-center justify-center gap-3">
                    <img src={checked}  loading="lazy" className="w-10 rounded-full" alt="" />
                    <p className="font-semibold text-[28px]">Account created successfully!</p>

            </div>
        </div>
    );
};

export default RegisterSuccess;

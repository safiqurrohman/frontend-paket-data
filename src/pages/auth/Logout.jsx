import {useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem(users);
        navigate('/');

    }, [navigate])

  return  0;
}

export default Logout;

import React from 'react'
import { useState } from 'react'
import { message } from 'antd'

import { useAuth } from '../contexts/AuthContext.jsx'

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const loginUser = async (values) => {


        try {
            setError(null);
            setLoading(true)
            console.log(values);
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            console.log(data);
            console.log(res.status);
            if (res.status == 200) {
                message.success(data.message);
                login(data.token, data.user);
            }
            else if (res.status === 500) {
                console.log(1);
                console.log(data.message);
                return setError(data.message || "Something went wrong.");
            }
            else {
                message.error('Registration Fialed');
            }
        }
        catch (error) {
            message.error(error);

        }
        finally {
            setLoading(false);
        }
    }
    return { loading, error, loginUser };
};

export default useLogin;
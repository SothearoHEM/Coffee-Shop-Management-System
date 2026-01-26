import { PiCoffeeBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { LuLockKeyhole } from "react-icons/lu";
import {useContext,useState} from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";


function Login(){
    const navigate = useNavigate();
    const {login, error, setError} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(username, password);

        if (result) {
            navigate('/dashboard');
        }else{
            setUsername('');
            setPassword('');
            setTimeout(() => {
                setError(null);
            }, 1500);
        }
    };
  return (
    <div className='w-full h-lvh bg-blue-200 flex items-center justify-center relative'>
        <div className='bg-white w-125 h-auto border border-blue-400 shadow-lg shadow-gray-400 rounded-xl p-5'>
            <div className='flex flex-col items-center justify-center space-y-2'>
                <PiCoffeeBold className='text-7xl text-white bg-blue-500 p-5 rounded-2xl'/>
                <p className='text-lg text-blue-900'>Coffee Shop Management</p>
                <p className='text-blue-400'>Sign in to manage your coffee shop</p>
                {error && <p className="text-red-500 flex items-center border border-red-500 rounded-md p-2"><MdOutlineErrorOutline className='mr-2 text-lg'/>{error}</p>}
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center space-y-2'>
                <label htmlFor="" className='text-gray-700 font-semibold'>Username</label>
                <div className='relative'>
                    <FaRegUser className='text-gray-400 text-lg absolute left-3 top-3'/>
                    <input type="text" placeholder='Enter Your Username' className='w-full text-gray-800 border border-blue-400 rounded-lg h-10 px-2 space-x-3 focus:outline-none focus:border-blue-800 focus:shadow-md pl-10' required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <label htmlFor="" className='text-gray-700 font-semibold'>Password</label>
                <div className='relative'>
                    <LuLockKeyhole className='text-gray-400 text-lg absolute left-3 top-3'/>
                    <input type="password" placeholder='Enter Your Password' className='w-full text-gray-800 border border-blue-400 rounded-lg h-10 px-2 space-x-3 focus:outline-none focus:border-blue-800 focus:shadow-md pl-10' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className='bg-blue-600 py-2 rounded-lg mt-5 text-white hover:bg-blue-800'>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default Login
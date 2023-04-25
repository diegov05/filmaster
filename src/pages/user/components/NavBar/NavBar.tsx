import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../../main/constants';
import { getAuth } from 'firebase/auth';

export type INavBarProps = {

}

const NavBar: React.FC<INavBarProps> = ({ }) => {

    const navigate = useNavigate()

    const auth = getAuth()

    return (
        <div>
            <div className='p-4 flex flex-row justify-between items-start'>
                <img className="w-36 cursor-pointer" src={images.logo} alt="logo" onClick={() => { navigate('/') }} />
                <div className='flex flex-col gap-4 justify-start items-start'>
                    <button className='custom__button text-xs headtext uppercase rounded-none px-3 py-1 bg-violet-900 hover:bg-white hover:text-violet-900 border-none outline-none' onClick={() => { navigate('/') }}>Return to main page</button>
                    <p className='text-xs text-white paragraph font-light'>Logged In As:
                        <br /> {user?.email}</p>
                </div>
            </div>
        </div>
    );
}

export { NavBar };
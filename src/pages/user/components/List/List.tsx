import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from '../Account/Account';
import './List.css'

const List: React.FC = () => {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handleListItemClick = (idx: number) => {
        setSelectedIdx(idx);
    };

    const auth = getAuth()
    const navigate = useNavigate()

    return (
        <div className='mt-36 flex flex-row gap-8'>
            <ul className='flex flex-col justify-center items-start border-r border-violet-900'>
                <li onClick={() => handleListItemClick(0)} className={`${selectedIdx === 0 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Account
                </li>
                <li onClick={() => handleListItemClick(1)} className={`${selectedIdx === 1 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Profile
                </li>
                <li onClick={() => handleListItemClick(2)} className={`${selectedIdx === 2 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Favorites
                </li>
                <li onClick={() => {
                    signOut(auth)
                    navigate('/login')
                }} className={`${selectedIdx === 3 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Sign Out
                </li>
            </ul>
            <div>
                {selectedIdx === 0 && <Account />}
                {selectedIdx === 1 && <Account />}
                {selectedIdx === 2 && <div className='text-white'>Option 3 content</div>}
                {selectedIdx === 3 && <div className='text-white'>Option 4 content</div>}
            </div>
        </div>
    );
};

export default List;

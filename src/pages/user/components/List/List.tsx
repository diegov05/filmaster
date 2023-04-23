import { getAuth, signOut, deleteUser } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from '../Account/Account';
import { Favorites } from '../Favorites/Favorites';
import './List.css'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';

const List: React.FC = () => {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [error, setError] = useState('')

    const auth = getAuth()
    const navigate = useNavigate()

    const handleListItemClick = (idx: number) => {
        setSelectedIdx(idx);
    };

    const handleDelete = async () => {
        const auth = getAuth()
        const user = auth.currentUser
        const db = getFirestore()

        if (!user) {
            return console.log("User not logged in.")
        }

        try {
            await deleteUser(user!)
            const userDocRef = doc(db, 'user', user.uid);
            await deleteDoc(userDocRef);
        } catch (error) {
            setError(`Failed to delete account ${error}`)
        }
        navigate('/login')
    }

    return (
        <div className='mt-36 flex flex-row gap-8'>
            <ul className='flex flex-col justify-start items-start border-r border-violet-900'>
                <li onClick={() => handleListItemClick(0)} className={`${selectedIdx === 0 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Account
                </li>
                <li onClick={() => handleListItemClick(1)} className={`${selectedIdx === 1 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Profile
                </li>
                <li onClick={() => handleListItemClick(2)} className={`${selectedIdx === 2 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Favorites
                </li>
                <li onClick={() => handleListItemClick(3)} className={`${selectedIdx === 3 ? 'selected' : ''} w-full cursor-pointer transition-all hover:bg-violet-900 hover:font-black text-white text-xl py-8 px-8 uppercase`}>
                    Sign Out
                </li>
            </ul>
            <div>
                {selectedIdx === 0 && <Account />}
                {selectedIdx === 1 && <Account />}
                {selectedIdx === 2 && <Favorites />}
                {selectedIdx === 3 && (
                    <div className='flex flex-col justify-start items-start gap-8'>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <h1 className='headtext uppercase'>Are you sure you want to sign out?</h1>
                            <div className='flex flex-row gap-2'>
                                <button
                                    onClick={() => setSelectedIdx(0)}
                                    className='custom__button headtext rounded-none uppercase border-0 outline-0 bg-zinc-700 px-6 py-3'>Cancel</button>
                                <button
                                    onClick={() => {
                                        signOut(auth)
                                        navigate('/login')
                                    }}
                                    className='custom__button headtext rounded-none uppercase border-0 outline-0 bg-violet-900 px-6 py-3'>Sign Out</button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <h1 className='headtext uppercase'>Do you want to delete your account?</h1>
                            <div className='flex flex-row gap-2'>
                                <button
                                    onClick={handleDelete}
                                    className='custom__button headtext rounded-none uppercase border-0 outline-0 bg-rose-700 px-6 py-3'>Delete Account</button>
                                {error && <div>{error}</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default List;

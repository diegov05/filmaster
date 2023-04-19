import React from 'react';
import { auth } from '../../../../App';

export type IAccountProps = {

}

const Account: React.FC<IAccountProps> = ({ }) => {


    return (
        <div className='flex flex-row gap-4 justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                {auth.currentUser?.photoURL ? <img src={`${auth.currentUser?.photoURL}`} className='w-16 rounded-full' alt="avatar" /> : <button className='custom__button paragraph uppercase'>Upload an Image</button>}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='paragraph font-bold'>{auth.currentUser?.email}</p>
            </div>
        </div>
    );
}

export { Account };
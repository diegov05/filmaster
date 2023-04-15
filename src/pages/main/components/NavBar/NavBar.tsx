import React, { FC, useState } from 'react'
import { MagnifyingGlassIcon, UserIcon, ChevronDownIcon, ChevronUpIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { images } from '../../constants'
import "./NavBar.css"
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

interface INavBarProps {
    authed: boolean
}

export const NavBar: FC<INavBarProps> = (props) => {

    const list: Array<Object> = [
        {
            option: "Account",
            onClick: () => navigate('/user')
        },
        {
            option: "Profile",
            onClick: () => navigate('/user')
        },
        {
            option: "TMDB",
            onClick: () => navigate('/credits')
        },
        {
            option: "Sign Out",
            onClick: () => signOut(auth)
        },
    ]

    const auth = getAuth()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    return (

        <div className='flex p-4 flex-col w-full h-80 justify-between absolute z-10'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <a href="#"><img src={images.logo} alt="logo" className='w-36' /></a>
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <form action="" className="relative mx-auto w-max">
                        <input type="search"
                            className=" peer cursor-pointer relative z-10 h-12 w-12 border-white bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4 focus:border-b focus:border-solid text-white" />
                        <MagnifyingGlassIcon className='absolute inset-y-0 my-auto custom__icon magnifying__icon' />
                    </form>
                    {props.authed ?
                        (
                            <>
                                <button onClick={() => setIsOpen((prevState) => !prevState)} className='user-button flex flex-row cursor-pointer justify-between items-center gap-4 bg-white px-4 py-2 rounded-xl hover:bg-violet-900 transition-all'>
                                    <UserIcon className='transition-all custom__icon text-zinc-600' />
                                    {!isOpen ? (
                                        <ChevronDownIcon className='transition-all custom__icon text-zinc-600' />

                                    ) : (
                                        <ChevronUpIcon className='transition-all custom__icon text-zinc-600' />

                                    )}
                                </button>

                                {isOpen && (
                                    <div className='dropdown bg-white absolute top-20 right-1 flex flex-col items-center cursor-pointer rounded-xl'>
                                        {list.map((item: any, i) => (
                                            <button className='transition-all hover:bg-violet-900 p-4 w-full flex flex-col justify-center items-center border-b' key={i} onClick={item.onClick}>
                                                <h2 className='transition-all paragraph text-zinc-600'>{item.option}</h2>
                                                <span>{item.icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>)
                        : (
                            <>
                                <div className='flex flex-row gap-2 items-center justify-center'>
                                    <a href="#" className='paragraph transition-all hover:text-zinc-200' onClick={async () => navigate('/login')}>Sign In</a>
                                    <div className='app__wrapper-navbar_user-register'>
                                        <button className='custom__button text-white font-semibold hover:opacity-90 hover:bg-purple-800 hover:border-transparent' onClick={async () => navigate('/signup')}>Register</button>
                                    </div>
                                </div>

                            </>)}

                </div>
            </div>
        </div >
    )
}

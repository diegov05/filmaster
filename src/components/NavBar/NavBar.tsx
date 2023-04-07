import React, { FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { images } from '../../constants'
import "./NavBar.css"

export const NavBar: FC = () => {
    return (
        <div className='app__wrapper-navbar'>
            <div className='app__wrapper-navbar_logo'>
                <a href="#"><img src={images.logo} alt="logo" /></a>
            </div>
            <div className='app__wrapper-navbar_user'>
                <form action="" className="relative mx-auto w-max">
                    <input type="search"
                        className=" peer cursor-pointer relative z-10 h-12 w-12 border-white bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4 focus:border-b focus:border-solid text-white" />
                    <MagnifyingGlassIcon className='absolute inset-y-0 my-auto custom__icon magnifying__icon' />
                </form>
                <a href="#" className='paragraph'>Sign In</a>
                <div className='app__wrapper-navbar_user-register'>
                    <button className='custom__button text-white font-semibold hover:opacity-90 hover:bg-purple-800 hover:border-transparent'>Register</button>
                </div>
            </div>
        </div>
    )
}

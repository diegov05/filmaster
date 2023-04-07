import React, { FC } from 'react'
import { images } from '../../constants'
import { RiFacebookFill, RiTwitterFill } from 'react-icons/ri'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import "./Footer.css"

export const Footer: FC = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-48 gap-16'>
            <div className=""><img src={images.logo} alt="logo" className='w-80' /></div>
            <div className='flex flex-row gap-48'>
                <div className='flex flex-col gap-4 justify-start items-start'>
                    <h3 className='headtext font-medium cursor-default'>Filmaster</h3>
                    <a href="">
                        <p className="link">Updates</p>
                    </a>
                    <a href="">
                        <p className="link">Beta</p>
                    </a>
                    <a href="">
                        <p className="link">Newsletter</p>
                    </a>
                    <a href="">
                        <p className="link">Collaborations</p>
                    </a>
                </div>
                <div className='flex flex-col gap-4 justify-start items-start'>
                    <h3 className='headtext font-medium cursor-default'>Product</h3>
                    <a href="">
                        <p className="link">Business</p>
                    </a>
                    <a href="">
                        <p className="link">Designers</p>
                    </a>
                    <a href="">
                        <p className="link">Classrooms</p>
                    </a>
                    <a href="">
                        <p className="link">Newcomers</p>
                    </a>
                </div>
                <div className='flex flex-col gap-4 justify-start items-start'>
                    <h3 className='headtext font-medium cursor-default'>Learning</h3>
                    <a href="">
                        <p className="link">Learn Hub</p>
                    </a>
                    <a href="">
                        <p className="link">Manuals</p>
                    </a>
                    <a href="">
                        <p className="link">Tutorials</p>
                    </a>
                    <a href="">
                        <p className="link">Communities</p>
                    </a>
                </div>
                <div className='flex flex-col gap-4 justify-start items-start'>
                    <h3 className='headtext font-medium cursor-default'>Resources</h3>
                    <a href="">
                        <p className="link">Tutorials</p>
                    </a>
                    <a href="">
                        <p className="link">Editorials</p>
                    </a>
                    <a href="">
                        <p className="link">Product</p>
                    </a>
                    <a href="">
                        <p className="link">Newsroom</p>
                    </a>
                </div>
                <div className='flex flex-col gap-4 justify-start items-start'>
                    <h3 className='headtext font-medium cursor-default'>About</h3>
                    <a href="">
                        <p className="link">Company</p>
                    </a>
                    <a href="">
                        <p className="link">Careers</p>
                    </a>
                    <a href="">
                        <p className="link">Legal</p>
                    </a>
                    <a href="">
                        <p className="link">Help</p>
                    </a>
                </div>
            </div>
            <div className='flex flex-col mt-36'>
                <div>
                    <p className='text-white cursor-default'>© 2020 Filmaster. All rights reserved.</p>
                </div>
                <div className='flex flex-row mt-8 mb-8 justify-center items-center gap-4'>
                    <RiFacebookFill className='custom__icon w-6 h-6 opacity-100 transition-all fill-white hover:fill-purple-600' />
                    <RiTwitterFill className='custom__icon w-6 h-6 opacity-100 transition-all fill-white hover:fill-purple-600' />
                    <FaInstagram className='custom__icon w-6 h-6 opacity-100 transition-all fill-white hover:fill-purple-600' />
                    <FaYoutube className='custom__icon w-6 h-6 opacity-100 transition-all fill-white hover:fill-purple-600' />
                </div>
            </div>
        </div>
    )
}

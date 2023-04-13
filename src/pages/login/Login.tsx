import React, { useRef, useState } from 'react'
import images from "../../assets"
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import "./Login.css"

export const Login = () => {

    const auth = getAuth()
    const navigate = useNavigate()

    const [authing, setAuthing] = useState(false)

    const signInWithGoogle = async () => {
        setAuthing(true)

        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setAuthing(false)
            })
    }

    // const signInAnonymously = async () => {
    //     setAuthing(true)

    //     signInAnonymously()
    //         .then(() => {
    //             console.log("anonymous user logged in.")
    //             navigate('/')
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             setAuthing(false)
    //         })

    // }

    return (

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            < div className='flex flex-col justify-center items-center' >
                <div className='mt-16'>
                    <img className='w-80' src={images.logo} alt="logo" />
                </div>
                <div className='flex flex-col justify-start items-start mt-8 gap-4'>
                    <form action="" className='flex flex-col justify-start items-start mt-8 gap-4'>
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='USERNAME' type="email" required />
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='PASSWORD' type="password" required />
                        <button disabled={authing} className='w-full rounded-none bg-violet-900 outline-none border-none py-4 px-4 uppercase text-white custom__button hover:opacity-90'>Log In</button>
                        <div className='w-full flex flex-row justify-between gap-2'>
                            <button onClick={() => signInWithGoogle()} disabled={authing} className='flex flex-row justify-between items-center w-full rounded-none bg-zinc-900 outline-none border-none py-2 px-4 uppercase text-xs text-zinc-500 custom__button hover:opacity-90 hover:bg-white hover:text-violet-900'><FcGoogle />Log In With Google</button>
                            <button onClick={() => {
                                signInAnonymously(auth)
                                navigate('/')
                            }} disabled={authing} className='w-full rounded-none bg-zinc-900 outline-none border-none py-2 px-4 uppercase text-xs text-zinc-500 custom__button hover:opacity-90'>Guest Login</button>
                        </div>
                        <a href=""><p className='paragraph underline text-xs transition-all hover:opacity-90'>Forgot your password?</p></a>
                        <div className='flex flex-row gap-4 w-full mt-8 justify-center items-center'>
                            <div className='h-[1px] w-1/4 bg-zinc-600'></div>
                            <p className='text-center paragraph text-xs'>New to Filmaster?</p>
                            <div className='h-[1px] w-1/4 bg-zinc-600'></div>
                        </div>
                        <button className='w-full rounded-none bg-zinc-900 outline-none border-none py-4 px-4 uppercase text-zinc-700 hover:bg-amber-400 hover:text-black  custom__button'>Create Account</button>
                    </form>
                </div>
            </div >
        </div >
    )
}

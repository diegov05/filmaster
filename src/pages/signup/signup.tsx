import React, { FormEvent, useRef, useState } from 'react'
import images from "../../assets"
import "./SignUp.css"
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export const SignUp = () => {

    const auth = getAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const navigate = useNavigate()

    const db = getFirestore()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length > 0) {
                alert("Email already exists.")
                return
            } else {
                if (password !== confirmPassword) {
                    alert("Passwords do not match.")
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)

                const userRef = doc(db, 'user', userCredential.user.uid)
                await setDoc(userRef, {
                    id: userCredential.user.uid,
                    email: userCredential.user.email,
                    favorites: []
                })
                console.log('User added to Firestore');
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            < div className='flex flex-col justify-center items-center' >
                <div className='mt-16'>
                    <img className='w-80' src={images.logo} alt="logo" />
                </div>
                <div className='flex flex-col justify-center items-center'>

                    <h1 className='headtext uppercase mt-4'>Create An Account</h1>
                    <form onSubmit={handleSignup} action="" className='flex flex-col justify-start items-start mt-8 gap-4'>
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='EMAIL' type="email" onChange={(e) => setEmail(e.target.value)} required />
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='PASSWORD' type="password" onChange={(e) => setPassword(e.target.value)} required />
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='CONFIRM YOUR PASSWORD' type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button className='w-full rounded-none bg-violet-900 outline-none border-none py-4 px-4 uppercase text-white custom__button hover:opacity-90'>Create Account</button>
                        <div className='flex flex-row gap-4 w-full mt-8 justify-center items-center'>
                            <div className='h-[1px] w-1/4 bg-zinc-600'></div>
                            <p className='text-center paragraph text-xs'>Already Have An Account?</p>
                            <div className='h-[1px] w-1/4 bg-zinc-600'></div>
                        </div>

                        <button className='w-full rounded-none bg-zinc-900 outline-none border-none py-4 px-4 uppercase text-zinc-700 hover:bg-amber-400 hover:text-black  custom__button' onClick={() => { navigate('/login') }}>Login</button>
                    </form>
                </div>
            </div >
        </div >
    )
}

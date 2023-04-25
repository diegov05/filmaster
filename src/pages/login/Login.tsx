import React, { useRef, useState } from 'react'
import images from "../../assets"
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import "./Login.css"
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

export const Login = () => {

    const auth = getAuth()
    const navigate = useNavigate()

    const [authing, setAuthing] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const signInWithGoogle = async () => {
        setAuthing(true)

        const db = getFirestore()

        signInWithPopup(auth, new GoogleAuthProvider())
            .then(async response => {
                try {
                    const userRef = doc(db, 'users', response.user.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        console.log('User exists in Firestore');
                    } else {
                        const userRef = doc(db, 'user', auth.currentUser!.uid)
                        await setDoc(userRef, {
                            id: auth.currentUser!.uid,
                            email: auth.currentUser!.email
                        })
                        console.log('User added to Firestore');
                    }
                } catch (error) {
                    console.error('Error checking if user exists in Firestore', error);
                }
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setAuthing(false)
            })
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length === 0) {
                setError("User not found.")
                return;
            }
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/')
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') {
                setError('Wrong password');
            }
            setError(error.message)
        }
    }

    return (

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col justify-center items-center' >
                <div className='mt-16'>
                    <img className='w-32 xl:w-80 lg:w-80 md:w-80 sm:w-80' src={images.logo} alt="logo" />
                </div>
                <div className='flex flex-col justify-start items-start xl:mt-8 lg:mt-8 md:mt-8 sm:mt-8 gap-4'>
                    <form onSubmit={handleLogin} action="" className='flex flex-col justify-start items-start mt-8 gap-4'>
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='USERNAME' type="email" onChange={e => setEmail(e.target.value)} required />
                        <input className='flex justify-start items-center bg-zinc-900 text-white outline-none border-none px-4 py-2 w-[45ch]' placeholder='PASSWORD' type="password" onChange={e => setPassword(e.target.value)} required />
                        <button disabled={authing} className='w-full rounded-none bg-violet-900 outline-none border-none py-4 px-4 uppercase text-white custom__button hover:opacity-90'>Log In</button>
                        {error && <p className='capitalize paragraph text-xs text-red-500'>{error}</p>}
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
                        <button className='w-full rounded-none bg-zinc-900 outline-none border-none py-4 px-4 uppercase text-zinc-700 hover:bg-amber-400 hover:text-black  custom__button' onClick={() => { navigate('/signup') }}>Create Account</button>
                    </form>
                </div>
            </div >
        </div >
    )
}
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

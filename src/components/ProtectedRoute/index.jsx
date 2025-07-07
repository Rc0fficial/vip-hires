'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SecurityModel from '@/app/(pages)/settings/SecurityModel';
import InputField from '../common/InputField';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUser } from '@/app/Store/ReduxSlice/loginSlice';

const ProtectedRoute = ({ children }) => {
    const [securityModel, setSecurityModel] = useState(true);
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { user, isAuthenticated, userProfile } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const handleSecurityVerified = async (e) => {
        e.preventDefault();

        try {
            if (isAuthenticated) {


                const resultAction = await dispatch(loginUser({ email: user?.email, password }));
                if (loginUser.fulfilled.match(resultAction)) {
                    setPassword("")

                    setSecurityModel(false);
                } else {
                    toast.error("Invalid Password")
                    setPassword("")
                }
            } else {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }


    };

    const handleClose = () => {
        router.back(); // Go back if user cancels
    };

    return (
        <>
            <SecurityModel
                isOpen={securityModel}
                onClose={handleClose}
                onSave={handleSecurityVerified}
                id="Enter Password"
            >
                <div className='-mt-6'>
                    <h4 className='text-989 text-xs md:text-[16px] mb-6'>
                        For security reasons, please enter your password to continue.
                    </h4>
                    <form onSubmit={handleSecurityVerified} className='flex flex-col gap-6'>
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            autoFocus={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </form>
                </div>
            </SecurityModel>

            {!securityModel && children}
        </>
    );
};

export default ProtectedRoute;
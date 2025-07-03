'use client'
import React, { Suspense } from 'react'
import CreateAccount from './CreateAccount'
import Spinner from '@/components/Spinner'

const CreateAccountPage = () => {
  return (
    <Suspense fallback={<Spinner/>}>
      <CreateAccount/>
    </Suspense>
  )
}

export default CreateAccountPage

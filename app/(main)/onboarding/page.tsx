import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboardingForm'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const OnboardingPage = async () => {
    //Check if User is Onboarded
    const { isOnboarded } = await getUserOnboardingStatus();

    if (isOnboarded) {
        redirect("/dashboard");
    }

    return (
        <main>
            <OnboardingForm industries={industries} />
        </main>
    )
}

export default OnboardingPage
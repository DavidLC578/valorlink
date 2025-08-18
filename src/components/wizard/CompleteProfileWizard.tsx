'use client';

import { useState } from 'react';
import RegionStep from './steps/RegionStep';
import RoleStep from './steps/RoleStep';
import { WizardData } from '@/types/types';
import RankStep from './steps/RankStep';
import PlayerStep from './steps/PlayerStep';

const steps = [
    RegionStep,
    RoleStep,
    RankStep,
    PlayerStep,
];

export default function CompleteProfileWizard() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<WizardData>({
        region: '',
        roles: [],
        rank: '',
        alias: '',
        description: '',
    });

    const next = () => { setStep((s) => s + 1); };
    const prev = () => setStep((s) => s - 1);

    const StepComponent = steps[step];

    return (
        <div className="min-h-screen bg-gray-950">
            <div className="relative py-20 sm:py-32 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 sm:p-10">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Complete your <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">profile</span>
                            </h1>
                            <p className="text-gray-400">Help us find the perfect teammates for you</p>
                        </div>

                        <StepComponent data={form} setData={setForm} next={next} prev={prev} />
                    </div>
                </div>
            </div>
        </div>
    );
}

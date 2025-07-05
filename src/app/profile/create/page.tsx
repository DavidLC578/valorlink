import Navbar from '@/components/Navbar';
import CompleteProfileWizard from '@/components/wizard/CompleteProfileWizard';

export default function CreateProfilePage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <CompleteProfileWizard />
            </div>
        </>
    );
}

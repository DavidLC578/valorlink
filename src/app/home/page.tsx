import Footer from "@/components/Footer"
import QuickActions from "@/components/home/QuickActions"
import SuggestedPlayers from "@/components/home/SuggestedPlayers"
import TipsSection from "@/components/home/TipsSection"
import ProfileNotCompletedCard from "@/components/home/ProfileNotCompletedCard"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <main className="min-h-screen">
            <section className="py-10 px-4 sm:px-10 space-y-7">
                {
                    !session?.user?.isProfileComplete && (
                        <ProfileNotCompletedCard />
                    )
                }
                <div className="max-w-7xl mx-auto space-y-20 relative">
                    <QuickActions />
                    <SuggestedPlayers />
                    <TipsSection />
                </div>
            </section>
            <Footer />
        </main>
    )
}
export default Home
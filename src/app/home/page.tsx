import Footer from "@/components/Footer"
import QuickActions from "@/components/home/QuickActions"
import SuggestedPlayers from "@/components/home/SuggestedPlayers"
import TipsSection from "@/components/home/TipsSection"
import Navbar from "@/components/Navbar"


function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <section className="py-20 px-4 sm:px-10">
                <div className="max-w-7xl mx-auto space-y-20">
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
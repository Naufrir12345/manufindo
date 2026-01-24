import Navbar from "../components/Navbar";
import PlatformHero from "../components/PlatformHero";
import PlatformFeatures from "../components/PlatformFeatures";
import DigitalOrbitFooter from "../components/DigitalOrbitFooter";

export default function PlatformPage() {
    return (
        <main className="bg-[#05070A] min-h-screen text-white overflow-hidden">
            <Navbar />
            <PlatformHero />
            <PlatformFeatures />
            <DigitalOrbitFooter />
        </main>
    );
}
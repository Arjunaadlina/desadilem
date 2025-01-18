import Navbar from "../components/Home/Nav";
import Hero from "../components/Home/Hero";
import Umkm from "../components/Home/Umkm";

function Home() {
    return (
        <div className="w-screen">
            <Navbar />
            <Hero />
            <Umkm />
        </div>
    )
}

export default Home;
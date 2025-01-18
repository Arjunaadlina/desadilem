import Navbar from "../components/Home/Nav";
import Hero from "../components/Home/Hero";
import Umkm from "../components/Home/Umkm";
import Pariwisata from "../components/Home/Pariwisata";

function Home() {
    return (
        <div className="w-screen">
            <Navbar />
            <Hero />
            <Umkm />
            <Pariwisata /> 
        </div>
    )
}

export default Home;
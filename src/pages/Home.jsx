import Navbar from "../components/Home/Nav";
import Hero from "../components/Home/Hero";
import Umkm from "../components/Home/Umkm";
import Pariwisata from "../components/Home/Pariwisata";
import About from "../components/Home/About";

function Home() {
    return (
        <div className="w-screen">
            <Navbar />
            <Hero />
            <About />
            <Umkm />
            <Pariwisata /> 
        </div>
    )
}

export default Home;
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import animationData from "../../assets/scrollanimate.json";
import { Element } from 'react-scroll';
function Hero() {
  return (
    <Element id="home" name="home">
    <div
      className="w-screen h-screen flex items-center justify-center flex-col bg-cover p-4 bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="">
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }} // Memulai sedikit di bawah
          animate={{ opacity: 1, y: 0 }} // Kembali ke posisi tengah
          transition={{ duration: 1 }}
        >
          <p className="md:text-8xl font-bold text-white font-montserratbold text-4xl sm:text-5xl">
            DESA DILEM
          </p>
        </motion.div>
      </div>
      <div className="text-white text-center max-w-[54rem] mt-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }} // Memulai sedikit di bawah
          animate={{ opacity: 1, y: 0 }} // Kembali ke posisi tengah
          transition={{ duration: 1, delay:0.5  }}
        >
          Dilem adalah sebuah desa di wilayah Kecamatan Gondang Kabupaten Mojokerto, Provinsi Jawa Timur. Desa Dilem Kecamatan Gondang Kabupaten Mojokerto ada sebanyak kurang lebih 286 warga yang tinggal di Desa Dilem, dengan luas 0,09 km². 
        </motion.p>
      </div>
      
      <div className="mt-10">
        <Lottie 
          autoplay
          loop
          animationData={animationData}
          style={{ width: 75, height: 75 }}
        />
      </div>
    </div>
    </Element>
  );
}

export default Hero;

import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import animationData from "../../assets/scrollanimate.json"
function Hero() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center flex-col bg-cover"
      style={{ backgroundImage: "url('/heroo.jpg')" }}
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
          transition={{ duration: 1, delay:0.5 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
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
  );
}

export default Hero;

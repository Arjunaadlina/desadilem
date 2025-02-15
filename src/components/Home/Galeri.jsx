import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

function Galeri() {
    const [galeriData, setGaleriData] = useState([]);

    useEffect(() => {
        axios
          .get("https://api-galerys.vercel.app/api/galery")
          .then((response) => {
            setGaleriData(response.data.data);
            console.log(galeriData)
          })
          .catch((error) => {
            console.error("Error fetching galeri data:", error);
          });
      }, []);

    return (
        <Element id="galeri" name="galeri" className="mt-20 md:px-40 px-2">
            <div className="p-4 flex items-center justify-center flex-col">
                <div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-secondary text-md font-montserratreg text-center">
                        Lihat Keindahan Desa Dilem
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-center font-montserratbold text-4xl mt-2">
                        GALERI DESA
                    </motion.p>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {
                        galeriData.map((item, index) => (
                            <div key={index} className="rounded-lg overflow-hidden shadow-md">
                                <img 
                                    src={item.images} 
                                    alt={`Galeri ${index + 1}`} 
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        ))
                    }
                </motion.div>
            </div>
        </Element>
    );
}

export default Galeri;

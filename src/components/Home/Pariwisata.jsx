import Card from "../Pariwisata/Card"
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import axios from "axios"

function Pariwisata() {

    const [pariwisataData, setPariwisataData] = useState([]);

    useEffect(() => {
        axios
          .get("https://api-pariwisata.vercel.app/api/pariwisata")
          .then((response) => {
            setPariwisataData(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching pariwisata data:", error);
          });
      }, []);

    return (
        <Element id="pariwisata" name="pariwisata" className="mt-20">
        <div id="pariwisata">
            <div className="p-4 mt-4 flex items-center justify-center flex-col">
                <div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-secondary text-md font-montserratreg text-center">Temukan Pariwisata Lokal</motion.p>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay:0.3 }}
                        viewport={{ once: true }}
                        className="text-center font-montserratbold text-4xl mt-2">PARIWISATA POPULER</motion.p>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay:0.4 }}
                        viewport={{ once: true }}
                        className="font-montserratreg mt-1 text-gray-700">Pariwisata yang populer di desa dilem dan banyak digemari oleh masyarakat setempat maupun luar wilayah</motion.p>
                </div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay:0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 flex justify-between items-center gap-6 flex-col">
                    {
                        pariwisataData.map((item, index) => {
                            return (
                                <Card key={index} title={item.title} image={item.images} desc={item.description} price={item.price} facility={item.facility} />
                            )
                        })
                    }
                </motion.div>
            </div>
        </div>
        </Element>
    )
}

export default Pariwisata
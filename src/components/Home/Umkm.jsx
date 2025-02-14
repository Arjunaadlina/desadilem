import Card from "../Umkm/Card/Card"
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import axios from "axios"
import { useState, useEffect } from "react"

function Umkm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
          .get("https://api-umkm.vercel.app/api/umkm")
          .then((response) => {
            setData(response.data.data)
            setLoading(false)
          })
          .catch((error) => {
            console.error("Error fetching UMKM data:", error)
            setLoading(false)
          })
    }, [])
    
    return (
        <Element id="umkm" name="umkm" className="pt-20">
            <div className="p-x flex items-center justify-center flex-col">
                <div className="flex items-center justify-center flex-col">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-secondary text-md font-montserratreg text-center">
                        Temukan UMKM Lokal
                    </motion.p>
                    <div className="flex gap-4">
                        <img src="/bumdes.png" alt="bumdes" className="w-12 rounded-full"/>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center font-montserratbold text-4xl mt-2">
                            UMKM POPULER
                        </motion.p>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="font-montserratreg mt-1 text-gray-700">
                        UMKM yang populer di desa dilem dan banyak digemari oleh masyarakat setempat maupun luar wilayah
                    </motion.p>
                </div>

                {loading ? (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 text-lg text-gray-500">
                        Loading...
                    </motion.p>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-8 justify-between items-center gap-6 grid md:grid-cols-2 xl:grid-cols-3 grid-rows-1 grid-cols-1">
                        {data.map((item) => (
                            <Card key={item._id} image={item.images} title={item.name} desc={item.description} />
                        ))}
                    </motion.div>
                )}
            </div>
        </Element>
    )
}

export default Umkm

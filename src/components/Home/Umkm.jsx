import Card from "../Umkm/Card/Card"
import { Element } from "react-scroll"
import { motion } from "framer-motion"

function Umkm() {
    return (
        <Element id="umkm" name="umkm" className="pt-20">
        <div className="p-4 flex items-center justify-center flex-col" id="umkm">
            <div>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-secondary text-md font-montserratreg text-center">Temukan UMKM Lokal</motion.p>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center font-montserratbold text-4xl mt-2">UMKM POPULER</motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="font-montserratreg mt-1 text-gray-700">UMKM yang populer di desa dilem dan banyak digemari oleh masyarakat setempat maupun luar wilayah</motion.p>
            </div>
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 flex justify-between items-center gap-6 flex-col md:flex-row">
                <Card />
                <Card />
                <Card />
            </motion.div>
        </div>
        </Element>
    )
}

export default Umkm
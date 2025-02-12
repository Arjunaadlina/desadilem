import Card from "../Umkm/Card/Card"
import { Element } from "react-scroll"
import { motion } from "framer-motion"

function Umkm() {
    return (
        <Element id="umkm" name="umkm" className="pt-20">
        <div className="p-x flex items-center justify-center flex-col" id="umkm">
            <div className="flex items-center justify-center flex-col">
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
                className="mt-8 justify-between items-center gap-6 grid md:grid-cols-2 xl:grid-cols-3 grid-rows-1 grid-cols-1">
                <Card image={"/pare.jpg"} title={"Keripik Pare"} desc={"Keripik gurih dengan olahan pare dan rempah."}/>
                <Card image={"/bayam.jpg"} title={"Keripik Bayam"} desc={"Keripik gurih dengan olahan bayam dan rempah."}/>
                <Card image={"/balado.jpg"} title={"Varian Balado"} desc={"Keripik dengan varian rasa balado yang sedikit pedas."}/>
            </motion.div>
        </div>
        </Element>
    )
}

export default Umkm
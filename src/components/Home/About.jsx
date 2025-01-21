import { Element } from "react-scroll";
import { motion } from "framer-motion";

function About() {
    return (
        <Element id="about" name="about">
            <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center text-secondary text-md font-montserratreg mt-20"
                >
                Tentang Desa Dilem
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center font-montserratreg text-gray-700"
                >
                Ketahui sejarah dari desa dilem
                </motion.p>
                <div className="mt-12 flex gap-4 justify-center rounded-md flex-col xl:flex-row">
                    <motion.img
                        src="/bromo.jpg"
                        className="w-[34rem] h-96 rounded-xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    />
                    <motion.div
                        className="xl:w-[36rem]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <p className="px-2">
                        Sejarah Desa Dilem adalah Desa Dilem yang dimpimpin oleh Pak Kades Heru dan Bu Kades Nunung Viliana, sejarah Desa Dilem adalah dimana Desa Dilem berasal dari Upeti rakyat Desa Dilem kepada Kanjeng Adipati berupa Buah Durian Bido. 
                        <br/><br/>
                        Buah Durian Bido adalah buah yang sangat besar, sehingga karena bentuknya besar ini dan enak rasanya maka pemberian nama tersebut adalah dilem yang berarti "dipuji".
                        <br/><br/>
                        Sejak dari kisah singkat tersebut hingga saat ini nama tersebut dijadikan sebuah simbol ataupun pengingat yang menjadikan asal muasal dari terbentuknya Desa Dilem itu sendiri.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </Element>
    );
}

export default About;

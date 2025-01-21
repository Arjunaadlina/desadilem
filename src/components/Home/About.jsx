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
                        fiuaebiubfiuaebfubeuibaubfuiabduwabduawidba bawud bawuid bawu dbuwi
                        dbiua dbwadaw dbawui dbwau dbwd baw dbwuaibwiabaid wabid bciuaoeiv
                        eapv apc awp uaebfkaw fbwadu bcuiw bci.
                        <br />
                        <br /> wabciwa cbwauc bawic waudc wabciwa cbawi cbwuia cbwu dbcwiau
                        cbaiubsjciauewic b fiuaebiubfiuaebfubeuibaubfuiabduwabduawidba
                        bawud bawuid bawu dbuwi dbiua dbwadaw dbawui dbwau dbwd baw dbwuaibwiabaid wabid.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </Element>
    );
}

export default About;

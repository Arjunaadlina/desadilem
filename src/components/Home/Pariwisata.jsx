import Card from "../Pariwisata/Card"

function Pariwisata() {
    return (
        <div className="mt-8">
            <div className="p-4 mt-4 flex items-center justify-center flex-col">
                <div>
                    <p className="text-secondary text-md font-montserratreg text-center">Temukan Pariwisata Lokal</p>
                    <p className="text-center font-montserratbold text-4xl mt-2">PARIWISATA POPULER</p>
                    <p className="font-montserratreg mt-1 text-gray-700">Pariwisata yang populer di desa dilem dan banyak digemari oleh masyarakat setempat maupun luar wilayah</p>
                </div>
                <div className="mt-8 flex justify-between items-center gap-6 flex-col">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Pariwisata
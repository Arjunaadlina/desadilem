import Card from "../Umkm/Card/Card"

function Umkm() {
    return (
        <div className="p-4 mt-4 flex items-center justify-center flex-col">
            <div>
                <p className="text-secondary text-md font-montserratreg text-center">Temukan UMKM Lokal</p>
                <p className="text-center font-montserratbold text-4xl mt-2">UMKM POPULER</p>
                <p className="font-montserratreg mt-1 text-gray-700">UMKM yang populer di desa dilem dan banyak digemari oleh masyarakat setempat maupun luar wilayah</p>
            </div>
            <div className="mt-8 flex justify-between items-center gap-8">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Umkm
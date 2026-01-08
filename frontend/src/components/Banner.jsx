function Banner({scrollToProducts}) {
    return (
        <section className="relative w-screen overflow-hidden font-sans">
            <div className="absolute inset-0 flex justify-center">
                <div
                    className="w-full min-[1600px]:w-[80%] bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://zabugorshiki.com/wp-content/uploads/2022/09/bal.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-r md:from-black/40 md:to-transparent min-[1600px]:hidden" />
                </div>
            </div>

            <div className="relative z-10 h-[400px] md:h-[500px] lg:h-[600px] flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase leading-tight tracking-tight">
                        Welcome to <span className="text-blue-500">Voda</span>
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-md leading-relaxed">
                        Чистая питьевая вода и профессиональное оборудование для дома и офиса в Казахстане.
                    </p>
                    <div className="mt-8">
                        <button onClick={(e) => { e.preventDefault(); scrollToProducts();}} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold uppercase transition-all shadow-lg active:scale-95">
                            Смотреть каталог
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
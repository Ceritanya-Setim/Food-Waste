export const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand & Socials */}
                    <div className="space-y-6 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="bg-white p-1 rounded-lg">
                                <Leaf className="text-black" size={18} fill="currentColor" />
                            </div>
                            <span className="font-bold text-xl uppercase tracking-tighter italic">FoodSave</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Platform yang menghubungkan restoran dengan pembeli untuk mengurangi food waste.
                        </p>
                        <div className="flex gap-4 text-slate-400">
                            <Facebook size={20} className="hover:text-white cursor-pointer" />
                            <Twitter size={20} className="hover:text-white cursor-pointer" />
                            <Instagram size={20} className="hover:text-white cursor-pointer" />
                            <Linkedin size={20} className="hover:text-white cursor-pointer" />
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 gap-8 md:col-span-2">
                        <div className="space-y-4">
                            <h5 className="font-bold text-sm uppercase tracking-wider">Tentang Kami</h5>
                            <ul className="text-slate-400 text-sm space-y-3">
                                <li className="hover:text-white cursor-pointer">Cara Kerja</li>
                                <li className="hover:text-white cursor-pointer">Blog</li>
                                <li className="hover:text-white cursor-pointer">Karir</li>
                                <li className="hover:text-white cursor-pointer">Press</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-bold text-sm uppercase tracking-wider">Bantuan</h5>
                            <ul className="text-slate-400 text-sm space-y-3">
                                <li className="hover:text-white cursor-pointer">Pusat Bantuan</li>
                                <li className="hover:text-white cursor-pointer">FAQ</li>
                                <li className="hover:text-white cursor-pointer">Hubungi Kami</li>
                                <li className="hover:text-white cursor-pointer">Kebijakan Privasi</li>
                            </ul>
                        </div>
                    </div>

                    {/* Download App */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-sm uppercase tracking-wider">Download App</h5>
                        <div className="space-y-3">
                            <button className="w-full bg-white text-black flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs">
                                <span>DOWNLOAD DI APP STORE</span>
                            </button>
                            <button className="w-full border border-slate-700 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs hover:bg-slate-900">
                                <span>DOWNLOAD DI GOOGLE PLAY</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px] space-y-4">
                    <div className="flex justify-center gap-6 mb-4">
                        <span className="hover:text-white cursor-pointer">Syarat & Ketentuan</span>
                        <span className="hover:text-white cursor-pointer">Kebijakan Privasi</span>
                        <span className="hover:text-white cursor-pointer">Cookies</span>
                    </div>
                    <p>© 2024 FoodSave Indonesia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
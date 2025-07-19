import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
    views: number  // Nuevo prop para las vistas
}

export default function HandleData({ data, views }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center font-black">{data.handle}</p>
            {data.image && <img src={data.image} className="max-w-[250px] mx-auto" />}

            <p className="text-lg text-center font-bold">{data.description}</p>
            
            {/* CONTADOR DE VISTAS */}
            <div className="flex justify-center">
                <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm font-medium">
                            {views.toLocaleString()} {views === 1 ? 'vista' : 'vistas'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-20 flex flex-col gap-6">
                {links.length ?  
                    links.map(link => (
                        <a
                            key={link.name}
                            className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <img src={`/social/icon_${link.name}.svg`} alt="imagen red social" className="w-12" />
                            <p className="text-black capitalize font-bold text-lg">Visita mi: {link.name}</p>
                        </a>
                    ))
                : <p className="text-center">No hay enlaces en este perfil</p>}
            </div>

        </div>
    )
}
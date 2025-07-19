import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getUserByHandle, incrementViews } from '../api/DevTreeAPI'
import HandleData from '../components/HandleData'

// Componente de loading mejorado
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950">
    <div className="text-center space-y-4">
      {/* Spinner animado */}
      <div className="relative w-16 h-16 mx-auto">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin"></div>
        {/* Punto central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-2">
        <p className="text-white text-xl font-medium">Cargando perfil...</p>
        <p className="text-slate-400 text-sm">Esto solo tomará un momento</p>
      </div>
    </div>
  </div>
)

export default function HandleView() {
    const params = useParams()
    const handle = params.handle!
    const [currentViews, setCurrentViews] = useState<number>(0)
    
    const { data, error, isLoading } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })

    // INCREMENTAR VISTAS AUTOMÁTICAMENTE
    useEffect(() => {
        if (data && handle) {
            // Inicializar con las vistas actuales usando type assertion
            setCurrentViews((data as any).views || 0)
            
            // Incrementar vistas cuando se carga el perfil
            incrementViews(handle)
                .then(() => {
                    // Simplemente incrementar en 1
                    setCurrentViews(prev => prev + 1)
                })
                .catch((error) => {
                    console.error('Error incrementando vistas:', error)
                    // Si hay error, mantener el valor actual
                })
        }
    }, [data, handle])

    if (isLoading) return <LoadingSpinner />
    if (error) return <Navigate to={'/404'} />
    
    if (data) {
        return <HandleData data={data} views={currentViews} />
    }
    
    return null
}
import { Link } from 'react-router-dom'

export default function NotFoundView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        {/* Icono de usuario con X */}
        <div className="w-24 h-24 mx-auto mb-6 bg-slate-700/50 rounded-full flex items-center justify-center relative">
          <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Usuario No Encontrado
        </h1>
        
        <p className="text-slate-300 text-lg max-w-md mx-auto">
          Lo sentimos, no pudimos encontrar el perfil que buscas. 
          Verifica que el nombre de usuario sea correcto.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Ir al Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  )
}
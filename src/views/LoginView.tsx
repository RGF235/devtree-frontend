import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import { LoginForm } from '../types'
import api from '../config/axios'

export default function LoginView() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    setIsSubmitting(true)
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      toast.success('¡Bienvenido de nuevo!')
      navigate('/admin')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h1 className='text-4xl text-white font-bold'>Iniciar Sesión</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-8 mt-10 shadow-2xl"
        noValidate
      >
        {/* Email Field */}
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-xl text-slate-700 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            E-mail
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 
                         bg-slate-50 focus:bg-white focus:outline-none placeholder-slate-400 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-slate-200 focus:border-cyan-400 focus:shadow-lg'
              }`}
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Password Field */}
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-xl text-slate-700 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 
                         bg-slate-50 focus:bg-white focus:outline-none placeholder-slate-400 ${
                errors.password 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-slate-200 focus:border-cyan-400 focus:shadow-lg'
              }`}
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 text-lg uppercase rounded-lg font-bold transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
              : 'bg-cyan-400 hover:bg-cyan-500 active:scale-95 text-slate-600 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-slate-600/30 border-t-slate-600 rounded-full animate-spin"></div>
              Iniciando Sesión...
            </span>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <nav className='mt-10'>
        <Link
          className='text-center text-white text-lg block hover:text-cyan-400 transition-colors duration-200'
          to="/auth/register"
        >¿No tienes cuenta? Crea una aquí</Link>
      </nav>
    </>
  )
}
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ErrorMessage from '../components/ErrorMessage'
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevTreeAPI'
import { useNavigate } from 'react-router-dom'


export default function ProfileView() {
    const queryClient = useQueryClient()
    const data : User = queryClient.
    getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ defaultValues: {
        handle: data.handle,
        description: data.description
    } })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data
                }
            })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user : User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    const navigate = useNavigate()


    return (
        <div className="space-y-6" >
            {/* CONTADOR DE VISTAS - Solo visible para el dueño del perfil */}
            <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-lg font-semibold">
                        {data.views?.toLocaleString() || 0} visualizaciones
                    </span>
                </div>
                <p className="text-center text-sm text-gray-500 mt-1">
                    Personas que han visto tu perfil
                </p>
                <div className="text-center mt-4">
                    <button
                        className="bg-gray-200 text-sm text-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        onClick={() => navigate('/user/history')}
                    >
                        Ver historial de enlaces
                    </button>
                </div>

            </div>

            {/* FORMULARIO DE EDICIÓN */}
            <form
                className="bg-white p-10 rounded-lg space-y-5"
                onSubmit={handleSubmit(handleUserProfileForm)}
            >
                <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
                <div className="grid grid-cols-1 gap-2">
                    <label
                        htmlFor="handle"
                    >Handle:</label>
                    <input
                        type="text"
                        className="border-none bg-slate-100 rounded-lg p-2"
                        placeholder="handle o Nombre de Usuario"
                        {...register('handle', {
                            required: "El Nombre de Usuario es obligatorio"
                        })}
                    />

                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label
                        htmlFor="description"
                    >Descripción:</label>
                    <textarea
                        className="border-none bg-slate-100 rounded-lg p-2"
                        placeholder="Tu Descripción"
                        {...register('description', {
                            required: "La Descripción es obligatoria"
                        })}
                    />

                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label
                        htmlFor="image"
                    >Imagen:</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        className="border-none bg-slate-100 rounded-lg p-2"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Guardar Cambios'
                />
            </form>
        </div>
    )
}
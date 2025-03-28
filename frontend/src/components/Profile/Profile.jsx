import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { getProfile, logoutUser } = useUser()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile()
      if (data) {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [getProfile])

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <div className='container p-3'>
      <div className='card mx-auto shadow' style={{ maxWidth: "400px" }}>
        <div className='card-body text-center'>
          <h2 className='card-title'>Perfil de usuario</h2>

          {loading ? (
            <p>Cargando perfil...</p>
          ) : profile ? (
            <>
              <p className='text-muted'>
                Email: <strong>{profile.email}</strong>
              </p>
              {/* Puedes agregar más datos aquí si la API los entrega */}
            </>
          ) : (
            <p className='text-danger'>No se pudo cargar el perfil</p>
          )}

          <button className='btn btn-danger mt-3' onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

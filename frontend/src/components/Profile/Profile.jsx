


const userProfile = () => {
  const userEmail = "oscargarin@gmail.com"

  return (
    <div className='container p-3'>
      <div className='card mx-auto shadow' style={{ maxWidth: "400px" }}>
        <div className='card-body text-center'>
          <h2 className='card-title'>Perfil de usuario</h2>

              <p className='text-muted'>Email: <strong>{userEmail}</strong></p>
              <button className='btn btn-danger mt-3'>
                Cerrar sesión
              </button>

        </div>
      </div>
    </div>
  )
}

export default userProfile
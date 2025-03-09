
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Outlet></Outlet>
      <ToastContainer />
    </>
  )
}

export default App

import HostNavbar from '../components/host/HostNavbar'
import { Outlet } from 'react-router'

const Host = () => {
    return (
         <div className="min-h-screen  bg-white">
            <HostNavbar />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Host
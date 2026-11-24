import { NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';


const NavBar = ({navItems, host,  userName = 'Y', onSwitchToTraveling }) => {
    const navigate = useNavigate();

    const handleSwitchToTraveling = () => {
        if (onSwitchToTraveling) onSwitchToTraveling();
        else navigate('/');
    };

    return (
        <nav className="w-full fixed top-0 z-10 bg-(--light-yellow) border-b border-(--line)">
            <div className="flex items-center justify-between px-6 h-16">
                <p
                    onClick={() => navigate('/host/listings')}
                    className="flex items-center shrink-0 cursor-pointer gap-2" 
                    aria-label="Host home"
                >
                    <span className="text-(--dark-pink) text-2xl font-bold tracking-tight">
                        BookMyRooms
                    </span>
                </p>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    'text-sm transition-colors relative py-1',
                                    isActive
                                        ? 'text-(--ink) font-medium border-b-2 border-(--ink)'
                                        : 'text-(--dark-pink) hover:text-(--hover-pink)',
                                ].join(' ')
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSwitchToTraveling}
                        className="hidden shadow-sm md:block text-sm font-medium text-(--ink) hover:bg-(--subtle-bg) px-4 py-2 rounded-full transition-colors"
                    >

                       { host? "Switch to traveling":"Switch to host"}
                    </button>

                    <button
                        onClick={handleSwitchToTraveling}
                        className="text-white bg-(--dark-pink) w-9 h-9 rounded-full  text-sm font-semibold flex items-center justify-center transition-colors"
                        aria-label="Account"
                    >
                        {userName.charAt(0).toUpperCase()}
                    </button>

                    <button
                        className=" w-9 h-9 rounded-full bg-(--subtle-bg) hover:bg-(--line) flex items-center justify-center transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
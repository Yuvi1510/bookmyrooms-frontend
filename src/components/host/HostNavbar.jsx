import { NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Today', to: '/host/today' },
    { label: 'Calendar', to: '/host/calendar' },
    { label: 'Listings', to: '/host/listings' },
    { label: 'Revenue', to: '/host/Revenue' },
];

const HostNavbar = ({ userName = 'Y', onSwitchToTraveling }) => {
    const navigate = useNavigate();

    const handleSwitchToTraveling = () => {
        if (onSwitchToTraveling) onSwitchToTraveling();
        else navigate('/');
    };

    return (
        <nav className="w-full fixed top-0 z-10 bg-(--light-yellow) border-b border-(--line)">
            <div className="flex items-center justify-between px-6 h-16">
                {/* ---------- Left: Logo ---------- */}
                <button
                    onClick={() => navigate('/host/listings')}
                    className="flex items-center shrink-0"
                    aria-label="Host home"
                >
                    <span className="text-(--dark-pink) text-2xl font-bold tracking-tight">
                        BookMyRooms
                    </span>
                </button>

                {/* ---------- Center: Nav Links ---------- */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
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

                {/* ---------- Right: Actions ---------- */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSwitchToTraveling}
                        className="hidden md:block text-sm font-medium text-(--ink) hover:bg-(--subtle-bg) px-4 py-2 rounded-full transition-colors"
                    >
                        Switch to traveling
                    </button>

                    {/* Avatar */}
                    <button
                        className="w-9 h-9 rounded-full bg-(--dark-pink) text-white text-sm font-semibold flex items-center justify-center hover:bg-(--dark-pink-hover) transition-colors"
                        aria-label="Account"
                    >
                        {userName.charAt(0).toUpperCase()}
                    </button>

                    {/* Hamburger */}
                    <button
                        className="w-9 h-9 rounded-full bg-(--subtle-bg) hover:bg-(--line) flex items-center justify-center transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default HostNavbar;
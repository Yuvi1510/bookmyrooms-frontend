import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";

const GuestNavbar = () => {
    const NAV_ITEMS = [
        { label: 'Home', to: '/' },
        { label: 'Accomodations', to: '/rooms' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
    ];

    const navigate = useNavigate();

    return (
        <NavBar navItems={NAV_ITEMS} userName="Y" onSwitchToTraveling={() => navigate("/host")}/>
    );
}

export default GuestNavbar;
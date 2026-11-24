import GuestNavbar from "./GuestNavbar";
import Popular from "./home/Popular";

const Home = () => {
    return (
        <>
            <GuestNavbar />
            <div className="mt-15 p-4">
                <Popular/>
            </div>
        </>
    );
}

export default Home;
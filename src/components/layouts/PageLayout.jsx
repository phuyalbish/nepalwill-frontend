import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

const PageLayout = ({ children }) => {
    return (
        <>
            <div >
                <Navbar />
                <div className="px-[2.5rem] py-[1rem] bg-background flex flex-col gap-32">
                    { children }
                </div>
                <Footer className="px-[2.5rem] py-[1rem]" />
            </div>
        </>
    );
}

export default PageLayout;

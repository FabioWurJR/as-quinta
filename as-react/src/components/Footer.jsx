const Footer = () => {
    return (
        <footer className="bg-black text-white mt-16 py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} PerfumeStore
                </p>
            </div>
        </footer>
    );
};

export default Footer;

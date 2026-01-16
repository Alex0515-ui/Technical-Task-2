import React from "react";
import Banner from "../components/Banner";
import ProductSlider from "../components/ProductSlider";
import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import OrderModal from "../components/OrderModal";

function MainPage() {

    const productsRef = React.useRef(null);
    const aboutRef = React.useRef(null);
    const contactsRef = React.useRef(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSection = (ref) => {
        contactsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Header scrollToProducts={scrollToProducts} scrollToAbout={scrollToAbout} scrollToContacts={() => scrollToSection(contactsRef)} />
            <Banner scrollToProducts={scrollToProducts} productsRef={productsRef} />
            <AboutSection aboutRef={aboutRef} />
            <ProductSlider productsRef={productsRef} scrollToProducts={scrollToProducts} openModal={openModal} />
            <Footer contactsRef={contactsRef} openModal={openModal} />

            <OrderModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
};

export default MainPage;
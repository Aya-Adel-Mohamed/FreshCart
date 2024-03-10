import React, { useState, useEffect } from "react";
import { BiChevronsUp } from "react-icons/bi";

const ScrollToTop = () => {

    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className='topToBtm'>
            <div className='iconPosition'>
                {" "}{showTopBtn && (<BiChevronsUp className='iconStyle' onClick={goToTop} />)}{" "}
            </div>
        </div>
    );
};
export default ScrollToTop;
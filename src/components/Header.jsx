import React from "react";
import { useSelector } from "react-redux";

const Header = () => {

    const { flights = [], isLoading } = useSelector((state) => state.flight || {});

    return (
        <header>
            <div>
                <img src="/logo-f.png" alt="" />
                <h2>Uçuş Radarı</h2>
            </div>
            <h4>{isLoading ? 'Uçuşlar Hesaplanıyor' : `${flights.length} Uçuş Bulundu`} </h4>
        </header>
    );
};

export default Header;
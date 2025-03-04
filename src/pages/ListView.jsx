import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ openModal }) => {
    const { flights = [] } = useSelector((state) => state.flight || {});

    const[itemOffset, setItemOffset] = useState(0);

    /** Pagination Sistemi Kurmak için Gerekli Değerler
     * Sayfa sayısı
     * sayfada gösterilecek eleman sayısı
     * ve o anki sayfada gösterilecek elemanlar(items)
     */
    

        // Sayfa başına gösterilecek eleman sayısı
        const itemsPerPage = 10;
        // Sonuncu elemanın sayısı
        const endOffset = itemOffset + itemsPerPage;
        // Sayfa başına o anda gösterilecek eleman dizisi
        const currentItems = flights.slice(itemOffset, endOffset);
        // Toplam sayfa sayısı
        const pageCount = Math.ceil(flights.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % flights.length;
            setItemOffset(newOffset)
        }

    return (
        <div className="list-page">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kuyruk Kodu</th>
                        <th>Enlem</th>
                        <th>Boylam</th>
                        <th>Detay Bilgisi</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((flight) => (
                        <tr key={flight.id}>
                            <td>{flight.id}</td>
                            <td>{flight.code}</td>
                            <td>{flight.lat}</td>
                            <td>{flight.lng}</td>
                            <td>
                                <button onClick={() => openModal(flight.id, flight.lat, flight.lng)}>Detay</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate className="pagination"
              pageCount = {pageCount}
              nextLabel = 'ileri >'
              previousLabel = '< geri'
              activeClassName="active"
              onPageChange={handlePageClick}
            />
        </div>
    );
};

export default ListView;
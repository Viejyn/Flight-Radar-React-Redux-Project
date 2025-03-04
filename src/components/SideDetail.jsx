import axios from 'axios';
import React, { useEffect, useState } from "react";
import { detailOptions } from '../helpers/constants';

const API_URL = import.meta.env.VITE_RAPIDAPI_URL;

const SideDetail = ({ detailId, setShowDetail, lat, lng }) => {

    // doğrulama: console.log('detay sayfası', detailId);
    const [detailInfo, setDetailInfo] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/detail?flight=${detailId}`, detailOptions)
        .then((res) => setDetailInfo(res.data))
        .catch((error) => console.log(error));
    }, [detailId]);

    return (
        <div className='detail-outer'>
            <div className='detail-inner'>
                <p className='close'>
                    <span onClick={() => setShowDetail(false)}>X</span>
                </p>
                {!detailInfo || !detailInfo.aircraft || !detailInfo.aircraft.model ? (
                    <p>Yükleniyor...</p>
                ) : (
                    <>
                    <h2>{detailInfo.aircraft?.model?.text || "Bilinmeyen Model"}</h2>
                    <h2>{detailInfo.aircraft?.model?.code || "Kod Yok"}</h2>
                    <p>Kuyruk No: {detailInfo.aircraft?.registration || "Bilinmiyor"}</p>
                    <p>📍 Haritadaki Konum: {lat}, {lng}</p>
                    {detailInfo.aircraft?.images?.large?.[0]?.src ? (
                        <img src={detailInfo.aircraft.images.large[0].src} alt=""/>
                    ) : (
                        <p>Görsel bulunamadı</p>
                    )}    
                    <p>Şirket: {detailInfo.airline?.name || "Bilinmeyen Şirket"}</p>
                    <p>
                        <span>Kalkış:</span>
                        {detailInfo.airport?.origin?.website ? (
                            <a href={detailInfo.airport.origin.website}>{detailInfo.airport.origin.name}</a>
                        ) : (
                            <span>Bilgi Yok</span>
                        )}    
                    </p>

                    <p>
                        <span>Hedef:</span>
                        {detailInfo.airport?.destination?.website ? (
                            <a href={detailInfo.airport.destination.website}>{detailInfo.airport.destination.name}</a>
                        ) : (
                            <span>Bilgi Yok</span>
                        )}        
                    </p>

                    <p>
                        <span>Durum </span>
                        <span className='status'>{detailInfo.status?.text || "Durum Bilgisi Yok"}</span>
                    </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SideDetail;
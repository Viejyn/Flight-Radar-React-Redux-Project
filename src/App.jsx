import { useEffect, useState } from 'react';
import Header from './components/Header';
import MapView from './pages/MapView';
import ListView from './pages/ListView';
import { useDispatch } from 'react-redux';
import { getFlights } from './redux/actions/flightActions';
import SideDetail from './components/SideDetail';

function App() {

  const [showMapView,setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [detailLat, setDetailLat] = useState(null);
  const [detailLng, setDetailLng] = useState(null);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getFlights());
  }, []);

  const openModal = (id, lat, lng) => {
    setDetailId(id);
    setDetailLat(lat);  
    setDetailLng(lng);  
    setShowDetail(true);
  }

  return (
    <>
    <Header />

    <div className='view-buttons'>
      <button className={showMapView ? 'active' : ''} onClick={()=>setShowMapView(true)}>Harita Görünümü</button>
      <button className={!showMapView ? 'active' : ''} onClick={()=>setShowMapView(false)}>Liste Görünümü</button>
    </div>

    {showMapView ? <MapView openModal={openModal} /> : <ListView openModal={openModal}/> }
    {showDetail && (
      <SideDetail 
        detailId={detailId} 
        lat={detailLat}
        lng={detailLng}
        setShowDetail={setShowDetail}
      />
    )}  
    </>
  );
}

export default App;

import {useState,useEffect} from 'react'
import ReactMapGL, {Marker,Popup} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import axios from '../../apiRequest/axios';
import mapimage from '../../assets/images/map_icon.png'
import classes from './Mapbox.module.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVjaGF1MDUyMSIsImEiOiJjbGlqN3l3bzgwNHZkM2txbzhiemdnZDlhIn0.L20rg56BLB6iTrMutkntMw';

const Mapbox  = () => {
    const [latitude,setLatitude] = useState(10.839581)
    const [longitude,setLongitude] = useState(106.793656)
    const [viewport,setViewport] = useState({
        with: "70vw",
        height:"70vh",
        zoom:12,
        latitude : latitude,
        longitude : longitude
    });
    const [showPopup,setShowPopup] = useState(false)
    const [address,setAddress] = useState("")


    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    //call api mapbox 
    const handleClickGetIp = () => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZHVjaGF1MDUyMSIsImEiOiJjbGlqN3l3bzgwNHZkM2txbzhiemdnZDlhIn0.L20rg56BLB6iTrMutkntMw`)
        .then(function(response) {
            setLatitude(response.data.features[0].center[1])
            setLongitude(response.data.features[0].center[0])
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {

        })
        localStorage.setItem("latitude",latitude);
        localStorage.setItem("longitude",longitude);
    }
    // console.log(latitude)
    // console.log(longitude)
    return(
        <div style={{width:"63vw", height:"60vh",}}>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                // onViewportChange={(viewport) => setViewport(viewport)}
                onMove={evt => setViewport(evt.viewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
            >
                <Marker
                    latitude={latitude}
                    longitude={longitude}
                    offsetLeft={-20}
                    offsetTop={-30}
                >
                    <img
                        onClick={() => setShowPopup(true)}
                        style={{height:50,width:50}}
                        src={mapimage}
                    />
                </Marker>

            </ReactMapGL>
            <div className={classes['input_address']}>
            <input type="text" onChange={handleChangeAddress} placeholder='Nhập địa chỉ nhận hàng'></input>
            <button onClick={handleClickGetIp}>Xác Nhận</button>
            </div>
        </div>
    )
}
export default Mapbox;
    
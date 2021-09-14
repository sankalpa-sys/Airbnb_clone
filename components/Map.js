import React,{useState} from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({searchResults}) {
    const [selectedLocation, setselectedLocation] = useState({})
    
    // Transform the search results objects into the { latitude: 52.516272, longitude: 13.377722 }, object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude : result.lat
    }))

    const center = getCenter(coordinates)
    const [viewport, setViewport] = useState(
        {
            height:"100%",
            width: "100%",
            latitude: center.latitude,
            longitude: center.longitude,
            zoom: 11,
        }

    )
    
    return (
        <ReactMapGL
           mapStyle = "mapbox://styles/sankalpa115/cktjw5fkx06my18jynqpm6qzw"
           mapboxApiAccessToken = {process.env.mapbox_key}
           {...viewport}
           onViewportChange={(nextViewPort)=> setViewport(nextViewPort)}

            >
                {searchResults.map(result => (
                    <div key= {result.long}>
                        <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                        >
                            <p role="img" className="cursor-pointer animate-bounce" onClick={()=> setselectedLocation(result)} aria-label="push-pin">
                            📍
                            </p>

                        </Marker>

                        {/*  the popup should show if we click on the pointer */}

                        {selectedLocation.long === result.long? (
                            <Popup onClose={()=> setselectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            
                            >
                            {result.title}</Popup>
                        ):(false)}
                    </div>
                ))}
        </ReactMapGL>
    )
}

export default Map

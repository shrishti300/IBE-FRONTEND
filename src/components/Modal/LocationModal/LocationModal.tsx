import React, { useEffect, useState } from "react";
import ReactMapGl, {
  MapLayerMouseEvent,
  Marker,
  ViewState,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./LocationModal.scss";
import RoomIcon from "@mui/icons-material/Room"; // Import the Room icon

interface ViewPortState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface Place {
  lat: number;
  long: number;
}

const LocationModal: React.FC = () => {
  const [newPlace, setNewPlace] = useState<Place | null>(null);
  const [viewPort, setViewPort] = useState<ViewPortState>({
    latitude: 12.9270897,
    longitude: 77.6226934,
    zoom: 14,
  });

  useEffect(() => {});

  function handleClick(e: MapLayerMouseEvent) {
    const { lngLat } = e;
    if (lngLat) {
      const { lng, lat } = lngLat;
      setNewPlace({
        lat,
        long: lng,
      });
    }
  }
  return (
    <div className="locationmodal_main">
     
        <ReactMapGl
          {...viewPort}
          mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN as string}
          mapStyle="mapbox://styles/shrishti01/cluthzgb4001i01o3g3l45twh"
          width="100%"
          height="100%" // Ensure to set height as well
          onViewportChange={(viewPort) =>
            setViewPort(viewPort as ViewPortState)
          }
          //  onClick={handleClick} // Use onClick instead of onDblClick
        >

          <>
            <Marker
              latitude={viewPort.latitude}
              longitude={viewPort.longitude}
              offsetLeft={-3.5 * viewPort.zoom}
              offsetTop={-7 * viewPort.zoom}
            >
              <RoomIcon
                style={{ fontSize: 4 * viewPort.zoom, color: "tomato" }}
              />
            </Marker>
          </>
        </ReactMapGl>
</div>
  );
};

export default LocationModal;

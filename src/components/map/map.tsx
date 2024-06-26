import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';

import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '@/constants';
import useMap from '@/hooks/use-map';
import 'leaflet/dist/leaflet.css';

import {Location, City} from '@/types';

type Point = {
  location: Location;
  id: string;
}

type MapProps = {
  className: string;
  points: Point[];
  selectedPoint?: string;
  city: City;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map({className, points, city, selectedPoint}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section className={`${className} map`} ref={mapRef}/>
  );
}

export default Map;

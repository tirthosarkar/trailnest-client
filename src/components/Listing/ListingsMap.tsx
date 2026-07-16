// components/Listing/ListingsMap.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Loader2 } from "lucide-react";
import type { Map, Marker, LatLngTuple, LatLngBounds } from "leaflet";
import type { ExploreItem } from "@/types/explore";

interface ListingsMapProps {
  items: ExploreItem[];
}

interface LeafletGlobal {
  L: {
    map: (element: HTMLElement, options?: object) => Map;
    tileLayer: (url: string, options?: object) => { addTo: (map: Map) => void };
    marker: (latlng: LatLngTuple, options?: object) => Marker;
    icon: (options: object) => unknown;
    featureGroup: (layers: Marker[]) => { getBounds: () => LatLngBounds };
    Icon: {
      Default: {
        prototype: {
          _getIconUrl?: unknown;
        };
      };
    };
  };
}

const defaultLocation: LatLngTuple = [40.7128, -74.006];

function escapeHtml(str: string) {
  return str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );
}

const ListingsMap = ({ items }: ListingsMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Declared first, since initializeMap depends on it.
  const plotMarkers = useCallback(() => {
    const leafletGlobal = window as unknown as LeafletGlobal;
    const L = leafletGlobal.L;
    if (!L || !mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (items.length === 0) return;

    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const newMarkers = items.map((item) => {
      const marker = L.marker([item.location.lat, item.location.lng], {
        icon: customIcon,
      });

      const popupHtml = `
        <div style="min-width:160px">
          <p style="font-weight:600;margin:0 0 4px">${escapeHtml(item.name)}</p>
          <p style="margin:0 0 6px;color:#6b7280;font-size:12px">$${item.pricePerDay}/day</p>
          <a href="/explore/${item._id}" style="color:#2563eb;font-size:13px;font-weight:500">
            View Details →
          </a>
        </div>
      `;
      marker.bindPopup(popupHtml);
      marker.addTo(mapRef.current!);
      return marker;
    });

    markersRef.current = newMarkers;

    if (newMarkers.length === 1) {
      mapRef.current.setView(
        [items[0].location.lat, items[0].location.lng],
        13,
      );
    } else {
      const bounds = L.featureGroup(newMarkers).getBounds();
      mapRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [items]);

  // Declared after plotMarkers, since it calls plotMarkers.
  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || typeof window === "undefined") return;

    const leafletGlobal = window as unknown as LeafletGlobal;
    if (!leafletGlobal.L) {
      setMapError(true);
      setIsLoading(false);
      return;
    }

    const L = leafletGlobal.L;

    try {
      delete L.Icon.Default.prototype._getIconUrl;

      const mapInstance = L.map(mapContainerRef.current, {
        center: defaultLocation,
        zoom: 4,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
      setIsLoading(false);
      plotMarkers();
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
      setIsLoading(false);
    }
  }, [plotMarkers]);

  // Load Leaflet script/css
  useEffect(() => {
    const leafletGlobal = window as unknown as LeafletGlobal;
    if (typeof window !== "undefined" && leafletGlobal.L) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsScriptLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      setMapError(true);
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  // Initialize map once the script is ready
  useEffect(() => {
    if (isScriptLoaded && !mapRef.current) {
      initializeMap();
    }
  }, [isScriptLoaded, initializeMap]);

  // Re-plot markers whenever items change
  useEffect(() => {
    if (mapRef.current) {
      plotMarkers();
    }
  }, [items, plotMarkers]);

  if (mapError) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
        <div className="text-center p-6">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Failed to load map asset configurations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <p className="text-xs text-gray-400 font-medium">
              Mounting map engine...
            </p>
          </div>
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="h-full w-full z-10"
        style={{ background: "#f8f9fa" }}
      />
    </div>
  );
};

export default ListingsMap;

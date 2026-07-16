"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import type { Map, Marker, LatLngTuple, LeafletMouseEvent } from "leaflet";

interface ListingMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

interface LeafletGlobal {
  L: {
    map: (element: HTMLElement, options?: object) => Map;
    tileLayer: (url: string, options?: object) => { addTo: (map: Map) => void };
    marker: (latlng: LatLngTuple, options?: object) => Marker;
    icon: (options: object) => unknown;
    Icon: {
      Default: {
        prototype: {
          _getIconUrl?: unknown;
        };
      };
    };
  };
}

const ListingMap = ({
  onLocationSelect,
  selectedLocation,
}: ListingMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const isDraggingRef = useRef(false);

  const defaultLocation: LatLngTuple = [40.7128, -74.006];

  useEffect(() => {
    const leafletGlobal = window as unknown as LeafletGlobal;
    if (typeof window !== "undefined" && leafletGlobal.L) {
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

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      setMapError(true);
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && !mapRef.current) {
      initializeMap();
    }
  }, [isScriptLoaded]);

  const initializeMap = () => {
    if (!mapContainerRef.current || typeof window === "undefined") return;

    const leafletGlobal = window as unknown as LeafletGlobal;
    if (!leafletGlobal.L) {
      setMapError(true);
      setIsLoading(false);
      return;
    }

    const L = leafletGlobal.L;

    try {
      // ✅ Fix Next.js Leaflet Default Marker Icon path binding bug
      delete L.Icon.Default.prototype._getIconUrl;

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

      const initialCoords = selectedLocation
        ? ([selectedLocation.lat, selectedLocation.lng] as LatLngTuple)
        : defaultLocation;

      const mapInstance = L.map(mapContainerRef.current, {
        center: initialCoords,
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      const markerInstance = L.marker(initialCoords, {
        draggable: true,
        autoPan: true,
        icon: customIcon, // ✅ Apply clean fallback icons directly
      }).addTo(mapInstance);

      // Track drag interactions to safely mute automatic view-snapping loops
      markerInstance.on("dragstart", () => {
        isDraggingRef.current = true;
      });

      markerInstance.on("dragend", function (this: Marker) {
        const position = this.getLatLng();
        onLocationSelect(position.lat, position.lng);
        isDraggingRef.current = false;
      });

      mapInstance.on("click", (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        markerInstance.setLatLng([lat, lng]);
        onLocationSelect(lat, lng);
      });

      mapRef.current = mapInstance;
      markerRef.current = markerInstance;
      setIsLoading(false);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
      setIsLoading(false);
    }
  };

  // Synchronize dynamic updates externally (e.g. Geocoding inputs) safely
  useEffect(() => {
    if (
      selectedLocation &&
      mapRef.current &&
      markerRef.current &&
      !isDraggingRef.current
    ) {
      const { lat, lng } = selectedLocation;
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng], mapRef.current.getZoom());
    }
  }, [selectedLocation]);

  if (mapError) {
    return (
      <div className="flex h-100 items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
        <div className="text-center p-6">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Failed to load map asset configurations.
          </p>
          <button
            onClick={() => {
              setMapError(false);
              setIsLoading(true);
              setIsScriptLoaded(false);
              initializeMap();
            }}
            className="mt-3 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-100 w-full border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl z-20">
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
        className="h-full w-full rounded-xl z-10"
        style={{ background: "#f8f9fa" }}
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-medium text-gray-600 shadow-sm border border-gray-100 backdrop-blur-md z-1000 pointer-events-none">
        💡 Click to drop a pin or drag target anchor to adjust
      </div>
    </div>
  );
};

export default ListingMap;

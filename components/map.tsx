"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Phone, Clock, ExternalLink, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

// Fix Leaflet marker icon issue
const markerIcon = L.icon({
  iconUrl: "/placeholder.svg?height=41&width=25",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const userIcon = L.icon({
  iconUrl: "/placeholder.svg?height=41&width=25",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type Centre = {
  id: number
  name: string
  address: string
  phone: string
  hours: string
  services: string[]
  coordinates: [number, number]
}

type MapProps = {
  centres: Centre[]
  selectedCentre: number | null
  setSelectedCentre: (id: number | null) => void
  userLocation: [number, number] | null
}

// Component to recenter map when user location changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, map, zoom])

  return null
}

export default function Map({ centres, selectedCentre, setSelectedCentre, userLocation }: MapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]) // France center
  const [mapZoom, setMapZoom] = useState(5)

  useEffect(() => {
    // If user location is available, center map on user
    if (userLocation) {
      setMapCenter(userLocation)
      setMapZoom(13)
    }
    // If a centre is selected, center map on that centre
    else if (selectedCentre) {
      const centre = centres.find((c) => c.id === selectedCentre)
      if (centre) {
        setMapCenter(centre.coordinates)
        setMapZoom(15)
      }
    }
    // If centres are filtered to a small number, center on the first one
    else if (centres.length === 1) {
      setMapCenter(centres[0].coordinates)
      setMapZoom(15)
    } else if (centres.length > 1 && centres.length <= 3) {
      setMapCenter(centres[0].coordinates)
      setMapZoom(10)
    }
  }, [centres, selectedCentre, userLocation])

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
      <ChangeView center={mapCenter} zoom={mapZoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location marker */}
      {userLocation && (
        <>
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center p-1">
                <strong>Votre position</strong>
              </div>
            </Popup>
          </Marker>
          <Circle
            center={userLocation}
            radius={2000}
            pathOptions={{
              fillColor: "#4f46e5",
              fillOpacity: 0.1,
              color: "#4f46e5",
              weight: 1,
            }}
          />
        </>
      )}

      {/* Centre markers */}
      {centres.map((centre) => (
        <Marker
          key={centre.id}
          position={centre.coordinates}
          icon={markerIcon}
          eventHandlers={{
            click: () => {
              setSelectedCentre(centre.id)
            },
          }}
        >
          <Popup>
            <div className="max-w-xs p-1">
              <h3 className="font-semibold text-lg mb-1">{centre.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{centre.address}</p>

              <div className="space-y-1 mb-3">
                <div className="flex items-center text-sm">
                  <Phone className="h-3 w-3 mr-1 text-indigo-600" />
                  <span>{centre.phone}</span>
                </div>
                <div className="flex items-start text-sm">
                  <Clock className="h-3 w-3 mr-1 mt-1 text-indigo-600" />
                  <span>{centre.hours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {centre.services.map((service, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-1.5 py-0.5 rounded-full">
                    {service}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs py-1 h-auto"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.address)}`,
                      "_blank",
                    )
                  }
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Google Maps
                </Button>
                {userLocation && (
                  <Button
                    size="sm"
                    className="w-full text-xs py-1 h-auto bg-indigo-600 hover:bg-indigo-700"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${encodeURIComponent(centre.address)}`,
                        "_blank",
                      )
                    }
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Itinéraire
                  </Button>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

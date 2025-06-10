import React, { useState, useEffect } from 'react';
import InputField from './ui/inputField';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';

type Coordinates = {
  latitude: number;
  longitude: number;
};

const SightedPetReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    color: [] as string[],
    size: '',
    description: '',
    date: '',
    image: null as File | null,
    coords: null as Coordinates | null,
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [geoError, setGeoError] = useState('');
  const colorOptions = ['Negro', 'Blanco', 'Gris', 'Café', 'Amarillo', 'otro'];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSearch = async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setFormData({
          ...formData,
          coords: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          },
        });
        setGeoError('');
      } else {
        setGeoError('Dirección no encontrada.');
      }
    } catch (err) {
      setGeoError('Error al buscar la dirección.');
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    ['color', 'size', 'description', 'date'].forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });
    if (!formData.image) newErrors['image'] = 'Debe subir una imagen';
    if (!formData.color || formData.color.length === 0) newErrors['color'] = 'Debe seleccionar al menos un color';
    if (!formData.coords) newErrors['coords'] = 'Ubicación no disponible';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData({
          ...formData,
          coords: {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          },
        });
      },
    });

    return formData.coords ? (
      <Marker position={[formData.coords.latitude, formData.coords.longitude]}>
        <Popup>Ubicación del avistamiento</Popup>
      </Marker>
    ) : null;
  };

  function RecenterMap({ coords }: { coords: Coordinates }) {
    const map = useMap();
    useEffect(() => {
      map.setView([coords.latitude, coords.longitude], 16);
    }, [coords, map]);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Enviando reporte de avistamiento...', formData);
      // Aquí iría el POST al backend
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-green-800 mb-2">👀 Reporte de Avistamiento</h2>
        <p className="text-gray-600 mb-6">Indica los detalles del animal que avistaste:</p>
        <div className="grid grid-cols-1 gap-6">

          <div>
            <label className="text-sm font-medium text-gray-700">Color(es)</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {colorOptions.map((color) => (
                <label key={color} className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    value={color}
                    checked={formData.color.includes(color)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        color: checked
                          ? [...prev.color, value]
                          : prev.color.filter((c) => c !== value),
                      }));
                    }}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
            {errors.color && <p className="text-xs text-red-500 mt-1">⚠️ {errors.color}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Tamaño</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleSelectChange}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-lg p-2"
            >
              <option value="">Selecciona un tamaño</option>
              <option value="mini">Mini</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
            {errors.size && <p className="text-xs text-red-500 mt-1">⚠️ {errors.size}</p>}
          </div>

          <InputField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalles visibles del animal o situación"
            isTextArea
            error={errors.description}
          />

          <InputField
            label="Fecha y hora del avistamiento"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Imagen del animal</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
            {errors.image && <p className="text-xs text-red-500 mt-1">⚠️ {errors.image}</p>}
          </div>

          <InputField
            label="Dirección aproximada del avistamiento"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej. Carrera 8 #45-67, Medellín"
            error={errors.address}
          />
          <button
            type="button"
            onClick={handleAddressSearch}
            className="bg-gray-200 w-fit px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition"
          >
            Buscar ubicación en el mapa
          </button>

          {formData.coords && (
            <MapContainer
              center={[formData.coords.latitude, formData.coords.longitude]}
              zoom={16}
              scrollWheelZoom={true}
              style={{ height: '300px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
              <RecenterMap coords={formData.coords} />
            </MapContainer>
          )}

        </div>
        <p className="text-sm text-gray-500 mt-2">
          También puedes hacer clic en el mapa para señalar la ubicación aproximada.
        </p>
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Enviar reporte
        </button>
        {geoError && <p className="text-sm text-red-500 mt-2">{geoError}</p>}
      </form>
    </div>
  );
};

export default SightedPetReportForm;

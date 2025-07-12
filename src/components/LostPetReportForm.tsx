import React, { useState, useEffect } from 'react';
import InputField from './ui/inputField';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

type Coordinates = {
  latitude: number;
  longitude: number;
};
const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    return data.display_name || "";
  } catch (err) {
    console.error("Error al obtener la dirección inversa:", err);
    return "";
  }
};

const LostPetReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    color: [] as string[],
    size: '',
    weight: '',
    description: '',
    date: '',
    image: null as File | null,
    coords: null as Coordinates | null,
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [geoError, setGeoError] = useState('');
  const [success, setSuccess] = useState(false);

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
    ['name', 'size', 'weight', 'description', 'date'].forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });
    if (!formData.color || formData.color.length === 0) newErrors['color'] = 'Debe seleccionar al menos un color';
    if (!formData.coords) newErrors['coords'] = 'Ubicación no disponible';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const LocationMarker = () => {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
      const addr = await reverseGeocode(lat, lon);

      setFormData((prev) => ({
        ...prev,
        coords: { latitude: lat, longitude: lon },
        address: addr, // actualiza el campo de dirección
      }));
    },
  });

  return formData.coords ? (
    <Marker position={[formData.coords.latitude, formData.coords.longitude]}>
      <Popup>Ubicación seleccionada</Popup>
    </Marker>
  ) : null;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;

     const form = new FormData();
    form.append("type", "lost");
    form.append("name", formData.name);
    form.append("color", formData.color[0]); // O combínalos en un string si el backend lo acepta
    form.append("approximate_size", formData.size);
    form.append("approximate_weight_kg", formData.weight);
    form.append("description", formData.description);
    form.append("date_time", formData.date);
    form.append("latitude", String(formData.coords?.latitude ?? 0));
    form.append("longitude", String(formData.coords?.longitude ?? 0));
    form.append("reporter_id", "11111111-1111-1111-1111-111111111111");
    if (formData.image) form.append("image", formData.image);
   

      try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/pet-reports`, {
    method: "POST",
    body: form,
  });

  console.log("✅ Respuesta del backend:", res);
  const text = await res.text();
  console.log("✅ Body de respuesta:", text);

  if (!res.ok) {
    throw new Error("Error al enviar el reporte.");
  }

  setSuccess(true);
      setFormData({
        name: '',
        color: [],
        size: '',
        weight: '',
        description: '',
        date: '',
        image: null,
        coords: null,
        address: '',
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setGeoError('Ocurrió un error al enviar el reporte.');
    }
  };

  function RecenterMap({ coords }: { coords: Coordinates }) {
    const map = useMap();
    useEffect(() => {
      map.setView([coords.latitude, coords.longitude], 16);
    }, [coords, map]);
    return null;
  }

  return (
    <div className="pt-20 min-h-screen bg-background-50 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">🐾 Reporte de Mascota Perdida</h2>
        <p className="text-gray-600 mb-6">Por favor completa la siguiente información:</p>

        {success && <p className="text-green-600 mb-4">✅ Reporte enviado correctamente.</p>}

        <div className="grid grid-cols-1 gap-6">
          <InputField
            label="Nombre de la mascota"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Firulais"
            error={errors.name}
            />
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
  <label className="text-sm font-medium text-gray-700">Tamaño aproximado</label>
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
            label="Peso aproximado (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Ej. 10"
            error={errors.weight}
          />
          <InputField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalles adicionales del animal o situación"
            isTextArea
            error={errors.description}
          />
          <InputField
            label="Fecha y hora de la pérdida"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Imagen de la mascota</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
            {errors.image && <p className="text-xs text-red-500 mt-1">⚠️ {errors.image}</p>}
          </div>
          <InputField
            label="Dirección aproximada de la pérdida"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej. Calle 45 #67-89, Bogotá"
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
        <p className="text-sm text-gray-500">
  También puedes hacer clic en el mapa para señalar la ubicación aproximada.
</p>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Enviar reporte
        </button>
        {geoError && <p className="text-sm text-red-500">{geoError}</p>}
      </form>
    </div>
  );
};

export default LostPetReportForm;

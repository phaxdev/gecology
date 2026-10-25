import React, { useState } from 'react';
import { 
  Wind, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Sparkles,
  Info,
  RefreshCw,
  Search
} from 'lucide-react';

interface SensorData {
  id: string;
  city: string;
  aqi: number;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  pm25: number;
  pm10: number;
  no2: number;
  temp: number;
  humidity: number;
  updatedAt: string;
}

const mockSensors: SensorData[] = [
  { id: '1', city: 'Владикавказ (Центр)', aqi: 28, status: 'Good', pm25: 6.8, pm10: 12.4, no2: 15.2, temp: 18, humidity: 55, updatedAt: '10 мин назад' },
  { id: '2', city: 'Москва (Парк Горького)', aqi: 42, status: 'Good', pm25: 10.2, pm10: 18.1, no2: 22.0, temp: 12, humidity: 62, updatedAt: '5 мин назад' },
  { id: '3', city: 'Санкт-Петербург (Приморский)', aqi: 35, status: 'Good', pm25: 8.5, pm10: 14.3, no2: 18.4, temp: 9, humidity: 78, updatedAt: '12 мин назад' },
  { id: '4', city: 'Краснодар (Карасунский)', aqi: 65, status: 'Moderate', pm25: 19.4, pm10: 32.0, no2: 28.5, temp: 21, humidity: 48, updatedAt: '15 мин назад' },
  { id: '5', city: 'Челябинск (Промышленный)', aqi: 115, status: 'Unhealthy', pm25: 41.2, pm10: 68.7, no2: 45.1, temp: 7, humidity: 70, updatedAt: '2 мин назад' },
];

export function App() {
  const [selectedCity, setSelectedCity] = useState<SensorData>(mockSensors[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: SensorData['status']) => {
    switch (status) {
      case 'Good': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Moderate': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Unhealthy': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Hazardous': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const filteredSensors = mockSensors.filter(s => 
    s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0f17] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-zinc-950 font-bold shadow-lg shadow-emerald-500/20">
              <Wind className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-wider uppercase font-mono">
              gEcology<span className="text-emerald-500">.</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-2">
              Live AQI
            </span>
          </div>

          <div className="text-xs text-zinc-400 font-mono hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              5 станций онлайн
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Top Metric Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Selected AQI Card */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedCity.city}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">Индекс качества воздуха (AQI)</h1>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${getStatusColor(selectedCity.status)}`}>
                {selectedCity.status}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-baseline gap-6 my-6">
              <div className="text-6xl sm:text-7xl font-extrabold tracking-tight font-mono text-emerald-400">
                {selectedCity.aqi}
              </div>
              <div className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                {selectedCity.aqi <= 50 
                  ? 'Качество воздуха идеальное. Отличное время для активного отдыха на открытом воздухе и проветривания помещений.' 
                  : selectedCity.aqi <= 100 
                  ? 'Умеренное качество воздуха. Чувствительным людям рекомендуется ограничить длительные нагрузки.'
                  : 'Повышенное загрязнение. Рекомендуется закрыть окна и использовать очистители воздуха.'}
              </div>
            </div>

            {/* Pollutant Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800">
              <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">PM2.5</div>
                <div className="text-base font-bold font-mono mt-0.5">{selectedCity.pm25} <span className="text-[10px] text-zinc-500">мкг/м³</span></div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">PM10</div>
                <div className="text-base font-bold font-mono mt-0.5">{selectedCity.pm10} <span className="text-[10px] text-zinc-500">мкг/м³</span></div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Температура</div>
                <div className="text-base font-bold font-mono mt-0.5 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  {selectedCity.temp}°C
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Влажность</div>
                <div className="text-base font-bold font-mono mt-0.5 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  {selectedCity.humidity}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Recommendations */}
          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Рекомендации для здоровья</h3>
              </div>
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/60">
                  <span className="text-emerald-400">✓</span>
                  <span>Проветривание безопасно в течение всего дня</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/60">
                  <span className="text-emerald-400">✓</span>
                  <span>Идеальные условия для бега и спорта на улице</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/60">
                  <span className="text-blue-400">ℹ</span>
                  <span>Обновление данных станций каждые 10 минут</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>Сенсор #{selectedCity.id}</span>
              <span>{selectedCity.updatedAt}</span>
            </div>
          </div>
        </div>

        {/* Stations List & Selector */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Станции мониторинга</h2>
              <p className="text-xs text-zinc-400 mt-1">Выберите локацию для просмотра подробной аналитики</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 outline-none focus:border-emerald-500 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSensors.map((sensor) => {
              const isSelected = selectedCity.id === sensor.id;
              return (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedCity(sensor)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/5'
                      : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-bold">{sensor.city}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getStatusColor(sensor.status)}`}>
                      AQI {sensor.aqi}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/50">
                    <span>PM2.5: {sensor.pm25}</span>
                    <span>{sensor.temp}°C</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

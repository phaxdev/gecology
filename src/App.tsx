import React, { useState, useMemo } from 'react';
import { 
  Wind, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Sparkles,
  Info,
  RefreshCw,
  Search,
  ExternalLink,
  HeartPulse,
  Leaf,
  AlertCircle,
  BarChart3,
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';
import { citiesData, CityAirData } from './citiesData';

export function App() {
  const [selected, setSelected] = useState<CityAirData>(citiesData[0]);
  const [search, setSearch] = useState('');
  const [activeDistrict, setActiveDistrict] = useState<string>('Все округа');
  const [statusFilter, setStatusFilter] = useState<string>('Все');

  const getStatusBadge = (status: CityAirData['status']) => {
    switch (status) {
      case 'Идеально':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Умеренно':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Загрязнено':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'Опасно':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    }
  };

  const districts = ['Все округа', 'Юг и Кавказ', 'Центр', 'Северо-Запад', 'Поволжье', 'Урал', 'Сибирь', 'Дальний Восток'];

  const filtered = useMemo(() => {
    return citiesData.filter(c => {
      const matchesDistrict = activeDistrict === 'Все округа' || c.district === activeDistrict;
      const matchesStatus = statusFilter === 'Все' || c.status === statusFilter;
      const query = search.toLowerCase();
      const matchesSearch = c.city.toLowerCase().includes(query) || c.region.toLowerCase().includes(query);
      return matchesDistrict && matchesStatus && matchesSearch;
    });
  }, [activeDistrict, statusFilter, search]);

  return (
    <div className="min-h-screen bg-[#041215] text-[#ecfdf5] font-sans selection:bg-[#00f59b]/30">
      {/* Eco Top Navbar */}
      <header className="border-b border-[#0f343a] bg-[#041215]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-widest uppercase font-mono text-white">
                gEcology<span className="text-emerald-400">.bio</span>
              </span>
              <p className="text-[10px] text-emerald-400/70 font-mono tracking-wider hidden sm:block">
                Единая сеть эко-сенсоров РФ • {citiesData.length} городов онлайн
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#062428] border border-[#0f444c] text-xs font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Сеть активна ({citiesData.length} станций)</span>
            </div>
            <a
              href="https://github.com/phaxdev/gecology"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl border border-[#0f444c] bg-[#08282d] text-xs font-mono text-emerald-300 hover:text-white hover:border-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero AQI Card + Live Sensor Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Air Quality Gauge Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#061d22] via-[#041215] to-[#032024] border border-[#0f444c] relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selected.city} • {selected.region} ({selected.district})</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Индекс чистоты атмосферы
                </h1>
              </div>

              <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${getStatusBadge(selected.status)}`}>
                {selected.status}
              </span>
            </div>

            {/* Gauge Hero Display */}
            <div className="flex flex-col sm:flex-row items-center gap-8 my-8">
              {/* Circular Gauge Ring */}
              <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#09272c" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={selected.aqi <= 50 ? '#00f59b' : selected.aqi <= 100 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (Math.min(selected.aqi, 200) / 200) * 251.2}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-extrabold font-mono text-white tracking-tight">{selected.aqi}</span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">AQI</span>
                </div>
              </div>

              {/* Status Explanation */}
              <div className="space-y-3">
                <div className="text-lg font-bold text-white">
                  {selected.aqi <= 50 ? 'Воздух полностью чистый и свежий' : selected.aqi <= 100 ? 'Умеренное содержание микрочастиц' : 'Повышенный уровень загрязнения атмосферы'}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-md">
                  Текущая концентрация твердых микрочастиц PM2.5 составляет <b>{selected.pm25} мкг/м³</b>, озона O3 — <b>{selected.o3} мкг/м³</b>.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-emerald-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    {selected.temp}°C
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    {selected.humidity}%
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-teal-400" />
                    {selected.windSpeed}
                  </span>
                </div>
              </div>
            </div>

            {/* Pollutants Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#0f343a]">
              {[
                { name: 'PM2.5 (Микропыль)', val: `${selected.pm25} мкг`, safe: 'Норма ≤ 15' },
                { name: 'PM10 (Пыльца/сажа)', val: `${selected.pm10} мкг`, safe: 'Норма ≤ 45' },
                { name: 'NO2 (Диоксид азота)', val: `${selected.no2} мкг`, safe: 'Норма ≤ 25' },
                { name: 'CO (Угарный газ)', val: `${selected.co} мг`, safe: 'Норма ≤ 4.0' },
              ].map((p, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#03181c] border border-[#0f3c42]">
                  <div className="text-[10px] font-mono text-zinc-400">{p.name}</div>
                  <div className="text-base font-bold font-mono text-white mt-1">{p.val}</div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{p.safe}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Health & Advisory Matrix Card */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#061d22] border border-[#0f444c] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 text-emerald-400">
                <HeartPulse className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Рекомендации для здоровья</h3>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Проветривание помещений', ok: selected.recommendation.airing, desc: selected.recommendation.airing ? 'Открытие окон безопасно' : 'Рекомендуется закрыть окна' },
                  { label: 'Спорт на открытом воздухе', ok: selected.recommendation.sport, desc: selected.recommendation.sport ? 'Бег и кардио рекомендованы' : 'Перенесите спорт в зал' },
                  { label: 'Использование респиратора', ok: !selected.recommendation.mask, desc: selected.recommendation.mask ? 'Требуется защита FFP2' : 'Защита не требуется' },
                  { label: 'Очиститель воздуха в доме', ok: !selected.recommendation.purifier, desc: selected.recommendation.purifier ? 'Включите HEPA-фильтрацию' : 'Естественный уровень' },
                ].map((rec, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#041417] border border-[#0d3439] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{rec.label}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{rec.desc}</div>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${rec.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {rec.ok ? 'ОК' : 'ВНИМАНИЕ'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#0f343a] mt-6 flex items-center justify-between text-xs font-mono text-emerald-400/80">
              <span>Сеть EPA РФ • {selected.city}</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Обновлено
              </span>
            </div>
          </div>
        </div>

        {/* Stations Comparison List */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#061d22] border border-[#0f444c]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Станции мониторинга по всем городам России</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Найдено: <b className="text-emerald-400">{filtered.length}</b> станций в базе ({activeDistrict})
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-emerald-400/70 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по городу или региону..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-[#041417] border border-[#0f444c] text-xs text-emerald-200 outline-none focus:border-emerald-400 w-full md:w-72"
              />
            </div>
          </div>

          {/* District filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 hide-scrollbar mb-4 border-b border-[#0f343a]">
            {districts.map(d => (
              <button
                key={d}
                onClick={() => setActiveDistrict(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all ${
                  activeDistrict === d
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                    : 'bg-[#031518] text-zinc-400 hover:text-white border border-[#0e373d]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 max-h-[500px] overflow-y-auto p-1">
            {filtered.map(s => {
              const isSelected = selected.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-400 shadow-lg shadow-emerald-500/10'
                      : 'bg-[#031518] border-[#0e373d] hover:border-[#17525a]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-white">{s.city}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono truncate max-w-[140px]">{s.region}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(s.status)}`}>
                      AQI {s.aqi}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 pt-2 border-t border-[#0d3439]">
                    <span>PM2.5: {s.pm25} мкг</span>
                    <span>{s.temp}°C • {s.humidity}%</span>
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

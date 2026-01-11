import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import YandexMap from '@/components/YandexMap';

interface Resort {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  image: string;
  images?: string[];
  rating: number;
  available: boolean;
  fullDescription?: string;
  coordinates: [number, number];
}

const resorts: Resort[] = [
  {
    id: 1,
    name: 'Лесная усадьба',
    description: 'Уютные деревянные домики в окружении хвойного леса. Идеально для семейного отдыха.',
    price: 3500,
    location: 'Южно-Сахалинск, 15 км',
    amenities: ['Wi-Fi', 'Баня', 'Камин', 'Парковка'],
    image: 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg',
    images: ['https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg', 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg'],
    rating: 4.8,
    available: true,
    fullDescription: 'Лесная усадьба предлагает полное погружение в атмосферу уюта и спокойствия.',
    coordinates: [46.9590, 142.7386]
  },
  {
    id: 2,
    name: 'Горный приют',
    description: 'База отдыха с панорамным видом на горы. Идеальна для активного отдыха и треккинга.',
    price: 4200,
    location: 'Холмск, 8 км',
    amenities: ['Ресторан', 'Бассейн', 'Сауна', 'Прокат снаряжения'],
    image: 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg',
    images: ['https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg', 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg'],
    rating: 4.9,
    available: true,
    fullDescription: 'Горный приют расположен на возвышенности с потрясающим видом на горные хребты.',
    coordinates: [47.0450, 142.0420]
  },
  {
    id: 3,
    name: 'Океанский бриз',
    description: 'Комфортные коттеджи на берегу Охотского моря. Закаты и свежий морской воздух.',
    price: 5000,
    location: 'Корсаков, побережье',
    amenities: ['Пляж', 'Wi-Fi', 'Барбекю', 'Детская площадка'],
    image: 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg',
    images: ['https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg', 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg'],
    rating: 4.7,
    available: true,
    fullDescription: 'Океанский бриз - это уникальная возможность просыпаться под шум морских волн.',
    coordinates: [46.6347, 142.7760]
  },
  {
    id: 4,
    name: 'Таёжный уют',
    description: 'Просторные дома в глубине тайги. Тишина и единение с природой гарантированы.',
    price: 3200,
    location: 'Анива, 20 км',
    amenities: ['Баня', 'Камин', 'Рыбалка', 'Парковка'],
    image: 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg',
    images: ['https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg', 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg'],
    rating: 4.6,
    available: false,
    fullDescription: 'Таёжный уют - место для тех, кто ищет уединения и тишины.',
    coordinates: [46.7200, 142.5280]
  },
  {
    id: 5,
    name: 'Зелёная долина',
    description: 'Экологичная база с видом на реку и горы. Свежий воздух и природные тропы.',
    price: 3800,
    location: 'Макаров, 12 км',
    amenities: ['Wi-Fi', 'Ресторан', 'Конюшня', 'Велопрокат'],
    image: 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg',
    images: ['https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg', 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg'],
    rating: 4.5,
    available: true,
    fullDescription: 'Зелёная долина предлагает экологичный отдых в гармонии с природой.',
    coordinates: [48.6300, 142.7820]
  },
  {
    id: 6,
    name: 'Северное сияние',
    description: 'Современные апартаменты с панорамными окнами. Комфорт и красота природы.',
    price: 4500,
    location: 'Охинский район',
    amenities: ['Wi-Fi', 'Камин', 'Панорамные окна', 'Парковка'],
    image: 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg',
    images: ['https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg', 'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg'],
    rating: 4.9,
    available: true,
    fullDescription: 'Северное сияние - это сочетание современного комфорта и красоты природы.',
    coordinates: [51.6800, 142.9450]
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [showMap, setShowMap] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500);
    }
  };

  const filteredResorts = resorts.filter(resort => {
    const matchesSearch = resort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resort.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'low' && resort.price < 3500) ||
                        (priceRange === 'medium' && resort.price >= 3500 && resort.price < 4500) ||
                        (priceRange === 'high' && resort.price >= 4500);
    
    const matchesLocation = selectedLocation === 'all' ||
                           resort.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesPrice && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://cdn.poehali.dev/files/IMG_6733.PNG" alt="SAKHTECH" className="h-12" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/catalog" className="hover:text-accent transition-colors">Каталог</a>
              <a href="#about" className="hover:text-accent transition-colors">О Сахалине</a>
              <a href="#contacts" className="hover:text-accent transition-colors">Контакты</a>
            </nav>
            <a href="tel:+74242272207" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Icon name="Phone" size={18} />
              <span className="hidden md:inline">+7 (4242) 27-22-07</span>
            </a>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg')` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 animate-fade-in">
            Базы отдыха Сахалина
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in">
            Откройте для себя первозданную красоту острова. Комфортный отдых на природе.
          </p>
          <Button size="lg" className="animate-scale-in bg-secondary hover:bg-secondary/90 text-white" onClick={scrollToCatalog}>
            <Icon name="Search" size={20} className="mr-2" />
            Найти базу отдыха
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Каталог баз отдыха</h2>
          
          <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Поиск</label>
                <Input
                  ref={searchInputRef}
                  placeholder="Название или описание..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Цена за ночь</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все цены" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все цены</SelectItem>
                    <SelectItem value="low">До 3500 ₽</SelectItem>
                    <SelectItem value="medium">3500 - 4500 ₽</SelectItem>
                    <SelectItem value="high">От 4500 ₽</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Локация</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все локации" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все локации</SelectItem>
                    <SelectItem value="южно">Южно-Сахалинск</SelectItem>
                    <SelectItem value="холмск">Холмск</SelectItem>
                    <SelectItem value="корсаков">Корсаков</SelectItem>
                    <SelectItem value="анива">Анива</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Даты заезда</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      {dateFrom ? format(dateFrom, 'dd MMM', { locale: ru }) : 'Выберите даты'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      locale={ru}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowMap(!showMap)}
              >
                <Icon name="Map" size={16} className="mr-2" />
                {showMap ? 'Скрыть карту' : 'Показать на карте'}
              </Button>
            </div>
          </div>

          {showMap && (
            <div className="mb-8 animate-fade-in">
              <Card>
                <CardContent className="p-6">
                  <YandexMap resorts={filteredResorts} />
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResorts.map((resort) => (
              <Card key={resort.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resort.image}
                    alt={resort.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {!resort.available && (
                    <Badge className="absolute top-4 right-4 bg-destructive">
                      Нет мест
                    </Badge>
                  )}
                  {resort.available && (
                    <Badge className="absolute top-4 right-4 bg-secondary">
                      Доступно
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-heading">{resort.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{resort.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{resort.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} />
                      <span>{resort.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resort.amenities.map((amenity, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{resort.price} ₽</p>
                    <p className="text-xs text-muted-foreground">за ночь</p>
                  </div>
                  <Button disabled={!resort.available}>
                    {resort.available ? 'Забронировать' : 'Нет мест'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">О Сахалине</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Icon name="Mountain" size={40} className="mb-4 text-primary" />
                <CardTitle className="font-heading">Горы и вулканы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Величественные горные хребты и действующие вулканы создают уникальный ландшафт острова.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="Waves" size={40} className="mb-4 text-primary" />
                <CardTitle className="font-heading">Побережье</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Омывается водами Охотского и Японского морей. Живописные бухты и дикие пляжи.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="TreePine" size={40} className="mb-4 text-primary" />
                <CardTitle className="font-heading">Тайга</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Густые хвойные леса покрывают большую часть острова. Уникальная флора и фауна.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Контакты и поддержка</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                <div className="mx-auto">
                  <h3 className="text-xl font-heading font-semibold mb-4">Свяжитесь с нами</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={20} className="text-primary" />
                      <a href="tel:+74242272207" className="hover:text-primary transition-colors">+7 (4242) 27-22-07</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={20} className="text-primary" />
                      <a href="mailto:zdorovtex.gov@ya.ru" className="hover:text-primary transition-colors">zdorovtex.gov@ya.ru</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <span>Пн-Вс: 9:00 - 19:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="https://cdn.poehali.dev/files/IMG_6733.PNG" alt="SAKHTECH" className="h-8" />
          </div>
          <p className="text-sm opacity-80">© 2026 Все базы отдыха Сахалина на одном сайте</p>
        </div>
      </footer>
    </div>
  );
}
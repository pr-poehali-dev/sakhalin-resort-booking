import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';

interface Resort {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  rating: number;
  available: boolean;
  fullDescription: string;
  mapEmbed: string;
}

const resorts: Resort[] = [
  {
    id: 1,
    name: 'Лесная усадьба',
    description: 'Уютные деревянные домики в окружении хвойного леса',
    fullDescription: 'Лесная усадьба предлагает полное погружение в атмосферу уюта и спокойствия. Наши деревянные домики оборудованы всем необходимым для комфортного отдыха: современная мебель, кухонная зона, санузел с душевой кабиной. Территория усадьбы окружена вековыми соснами и елями, что создает особую атмосферу умиротворения.',
    price: 3500,
    location: 'Южно-Сахалинск, 15 км',
    amenities: ['Wi-Fi', 'Баня', 'Камин', 'Парковка'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg'
    ],
    rating: 4.8,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.750000,46.950000&z=12'
  },
  {
    id: 2,
    name: 'Горный приют',
    description: 'База отдыха с панорамным видом на горы',
    fullDescription: 'Горный приют расположен на возвышенности с потрясающим видом на горные хребты Сахалина. Идеальное место для любителей активного отдыха и треккинга. В нашем распоряжении профессиональные инструкторы, которые организуют походы различной сложности.',
    price: 4200,
    location: 'Холмск, 8 км',
    amenities: ['Ресторан', 'Бассейн', 'Сауна', 'Прокат снаряжения'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg'
    ],
    rating: 4.9,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.050000,47.400000&z=12'
  },
  {
    id: 3,
    name: 'Океанский бриз',
    description: 'Комфортные коттеджи на берегу Охотского моря',
    fullDescription: 'Океанский бриз - это уникальная возможность просыпаться под шум морских волн. Наши коттеджи расположены в 50 метрах от берега. Собственный пляж, зона для барбекю и детская площадка делают отдых идеальным для всей семьи.',
    price: 5000,
    location: 'Корсаков, побережье',
    amenities: ['Пляж', 'Wi-Fi', 'Барбекю', 'Детская площадка'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg'
    ],
    rating: 4.7,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.770000,46.630000&z=12'
  },
  {
    id: 4,
    name: 'Таёжный уют',
    description: 'Просторные дома в глубине тайги',
    fullDescription: 'Таёжный уют - место для тех, кто ищет уединения и тишины. Наши дома расположены в самом сердце тайги, вдали от цивилизации. Здесь можно насладиться звуками природы, свежим воздухом и полным покоем.',
    price: 3200,
    location: 'Анива, 20 км',
    amenities: ['Баня', 'Камин', 'Рыбалка', 'Парковка'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg'
    ],
    rating: 4.6,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.520000,46.720000&z=12'
  },
  {
    id: 5,
    name: 'Зелёная долина',
    description: 'Экологичная база с видом на реку и горы',
    fullDescription: 'Зелёная долина предлагает экологичный отдых в гармонии с природой. Территория базы находится в живописной долине у реки. Мы предлагаем конные прогулки, велопрокат и множество природных троп для пеших походов.',
    price: 3800,
    location: 'Макаров, 12 км',
    amenities: ['Wi-Fi', 'Ресторан', 'Конюшня', 'Велопрокат'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg'
    ],
    rating: 4.5,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.780000,48.630000&z=12'
  },
  {
    id: 6,
    name: 'Северное сияние',
    description: 'Современные апартаменты с панорамными окнами',
    fullDescription: 'Северное сияние - это сочетание современного комфорта и красоты дикой природы. Большие панорамные окна позволяют любоваться лесными пейзажами прямо из номера. Идеально для романтического уединения.',
    price: 4500,
    location: 'Охинский район',
    amenities: ['Wi-Fi', 'Камин', 'Панорамные окна', 'Парковка'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg'
    ],
    rating: 4.9,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.940000,51.680000&z=12'
  },
  {
    id: 7,
    name: 'Речная заводь',
    description: 'Рыбацкая база на берегу лесной реки',
    fullDescription: 'Речная заводь - настоящий рай для любителей рыбалки. База расположена на берегу реки, богатой форелью и хариусом. Опытные гиды помогут найти лучшие места для ловли. Есть коптильня и мангальная зона.',
    price: 2900,
    location: 'Тымовское, 5 км',
    amenities: ['Рыбалка', 'Коптильня', 'Баня', 'Мангал'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg'
    ],
    rating: 4.4,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.670000,50.850000&z=12'
  },
  {
    id: 8,
    name: 'Снежная вершина',
    description: 'Горнолыжная база у подножия склонов',
    fullDescription: 'Снежная вершина - идеальное место для зимнего отдыха. База расположена у подножия горнолыжных склонов. Работает прокат снаряжения, есть инструкторы. Летом - отличные возможности для хайкинга.',
    price: 4800,
    location: 'Горнолыжный курорт',
    amenities: ['Прокат снаряжения', 'Ресторан', 'Сауна', 'Подъёмник'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg'
    ],
    rating: 4.8,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.750000,46.990000&z=12'
  },
  {
    id: 9,
    name: 'Солнечная поляна',
    description: 'Семейная база с развитой инфраструктурой',
    fullDescription: 'Солнечная поляна - база отдыха для всей семьи. Детские площадки, анимация, спортивные площадки, бассейн. Организуем экскурсии по достопримечательностям Сахалина. Работает кафе с детским меню.',
    price: 4000,
    location: 'Долинск, 7 км',
    amenities: ['Бассейн', 'Детская анимация', 'Кафе', 'Спортплощадки'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/eb36a580-6851-47e2-b57b-1c2cdab1256a.jpg'
    ],
    rating: 4.6,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=142.790000,47.330000&z=12'
  },
  {
    id: 10,
    name: 'Тихая гавань',
    description: 'Уединённые бунгало на берегу залива',
    fullDescription: 'Тихая гавань - место для романтического отдыха вдвоём. Уединённые бунгало расположены на берегу живописного залива. Из окон открывается потрясающий вид на закаты. Идеально для медового месяца.',
    price: 5500,
    location: 'Невельск, побережье',
    amenities: ['Пляж', 'Джакузи', 'Романтический ужин', 'Wi-Fi'],
    images: [
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/b8ced7cc-4ccf-4d72-83fb-b374b432e39d.jpg',
      'https://cdn.poehali.dev/projects/91dba930-9b7f-463b-8aa6-d101b9e5ec64/files/6ed75f78-da4c-498f-b39e-872e100eb75f.jpg'
    ],
    rating: 5.0,
    available: true,
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=141.870000,46.650000&z=12'
  }
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
            <a href="/" className="flex items-center gap-2">
              <img src="https://cdn.poehali.dev/files/IMG_6733.PNG" alt="SAKHTECH" className="h-12" />
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/catalog" className="hover:text-accent transition-colors">Каталог</a>
              <a href="/#about" className="hover:text-accent transition-colors">О Сахалине</a>
              <a href="/#contacts" className="hover:text-accent transition-colors">Контакты</a>
            </nav>
            <a href="tel:+74242272207" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Icon name="Phone" size={18} />
              <span className="hidden md:inline">+7 (4242) 27-22-07</span>
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-heading font-bold text-center mb-12">Каталог баз отдыха</h1>
          
          <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <SelectItem value="макаров">Макаров</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResorts.map((resort) => (
              <Card 
                key={resort.id} 
                className="hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedResort(resort);
                  setShowBooking(false);
                }}
              >
                <CardHeader className="p-0">
                  <img 
                    src={resort.images[0]} 
                    alt={resort.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{resort.name}</CardTitle>
                    <Badge variant={resort.available ? "default" : "secondary"}>
                      {resort.available ? 'Доступно' : 'Занято'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{resort.rating}</span>
                  </div>
                  <CardDescription className="mb-3">{resort.description}</CardDescription>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Icon name="MapPin" size={16} />
                    <span>{resort.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resort.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">{resort.price.toLocaleString()} ₽</span>
                      <span className="text-sm text-muted-foreground">/ночь</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResorts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Ничего не найдено</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedResort && !showBooking} onOpenChange={(open) => !open && setSelectedResort(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedResort && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">{selectedResort.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-base">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{selectedResort.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={18} />
                    <span>{selectedResort.location}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedResort.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <img 
                          src={image} 
                          alt={`${selectedResort.name} - фото ${index + 1}`}
                          className="w-full h-[400px] object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Описание</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedResort.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Удобства</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResort.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Расположение</h3>
                  <iframe
                    src={selectedResort.mapEmbed}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Цена за ночь</p>
                    <p className="text-3xl font-bold text-primary">{selectedResort.price.toLocaleString()} ₽</p>
                  </div>
                  <Button 
                    size="lg"
                    onClick={() => setShowBooking(true)}
                  >
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Забронировать
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showBooking} onOpenChange={(open) => !open && setShowBooking(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Бронирование</DialogTitle>
            <DialogDescription>
              Свяжитесь с нами для уточнения деталей и бронирования
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Phone" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Позвонить</p>
                  <a href="tel:+74242272207" className="text-lg font-semibold hover:text-primary">
                    +7 (4242) 27-22-07
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">или</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => window.open('https://t.me/sakhtechturist', '_blank')}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Написать в Telegram
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img src="https://cdn.poehali.dev/files/IMG_6733.PNG" alt="SAKHTECH" className="h-10" />
              </div>
              <p className="text-primary-foreground/80">
                Ваш путеводитель по лучшим базам отдыха Сахалина
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="/catalog" className="text-primary-foreground/80 hover:text-accent transition-colors">Каталог</a></li>
                <li><a href="/#about" className="text-primary-foreground/80 hover:text-accent transition-colors">О Сахалине</a></li>
                <li><a href="/#contacts" className="text-primary-foreground/80 hover:text-accent transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (4242) 27-22-07
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  zdorovtex.gov@ya.ru
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2026 Сахалин Отдых. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
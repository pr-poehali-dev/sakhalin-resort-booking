import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Resort {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images?: string[];
  rating: number;
  available: boolean;
  fullDescription?: string;
  coordinates: [number, number];
}

interface YandexMapProps {
  resorts: Resort[];
  center?: [number, number];
  zoom?: number;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function YandexMap({ resorts, center = [46.9590, 142.7386], zoom = 9 }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const selectedResortRef = useRef<Resort | null>(null);
  const dialogTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.ymaps || mapInstanceRef.current) return;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center,
          zoom,
          controls: ['zoomControl', 'fullscreenControl']
        });

        mapInstanceRef.current = map;

        resorts.forEach((resort) => {
          const placemark = new window.ymaps.Placemark(
            resort.coordinates,
            {
              balloonContentHeader: `<strong>${resort.name}</strong>`,
              balloonContentBody: `${resort.description}<br><b>${resort.price} ₽/ночь</b>`,
              hintContent: resort.name
            },
            {
              preset: 'islands#greenDotIcon',
              iconColor: '#22c55e'
            }
          );

          placemark.events.add('click', () => {
            selectedResortRef.current = resort;
            if (dialogTriggerRef.current) {
              dialogTriggerRef.current();
            }
          });

          map.geoObjects.add(placemark);
        });
      });
    };

    if (window.ymaps) {
      initMap();
    } else {
      const checkYmaps = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkYmaps);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkYmaps);
    }
  }, [resorts, center, zoom]);

  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);

  useEffect(() => {
    dialogTriggerRef.current = () => {
      setSelectedResort(selectedResortRef.current);
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-[600px] rounded-lg overflow-hidden" />

      <Dialog open={!!selectedResort} onOpenChange={(open) => !open && setSelectedResort(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedResort && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">{selectedResort.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Icon name="MapPin" size={16} />
                    {selectedResort.location}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {selectedResort.images && selectedResort.images.length > 0 && (
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
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Цена за ночь</p>
                    <p className="text-2xl font-bold">{selectedResort.price} ₽</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Рейтинг</p>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold">{selectedResort.rating}</span>
                    </div>
                  </div>
                </div>

                {selectedResort.fullDescription && (
                  <div>
                    <h3 className="font-semibold mb-2">Описание</h3>
                    <p className="text-muted-foreground">{selectedResort.fullDescription}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Удобства</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResort.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">{amenity}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="lg" onClick={() => window.location.href = 'tel:+74242272207'}>
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button className="flex-1" variant="secondary" size="lg" onClick={() => window.open('https://t.me/sakhtechturist', '_blank')}>
                    <Icon name="Send" size={20} className="mr-2" />
                    Telegram
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}


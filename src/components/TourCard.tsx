import { Star, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  image: string;
  location: "inner" | "outer";
}

interface TourCardProps {
  tour: Tour;
  language: "EN" | "VI";
}

const TourCard = ({ tour, language }: TourCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const translations = {
    EN: { book: "Book Now", reviews: "reviews" },
    VI: { book: "Đặt ngay", reviews: "đánh giá" },
  };

  const t = translations[language];

  return (
    <Card className="overflow-hidden card-hover shadow-card group">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1">{tour.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tour.description}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(tour.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 font-medium">{tour.rating}</span>
            <span className="text-muted-foreground">
              ({tour.reviews} {t.reviews})
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {tour.duration}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          {formatPrice(tour.price)}
        </div>
        <Button className="gradient-primary shadow-sm hover:shadow-md transition-shadow">
          {t.book}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;

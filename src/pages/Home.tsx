import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import TourCard from "@/components/TourCard";
import ContactSection from "@/components/ContactSection";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tours } from "@/data/tours";

const Home = () => {
  const [language, setLanguage] = useState<"EN" | "VI">("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filteredTours, setFilteredTours] = useState(tours);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as
      | "EN"
      | "VI"
      | null;
    if (savedLanguage) setLanguage(savedLanguage);

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("language") as
        | "EN"
        | "VI"
        | null;
      if (newLanguage) setLanguage(newLanguage);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    let filtered = tours.filter(
      (tour) =>
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredTours(filtered);
  }, [searchQuery, sortBy]);

  const translations = {
    EN: {
      title: "Cultural & Historical Tours — Hanoi",
      subtitle:
        "Discover the rich heritage and timeless beauty of Vietnam's capital",
      search: "Search tours...",
      sort: "Sort by",
      rating: "Highest Rated",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
      innerCity: "Inner City Tours",
      outerCity: "Outer City Tours",
      noResults: "No tours found matching your search.",
    },
    VI: {
      title: "Tour Văn hóa & Lịch sử — Hà Nội",
      subtitle:
        "Khám phá di sản phong phú và vẻ đẹp vượt thời gian của thủ đô Việt Nam",
      search: "Tìm kiếm tour...",
      sort: "Sắp xếp theo",
      rating: "Đánh giá cao nhất",
      priceLow: "Giá: Thấp đến Cao",
      priceHigh: "Giá: Cao đến Thấp",
      innerCity: "Tour Nội thành",
      outerCity: "Tour Ngoại thành",
      noResults: "Không tìm thấy tour phù hợp.",
    },
  };

  const t = translations[language];

  const innerCityTours = filteredTours.filter(
    (tour) => tour.location === "inner"
  );
  const outerCityTours = filteredTours.filter(
    (tour) => tour.location === "outer"
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto text-center space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient animate-fade-in">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-card border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t.sort} />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="rating">{t.rating}</SelectItem>
                <SelectItem value="price-low">{t.priceLow}</SelectItem>
                <SelectItem value="price-high">{t.priceHigh}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <main className="py-12 px-4">
        <div className="container mx-auto space-y-12">
          {filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">{t.noResults}</p>
            </div>
          ) : (
            <>
              {/* Inner City Tours */}
              {innerCityTours.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="h-1 w-12 bg-gradient-primary rounded" />
                    {t.innerCity}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {innerCityTours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} language={language} />
                    ))}
                  </div>
                </section>
              )}

              {/* Outer City Tours */}
              {outerCityTours.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="h-1 w-12 bg-gradient-primary rounded" />
                    {t.outerCity}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outerCityTours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} language={language} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      {/* Contact Section */}
      <ContactSection language={language} />
    </div>
  );
};

export default Home;

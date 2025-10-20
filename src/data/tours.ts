import { Tour } from "@/components/TourCard";

export const tours: Tour[] = [
  // Inner City Tours
  {
    id: "1",
    name: "Old Quarter Heritage Walk",
    description:
      "Explore the ancient streets of Hanoi's Old Quarter with 36 traditional streets, each named after the goods once sold there.",
    price: 2500000,
    rating: 4.8,
    reviews: 342,
    duration: "4 hours",
    image:
      "https://saigontourism.com.vn/wp-content/uploads/2023/08/Walking-in-Hanoi-Old-Quarter.jpg",
    location: "inner",
  },
  {
    id: "2",
    name: "Imperial Citadel & Museums",
    description:
      "Discover Vietnam's royal history at the UNESCO-listed Imperial Citadel of Thang Long and surrounding historical museums.",
    price: 3200000,
    rating: 4.9,
    reviews: 256,
    duration: "5 hours",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c5/b7/6b/the-front-of-doan-mon.jpg?w=900&h=-1&s=1",
    location: "inner",
  },
  {
    id: "3",
    name: "Hoan Kiem Lake & Temple Tour",
    description:
      "Visit the iconic Hoan Kiem Lake, Ngoc Son Temple, and learn the legendary story of the Golden Turtle and Emperor Le Loi.",
    price: 1800000,
    rating: 4.7,
    reviews: 428,
    duration: "3 hours",
    image:
      "https://lirp.cdn-website.com/9c039c04/dms3rep/multi/opt/ho-hoan-kiem-2-640w.jpg",
    location: "inner",
  },
  // Outer City Tours
  {
    id: "4",
    name: "Ho Chi Minh Mausoleum Complex",
    description:
      "Pay respects at the mausoleum of Vietnam's founding father and explore the Presidential Palace and One Pillar Pagoda.",
    price: 2800000,
    rating: 4.6,
    reviews: 312,
    duration: "4 hours",
    image:
      "https://statics.vinpearl.com/ho-chi-minh-mausoleum-thumb_1662726979.jpeg",
    location: "outer",
  },
  {
    id: "5",
    name: "West Lake & Tran Quoc Pagoda",
    description:
      "Relax by Hanoi's largest lake and visit the ancient Tran Quoc Pagoda, dating back to the 6th century.",
    price: 2200000,
    rating: 4.5,
    reviews: 189,
    duration: "3.5 hours",
    image:
      "https://www.hanoilocaltour.com/wp-content/uploads/History-of-Tran-Quoc-Pagoda-The-Oldest-Buddhist-Pagoda-in-Hanoi.jpg",
    location: "outer",
  },
  {
    id: "6",
    name: "Temple of Literature & Confucian Heritage",
    description:
      "Visit Vietnam's first university, built in 1070, and immerse yourself in Confucian traditions and ancient architecture.",
    price: 2600000,
    rating: 4.9,
    reviews: 467,
    duration: "3 hours",
    image:
      "https://www.travelvietnam.com/images/temple-of-literature-hanoi-entrance_6092b.jpg",
    location: "outer",
  },
];

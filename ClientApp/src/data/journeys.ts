import braj from "@/assets/journey-braj.jpg";
import kashi from "@/assets/journey-kashi.jpg";
import dwarka from "@/assets/journey-dwarka.jpg";
import ayodhya from "@/assets/journey-ayodhya.jpg";
import kurukshetra from "@/assets/journey-kurukshetra.jpg";
import lanka from "@/assets/journey-lanka.jpg";
import type { Journey } from "@/components/JourneyCard";

export type JourneyTag =
  | "Featured"
  | "Group"
  | "Chandru Ramesh-Led"
  | "Private"
  | "Family"
  | "NRI Bharat"
  | "Vaishnav"
  | "Archaeology";

export interface Departure {
  date: string; // ISO
  label: string; // human friendly
  seatsLeft: number;
  totalSeats: number;
  priceFrom: string;
}

export interface JourneyDetail extends Journey {
  tags: JourneyTag[];
  bestFor: string;
  hero: string;
  gallery: string[];
  overview: string;
  itinerary: { day: string; title: string; detail: string }[];
  guideInfo: { name: string; role: string; bio: string; image?: string };
  inclusions: string[];
  exclusions: string[];
  food: string;
  stay: string;
  departures: Departure[];
  groupSize?: string;
  whyMatters?: string;
  highlights?: string[];
  whyBhumivox?: string[];
  whoFor?: string[];
  routePoints?: string[];
  faq?: { q: string; a: string }[];
}

export const JOURNEYS: JourneyDetail[] = [
  {
    slug: "braj",
    title: "Braj — The Land of Krishna",
    region: "Uttar Pradesh",
    duration: "7 Nights",
    image: braj,
    blurb:
      "Eighty-four kos of sacred geography — Govardhan, Vrindavan, Nandgaon — read through text, terrain and living tradition.",
    guide: "Chandru Ramesh-led",
    tags: ["Featured", "Chandru Ramesh-Led", "Vaishnav", "Private"],
    bestFor: "Devotees & families seeking Krishna's living geography",
    hero: braj,
    gallery: [braj, kashi, ayodhya],
    overview:
      "An immersive parikrama of the Braj Mandala — the 84-kos sacred geography of Sri Krishna — paired with archival readings, riverfront rituals, and quiet hours with the rasik tradition of Vrindavan.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Mathura", detail: "Private transfer, evening Yamuna aarti at Vishram Ghat with a historian briefing." },
      { day: "Day 2", title: "Govardhan Parikrama", detail: "Pre-dawn parikrama on foot, breakfast at Radha Kund, afternoon at Daan Ghati." },
      { day: "Day 3", title: "Nandgaon & Barsana", detail: "The hills of Krishna's childhood, with access to local Goswami families." },
      { day: "Day 4", title: "Vrindavan Inner Circle", detail: "Nidhivan, Seva Kunj, and a private darshan at Banke Bihari before crowds." },
      { day: "Day 5", title: "Gokul & Mahavan", detail: "Yamuna crossing, Raman Reti, and the archaeology of early Krishna devotion." },
      { day: "Day 6", title: "Madhuban & Kosi", detail: "Lesser-walked sites of the parikrama with a Sanskritist." },
      { day: "Day 7", title: "Mathura Museum & Departure", detail: "Curator-led tour of Kushan-era Krishna iconography, then onward." },
    ],
    guideInfo: { name: "Chandru Ramesh", role: "Historian & Lead Guide", bio: "Independent historian focused on the textual and material history of sacred Bharat." },
    inclusions: ["7 nights heritage stay", "All meals — sattvik", "Private transport", "Historian-led readings", "Entry & seva fees"],
    exclusions: ["International flights", "Personal donations", "Travel insurance"],
    food: "Sattvik vegetarian cuisine prepared by Braj kitchens — no onion, no garlic — with optional regional thali evenings.",
    stay: "Restored haveli stays in Vrindavan and a heritage farmhouse near Govardhan with garden suites.",
    departures: [
      { date: "2026-08-22", label: "22 Aug 2026 — Janmashtami Edition", seatsLeft: 2, totalSeats: 12, priceFrom: "₹4,80,000" },
      { date: "2026-10-18", label: "18 Oct 2026 — Sharad Purnima", seatsLeft: 6, totalSeats: 12, priceFrom: "₹4,20,000" },
      { date: "2027-03-14", label: "14 Mar 2027 — Holi Special", seatsLeft: 9, totalSeats: 12, priceFrom: "₹5,10,000" },
    ],
  },
  {
    slug: "kashi-prayag",
    title: "Kashi & Prayagraj",
    region: "Confluence of Three Rivers",
    duration: "6 Nights",
    image: kashi,
    blurb:
      "Subterranean shrines, riverfront archaeology, and the oldest continuously inhabited city seen through historian's eyes.",
    tags: ["Featured", "Private", "Archaeology", "NRI Bharat"],
    bestFor: "Scholars, NRIs returning to source, contemplatives",
    hero: kashi,
    gallery: [kashi, ayodhya, braj],
    overview:
      "A scholarly descent into Kashi's layered antiquity and the Triveni Sangam — moving from textual sources to material remains and the living river.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Varanasi", detail: "Sunset boat with a riverfront historian." },
      { day: "Day 2", title: "Antara Griha Yatra", detail: "Inner-temple circuit with priestly access." },
      { day: "Day 3", title: "Sarnath Field Day", detail: "Excavation walk with an ASI archaeologist." },
      { day: "Day 4", title: "Drive to Prayagraj", detail: "Akshay Vat, Bharadwaj Ashram, and the Fort museum." },
      { day: "Day 5", title: "Sangam Morning", detail: "Boat ritual at the confluence and Allahabad University archive visit." },
      { day: "Day 6", title: "Return to Kashi", detail: "Manikarnika contemplation walk, private evening aarti." },
      { day: "Day 7", title: "Departure", detail: "Morning Ganga walk and onward transfer." },
    ],
    guideInfo: { name: "Bhumivox Field Historians", role: "Scholar Guides", bio: "Sanskritists and archaeologists trained in Varanasi's scholarly tradition." },
    inclusions: ["6 nights riverfront stay", "All meals", "Private boats", "ASI-led site walks", "Archive access"],
    exclusions: ["Flights", "Spa & laundry", "Personal seva offerings"],
    food: "Banarasi vegetarian table — kachori-sabzi mornings, thali dinners, and a private chef evening at the haveli.",
    stay: "Riverfront heritage haveli in Kashi; a colonial bungalow in Prayagraj.",
    departures: [
      { date: "2026-09-10", label: "10 Sep 2026 — Pitru Paksha Edition", seatsLeft: 4, totalSeats: 10, priceFrom: "₹3,90,000" },
      { date: "2026-11-25", label: "25 Nov 2026 — Dev Deepawali", seatsLeft: 1, totalSeats: 10, priceFrom: "₹4,60,000" },
    ],
  },
  {
    slug: "dwarka",
    title: "Dwarka — The Submerged City",
    region: "Gujarat Coast",
    duration: "5 Nights",
    image: dwarka,
    blurb:
      "Marine archaeology and the geomythology of Krishna's lost capital, paired with private boat exploration.",
    tags: ["Vaishnav", "Archaeology", "Private", "Group"],
    bestFor: "Marine-history enthusiasts & Krishna devotees",
    hero: dwarka,
    gallery: [dwarka, braj, lanka],
    overview:
      "Where text meets tide. A coastal arc tracing the Dwarka of the Mahabharata through marine archaeology and the living temple city.",
    itinerary: [
      { day: "Day 1", title: "Arrival Jamnagar → Dwarka", detail: "Coastal drive, sunset at Gomti Ghat." },
      { day: "Day 2", title: "Dwarkadhish & Bet Dwarka", detail: "Boat crossing with a marine archaeologist." },
      { day: "Day 3", title: "Submerged City Briefing", detail: "Private session on NIO underwater findings." },
      { day: "Day 4", title: "Nageshwar & Coastal Sites", detail: "Jyotirlinga visit, evening at fisher villages." },
      { day: "Day 5", title: "Porbandar Heritage", detail: "Sudama legend sites and the Arabian Sea coast." },
      { day: "Day 6", title: "Departure", detail: "Onward to Jamnagar." },
    ],
    guideInfo: { name: "Marine Heritage Team", role: "Archaeologists", bio: "Specialists trained with the National Institute of Oceanography." },
    inclusions: ["5 nights coastal stay", "All meals", "Private boats", "Marine archaeology briefing"],
    exclusions: ["Flights", "Diving certifications", "Personal offerings"],
    food: "Gujarati thali traditions paired with light coastal vegetarian fare.",
    stay: "Boutique sea-view resort outside Dwarka with private beach access.",
    departures: [
      { date: "2026-12-05", label: "05 Dec 2026 — Winter Coast", seatsLeft: 7, totalSeats: 12, priceFrom: "₹3,40,000" },
      { date: "2027-01-20", label: "20 Jan 2027 — Makar Sankranti", seatsLeft: 3, totalSeats: 12, priceFrom: "₹3,60,000" },
    ],
  },
  {
    slug: "ayodhya-chitrakoot",
    title: "Ayodhya — Chitrakoot",
    region: "Ramayana Heartland",
    duration: "8 Nights",
    image: ayodhya,
    blurb:
      "Trace Sri Rama's exile route across forest and ghat, with LiDAR-mapped site walks rarely opened to travellers.",
    guide: "Chandru Ramesh-led",
    tags: ["Featured", "Chandru Ramesh-Led", "Family", "Archaeology"],
    bestFor: "Multi-generational families on the Ramayana arc",
    hero: ayodhya,
    gallery: [ayodhya, braj, kashi],
    overview:
      "A slow, contemplative arc along the Ramayana's heartland — Ayodhya, Prayag, Chitrakoot — guided by historian Chandru Ramesh and supported by Bhumivox's LiDAR research.",
    itinerary: [
      { day: "Day 1", title: "Arrival Ayodhya", detail: "Sarayu aarti, evening orientation." },
      { day: "Day 2", title: "Ayodhya Inner Walk", detail: "Janmasthan precinct with the historian." },
      { day: "Day 3", title: "Bharadwaj to Prayag", detail: "Drive south on the exile route." },
      { day: "Day 4", title: "Sangam at Prayagraj", detail: "Boat ritual and museum study." },
      { day: "Day 5", title: "Chitrakoot Arrival", detail: "Kamadgiri darshan." },
      { day: "Day 6", title: "Chitrakoot Forest Walk", detail: "Anasuya Ashram, Gupt Godavari." },
      { day: "Day 7", title: "LiDAR Site Walk", detail: "Restricted research site, briefing in the field." },
      { day: "Day 8", title: "Return & Departure", detail: "Drive to Lucknow / Allahabad." },
    ],
    guideInfo: { name: "Chandru Ramesh", role: "Historian & Lead Guide", bio: "Independent historian focused on the textual and material history of sacred Bharat." },
    inclusions: ["8 nights heritage stay", "All meals", "LiDAR site briefing", "Private historian"],
    exclusions: ["Flights", "Personal donations"],
    food: "Sattvik thalis along the route with a forest-kitchen evening at Chitrakoot.",
    stay: "Heritage stays in Ayodhya and a riverside lodge at Chitrakoot.",
    departures: [
      { date: "2026-10-30", label: "30 Oct 2026 — Post-Diwali", seatsLeft: 5, totalSeats: 10, priceFrom: "₹5,20,000" },
      { date: "2027-02-12", label: "12 Feb 2027 — Vasant Edition", seatsLeft: 2, totalSeats: 10, priceFrom: "₹5,40,000" },
    ],
  },
  {
    slug: "kurukshetra",
    title: "Kurukshetra Field Studies",
    region: "Haryana",
    duration: "4 Nights",
    image: kurukshetra,
    blurb:
      "A research-grade reading of the battlefield, Saraswati paleo-channels, and the Mahabharata's living memory.",
    tags: ["Archaeology", "Private", "Group"],
    bestFor: "Researchers, students of the Mahabharata",
    hero: kurukshetra,
    gallery: [kurukshetra, dwarka, braj],
    overview:
      "Four days inside the geography of the Mahabharata — paleo-river research, battlefield site walks, and curator-led museum hours.",
    itinerary: [
      { day: "Day 1", title: "Arrival Delhi → Kurukshetra", detail: "Evening briefing on Saraswati research." },
      { day: "Day 2", title: "Brahma Sarovar & Jyotisar", detail: "The Gita Upadesh site with a Sanskritist." },
      { day: "Day 3", title: "Paleo-Channel Field Day", detail: "Visit to Saraswati paleo-river research sites." },
      { day: "Day 4", title: "Panipat & Museums", detail: "Battlefield archaeology in long arc." },
      { day: "Day 5", title: "Departure", detail: "Return to Delhi." },
    ],
    guideInfo: { name: "Bhumivox Research Team", role: "Field Historians", bio: "Geographers and Sanskritists working on the Saraswati corridor." },
    inclusions: ["4 nights heritage stay", "All meals", "Research-site access"],
    exclusions: ["Flights", "Personal expenses"],
    food: "North Indian vegetarian table with farm-to-plate dinners.",
    stay: "Boutique heritage retreat between Kurukshetra and Panipat.",
    departures: [
      { date: "2026-11-08", label: "08 Nov 2026 — Gita Jayanti Edition", seatsLeft: 3, totalSeats: 8, priceFrom: "₹2,80,000" },
    ],
  },
  {
    slug: "lanka-ramayana",
    title: "Sri Lanka Ramayana Trail",
    region: "Across the Palk Strait",
    duration: "10 Nights",
    image: lanka,
    blurb:
      "From Rameshwaram to Sigiriya — a cinematic crossing through the eastern arc of the Ramayana.",
    tags: ["Featured", "Family", "Private", "Archaeology", "NRI Bharat"],
    bestFor: "NRI families and cross-cultural travellers",
    hero: lanka,
    gallery: [lanka, dwarka, ayodhya],
    overview:
      "A ten-night civilizational crossing from Rameshwaram into Sri Lanka's Ramayana sites — Sigiriya, Ashok Vatika, Ravana's caves — with serious historiography.",
    itinerary: [
      { day: "Day 1", title: "Arrival Madurai", detail: "Meenakshi temple evening." },
      { day: "Day 2", title: "Rameshwaram", detail: "Setu bridge briefing." },
      { day: "Day 3", title: "Crossing to Colombo", detail: "Flight, evening orientation." },
      { day: "Day 4", title: "Kandy & Sita Eliya", detail: "Ashok Vatika." },
      { day: "Day 5", title: "Nuwara Eliya", detail: "Hill country sites." },
      { day: "Day 6", title: "Ravana Caves", detail: "Ella region exploration." },
      { day: "Day 7", title: "Sigiriya Climb", detail: "Sunrise ascent." },
      { day: "Day 8", title: "Anuradhapura", detail: "Ancient capital." },
      { day: "Day 9", title: "Negombo Coast", detail: "Coastal reflection day." },
      { day: "Day 10", title: "Colombo Museum", detail: "Curator-led tour." },
      { day: "Day 11", title: "Departure", detail: "Onward flights." },
    ],
    guideInfo: { name: "Cross-Strait Scholars", role: "Field Historians", bio: "Indian and Sri Lankan historians collaborating on the Ramayana corridor." },
    inclusions: ["10 nights premium stays", "All meals", "Inter-country flight", "Private guides"],
    exclusions: ["International flights to India", "Visas", "Personal expenses"],
    food: "Tamil and Sri Lankan vegetarian table with seafood options on request.",
    stay: "Heritage bungalows in hill country and a boutique villa near Sigiriya.",
    departures: [
      { date: "2027-01-05", label: "05 Jan 2027 — New Year Crossing", seatsLeft: 4, totalSeats: 10, priceFrom: "₹7,80,000" },
      { date: "2027-02-22", label: "22 Feb 2027 — Maha Shivratri", seatsLeft: 8, totalSeats: 10, priceFrom: "₹7,60,000" },
    ],
  },
];

export function getJourney(slug: string) {
  return JOURNEYS.find((j) => j.slug === slug);
}

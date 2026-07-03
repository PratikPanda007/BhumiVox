import braj from "@/assets/journey-braj.jpg";
import kashi from "@/assets/journey-kashi.jpg";
import dwarka from "@/assets/journey-dwarka.jpg";
import ayodhya from "@/assets/journey-ayodhya.jpg";
import kurukshetra from "@/assets/journey-kurukshetra.jpg";
import lanka from "@/assets/journey-lanka.jpg";

export type Circuit =
  | "Vaishnav Bharat"
  | "Ramayana Trail"
  | "Mahabharata Field"
  | "Shaiva–Shakta Heartland"
  | "Coastal & Submerged";

export interface Destination {
  slug: string;
  name: string;
  region: string;
  circuit: Circuit;
  image: string;
  tagline: string;
  significance: string;
  geography: string;
  bestTime: string;
  highlights: string[];
  gallery: string[];
  relatedJourneys: string[]; // journey slugs
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "braj",
    name: "Braj",
    region: "Mathura · Vrindavan, Uttar Pradesh",
    circuit: "Vaishnav Bharat",
    image: braj,
    tagline: "Eighty-four kos of Krishna's living geography.",
    significance:
      "Braj is not a town but a mandala — 84 kos of forests, ghats and hills that frame the Krishna lila as remembered text and walked terrain. The Goswami sampradayas of the 16th century mapped this geography into the rasik tradition still alive in Vrindavan today.",
    geography:
      "Bounded by the Yamuna's curve, Govardhan hill at its centre, and the twin villages of Nandgaon and Barsana to the north. The parikrama path connects 12 forests (dvadasha vana) and 24 sub-forests (upavana) — a sacred cartography older than any city map.",
    bestTime:
      "October–March for cool walking weather. Janmashtami (Aug–Sep), Sharad Purnima (Oct) and Holi (Mar) are emotionally extraordinary but crowded — we plan around the crowds.",
    highlights: [
      "Govardhan parikrama on foot at dawn",
      "Private darshan at Banke Bihari before public hours",
      "Kushan-era Krishna iconography at the Mathura Museum",
      "Nidhivan & Seva Kunj rasik traditions",
    ],
    gallery: [braj, ayodhya, kashi],
    relatedJourneys: ["braj"],
  },
  {
    slug: "kurukshetra",
    name: "Kurukshetra",
    region: "Haryana",
    circuit: "Mahabharata Field",
    image: kurukshetra,
    tagline: "The Mahabharata's field — and the Saraswati's memory.",
    significance:
      "Dharmakshetra, Kurukshetra — the plain where the Gita was spoken. Beyond myth, it is one of India's most intensively studied paleo-landscapes, with the Saraswati's lost channel traced through satellite and field survey.",
    geography:
      "A 48-kos circuit of tirthas around Brahma Sarovar, Jyotisar and Sannihit Sarovar. The wider Saraswati paleo-channel runs westward through Haryana into Rajasthan — a river that once was, now read in soil and stone.",
    bestTime:
      "November–February. Gita Jayanti (Nov–Dec) is the most resonant — recitations across all 48 tirthas at once.",
    highlights: [
      "Jyotisar — the banyan under which the Gita was spoken",
      "Saraswati paleo-channel field walk with a geographer",
      "Brahma Sarovar at dusk",
      "Panipat battlefield archaeology in long arc",
    ],
    gallery: [kurukshetra, dwarka, braj],
    relatedJourneys: ["kurukshetra"],
  },
  {
    slug: "kashi",
    name: "Kashi",
    region: "Varanasi, Uttar Pradesh",
    circuit: "Shaiva–Shakta Heartland",
    image: kashi,
    tagline: "The oldest continuously inhabited city, read riverwards.",
    significance:
      "Avimukta — never abandoned. Kashi is the city Shiva does not leave. Its antiquity is layered: Buddhist Sarnath at the north, Mughal-era ghats at the river, and an inner antara griha of shrines that predate any written record of the city.",
    geography:
      "A crescent of 84 ghats along the western bank of the Ganga, with the Vishwanath corridor at its heart. The river flows north here — uttara-vahini — a rare hydrological inversion that the texts read as cosmic.",
    bestTime:
      "October–March. Dev Deepawali (Nov) and Mahashivratri (Feb–Mar) are unforgettable; Sawan (Jul–Aug) is intense and crowded.",
    highlights: [
      "Antara Griha Yatra — the inner-temple circuit with priestly access",
      "Sarnath excavation walk with an ASI archaeologist",
      "Sunrise boat with a riverfront historian",
      "Manikarnika contemplation walk at dusk",
    ],
    gallery: [kashi, ayodhya, braj],
    relatedJourneys: ["kashi-prayag"],
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    region: "Sarayu, Uttar Pradesh",
    circuit: "Ramayana Trail",
    image: ayodhya,
    tagline: "Ramayana's beginning, reconstructed in chronology.",
    significance:
      "Ayodhya — 'the unconquerable' — is the textual origin of the Ramayana arc. Recent excavation, LiDAR survey and architectural restoration have made the city a live archaeological palimpsest, not just a place of pilgrimage.",
    geography:
      "Set on the south bank of the Sarayu, ringed by the Panchakroshi parikrama — five kos of walked memory. The Janmasthan precinct sits at the centre of a wider Ramkot circuit.",
    bestTime:
      "October–March. Ram Navami (Mar–Apr) and Diwali (Oct–Nov) are deeply atmospheric — we time visits to avoid the peak crush.",
    highlights: [
      "Sarayu aarti from a private ghat",
      "Janmasthan precinct walk with a historian",
      "Panchakroshi parikrama by foot or vehicle",
      "Restored Treta-ke-Thakur and Kanak Bhavan",
    ],
    gallery: [ayodhya, braj, kashi],
    relatedJourneys: ["ayodhya-chitrakoot"],
  },
  {
    slug: "dwarka",
    name: "Dwarka",
    region: "Gujarat Coast",
    circuit: "Coastal & Submerged",
    image: dwarka,
    tagline: "A capital under the sea — marine archaeology of myth.",
    significance:
      "Dwarka is where Indian historiography meets oceanography. The Mahabharata records Krishna's capital being claimed by the sea; the National Institute of Oceanography has surveyed submerged structures off the present coast that compel a re-reading of both text and tide.",
    geography:
      "Modern Dwarka sits at the western tip of the Saurashtra peninsula, with Bet Dwarka island a short boat crossing away. The submerged sites lie in shallow waters near Samudra Narayan temple and off Bet Dwarka.",
    bestTime:
      "November–February — dry, mild, and the sea is calm enough for boat exploration. Janmashtami here is austere and seaward, very different from Braj.",
    highlights: [
      "Boat crossing to Bet Dwarka with a marine archaeologist",
      "Private briefing on NIO underwater findings",
      "Nageshwar Jyotirlinga at dawn",
      "Fisher-village coastal evenings",
    ],
    gallery: [dwarka, braj, lanka],
    relatedJourneys: ["dwarka"],
  },
  {
    slug: "chitrakoot",
    name: "Chitrakoot",
    region: "Forest of Exile, Madhya Pradesh / Uttar Pradesh",
    circuit: "Ramayana Trail",
    image: ayodhya,
    tagline: "Where Rama's exile is still walked, day after day.",
    significance:
      "Chitrakoot is the forest of the Ramayana's middle chapters — the years of exile that shape Rama as a figure. Tulsidas composed parts of the Ramcharitmanas here. The geography has been continuously inhabited as a sacred forest for two millennia.",
    geography:
      "The Mandakini river winds between Kamadgiri hill and Anasuya Ashram. The 5-kos Kamadgiri parikrama is the spiritual core; Gupt Godavari caves and Sphatik Shila extend the circuit.",
    bestTime:
      "October–March. Avoid monsoon — the forest paths flood. Diwali here is intimate and forest-lit, not city-bright.",
    highlights: [
      "Kamadgiri parikrama at dawn",
      "Anasuya Ashram and the Mandakini source",
      "Gupt Godavari cave walk",
      "LiDAR-surveyed exile-route sites with our research team",
    ],
    gallery: [ayodhya, braj, lanka],
    relatedJourneys: ["ayodhya-chitrakoot"],
  },
  {
    slug: "prayagraj",
    name: "Prayagraj",
    region: "Sangam, Uttar Pradesh",
    circuit: "Shaiva–Shakta Heartland",
    image: kashi,
    tagline: "Confluence of three rivers and three traditions.",
    significance:
      "Tirtharaja — king of pilgrimages. Prayag sits at the Sangam of the Ganga, Yamuna and the now-subterranean Saraswati. The Akshay Vat and Bharadwaj Ashram tie the site to both Ramayana and Vedic memory.",
    geography:
      "Triveni Sangam at the city's eastern edge, framed by the Mughal-era Fort. The Kumbh Mela ground stretches across the floodplain — the world's largest periodic human gathering.",
    bestTime:
      "November–February. Magh Mela (Jan–Feb) every year; Ardh Kumbh every six, Maha Kumbh every twelve — we plan years ahead for these.",
    highlights: [
      "Boat ritual at the Sangam at sunrise",
      "Akshay Vat — the imperishable banyan, inside the Fort",
      "Bharadwaj Ashram precinct walk",
      "Allahabad University archive visit",
    ],
    gallery: [kashi, ayodhya, dwarka],
    relatedJourneys: ["kashi-prayag"],
  },
  {
    slug: "lanka",
    name: "Sri Lanka Ramayana Trail",
    region: "Across the Palk Strait",
    circuit: "Ramayana Trail",
    image: lanka,
    tagline: "The eastern arc of the Ramayana.",
    significance:
      "From Rameshwaram across the Palk Strait, the Ramayana opens into a second geography — Ashok Vatika, Ravana's caves, Sigiriya's hill citadel. Sri Lankan and Indian scholarship are only now meeting around this shared corridor.",
    geography:
      "An arc from the Setu coast through Sita Eliya (Nuwara Eliya hill country), Ella's cave systems, and the Sigiriya–Anuradhapura plain.",
    bestTime:
      "December–March for the hill country; avoid the south-west monsoon (May–Sep).",
    highlights: [
      "Sita Eliya — the Ashok Vatika site",
      "Ravana caves at Ella",
      "Sigiriya sunrise ascent",
      "Anuradhapura ancient capital",
    ],
    gallery: [lanka, dwarka, ayodhya],
    relatedJourneys: ["lanka-ramayana"],
  },
  {
    slug: "puri",
    name: "Puri",
    region: "Odisha Coast",
    circuit: "Vaishnav Bharat",
    image: dwarka,
    tagline: "The Jagannath complex as living cosmology.",
    significance:
      "One of the four Char Dhams. The Jagannath temple is not just a shrine but a daily-renewed cosmology — the Mahaprasad kitchen, the Ratha Yatra, and the tribal-Vaishnav synthesis that few other sites can claim.",
    geography:
      "Coastal Odisha, with Konark's Sun Temple 35 km north and the Chilika lagoon to the south. The Jagannath complex sits a short walk from the sea.",
    bestTime:
      "October–February. Ratha Yatra (Jun–Jul) is overwhelming — we plan it only by special request.",
    highlights: [
      "Mahaprasad inside the temple complex",
      "Konark Sun Temple at sunrise",
      "Raghurajpur artist village",
      "Chilika dolphin morning",
    ],
    gallery: [dwarka, braj, lanka],
    relatedJourneys: [],
  },
  {
    slug: "udupi",
    name: "Udupi",
    region: "Karnataka Coast",
    circuit: "Vaishnav Bharat",
    image: braj,
    tagline: "Madhva's seat — eight maths, one sattvik kitchen.",
    significance:
      "The 13th-century seat of Madhvacharya's Dvaita Vedanta. The Ashta Matha system rotates temple seva on a two-year paryaya cycle — a living institutional tradition almost unique in Indian religion.",
    geography:
      "Coastal Karnataka, between the Western Ghats and the Arabian Sea. Krishna Matha sits in the old town; the coast and Malpe beach are minutes away.",
    bestTime:
      "October–February. Paryaya (Jan, biennial) is the most extraordinary moment — the ceremonial transfer of temple seva.",
    highlights: [
      "Krishna Matha kanakana kindi darshan",
      "Ashta Matha walking circuit",
      "Sattvik kitchen experience",
      "Malpe coast at sunset",
    ],
    gallery: [braj, dwarka, kashi],
    relatedJourneys: [],
  },
  {
    slug: "guruvayur",
    name: "Guruvayur",
    region: "Kerala",
    circuit: "Vaishnav Bharat",
    image: braj,
    tagline: "The Bhuloka Vaikuntha of the south.",
    significance:
      "One of the most powerful Krishna shrines in the south. Narayana Bhattatiri's Narayaneeyam was composed here in the 16th century. The temple's elephant tradition and Melpathur Auditorium make it a unique cultural complex.",
    geography:
      "Inland from the Kerala coast, north of Kochi. The temple sits at the heart of a small town built around it.",
    bestTime:
      "November–February. Ekadashi (twice a month) and Ashtami Rohini (Aug–Sep) are spiritually peak; avoid the monsoon months.",
    highlights: [
      "Pre-dawn Nirmalya darshan",
      "Punnathur Kotta elephant sanctuary",
      "Melpathur Auditorium evening recital",
      "Sattvik temple meal",
    ],
    gallery: [braj, kashi, ayodhya],
    relatedJourneys: [],
  },
  {
    slug: "tamil-temple-circuit",
    name: "Tamil Temple Circuit",
    region: "Chola Country, Tamil Nadu",
    circuit: "Shaiva–Shakta Heartland",
    image: kashi,
    tagline: "Granite, bronze, and a thousand-year liturgy.",
    significance:
      "The great Chola temples — Thanjavur, Gangaikondacholapuram, Darasuram — are the most ambitious architecture-as-liturgy India produced. Pancha Bhuta Sthalams, Navagraha temples, and the Pancha Sabha Nataraja sites extend the circuit.",
    geography:
      "The Kaveri delta and the broader Tamil heartland, from Chidambaram on the coast to Madurai in the south.",
    bestTime:
      "November–February — the cool dry months. The Margazhi music season (Dec–Jan) makes Chennai a worthwhile add-on.",
    highlights: [
      "Brihadeeswarar at Thanjavur with an architectural historian",
      "Chidambaram Nataraja at the Aarti hour",
      "Darasuram's miniature stone narrative panels",
      "A Chola-bronze viewing at a private collection",
    ],
    gallery: [kashi, dwarka, ayodhya],
    relatedJourneys: [],
  },
];

export const CIRCUITS: Circuit[] = [
  "Vaishnav Bharat",
  "Ramayana Trail",
  "Mahabharata Field",
  "Shaiva–Shakta Heartland",
  "Coastal & Submerged",
];

export function getDestination(slug: string) {
  return DESTINATIONS.find((d) => d.slug === slug);
}

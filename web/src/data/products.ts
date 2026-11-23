// Product content ported from the live site (see site/content/live-site-copy.md).
// Spelling normalised to Australian English; run-together words on the Safety Mats page fixed.
// Wording is the client's. No new claims have been added.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2' | 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'specs'; rows: [string, string][] };

export interface Product {
  slug: string; // keeps the live URL, e.g. /borch-imm
  supplier: string;
  what: string; // short label for tiles, e.g. "Injection Moulding"
  blurb: string; // one line for tiles
  heading: string;
  title: string; // <title>
  description: string; // meta description, Australian spelling, no hype
  blocks: Block[];
  catalogues: { label: string; href: string }[];
  note?: string; // build note for the team, not shown on the site
}

export const products: Product[] = [
  {
    slug: 'borch-imm',
    supplier: 'Borche',
    what: 'Injection Moulding',
    blurb: 'Injection moulding machines from 50T to 6800T clamping force.',
    heading: 'Borche Injection Moulding Machines',
    title: 'Borche Injection Moulding Machines | HTS International',
    description:
      'HTS International is the Australian distributor for Borche injection moulding machines, from 50T to 6800T clamping force.',
    blocks: [
      { type: 'p', text: 'Since 2002, Borche Machinery Co., LTD (Borche) has been a driving force in the intelligent injection moulding machines (IMM) arena. With a focus on self-development, manufacturing, and sales, Borche has etched its mark as an industry pioneer.' },
      { type: 'p', text: 'Borche operates three manufacturing bases, with its headquarters in Guangzhou housing both R&D and manufacturing facilities. The Hangzhou plant and the Guangzhou intelligent manufacturing demonstration plant of two-platen machines contribute to a total premises of 215,000 square metres, driven by a dedicated team of over 800 employees.' },
      { type: 'p', text: 'HTS International is the Australian distributor for Borche. Borche is the manufacturer of the largest two-platen IMM in Asia. Its intelligent two-platen BU series, servo BS series, updated toggle Bi series, hybrid machines, and BM series multi-component IMM encompass over 100 models. The range spans clamping force from 50T to 6800T, with shot weights from 25g to 300kg.' },
      { type: 'h2', text: 'Machine series' },
      { type: 'ul', items: ['BS-III Series', 'Bi Series', 'BM Series', 'BU Series', 'Bi-M Series'] },
    ],
    catalogues: [
      { label: 'BU Series', href: 'https://utm.guru/HTSBorcheBU' },
      { label: 'Bi Series', href: 'https://utm.guru/HTSBorcheBi' },
      { label: 'BS Series', href: 'https://utm.guru/HTSBorcheBS' },
      { label: 'BD Series', href: 'https://utm.guru/HTSBorcheBD' },
      { label: 'Bi-M Series', href: 'https://utm.guru/HTSBorcheBi-M' },
      { label: 'Bi-M-UPVC Series', href: 'https://utm.guru/HTSBorcheBi-M-UPVC' },
      { label: 'A Screw PET', href: 'https://utm.guru/BorchePET' },
    ],
    note: 'Live page shows a photo per series. Needs supplier photos (BS-III, Bi, BM, BU, Bi-M). BM catalogue is "Coming soon" on the live site.',
  },
  {
    slug: 'wensui',
    supplier: 'Wensui',
    what: 'Material Handling & Automation',
    blurb: 'Plastic auxiliary machinery: 300+ models from recycling to robotic automation.',
    heading: 'Wensui: Powering Australian Plastics',
    title: 'Wensui Plastic Auxiliary Machinery | HTS International',
    description:
      'HTS International is the exclusive Australian distributor for Wensui. 300+ models of plastic auxiliary machinery, from recycling to robotic automation.',
    blocks: [
      { type: 'p', text: 'Precision engineering. Global expertise. Local support.' },
      { type: 'p', text: 'HTS International is the exclusive Australian distributor for Wensui, a global leader in plastic auxiliary machinery. With over 30 years of industry-defining experience, Wensui’s commitment to precision and durability aligns with HTS International’s mission to provide high-performance solutions to the local manufacturing sector.' },
      { type: 'h2', text: '300+ models across six series' },
      { type: 'p', text: 'An extensive catalogue across six product series, so there is a fit for every stage of your production cycle:' },
      { type: 'ul', items: [
        'Crushing & Recycling: advanced granulators and shredders to minimise waste.',
        'Dehumidification & Drying: high-efficiency moisture removal for material quality.',
        'Colour Separation: precision mixing and dosing for consistent colour.',
        'Temperature Control: industrial chillers and mould temperature controllers for process stability.',
        'Material Handling: vacuum loaders and conveying systems.',
        'Robotic Automation: high-speed SCARA and servo-driven take-out robots.',
      ] },
      { type: 'h2', text: 'The HTS and Wensui partnership' },
      { type: 'p', text: 'We don’t just sell machines; we build long-term, win-win partnerships. Combining Wensui’s manufacturing with HTS International’s understanding of the Australian market, we deliver:' },
      { type: 'ul', items: [
        'Durable performance: equipment designed to withstand rigorous, high-volume production.',
        'Innovative engineering: solutions that evolve alongside your manufacturing needs.',
        'Reliable service: local guidance and technical support to keep your facility running.',
      ] },
      { type: 'h2', text: 'Product range' },
      { type: 'ul', items: ['Automation', 'Belt Conveyors', 'Chillers', 'Dosers, Mixers', 'Blenders', 'Dryers & Dehumidifiers', 'Granulators', 'Material Feeding', 'Temperature Controllers'] },
    ],
    catalogues: [{ label: 'Wensui full catalogue', href: 'https://utm.guru/umuLD' }],
  },
  {
    slug: 'safety-mats',
    supplier: 'Anhyup',
    what: 'Safety Mats',
    blurb: 'Pressure-sensing safety mats and controllers, standard or made to measure.',
    heading: 'Safety Mats',
    title: 'Anhyup Safety Mats | HTS International',
    description:
      'Anhyup safety mats and controllers for injection moulding machines, robots and production lines, in standard and custom sizes.',
    blocks: [
      { type: 'p', text: 'Your safety is our priority.' },
      { type: 'h2', text: 'What is a safety mat switch?' },
      { type: 'p', text: 'In factory automation, robots and numerical control systems have become integral to industrial settings.' },
      { type: 'p', text: 'As smaller machines become more common, worker safety has improved. However, with the expanding risk areas within factories, a proactive safety device has emerged with the primary aim of preventing accidents and enhancing worker safety. This device is known as the safety mat switch.' },
      { type: 'p', text: 'The safety mat switch operates by detecting pressure applied to the countless contact points on both the upper and lower layers of the mat. When pressure is applied, it triggers the so-called “A” contact point. It also operates similarly to the “B” contact point, which remains unmonitored.' },
      { type: 'p', text: 'This design ensures that any liquids present can be swiftly drained away. You can rely on this safety mat switch to bolster workplace safety.' },
      { type: 'h2', text: 'Industrial robot safety mat switch' },
      { type: 'p', text: 'The AMS Series Safety Mat by Anhyup Electronics Co., Ltd. is a pressure sensor engineered to detect the presence of people or objects on its sensing surface.' },
      { type: 'p', text: 'This device serves as a force-sensing protective mechanism. It operates by detecting pressure when two conductive sheets are pressed together, and is available in standard-sized mats as well as customisable variants.' },
      { type: 'p', text: 'If you need a compact form, you can select the border (aluminium guide) and a dedicated controller.' },
      { type: 'h2', text: 'Applications' },
      { type: 'ul', items: [
        'Injection moulding machines',
        'Lifters and various logistics devices',
        'Automotive production and assembly lines',
        'Around press machines',
        'Around conveyor lines',
        'Automotive welding lines',
        'Around automotive machine tools',
        'Automatic doors or off-limits areas at hazardous work sites, and similar',
      ] },
      { type: 'h2', text: 'Made to your requirements' },
      { type: 'p', text: 'We offer safety mats designed to meet your exact specifications, accommodating any size and shape to suit a wide range of applications.' },
      { type: 'h2', text: 'Mat controllers' },
      { type: 'h3', text: 'AMC Series mat controller' },
      { type: 'ul', items: [
        '8-bit MCU, 128 Kbytes in system',
        'Monitors and controls 8 mat switch circuits',
        'Output contacts: NC 2ea; auxiliary contacts: NC 2ea, NO 1ea',
        'Built-in safety circuit (disconnection detection circuit)',
        'Failure monitoring circuit (output relay welding monitoring circuit)',
        'Mat switch invalidation function with conversion switch',
        'Operation status and disconnection shown by two-colour LED',
        'Connects up to 8 safety mats, with individual dip switches to select or isolate',
        'Continuous injection and monitoring of multiple mats',
        'Output monitoring circuit configuration',
        'Response time 250 ms or less',
        'Auto start / manual start function',
        '8 mat input circuits, 1 output circuit',
        'Detachable terminal block',
        'Power consumption: DC 24 V at 1 A (maximum)',
      ] },
      { type: 'h3', text: 'AH-MC mat controller' },
      { type: 'ul', items: [
        '8-bit MCU, 16 Kbytes in system',
        'Monitors and controls 4 mat switches',
        'Output contacts: NC, NO (with additional auxiliary contact configuration)',
        'Integrated safety circuit (disconnection detection circuit)',
        'Failure monitoring circuit (output relay fusion monitoring circuit)',
        'Mat switch invalidation function with switch conversion',
        'Operation status and disconnection shown by two-colour LED',
        'Connects up to 4 safety mats, with individual dip switches to select or isolate',
        'Configuration with output monitoring circuit',
        'Response time 200 ms or less',
        'Auto start / manual start function',
        '4 input circuits for mats, 1 output circuit',
        'Power consumption: DC 24 V at 1 A (maximum)',
      ] },
      { type: 'h2', text: 'Mat specifications' },
      { type: 'specs', rows: [
        ['Surface material', 'Oil-resistant NBR rubber plate with non-slip structure'],
        ['Support', 'Oil-resistant NBR rubber sheet'],
        ['Internal charging insulator', 'Polyurethane foam sponge'],
        ['Contact interval', '7 mm'],
        ['Colour', 'Surface grey, bottom black'],
        ['Durable life', '200,000+ contact times'],
        ['Insulation resistance', 'Initial 5 MΩ or more'],
        ['Contact resistance', '0.1 Ω'],
        ['Temperature range', '1 ℃ to 50 ℃'],
        ['Mat allowable current', '10 mA or less'],
        ['Thickness', '13 mm'],
      ] },
    ],
    catalogues: [{ label: 'Anhyup safety mats', href: 'https://utm.guru/HTS-SMats' }],
    note: 'Live page has product photos, custom-shape drawings and controller photos. Needs supplier images.',
  },
  {
    slug: 'halspumps',
    supplier: 'HALS',
    what: 'Pumps',
    blurb: 'Coolant and lubrication pumps: grease, lube, rotor and coolant.',
    heading: 'Coolant and Lubrication Pumps',
    title: 'HALS Pumps | HTS International',
    description:
      'HALS grease, lube, rotor and coolant pumps for injection moulding and industrial machinery, supplied by HTS International.',
    blocks: [
      { type: 'h2', text: 'Pump range' },
      { type: 'ul', items: ['Grease Pump', 'Lube Pump', 'Rotor Pump', 'Coolant Pump'] },
    ],
    catalogues: [{ label: 'HALS grease pumps', href: 'https://utm.guru/HTS-HALS-GP' }],
    note: 'Live page is four product photos with labels only. Needs supplier photos and, ideally, short descriptions from the client.',
  },
  {
    slug: 'crg-eoat',
    supplier: 'CRG',
    what: 'End of Arm Tooling',
    blurb: 'Tool changers, grippers and components for take-out robots.',
    heading: 'End of Arm Tooling',
    title: 'CRG End of Arm Tooling | HTS International',
    description:
      'HTS International is the authorised agent for CRG end-of-arm tooling in Australia: tool changers, grippers and components for take-out robots.',
    blocks: [
      { type: 'p', text: 'HTS International and CRG have an enduring partnership in injection automation. As the authorised agent for CRG end-of-arm tooling in Australia, HTS International is committed to your automation needs.' },
      { type: 'p', text: 'Module design philosophy: the partnership combines CRG’s module design philosophy with our extensive experience, simplifying automation design, improving adaptability and ensuring reliability.' },
      { type: 'p', text: 'Our approach: your peace of mind is our focus. Our shared dedication to automation technology makes us steadfast allies on your automation journey.' },
      { type: 'p', text: 'Guiding principle: mastery through repetition. Through close collaboration, we build expertise and ensure success through our established partnership.' },
      { type: 'p', text: 'HTS International and CRG remain dedicated to delivering exceptional service and fostering innovation, in a partnership that streamlines your automation work.' },
      { type: 'h2', text: 'Product range' },
      { type: 'ul', items: [
        'Automatic Tool Changer', 'Manual Tool Quick-Changer', 'Frame Connectors', 'Sprue Gripper', 'Needle Gripper',
        'Expansion Gripper', 'Pneumatic Gripper', 'Elbow Arm', 'Parallel Gripper', '3 Finger Pneumatic',
        'Air Slide Table', 'Vacuum Gripper', 'Air Nipper', 'EOAT Components', 'Locators',
      ] },
    ],
    catalogues: [
      { label: 'End-of-arm tooling, all', href: 'https://utm.guru/HTS-CRG-All' },
      { label: 'Quick changer', href: 'https://utm.guru/HTS-CRG-QuickChanger' },
    ],
  },
  {
    slug: 'macosystemretrofit',
    supplier: 'MACO',
    what: 'System Retrofits',
    blurb: 'Replace outdated machine controls on any make or model.',
    heading: 'MACO-System Retrofits',
    title: 'MACO Compact Retrofits | HTS International',
    description:
      'MACO Compact retrofit control systems to replace outdated controls on injection moulding machines of any make or model.',
    blocks: [
      { type: 'h2', text: 'MACO Compact retrofit: upgrading your injection moulding machine' },
      { type: 'p', text: 'HTS International offers a retrofit solution for all injection moulding machines. Our MACO Compact retrofit is designed to replace outdated controls, improving your machine’s performance and longevity.' },
      { type: 'h2', text: 'Why choose MACO Compact' },
      { type: 'ul', items: [
        'Cost savings and reliability: reduce long-term spare part costs and improve component reliability. 3-year warranty on control hardware.',
        'Improved machine performance: improves machine availability and reduces the risk of downtime.',
        'Modern processing features: keep your operation up to date with the latest advancements.',
      ] },
      { type: 'h2', text: 'MACO Compact machine control' },
      { type: 'p', text: 'Our retrofit package offers a cost-effective solution for machine and processing control, without the need for a full machine replacement. It is expandable, accommodating various options to meet your specific machine requirements, regardless of make or model.' },
      { type: 'h3', text: 'Communication' },
      { type: 'p', text: 'High-performance Ethernet communication interfaces with the HMI and other devices.' },
      { type: 'h3', text: 'Diagnostics' },
      { type: 'p', text: 'The controller includes built-in diagnostic and process monitoring features, including multiple shot monitoring, shot-to-shot data storage, “reference/signature” shot functions and “snap-shot” capabilities. Online RLD diagnostics allow troubleshooting and machine operation with web browsing via the internet.' },
      { type: 'h3', text: 'Basic retrofit package includes' },
      { type: 'ul', items: ['Complete control system replacement', 'Installation of the operator terminal and controller', 'Implementation of standard machine program screens'] },
      { type: 'h2', text: 'MACO Compact operator stations' },
      { type: 'p', text: 'The MACO Compact operator interface offers a contemporary design and a selection of cost-effective HMIs for the MACO Compact control system. It is equipped with a 12.1-inch TFT display with 800 x 600 viewing resolution, with an optional touchscreen interface.' },
      { type: 'h2', text: 'MACO Compact control system' },
      { type: 'p', text: 'This cost-effective, compact programmable logic controller offers integrated, high-performance machine control. It is expandable to meet diverse application needs and connects to plant-wide systems through Ethernet communications.' },
      { type: 'p', text: 'Using DSP technology, it achieves rapid response times, making it a versatile choice for precision control.' },
    ],
    catalogues: [{ label: 'MACO retrofits', href: 'https://utm.guru/HTS-MacoRF' }],
  },
  {
    slug: 'mouldcleaner',
    supplier: 'Hengfei',
    what: 'Mould Cleaner',
    blurb: 'Waterway cleaning machines that remove scale, rust and sludge.',
    heading: 'Mould Cleaning',
    title: 'Mould Cleaning Machines | HTS International',
    description:
      'Hengfei mould waterway cleaning machines that remove scale, rust and sludge from injection mould cooling circuits.',
    blocks: [
      { type: 'p', text: 'The mould waterway cleaning machine decomposes scale, rust and sludge without leaving any residue.' },
      { type: 'p', text: 'Efficient cooling of the water circuit in plastic moulds is crucial for product formation during the moulding process. Poor cooling or extended cooling times can lead to defects such as bending, burrs and bubbles, compromising product quality and increasing production costs.' },
      { type: 'p', text: 'We offer a professional solution for all types of plastic machine and injection mould waterway problems. Our products address issues such as limited water flow in cooling rings, inadequate heat dissipation and high oil temperatures.' },
      { type: 'h2', text: 'Key features' },
      { type: 'ul', items: ['PLC + touch control', 'Three-step pulse cleaning', 'Automatic blow drying', 'Adjustable cleaning time', 'Automatic low water alarm'] },
      { type: 'h2', text: 'HF-2LC' },
      { type: 'h3', text: 'Five in, five out mould cleaner' },
      { type: 'ul', items: ['80 L tank capacity', '8 kg pulse pressure', '3 kW water pump', 'Fast, medium and slow pulse function', 'Automatic blow drying', 'Automatic error alarm'] },
    ],
    catalogues: [{ label: 'Mould cleaner', href: 'https://utm.guru/HTS-MC' }],
    note: 'Live page has before/after photos. Needs supplier images. Tile on live site used the HTS logo as a placeholder.',
  },
  {
    slug: 'linearpotentiometer',
    supplier: 'KTF',
    what: 'Linear Potentiometer',
    blurb: 'Length and displacement measurement, strokes up to 4000 mm.',
    heading: 'Linear Potentiometer',
    title: 'Linear Potentiometers | HTS International',
    description:
      'Linear potentiometers for length and displacement measurement on injection moulding and hydraulic machinery, with strokes up to 4000 mm.',
    blocks: [
      { type: 'h2', text: 'Product summary' },
      { type: 'p', text: 'Designed for precise and accurate length measurement, the linear potentiometer is suited to control and measuring applications in the plastics manufacturing industry.' },
      { type: 'p', text: 'It measures displacement and length directly, outputting a DC voltage signal. This can be converted to standard 0-5 V, 0-10 V or 4-20 mA DC signals using a built-in or external V/A converter module. It also supports remote transmission control requirements.' },
      { type: 'h2', text: 'Application range' },
      { type: 'p', text: 'The linear potentiometer is designed for compact installation, which suits applications where reducing the installed length in the mechanical direction is important. It is particularly suited to large-stroke applications, including:' },
      { type: 'ul', items: ['Large injection moulding machine closing strokes', 'Rubber machine closing strokes', 'Woodworking machinery', 'Hydraulic machinery'] },
      { type: 'h2', text: 'Key features' },
      { type: 'ul', items: [
        'Side-driven actuator: driving the actuator from the side along the unit length reduces the transducer’s total length, allowing stroke lengths of up to 4000 mm.',
        'Compact and efficient design: the transducer is shorter and more adaptable to installation requirements.',
        'Passive and absolute measurement: using a simple, passive, absolute measuring technique, the transducer is immune to external electrical interference.',
        'No built-in power supply needed: positional information is maintained even in the event of a power failure.',
        'Real-time sensing: like other potentiometric sensors, these transducers provide real-time positional data.',
      ] },
    ],
    catalogues: [{ label: 'Catalogue and price list', href: 'https://utm.guru/HTS-LP' }],
    note: 'DECISION NEEDED: the live page publishes a KTF Series part number and PRICE table (e.g. KTF-0050 $88.70 up to KTF-0360 $189.10, more rows below). It is omitted here until the client confirms whether prices should stay public. Also check the rest of the live page (lines 614-885 of live-site-copy.md) for further tables.',
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

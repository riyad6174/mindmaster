export type BuzzItem = {
  slug: string;
  tag: string;
  tagStyle: string;
  cardBg: string;
  borderColor: string;
  titleColor: string;
  bodyColor: string;
  btnBg: string;
  btnText: string;
  shadow: string;
  rotate: string;
  title: string;
  body: string;
  icon: string;
  accentColor: string;
  date: string;
  readTime: string;
  fullBody: string[];
  highlights: string[];
};

export const buzzItems: BuzzItem[] = [
  {
    slug: 'robotics-camp',
    tag: 'Event',
    tagStyle: 'bg-[#8126cf] text-white border-2 border-[#8126cf]',
    cardBg: 'bg-[#f5eeff]',
    borderColor: 'border-[#c4b5fd]',
    titleColor: 'text-[#3b0764]',
    bodyColor: 'text-[#6b21a8]',
    btnBg: 'bg-[#8126cf]',
    btnText: 'text-white',
    shadow: 'shadow-[6px_6px_0px_0px_rgba(129,38,207,0.2)]',
    rotate: '-rotate-1 hover:rotate-0',
    accentColor: '#8126cf',
    icon: 'precision_manufacturing',
    date: 'June 15, 2024',
    readTime: '3 min read',
    title: "Summer Robotics Camp '24",
    body: 'Build, code, and compete in our month-long intense robotic workshop. Early bird gets the worm!',
    fullBody: [
      "We're thrilled to announce the return of our flagship Summer Robotics Camp for 2024! This is your chance to spend four weeks building, coding, and competing alongside some of the brightest young minds in the region.",
      "Students will work in small teams to design and program their own robots from scratch using industry-standard tools like Arduino and Raspberry Pi. Each week builds on the last — from basic wiring and mechanical assembly in Week 1, to autonomous navigation algorithms in Week 4.",
      "The camp culminates in a live robot battle showcase event open to parents and the public. Teams will be judged on design creativity, programming efficiency, and on-floor performance. Trophies and certificates will be awarded to top performers.",
      "Early bird registration is now open with a 15% discount. Spots are strictly limited to 30 students to keep a low student-to-mentor ratio. Don't miss out — last year's camp sold out in under 48 hours!",
    ],
    highlights: [
      'Month-long intensive program (4 weeks)',
      'Build a fully functional robot from scratch',
      'Learn Arduino & Raspberry Pi programming',
      'Live showcase & competition event',
      'Professional mentors from tech industry',
      '15% early bird discount available',
    ],
  },
  {
    slug: 'vr-lab',
    tag: 'Update',
    tagStyle: 'bg-[#6a5b00] text-white border-2 border-[#6a5b00]',
    cardBg: 'bg-[#fffbe8]',
    borderColor: 'border-[#fde68a]',
    titleColor: 'text-[#483d00]',
    bodyColor: 'text-[#6a5b00]',
    btnBg: 'bg-[#fcdf46]',
    btnText: 'text-[#483d00]',
    shadow: 'shadow-[6px_6px_0px_0px_rgba(252,223,70,0.35)]',
    rotate: 'rotate-1 hover:rotate-0',
    accentColor: '#6a5b00',
    icon: 'vrpano',
    date: 'May 28, 2024',
    readTime: '2 min read',
    title: 'New Virtual Reality Lab',
    body: 'Explore the solar system or walk through history with our brand new state-of-the-art VR headsets.',
    fullBody: [
      "Mind Masters is proud to unveil our brand-new Virtual Reality Learning Lab — the first of its kind in the region for a K-12 learning centre. Equipped with 12 Meta Quest 3 headsets and purpose-built educational software, the lab is now open for all enrolled students.",
      "Imagine walking through the streets of ancient Rome for a history lesson, or floating beside the International Space Station during a science class. Our VR library currently includes over 80 immersive experiences across subjects including History, Geography, Biology, Physics, and Art.",
      "The lab is integrated directly into our existing curriculum schedule. Each session is facilitated by a trained instructor who guides students through the experience and follows up with discussion activities to reinforce learning outcomes.",
      "Students in Grades 4 and above can access the VR Lab during dedicated slots in the weekly schedule. We are also offering open-lab sessions on Saturday mornings for independent exploration.",
    ],
    highlights: [
      '12 Meta Quest 3 headsets available',
      '80+ immersive educational experiences',
      'Covers History, Science, Geography & Art',
      'Instructor-guided sessions included',
      'Saturday open-lab sessions for all grades',
      'Accessible from Grade 4 onwards',
    ],
  },
  {
    slug: 'math-olympiad',
    tag: 'Win',
    tagStyle: 'bg-[#006a2d] text-white border-2 border-[#006a2d]',
    cardBg: 'bg-[#edfff3]',
    borderColor: 'border-[#86efac]',
    titleColor: 'text-[#004a1d]',
    bodyColor: 'text-[#006a2d]',
    btnBg: 'bg-[#6bff8f]',
    btnText: 'text-[#004a1d]',
    shadow: 'shadow-[6px_6px_0px_0px_rgba(107,255,143,0.3)]',
    rotate: '-rotate-1 hover:rotate-0',
    accentColor: '#006a2d',
    icon: 'emoji_events',
    date: 'May 12, 2024',
    readTime: '2 min read',
    title: 'Math Olympiad Winners',
    body: 'Shoutout to our Grade 8 team for clinching the regional gold trophy this weekend!',
    fullBody: [
      "We are beyond proud to share that our Grade 8 mathematics team has brought home the Regional Math Olympiad Gold Trophy — competing against 24 teams from across the province and finishing first place by a significant margin!",
      "The team of five students tackled three gruelling rounds of competition spanning algebra, combinatorics, number theory, and geometry. Their performance in the final round was described by the judges as 'exceptional' and 'remarkably methodical for students their age.'",
      "This win is the culmination of eight months of dedicated preparation. Our students attended weekly Olympiad training sessions, completed hundreds of past competition papers, and pushed each other to higher and higher standards. Their commitment and teamwork is an inspiration to every student at Mind Masters.",
      "We extend our heartfelt congratulations to all five team members and to our math coaches who put in countless hours of preparation. A special ceremony and gallery exhibition will be held next Friday evening to celebrate this achievement — all families are warmly invited.",
    ],
    highlights: [
      '1st place among 24 competing teams',
      'Covered algebra, number theory & geometry',
      '8 months of dedicated preparation',
      'Highest score in the final round',
      'Celebration ceremony — all families invited',
      'Students to represent province at nationals',
    ],
  },
];

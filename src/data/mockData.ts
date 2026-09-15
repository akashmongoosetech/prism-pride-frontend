import { Story, Resource, ResourceComment, EventItem, SupportGroup, BlogPost, Partner, FAQItem, VolunteerRole, CommunityDiscussion, ModerationReport, NewsletterSubscriber } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Finding My Voice: From Silence to the Front Row of Pride',
    excerpt: 'Growing up in a conservative small town, I spent 22 years speaking in half-truths. Here is the moment I finally walked under the rainbow flag without looking over my shoulder.',
    content: `Growing up in a conservative small town, I spent 22 years speaking in half-truths. Every time someone asked about my weekend, my crushes, or my dreams, I carefully edited my pronouns and erased the people I loved from the narrative.

The fear wasn't just hypothetical—it was the pervasive chill of thinking that belonging was a privilege I hadn't earned.

The turning point came when I attended my first university support circle. I remember sitting in the back corner of room 302, fingers digging into my backpack straps, ready to invent an excuse to leave. But the facilitator, a trans woman named Maya, smiled gently and said: "Take your time. You don't owe anyone a revelation until your heart feels safe."

That single sentence shattered years of conditioned shame. Safe. I realized that coming out wasn't about performing bravery for an audience—it was an act of reclamation for myself.

Three years later, I stood at the front row of the City Pride March, holding one edge of our community banner. My mother stood two rows back in the crowd, wearing a handmade button that read 'Proud Mom of a Resilient Kid'. If you are reading this while still in the quiet phase, please remember: the world waiting for you is bigger, kinder, and more luminous than the shadows you are surviving today.`,
    authorName: 'Alex Rivera',
    isAnonymous: false,
    authorPronouns: 'they/them',
    authorRole: 'Community Storyteller & Youth Peer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorBio: 'Prism youth advocate and community storyteller writing about self-acceptance, small-town queer resilience, and the liberating joy of finding your chosen family.',
    category: 'Coming Out',
    tags: ['Coming Out', 'Pride', 'Hope', 'Self-Acceptance'],
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    publishedAt: '2026-08-14',
    likes: 342,
    reactions: { heart: 284, rainbow: 310, inspire: 198 },
    status: 'approved',
    featured: true,
    comments: [
      {
        id: 'c1',
        authorName: 'Jordan K.',
        pronouns: 'he/him',
        content: 'Your story gave me chills. I am sitting in that metaphorical back corner right now, and this gave me genuine hope.',
        createdAt: '2026-08-15',
        status: 'approved'
      },
      {
        id: 'c2',
        authorName: 'Priya M.',
        pronouns: 'she/her',
        content: 'Bless you and bless your mother! Thank you for sharing your light with us.',
        createdAt: '2026-08-16',
        status: 'approved'
      }
    ]
  },
  {
    id: 'story-2',
    title: 'Learning to Love My Son for Exactly Who He Is',
    excerpt: 'When my fourteen-year-old came out as trans, my first emotion was not anger—it was terror for his safety. Here is how our family transformed fear into fierce unconditional allyship.',
    content: `When my fourteen-year-old came into the kitchen on a rainy Tuesday evening and placed a handwritten note on the counter, my world tilted on its axis. He didn't speak. He just waited with trembling knuckles while I read: "Mom, I am a boy. My name is Julian."

My immediate visceral reaction was not hostility—it was pure maternal terror. I lived in a world where headlines frequently reminded us of the prejudice transgender youth face. I wondered what I had missed, whether I had failed him, and how I was going to protect him from cruelty.

A friend recommended our local PFLAG and Prism Parent Support Circle. Walking into that room was the best decision of my parenting life. I met doctors, teachers, retired grandparents, and young parents like myself. A father of a 24-year-old trans engineer looked me in the eye and said: "Your job isn't to grieve a fantasy; your job is to love the living, breathing human being who trusted you with his truth."

We began using his correct name and pronouns the very next day. We bought his first tailored suit for the eighth-grade dinner. Seeing the radiant confidence in Julian's eyes when he looked into the mirror was all the confirmation I ever needed. Love is not passive acceptance—it is active, joyful protection.`,
    authorName: 'Elena Rostova',
    isAnonymous: false,
    authorPronouns: 'she/her',
    authorRole: 'Parent Advocate & PFLAG Facilitator',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    authorBio: 'Proud parent, educator, and PFLAG family circle facilitator dedicated to unconditional trans youth acceptance and nurturing affirming family bonds.',
    category: 'Family',
    tags: ['Parents', 'Trans Youth', 'Unconditional Love', 'Family Healing'],
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    publishedAt: '2026-07-28',
    likes: 519,
    reactions: { heart: 490, rainbow: 420, inspire: 380 },
    status: 'approved',
    featured: true,
    comments: [
      {
        id: 'c3',
        authorName: 'Kai S.',
        pronouns: 'he/they',
        content: 'I wish every parent could read this. Elena, you are saving your son’s life every single day.',
        createdAt: '2026-07-29',
        status: 'approved'
      }
    ]
  },
  {
    id: 'story-3',
    title: 'Transition at 52: It Is Never Too Late to Live Your Truth',
    excerpt: 'I had a career, a mortgage, and half a century of living as someone I did not recognize. Blossoming later in life taught me that courage has no expiration date.',
    content: `For decades, I believed that the window for authenticity had closed behind me. I told myself that transitions were for the young, the unencumbered, the bold new generation. At 50, I was an architect with graying temples, living comfortably on paper, yet numb inside.

Then during an annual medical checkup, my physician noticed my persistent anxiety and asked a simple question: "David, are you taking care of your soul?"

That night, I wept alone in my study. Over the next year, with the gentle guidance of an LGBTQIA+-affirming therapist, I unpacked the identity I had buried under respectability politics. At age 52, I introduced myself to my firm and my friends as Claire.

Was there friction? Yes. But there was also a wave of grace I never anticipated. Colleagues sent flowers. Long-lost friends reconnected. For the first time in 52 years, when I catch my reflection in the glass of a skyscraper I designed, I don't see a stranger. I see Claire. Never let anyone convince you that the clock has run out on your peace.`,
    authorName: 'Claire Beaumont',
    isAnonymous: false,
    authorPronouns: 'she/her',
    authorRole: 'Architect & Late-Transition Peer Mentor',
    authorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80',
    authorBio: 'Architect, speaker, and late-in-life transition mentor who shares insights on breaking through societal expectations to live authentically at any age.',
    category: 'Transition',
    tags: ['Later in Life', 'Trans Joy', 'Resilience', 'Authenticity'],
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    publishedAt: '2026-06-19',
    likes: 412,
    reactions: { heart: 395, rainbow: 380, inspire: 340 },
    status: 'approved',
    featured: false,
    comments: [
      {
        id: 'c4',
        authorName: 'Marcus T.',
        pronouns: 'he/him',
        content: 'At 47, I thought my window was closed too. Thank you for this breathtaking reminder, Claire.',
        createdAt: '2026-06-20',
        status: 'approved'
      }
    ]
  },
  {
    id: 'story-4',
    title: 'Chosen Family in the Big City: How We Built a Haven',
    excerpt: 'When three displaced queer students decided to share a tiny 2-bedroom flat, none of us realized we were laying the foundation for a permanent sanctuary.',
    content: `We called our third-floor flat 'The Sanctuary'. The rent was steep, the radiator clanked all winter, and our furniture came almost exclusively from street curbs and thrift sales. But on Sunday evenings, our small kitchen smelled of garlic, lentil soup, and sweet chai.

Each of us had arrived in the city carrying invisible bruises—ruptured family ties, job discrimination, and the dizzying loneliness of navigating an unforgiving metropolis. But together, we formed our own non-negotiable traditions. We celebrated 'Name-day Anniversaries', baked birthday cakes for chosen relatives, and created a quiet corner stocked with teas, blankets, and affirmations for panic attacks.

Over six years, more than forty people found temporary shelter on our living room futon while fleeing unsupportive households or transitioning between jobs. Today, even though we live in different apartments, our chosen family still convenes every single month. Blood may be history, but love is choice.`,
    authorName: 'Tariq & The 7th Ward Crew',
    isAnonymous: false,
    authorPronouns: 'he/him',
    authorRole: 'Grassroots Organizers & Mutual Aid Collective',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorBio: 'Mutual aid collective and chosen-family organizers creating housing havens, food distribution, and communal solidarity in the heart of the city.',
    category: 'Community',
    tags: ['Chosen Family', 'Mutual Aid', 'Queer Friendship', 'City Life'],
    coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    readTime: '3 min read',
    publishedAt: '2026-05-10',
    likes: 289,
    reactions: { heart: 270, rainbow: 260, inspire: 180 },
    status: 'approved',
    featured: false,
    comments: [
      {
        id: 'c5',
        authorName: 'Maya L.',
        pronouns: 'she/they',
        content: 'Chosen family saved my life when I moved here with just two suitcases. Sending love to the Sanctuary crew!',
        createdAt: '2026-05-12',
        status: 'approved'
      }
    ]
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    slug: 'trevor-lifeline-24-7',
    title: 'The Trevor Project Lifeline',
    description: 'Free, confidential, 24/7 suicide prevention and crisis intervention services for LGBTQIA+ young people via phone, text, and chat.',
    fullContent: `The Trevor Project is the world’s largest suicide prevention and crisis intervention organization for LGBTQ young people. Trained counselors are available 24/7/365 to offer judgment-free, confidential support whenever you are overwhelmed, lonely, or need someone safe to talk to.

How to Connect:
• Call 1-866-488-7386 anytime
• Text START to 678-678
• Online confidential chat available on their website

Confidentiality & Privacy:
All calls, texts, and chats are completely private and free. No insurance, credit card, or parental consent is required.`,
    category: 'crisis',
    type: 'Crisis Helpline',
    phone: '1-866-488-7386',
    hours: '24 Hours / 7 Days a week',
    websiteUrl: 'https://www.thetrevorproject.org',
    region: 'North America & Global Online',
    verified: true,
    emergencyPriority: true,
    tags: ['Crisis', 'Youth', 'Mental Health', '24/7 Support', 'Hotline']
  },
  {
    id: 'res-2',
    slug: 'trans-lifeline-peer-support',
    title: 'Trans Lifeline Peer Support Hotline',
    description: 'A grassroots hotline run by and for trans and nonbinary individuals offering peer support, emotional grounding, and microgrants with zero non-consensual rescue policies.',
    fullContent: `Trans Lifeline provides trans peer support for our community that’s been divested from police intervention. They are run entirely by trans individuals for trans individuals.

Key Distinctions:
• Staffed 100% by trans, nonbinary, and gender-diverse operators
• Strict NO NON-CONSENSUAL RESCUE policy (they will never call police or emergency services without your explicit consent)
• Name change financial microgrants and ID legal assistance directory`,
    category: 'trans-support',
    type: 'Crisis Helpline',
    phone: '877-565-8860',
    hours: 'Monday - Friday (10am - 6pm EST)',
    websiteUrl: 'https://translifeline.org',
    region: 'United States & Canada',
    verified: true,
    emergencyPriority: true,
    tags: ['Transgender', 'Nonbinary', 'Peer Support', 'Anti-Police Intervention']
  },
  {
    id: 'res-3',
    slug: 'lgbt-national-help-center',
    title: 'LGBT National Help Center',
    description: 'Serving the LGBTQIA+ community since 1996 through toll-free peer-support telephone lines, online private chat rooms, and a massive national resource database.',
    fullContent: `The LGBT National Help Center provides vital peer-support, community connections, and local resource information for people of all ages. They maintain the largest verified database of LGBTQIA+-friendly healthcare providers, social centers, sports leagues, and religious communities in North America.`,
    category: 'mental-health',
    type: 'Support Guide',
    phone: '1-888-843-4564',
    hours: 'Monday - Friday (1pm - 9pm PT), Saturday (9am - 2pm PT)',
    websiteUrl: 'https://www.lgbthotline.org',
    region: 'International / USA',
    verified: true,
    emergencyPriority: false,
    tags: ['General', 'Peer Support', 'Database', 'All Ages']
  },
  {
    id: 'res-4',
    slug: 'international-railroad-refugee-assistance',
    title: 'Rainbow Railroad - Emergency Relocation',
    description: 'Global organization assisting LGBTQIA+ individuals escaping state-sponsored persecution, violence, and criminalization to find safe haven.',
    fullContent: `Rainbow Railroad is a global not-for-profit organization that helps at-risk LGBTQIA+ people get to safety worldwide. In countries around the world, LGBTQIA+ individuals face systemic violence and legal prosecution. Rainbow Railroad provides emergency travel support, legal consultation, and settlement aid.`,
    category: 'safety',
    type: 'Housing Network',
    websiteUrl: 'https://www.rainbowrailroad.org',
    region: 'Global Emergency Relocation',
    verified: true,
    emergencyPriority: true,
    tags: ['Refugees', 'Asylum', 'Global Human Rights', 'Emergency Relocation']
  },
  {
    id: 'res-5',
    slug: 'coming-out-handbook-guide',
    title: 'The Trevor Project Coming Out: Living Authentically Guide',
    description: 'A comprehensive, heart-centered interactive workbook designed to help you explore your sexual orientation and gender identity at your own pace.',
    fullContent: `Navigating sexual orientation and gender identity is deeply personal and rarely linear. This guide walks you through:
• Self-reflection exercises and exploring your inner truth
• Assessing your environment, emotional safety, and physical security
• Step-by-step communication templates for family, friends, and coworkers
• What to do if someone’s initial reaction is lukewarm or defensive
• Celebrating yourself, whether you are ready to be out publicly or privately.`,
    category: 'coming-out',
    type: 'Support Guide',
    websiteUrl: 'https://www.thetrevorproject.org/resources/guide/the-coming-out-handbook/',
    region: 'Global',
    verified: true,
    emergencyPriority: false,
    tags: ['Coming Out', 'Self Discovery', 'Parent Communication', 'Safety First']
  },
  {
    id: 'res-6',
    slug: 'wpath-gender-affirming-standards-care',
    title: 'WPATH & Affirming Care Directory',
    description: 'Evidence-based clinical guidelines and global registry of verified gender-affirming doctors, endocrinologists, surgeons, and mental health clinicians.',
    fullContent: `World Professional Association for Transgender Health (WPATH) promotes evidence-based care and clinical consensus for transgender and gender-diverse individuals. Browse clinicians who follow informed consent models and compassionate, respectful standards of care.`,
    category: 'sexual-health',
    type: 'Health Service',
    websiteUrl: 'https://www.wpath.org',
    region: 'Global Healthcare Network',
    verified: true,
    emergencyPriority: false,
    tags: ['HRT', 'Endocrinology', 'Informed Consent', 'Healthcare Verification']
  },
  {
    id: 'res-7',
    slug: 'lambda-legal-defense-education',
    title: 'Lambda Legal - LGBTQ+ Civil Rights Help Desk',
    description: 'Legal assistance, litigation defense, and rights education for employment discrimination, healthcare equality, marriage, and transgender civil protections.',
    fullContent: `Lambda Legal is the oldest and largest national legal organization committed to achieving full recognition of the civil rights of LGBTQIA+ people and everyone living with HIV through impact litigation, education, and public policy work.`,
    category: 'legal',
    type: 'Legal Aid',
    phone: '1-866-542-8336',
    hours: 'Monday - Friday (9am - 5pm EST)',
    websiteUrl: 'https://www.lambdalegal.org',
    region: 'United States & Territories',
    verified: true,
    emergencyPriority: false,
    tags: ['Civil Rights', 'Workplace Discrimination', 'Family Law', 'Legal Defense']
  },
  {
    id: 'res-8',
    slug: 'pflag-family-acceptance-network',
    title: 'PFLAG National Family Acceptance Network',
    description: 'The nation’s largest organization dedicated to supporting, educating, and advocating for LGBTQ+ people, their parents, families, and allies.',
    fullContent: `With over 400 local chapters across the country, PFLAG provides monthly parent peer-support meetings, bilingual education materials, scholarship programs, and loving spaces for parents transitioning into active, educated advocates.`,
    category: 'family-parents',
    type: 'Support Guide',
    phone: '202-467-8180',
    websiteUrl: 'https://pflag.org',
    region: 'North America & Global Sister Chapters',
    verified: true,
    emergencyPriority: false,
    tags: ['Parents', 'Allies', 'Family Acceptance', 'Chapters']
  },
  {
    id: 'res-9',
    slug: 'ali-forney-center-youth-housing',
    title: 'Ali Forney Center - LGBTQ+ Youth Homelessness Support',
    description: 'Providing comprehensive housing, warm meals, medical and mental healthcare, and vocational training for unhoused LGBTQ+ youth aged 16-24.',
    fullContent: `No young person should ever be abandoned by their family for their identity. The Ali Forney Center operates 17 emergency and transitional housing sites along with a 24-hour drop-in center providing showers, clothes, HIV testing, warm meals, and trauma-informed mental health counseling.`,
    category: 'housing',
    type: 'Housing Network',
    phone: '212-206-0574',
    websiteUrl: 'https://www.aliforneycenter.org',
    region: 'New York & Global Referral Network',
    verified: true,
    emergencyPriority: true,
    tags: ['Youth Shelters', 'Emergency Beds', 'Drop-in Centers', 'Meals']
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: 'Metro Pride Parade & Festival 2026',
    description: 'Join over 100,000 community members, allies, musicians, and performers as we take over downtown with joy, activism, and unforgettable rainbow energy!',
    category: 'Pride',
    date: '2026-06-27',
    time: '11:00 AM - 7:00 PM EST',
    isOnline: false,
    city: 'New York, NY',
    location: 'Civic Plaza & Downtown Broad Street, New York, NY',
    organizer: 'Prism Pride Committee & City Council',
    image: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=1200&q=80',
    capacity: 25000,
    attendeesCount: 14280,
    tags: ['Pride 2026', 'Parade', 'Live Music', 'Community Festival', 'All-Ages'],
    featured: true,
    isPrideOfficial: true,
    isFree: true,
    scheduleHighlights: [
      '11:00 AM - March assembly & Opening Indigenous Blessing',
      '12:00 PM - Grand Parade Kickoff from Monument Circle',
      '02:30 PM - Mainstage performances featuring queer indie artists',
      '04:00 PM - Youth & Senior Unity speeches',
      '06:30 PM - Closing sunset dance & choir celebration'
    ]
  },
  {
    id: 'event-2',
    title: 'Queer Voices: Open Mic & Storytelling Night',
    description: 'A warm, cozy, acoustic evening of poetry, personal essays, humor, and songs by local LGBTQIA+ storytellers in an alcohol-free, affirming environment.',
    category: 'Arts & Culture',
    date: '2026-09-24',
    time: '6:30 PM - 9:00 PM EST',
    isOnline: false,
    city: 'Chicago, IL',
    location: 'Wildflower Community Commons, Room A, Chicago, IL',
    organizer: 'Prism Arts Collective',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    capacity: 120,
    attendeesCount: 94,
    tags: ['Storytelling', 'Poetry', 'Sober Space', 'Creative Community'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '6:30 PM - Warm herbal teas & mingling',
      '7:00 PM - Feature reader: Sasha Thorne',
      '7:30 PM - Open mic (5 min slots)',
      '8:45 PM - Community group photo & book swap'
    ]
  },
  {
    id: 'event-3',
    title: 'Navigating Workplace Rights & Corporate Inclusion Workshop',
    description: 'Learn practical strategies for coming out at work, negotiating inclusive benefits (gender-affirming care, parental leave), and handling microaggressions.',
    category: 'Workshop',
    date: '2026-10-05',
    time: '5:00 PM - 6:30 PM EST',
    isOnline: true,
    city: 'Virtual / Online',
    location: 'Virtual Webinar (Zoom)',
    virtualLink: 'https://zoom.us/j/prism-workplace-webinar',
    organizer: 'Out & Equal Corporate Alliance',
    image: 'https://images.unsplash.com/photo-1573497491768-6d2e67df1460?auto=format&fit=crop&w=1200&q=80',
    capacity: 500,
    attendeesCount: 312,
    tags: ['Career', 'Workplace Rights', 'Webinar', 'Legal Tips'],
    featured: true,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '5:00 PM - Keynote: Civil rights in modern employment',
      '5:30 PM - HR Policy deep dive: Health plan rider audits',
      '6:00 PM - Anonymous live Q&A panel with labor attorneys'
    ]
  },
  {
    id: 'event-4',
    title: 'Trans & Nonbinary Affirming Clothing Swap & Styling Day',
    description: 'Free gender-affirming wardrobe refresh! Bring gently used clothes, binders, suits, and accessories, or come take what you need with zero questions asked.',
    category: 'Community',
    date: '2026-10-17',
    time: '1:00 PM - 5:00 PM EST',
    isOnline: false,
    city: 'Atlanta, GA',
    location: 'St. Jude Youth Center Gymnasium, 404 Maple St., Atlanta, GA',
    organizer: 'Trans Liberation Coalition',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    capacity: 250,
    attendeesCount: 188,
    tags: ['Mutual Aid', 'Trans Joy', 'Fashion', 'All-Free'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '1:00 PM - Drop-off & volunteer sorting',
      '1:30 PM - Floor opens: Casual wear, shoes, business suits',
      '3:00 PM - Professional makeup & hair consultation table',
      '4:30 PM - Wrap up & donation pickup'
    ]
  },
  {
    id: 'event-5',
    title: 'Pride In The Park: Youth & Family Rainbow Picnic',
    description: 'An inclusive outdoor afternoon with lawn games, free BBQ & vegan snacks, face painting, bounce castles, and family ally resources.',
    category: 'Social',
    date: '2026-06-14',
    time: '12:00 PM - 4:00 PM EST',
    isOnline: false,
    city: 'Seattle, WA',
    location: 'Sunken Meadow Regional Park Pavilion #3, Seattle, WA',
    organizer: 'Prism Families Circle',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    capacity: 600,
    attendeesCount: 450,
    tags: ['Families', 'Kids', 'Picnic', 'Outdoor Games', 'Pride Month'],
    featured: false,
    isPrideOfficial: true,
    isFree: true,
    scheduleHighlights: [
      '12:00 PM - Picnic setup & music playlist start',
      '1:00 PM - Drag Story Hour with Queen Sparkle',
      '2:30 PM - Relay races and tug-of-war for all ages',
      '3:30 PM - Rainbow cupcake decorating contest'
    ]
  },
  {
    id: 'event-6',
    title: 'Queer Mental Health & Somatic Healing Circle',
    description: 'A gentle, trauma-informed breathwork and somatic movement workshop designed to release minority stress and restore nervous system balance.',
    category: 'Health',
    date: '2026-11-08',
    time: '10:00 AM - 12:00 PM EST',
    isOnline: true,
    city: 'Virtual / Online',
    location: 'Online via Prism Health Secure Room',
    virtualLink: 'https://prismhealth.org/live/somatic-circle',
    organizer: 'Prism Wellness Team',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    capacity: 80,
    attendeesCount: 68,
    tags: ['Mental Health', 'Meditation', 'Stress Relief', 'Trauma Informed'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '10:00 AM - Grounding exercise & intention setting',
      '10:30 AM - Guided gentle somatic movement',
      '11:15 AM - Group reflections (optional camera-on)',
      '11:50 AM - Closing resource handout'
    ]
  },
  {
    id: 'event-7',
    title: 'Bisexual & Pansexual Community Mixer & Game Night',
    description: 'A vibrant, bi-affirming social evening featuring tabletop board games, team trivia, mocktails, and casual connections without binary expectations.',
    category: 'Social',
    date: '2026-09-18',
    time: '7:00 PM - 10:00 PM EST',
    isOnline: false,
    city: 'San Francisco, CA',
    location: 'Castro Community Center, Lounge B, San Francisco, CA',
    organizer: 'Bay Area Bi & Pan Network',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    capacity: 100,
    attendeesCount: 76,
    tags: ['Bisexual', 'Pansexual', 'Board Games', 'Social Mixer'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '7:00 PM - Welcome mocktail & name tag icebreakers',
      '7:30 PM - Board game tables open (Catan, Wingspan, Jackbox)',
      '9:00 PM - Community announcement board & raffle'
    ]
  },
  {
    id: 'event-8',
    title: 'Parent & Caregiver Allyship Roundtable: Supporting LGBTQ+ Teens',
    description: 'Expert-led panel for parents, guardians, and teachers on navigating coming-out conversations, school policies, gender-affirming healthcare access, and affirmation.',
    category: 'Support',
    date: '2026-09-28',
    time: '6:00 PM - 8:00 PM EST',
    isOnline: true,
    city: 'Virtual / Online',
    location: 'Zoom Interactive Video Room',
    virtualLink: 'https://zoom.us/j/prism-parents-roundtable',
    organizer: 'Prism Families & PFLAG Alliance',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80',
    capacity: 300,
    attendeesCount: 215,
    tags: ['Parents', 'Youth Support', 'Family Affirmation', 'Education'],
    featured: true,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '6:00 PM - Introduction & adolescent psychology landscape',
      '6:40 PM - Q&A with pediatric therapists & family counselors',
      '7:30 PM - Breakout peer parent discussion pods'
    ]
  },
  {
    id: 'event-9',
    title: 'Queer Climate Justice & Community Garden Planting Day',
    description: 'Join queer environmentalists to plant pollinator gardens, install rainwater catchers, and share vegan picnic lunches in mutual ecological solidarity.',
    category: 'Advocacy',
    date: '2026-10-10',
    time: '9:30 AM - 1:30 PM EST',
    isOnline: false,
    city: 'Austin, TX',
    location: 'East Austin Urban Ecology Hub, Austin, TX',
    organizer: 'Queers for Climate Action',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    capacity: 75,
    attendeesCount: 52,
    tags: ['Climate Justice', 'Gardening', 'Eco-Mutual Aid', 'Outdoor'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '9:30 AM - Tool orientation & seed dispersal demo',
      '10:30 AM - Raised bed construction & wildflower sowing',
      '12:30 PM - Potluck lunch & environmental justice talk'
    ]
  },
  {
    id: 'event-10',
    title: 'LGBTQIA+ Senior Coffee Morning & Oral History Exchange',
    description: 'A quiet morning tea gathering connecting elder LGBTQIA+ trailblazers with youth volunteers to preserve oral histories, photo archives, and enduring friendship.',
    category: 'Community',
    date: '2026-09-15',
    time: '10:30 AM - 12:30 PM EST',
    isOnline: false,
    city: 'New York, NY',
    location: 'The Stonewall Inn Community Annex, New York, NY',
    organizer: 'SAGE & Prism Intergenerational Alliance',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    capacity: 60,
    attendeesCount: 48,
    tags: ['Elders', 'Seniors', 'History', 'Intergenerational'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '10:30 AM - Artisanal pastries & warm beverages',
      '11:00 AM - Featured story: Stonewall era recollections',
      '11:45 AM - Audio recording booths for voluntary oral history'
    ]
  },
  {
    id: 'event-11',
    title: 'Pride Run & 5K Walk for LGBTQ+ Mental Health',
    description: 'Lace up your sneakers for our annual non-competitive, rainbow-themed 5K run and walk! All paces, mobility devices, and dog companions warmly welcome.',
    category: 'Pride',
    date: '2026-06-21',
    time: '8:00 AM - 11:30 AM EST',
    isOnline: false,
    city: 'Chicago, IL',
    location: 'Lakefront Trail at Montrose Harbor, Chicago, IL',
    organizer: 'Chicago Frontrunners & Prism Athletics',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
    capacity: 2000,
    attendeesCount: 1340,
    tags: ['Pride', 'Fitness', '5K', 'Mental Health Fundraiser'],
    featured: true,
    isPrideOfficial: true,
    isFree: true,
    scheduleHighlights: [
      '8:00 AM - Warm-up stretches with queer athletic coaches',
      '8:30 AM - 5K Run & Roll waves depart',
      '10:00 AM - Finisher medal presentation & DJ dance set'
    ]
  },
  {
    id: 'event-12',
    title: 'Trans Legal Name & Gender Marker Clinic',
    description: 'Free legal assistance from volunteer pro-bono attorneys to prepare court petitions, update government IDs, passports, and birth certificate gender markers.',
    category: 'Advocacy',
    date: '2026-10-24',
    time: '11:00 AM - 3:00 PM EST',
    isOnline: true,
    city: 'Virtual / Online',
    location: 'Encrypted Virtual Legal Rooms (1-on-1 consultations)',
    virtualLink: 'https://prismlegal.org/clinics/identity-documents',
    organizer: 'Transgender Law Center & Prism Advocates',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    capacity: 150,
    attendeesCount: 110,
    tags: ['Legal Clinic', 'Trans Rights', 'Name Change', 'Pro Bono'],
    featured: false,
    isPrideOfficial: false,
    isFree: true,
    scheduleHighlights: [
      '11:00 AM - Statutory overview of identity document amendments',
      '11:45 AM - Individual 1-on-1 breakout rooms with attorneys',
      '2:30 PM - Fee waiver filing procedures guide'
    ]
  }
];

export const INITIAL_SUPPORT_GROUPS: SupportGroup[] = [
  {
    id: 'sg-1',
    name: 'LGBTQIA+ Youth Peer Circle (Ages 14–20)',
    description: 'A safe, moderated weekly space for queer and questioning teens to talk about high school, friendships, coming out, and finding their chosen community.',
    category: 'Youth',
    meetingFormat: 'Hybrid',
    schedule: 'Every Thursday, 6:00 PM - 7:30 PM EST',
    location: 'Prism Downtown Center & Zoom',
    ageRange: '14 - 20 years old',
    facilitator: {
      name: 'River Chen, MSW',
      credentials: 'Licensed Youth Counselor & Peer Educator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    confidentialityLevel: 'High - Anonymous Screen Names Allowed',
    isAcceptingNewMembers: true,
    guidelines: [
      'What is shared in the circle stays in the circle.',
      'Pronoun respect is unconditional.',
      'No unsolicited advice—speak from your own lived experience.',
      'Cameras are always optional during virtual sessions.'
    ],
    membersCount: 48
  },
  {
    id: 'sg-2',
    name: 'Trans & Nonbinary Sanctuary Group',
    description: 'A peer-led circle celebrating gender diversity. We discuss social, legal, and medical navigation, dysphoria management, euphoria triumphs, and mutual care.',
    category: 'Trans & Nonbinary',
    meetingFormat: 'Online',
    schedule: '1st & 3rd Tuesday, 7:00 PM - 8:30 PM EST',
    location: 'Secure Encrypted Video Room',
    ageRange: '18+ adults of all backgrounds',
    facilitator: {
      name: 'Jesse Morales',
      credentials: 'Peer Advocate & Community Doula',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    confidentialityLevel: 'High - Anonymous Screen Names Allowed',
    isAcceptingNewMembers: true,
    guidelines: [
      'Zero policing of gender presentation or passing standards.',
      'Informed consent respect across all medical discussion.',
      'Trigger warnings encouraged before discussing surgery or systemic gatekeeping.'
    ],
    membersCount: 76
  },
  {
    id: 'sg-3',
    name: 'Loving Families: Parents & Caregivers Circle',
    description: 'For parents, guardians, and relatives of LGBTQIA+ youth seeking education, non-judgmental guidance, and peer encouragement to become enthusiastic allies.',
    category: 'Parents & Families',
    meetingFormat: 'In-Person',
    schedule: '2nd Saturday of each month, 10:00 AM - 12:00 PM EST',
    location: 'Grace Community Library, Room B',
    ageRange: 'Parents, Grandparents & Guardians',
    facilitator: {
      name: 'Diane Albright & Marcus Vance',
      credentials: 'PFLAG Chapter Leaders & Parents of Trans Adults',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    confidentialityLevel: 'Standard Safe Space Agreement',
    isAcceptingNewMembers: true,
    guidelines: [
      'Ask questions without fear of using the wrong word; we learn together.',
      'Protect the privacy of your children—no recording.',
      'Commit to hearing perspectives outside your comfort zone.'
    ],
    membersCount: 39
  },
  {
    id: 'sg-4',
    name: 'Coming Out Later in Life (30+)',
    description: 'Navigating marriage shifts, career changes, coparenting, and self-discovery as someone coming out as gay, lesbian, bisexual, or transgender in adulthood.',
    category: 'Coming Out',
    meetingFormat: 'Online',
    schedule: 'Every other Wednesday, 8:00 PM - 9:30 PM EST',
    location: 'Zoom (Link provided after quick intake)',
    ageRange: 'Ages 30 and above',
    facilitator: {
      name: 'Samantha Sterling, LPC',
      credentials: 'Psychotherapist specializing in Adult Identity Transitions',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    confidentialityLevel: 'High - Anonymous Screen Names Allowed',
    isAcceptingNewMembers: true,
    guidelines: [
      'Validate all life stages: there is no one correct timeline.',
      'Support navigating complicated family structures with compassion.',
      'No unsolicited legal or divorce counsel.'
    ],
    membersCount: 52
  },
  {
    id: 'sg-5',
    name: 'Silver Rainbow: LGBTQIA+ Elders & Seniors',
    description: 'Honoring our trailblazers. A joyful social, storytelling, and mutual-care circle for LGBTQIA+ individuals aged 55+ addressing healthcare, connection, and legacy.',
    category: 'Seniors',
    meetingFormat: 'Hybrid',
    schedule: '1st Monday of each month, 2:00 PM - 4:00 PM EST',
    location: 'West End Senior Center & Virtual',
    ageRange: '55+ years',
    facilitator: {
      name: 'Arthur Pendelton',
      credentials: 'Stonewall Generation Advocate & Author',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    confidentialityLevel: 'Standard Safe Space Agreement',
    isAcceptingNewMembers: true,
    guidelines: [
      'Honoring history while embracing intergenerational solidarity.',
      'Assistance with transportation available upon request.',
      'A space free from ageism.'
    ],
    membersCount: 31
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'understanding-pride-more-than-a-celebration',
    title: 'Understanding Pride: Why Joy and Protest Walk Hand in Hand',
    excerpt: 'Behind the glitter, music, and colorful parades lies a courageous history born from rebellion at Stonewall and the Compton’s Cafeteria riots. Here is how we preserve its radical heart.',
    content: `When millions of people march down major city avenues every June draped in rainbow banners, it is easy for observers to see Pride solely as a euphoric street party. And make no mistake: queer joy is deeply sacred. In a world that has historically demanded our silence, laughing loudly in broad daylight is an act of defiance.

Yet to celebrate Pride without acknowledging its roots in protest is to erase the courageous trans women of color, sex workers, drag queens, and unhoused street youths who fought back in 1969.

The Stonewall Rebellion was not a commercial parade. It was six nights of spontaneous uprising led by Marsha P. Johnson, Sylvia Rivera, Stormé DeLarverie, and countless others tired of police brutality, mafia shakedowns, and state-sanctioned raids.

Today, as hundreds of anti-LGBTQIA+ bills are introduced in legislatures across the globe targeting trans youth, gender-affirming care, drag performances, and inclusive library books, our celebrations must remain twin sisters to collective action.

How can you honor Pride year-round?
1. Support grassroots mutual aid funds directly aiding unhoused LGBTQIA+ youth.
2. Demand that corporations pledging support during June maintain inclusive healthcare policies and boycott politicians who vote against civil rights.
3. Show up at school board hearings and city councils to defend public libraries and inclusive curricula.
4. Protect each other. Celebrate wildly, but march fiercely.`,
    author: {
      name: 'Marcus Bell',
      role: 'Senior Editor & Community Historian',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      pronouns: 'he/they',
      bio: 'Senior Editor and community historian with over a decade of dedication to archival queer history, grassroots organizing, and preserving the radical roots of Stonewall.',
      socialLink: 'https://twitter.com/prism_voices'
    },
    publishedAt: '2026-06-01',
    readTime: '6 min read',
    category: 'Pride',
    coverImage: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=1200&q=80',
    tags: ['History', 'Stonewall', 'Pride 2026', 'Activism', 'Queer Joy'],
    featured: true,
    comments: [
      {
        id: 'bc-1',
        postId: 'blog-1',
        authorName: 'Soren Vance',
        pronouns: 'they/them',
        content: 'This piece captures the dual essence of Pride perfectly. We cannot dance in June without remembering Marsha and Sylvia.',
        createdAt: '2026-06-03',
        status: 'approved'
      },
      {
        id: 'bc-2',
        postId: 'blog-1',
        authorName: 'Taylor Cruz',
        pronouns: 'she/her',
        content: 'Sharing this with our local community college diversity club. Educational and deeply moving.',
        createdAt: '2026-06-05',
        status: 'approved'
      }
    ]
  },
  {
    id: 'blog-2',
    slug: 'first-time-pride-attendee-safety-guide',
    title: 'First Time at Pride? The Ultimate Practical & Safety Guide',
    excerpt: 'Going to your very first Pride march can evoke excitement and butterflies. From sensory downtime to staying hydrated and safe, here is everything you need to know.',
    content: `Attending your first Pride is a milestone you will cherish forever. Whether you are marching proudly with your partner, walking quietly as an ally, or attending incognito before coming out, your presence is welcome.

Here is our team’s essential checklist for an empowering, stress-free day:

1. Hydration & Sun Protection
Summer festivals are hot. Pack a refillable water bottle, SPF 50 sunscreen, comfortable walking shoes (leave high heels at home unless you are riding on a float!), and sunglasses.

2. Have a Buddy System
Large crowds can overwhelm cell service. Pick an easy physical landmark—such as a specific statue or fountain outside the parade route—as your designated meetup spot if you get separated.

3. Scout Out Quiet / Low-Sensory Zones
Many Pride organizers (including Prism) offer air-conditioned sensory break tents with dimmed lights, earplugs, and quiet seating. If you experience sensory overload, take breaks guilt-free.

4. Camera Boundaries
If you are not yet out to your employer or family, it is completely valid to wear a hat or sunglasses, or politely ask photographers not to snap close-ups. Most community organizers respect badges that signal privacy preferences.

5. Celebrate at Your Own Speed
There is no "right" way to do Pride. If you stay for 45 minutes and feel exhausted, that is enough. If you dance all afternoon until sunset, that is beautiful too. You are part of our family either way.`,
    author: {
      name: 'Zoe Vance',
      role: 'Events Director',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      pronouns: 'she/her',
      bio: 'Events Director and community organizer coordinating low-sensory rest stations, inclusive Pride parades, and safe spaces for LGBTQIA+ youth and allies.',
      socialLink: 'https://instagram.com/prism_community'
    },
    publishedAt: '2026-06-10',
    readTime: '4 min read',
    category: 'Community',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    tags: ['Pride Tips', 'Safety', 'Beginners', 'Wellbeing'],
    featured: false,
    comments: [
      {
        id: 'bc-3',
        postId: 'blog-2',
        authorName: 'Rowan M.',
        pronouns: 'he/they',
        content: 'The note about low-sensory zones is so critical. As someone on the autism spectrum, sensory tents make Pride accessible for me.',
        createdAt: '2026-06-11',
        status: 'approved'
      }
    ]
  },
  {
    id: 'blog-3',
    slug: 'supporting-loved-one-after-coming-out',
    title: 'How to Support a Loved One When They Come Out to You',
    excerpt: 'When a friend, child, or sibling shares their truth, your initial words matter deeply. Learn how to respond with empathy, curiosity, and steadfast love.',
    content: `When someone comes out to you, they are giving you a gift of profound vulnerability. They are trusting you with something they may have kept guarded for years.

Here are five key principles to guide your response:

1. Express Gratitude First
Before asking logistics or processing your personal emotions, say: "Thank you so much for trusting me enough to share this with me." This immediately eases their fear of rejection.

2. Validate Their Identity
Avoid phrases like "Are you sure?" or "You didn't look/act like that when you were younger." Instead, try: "I see you, I believe you, and this doesn't change how much I value you."

3. Ask About Boundaries and Privacy
Clarify: "Who else in your life knows about this? Are there people or settings where you prefer I use different pronouns or names for your safety?" Never assume that because someone is out to you, they are out to the world.

4. Do the Homework on Your Own Time
Don't turn your loved one into a walking encyclopedia for queer theory. Use trusted platforms like Prism Resources, PFLAG, and GLAAD to research terminology and best practices.

5. Keep Showing Up
Coming out is not a one-day event. Check in over the following weeks. Continue inviting them to dinners, asking about their hobbies, and celebrating their milestones with genuine pride.`,
    author: {
      name: 'Dr. Anita Desai, PsyD',
      role: 'Mental Health Advisor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      pronouns: 'she/her',
      bio: 'Licensed Clinical Psychologist and family counselor specializing in LGBTQIA+ identity exploration, coming out navigation, and trauma-informed family reconciliation.',
      socialLink: 'https://prismhealth.org/advisors/anita-desai'
    },
    publishedAt: '2026-05-18',
    readTime: '5 min read',
    category: 'LGBTQIA+ Education',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    tags: ['Allies', 'Families', 'Communication', 'Education'],
    featured: false,
    comments: [
      {
        id: 'bc-4',
        postId: 'blog-3',
        authorName: 'David H.',
        pronouns: 'he/him',
        content: 'Principle #1 changed the conversation with my daughter completely. Thank you Dr. Desai.',
        createdAt: '2026-05-20',
        status: 'approved'
      }
    ]
  },
  {
    id: 'blog-4',
    slug: 'navigating-lgbtq-friendly-healthcare',
    title: 'Navigating LGBTQIA+-Affirming Healthcare: What to Look For',
    excerpt: 'From intake forms with pronouns to inclusive preventive screenings, here is how to find doctors and clinics that treat you with dignity.',
    content: `Too many LGBTQIA+ people delay vital medical checkups because of past trauma, misgendering, or outright refusal of care. In fact, studies show that over 30% of transgender individuals have postponed necessary healthcare out of fear of mistreatment.

Finding an affirming provider can be life-saving. Here are green flags to look for when vetting a clinic:

1. Inclusive Intake Paperwork
Does the electronic medical record or clipboard form separate 'Legal Name' from 'Chosen/Affirmed Name'? Are there distinct options for sex assigned at birth, current gender identity, and pronoun selection?

2. Clear Non-Discrimination Policy
Look for explicit statements on their website or waiting room wall protecting sexual orientation and gender identity.

3. Cultural Competency Training
Affirming practices openly state their participation in continuing education, such as WPATH or the Human Rights Campaign Healthcare Equality Index.

4. Non-Judgmental Preventive Care
A good doctor understands that anatomy dictates screening—not assumptions. A gay man on PrEP, a lesbian needing cervical screenings, and a trans man requiring chest exams all deserve trauma-informed, neutral clinicians.

If you cannot find local options, explore telemedicine platforms specializing in queer and trans care. Your physical health is precious.`,
    author: {
      name: 'Dr. Elijah Thorne, MD',
      role: 'Community Health Director',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
      pronouns: 'he/him',
      bio: 'Physician and public health advocate specializing in queer and transgender preventive medicine, gender-affirming care protocols, and healthcare accessibility.',
      socialLink: 'https://prismhealth.org/advisors/elijah-thorne'
    },
    publishedAt: '2026-04-22',
    readTime: '5 min read',
    category: 'Health & Wellness',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Healthcare', 'Wellness', 'Trans Health', 'PrEP', 'Doctor Checklist'],
    featured: false,
    comments: [
      {
        id: 'bc-5',
        postId: 'blog-4',
        authorName: 'Alex C.',
        pronouns: 'they/them',
        content: 'This checklist gave me the language to call my local clinic and ask the right questions before booking an appointment.',
        createdAt: '2026-04-25',
        status: 'approved'
      }
    ]
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'p-1',
    name: 'GLAAD Equality Media Institute',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    category: 'Advocacy',
    description: 'Rewriting the script for LGBTQIA+ acceptance through fair, accurate, and inclusive cultural storytelling.',
    websiteUrl: 'https://glaad.org',
    partnershipSince: '2021',
    impactMetrics: 'Co-trained 450+ student journalists'
  },
  {
    id: 'p-2',
    name: 'Metropolitan Health & Wellness Alliance',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=300&q=80',
    category: 'Healthcare',
    description: 'Providing free mobile STI screenings, PrEP navigators, and affirming mental health referrals across our network.',
    websiteUrl: 'https://metrohealthalliance.org',
    partnershipSince: '2022',
    impactMetrics: '1,800+ free health screenings sponsored'
  },
  {
    id: 'p-3',
    name: 'Youth Haven Legal Defense Clinic',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&q=80',
    category: 'Legal Aid',
    description: 'Pro-bono name and gender marker legal clinic assisting trans youth and adults navigate state and passport records.',
    websiteUrl: 'https://youthhavenlegal.org',
    partnershipSince: '2020',
    impactMetrics: '410+ successful name/marker changes assisted'
  },
  {
    id: 'p-4',
    name: 'BrightFutures School District Allies',
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80',
    category: 'Education',
    description: 'Empowering teachers, counselors, and student GSA (Gender & Sexuality Alliances) leaders across 35 high schools.',
    websiteUrl: 'https://brightfuturesallies.org',
    partnershipSince: '2023',
    impactMetrics: '35 GSAs supported with funding and book kits'
  },
  {
    id: 'p-5',
    name: 'OutInTech Global',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80',
    category: 'Corporate Ally',
    description: 'Connecting queer tech professionals with career mentorship, scholarships, and hiring partner pipelines.',
    websiteUrl: 'https://outintech.com',
    partnershipSince: '2022',
    impactMetrics: '$85,000 in student tech scholarships awarded'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Prism and who is welcome on this platform?',
    answer: 'Prism is an inclusive LGBTQIA+ community support, resource, and celebration platform. We welcome all lesbian, gay, bisexual, transgender, queer, questioning, intersex, asexual, two-spirit individuals, and our caring allies. Whether you are fully out or privately exploring your identity, you belong here.'
  },
  {
    id: 'faq-2',
    category: 'Safety',
    question: 'How do you protect my privacy and safety while browsing?',
    answer: 'We take privacy seriously. We provide a prominent Emergency Quick Exit button (which instantly redirects to Google or weather.com). Story submissions can be completely anonymous without saving identifiable IP data. We never sell user data or expose member rosters publicly.'
  },
  {
    id: 'faq-3',
    category: 'Support Groups',
    question: 'Are the support groups free? How do I join one?',
    answer: 'Yes, 100% of our peer support groups are free of charge. You can join online groups with screen names and keep your webcam off if you prefer. Facilitators are trained peer leaders and social workers committed to strict confidentiality.'
  },
  {
    id: 'faq-4',
    category: 'Events',
    question: 'I am not out to my family. Can I still attend Pride and community events safely?',
    answer: 'Yes! You can attend any public event, workshop, or festival. Our event volunteers offer discrete badges and wristbands indicating photo preferences so media teams do not publish identifiable images of you.'
  },
  {
    id: 'faq-5',
    category: 'Donations',
    question: 'Where does my donation go?',
    answer: '88% of every donated dollar goes directly to programmatic services: emergency housing stipends for unhoused youth, free mental wellness counseling sessions, gender-affirming clothing closet supplies, and Pride community festival operations. 8% supports administration and 4% supports fundraising transparency.'
  },
  {
    id: 'faq-6',
    category: 'Volunteering',
    question: 'How can I get involved as a volunteer?',
    answer: 'You can apply via our Volunteer page! We have remote and in-person roles including Event Logistics, Peer Group Moderation, Content & Story Contributor, Outreach Ambassador, and Resource Researcher. Full onboarding and ally training is provided.'
  },
  {
    id: 'faq-7',
    category: 'Community',
    question: 'How can I submit my personal story?',
    answer: 'Head to "My Story" and click "Share Your Story". You can use a pseudonym or check "Submit Anonymously". Every submission is reviewed by our community care team before publication to prevent harassment and ensure guidelines are respected.'
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'vol-1',
    title: 'Pride & Community Event Coordinator',
    department: 'Events & Engagement',
    commitment: '3 - 5 hours / week (flexible during Pride month)',
    location: 'In-person / Hybrid',
    description: 'Help organize festival booths, guide attendees, manage sensory relaxation tents, and ensure community celebrations remain safe, joyful, and accessible.',
    responsibilities: [
      'Assist with festival setup, check-in, and accessibility accommodations',
      'Distribute water, sunscreen, and safety materials to participants',
      'Coordinate with guest speakers, musicians, and performers backstage',
      'Act as a friendly liaison for first-time attendees'
    ],
    requirements: [
      'Welcoming, enthusiastic, and dependable demeanor',
      'Comfortable communicating with diverse community members',
      'Attendance at one 2-hour online orientation session'
    ]
  },
  {
    id: 'vol-2',
    title: 'Online Community & Chat Moderator',
    department: 'Digital Community Care',
    commitment: '2 - 4 hours / week',
    location: 'Remote',
    description: 'Ensure our online forums, story comments, and virtual group chats remain kind, affirming, and free from hate speech or spam.',
    responsibilities: [
      'Review flagged posts and comments with empathy and clear guideline criteria',
      'Welcome new community members in discussion threads',
      'Escalate crisis messages directly to emergency resource liaisons',
      'Maintain an active presence during scheduled virtual drop-ins'
    ],
    requirements: [
      'High degree of emotional maturity and trauma-informed sensitivity',
      'Strong commitment to LGBTQIA+ intersectional values',
      'Minimum age of 18'
    ]
  },
  {
    id: 'vol-3',
    title: 'Resource & Healthcare Directory Researcher',
    department: 'Programs & Information',
    commitment: '2 hours / week',
    location: 'Remote',
    description: 'Help verify LGBTQIA+-friendly doctors, therapists, legal aid networks, and emergency shelters to ensure our community database remains up-to-date.',
    responsibilities: [
      'Contact clinics and legal clinics to verify intake procedures and accepted insurance',
      'Draft concise, human-friendly summaries for new resource entries',
      'Track state legal policy updates affecting transgender and queer healthcare'
    ],
    requirements: [
      'Attention to detail and good research skills',
      'Clear written communication'
    ]
  },
  {
    id: 'vol-4',
    title: 'Youth Mentorship & Story Contributor',
    department: 'Storytelling & Youth',
    commitment: '2 - 3 hours / week',
    location: 'Hybrid / Remote',
    description: 'Write inspiring community articles, help young writers edit their personal coming-out narratives, and participate in panel discussions.',
    responsibilities: [
      'Review submitted stories to help polish grammar while protecting the author’s authentic voice',
      'Write occasional educational pieces or spotlights on local queer history',
      'Facilitate creative writing workshops for queer youth'
    ],
    requirements: [
      'Passion for writing and encouraging emerging voices',
      'Respect for diverse cultural and socio-economic perspectives'
    ]
  }
];

export const INITIAL_VOLUNTEER_ROLES = VOLUNTEER_ROLES;

export const INITIAL_DISCUSSIONS: CommunityDiscussion[] = [
  {
    id: 'disc-1',
    title: 'Welcome to Prism! Introduce yourself, your pronouns & one thing bringing you joy',
    category: 'General Discussion',
    author: {
      name: 'Maya Lin',
      pronouns: 'she/her',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    createdAt: '2026-09-01',
    content: 'Hi everyone! Whether you have been in the community for decades or just took your first step into queer spaces today, you are deeply celebrated here. Drop a comment below with your name, pronouns, where you are tuning in from, and something that made you smile this week!',
    repliesCount: 42,
    likesCount: 118,
    pinned: true,
    replies: [
      {
        id: 'r1',
        author: {
          name: 'Noah W.',
          pronouns: 'he/they',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        content: 'Hey Maya! Noah here (he/they) from Chicago. What brought me joy this week was finding a vintage rainbow denim jacket at a local thrift store!',
        createdAt: '2026-09-02'
      },
      {
        id: 'r2',
        author: {
          name: 'Amara K.',
          pronouns: 'she/they',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
        },
        content: 'Hi! Amara here from Seattle. I finally came out to my best friend over boba tea and she gave me the biggest hug ever. Feeling so light!',
        createdAt: '2026-09-03'
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Recommendations for queer-authored books & poetry for autumn reading?',
    category: 'Arts & Culture',
    author: {
      name: 'Devon Hayes',
      pronouns: 'they/them',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
    },
    createdAt: '2026-09-08',
    content: 'Putting together my fall reading list! Looking for poetry, graphic novels, or cozy memoirs that celebrate queer joy and resilience. What has touched your heart lately?',
    repliesCount: 18,
    likesCount: 45,
    pinned: false,
    replies: [
      {
        id: 'r3',
        author: {
          name: 'Hannah S.',
          pronouns: 'she/her',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
        },
        content: 'Anything by Ocean Vuong! "On Earth We’re Briefly Gorgeous" broke my heart in the most poetic, healing way possible.',
        createdAt: '2026-09-09'
      }
    ]
  }
];

export const INITIAL_MODERATION_REPORTS: ModerationReport[] = [
  {
    id: 'rep-1',
    contentType: 'comment',
    contentId: 'c-spam-101',
    contentTitle: 'Flagged comment containing off-topic link',
    reason: 'Suspicious external marketing URL posted under member story',
    reporterName: 'Anonymous Community Member',
    reportedAt: '2026-09-11 14:20',
    status: 'pending'
  },
  {
    id: 'rep-2',
    contentType: 'story',
    contentId: 'st-pending-02',
    contentTitle: 'My High School Journey and Finding Courage',
    reason: 'Routine approval queue review for newly submitted youth story',
    reporterName: 'Automated Ingestion Gate',
    reportedAt: '2026-09-12 02:15',
    status: 'pending'
  }
];

export const INITIAL_NEWSLETTER_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'river.activism@prismmail.org',
    subscribedAt: '2026-08-01',
    preferences: ['pride-updates', 'events', 'advocacy'],
    status: 'active',
    source: 'footer'
  },
  {
    id: 'sub-2',
    email: 'marsha.legacy@queerfreedom.org',
    subscribedAt: '2026-08-15',
    preferences: ['pride-updates', 'support-groups'],
    status: 'active',
    source: 'footer'
  },
  {
    id: 'sub-3',
    email: 'jordan.allies@diversitynow.net',
    subscribedAt: '2026-09-02',
    preferences: ['pride-updates', 'events', 'education'],
    status: 'active',
    source: 'footer'
  }
];

export const INITIAL_RESOURCE_COMMENTS: ResourceComment[] = [
  {
    id: 'rc-1',
    resourceId: 'res-1',
    authorId: 'user-maya',
    authorName: 'Maya Chen',
    authorPronouns: 'she/they',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    authorRole: 'member',
    isAnonymous: false,
    commentType: 'experience',
    content: 'I reached out to TrevorChat via their website late last year when my family reacted poorly to my coming out. The counselor was so gentle, validating, and grounded. They never rushed me to make immediate decisions and helped me build an emergency emotional safety plan. Truly life-saving work.',
    createdAt: '2026-08-20',
    helpfulCount: 28,
    helpfulUserIds: ['user-default-1', 'user-2', 'user-3'],
    tags: ['TrevorChat', 'Staff Inclusivity', 'Safety Plan'],
    replies: [
      {
        id: 'reply-1',
        authorId: 'user-alex',
        authorName: 'Alex Rivera',
        authorPronouns: 'they/them',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        authorRole: 'member',
        content: 'Seconding this! The web chat interface also doesn’t leave a paper trail or call history on family phone bills, which kept me safe while still living at home.',
        createdAt: '2026-08-21'
      }
    ]
  },
  {
    id: 'rc-2',
    resourceId: 'res-1',
    authorId: 'user-sam',
    authorName: 'Samir Patel',
    authorPronouns: 'he/him',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorRole: 'member',
    isAnonymous: false,
    commentType: 'question',
    content: 'Does TrevorChat work if you are traveling internationally outside the United States, or do they restrict IP addresses?',
    createdAt: '2026-08-28',
    helpfulCount: 9,
    helpfulUserIds: ['user-default-1'],
    tags: ['International Access', 'Eligibility'],
    replies: [
      {
        id: 'reply-2',
        authorId: 'user-default-1',
        authorName: 'Taylor Morgan',
        authorPronouns: 'they/them',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        authorRole: 'admin',
        content: 'Hi Samir! Trevor’s digital chat does work internationally via browser, though local hotlines (like Trevor Mexico or UK Switchboard) may have more regional context for referrals if you need emergency follow-up care.',
        createdAt: '2026-08-29'
      }
    ]
  },
  {
    id: 'rc-3',
    resourceId: 'res-1',
    authorId: 'user-kai',
    authorName: 'Kai Lennox',
    authorPronouns: 'they/them',
    authorRole: 'member',
    isAnonymous: false,
    commentType: 'tip',
    content: 'Pro-tip: If you text START to 678-678, save the number under a neutral contact name like "Study Buddy" if you share a family phone plan. You can also text STOP at any moment to instantly close the session and purge the automated transcript.',
    createdAt: '2026-09-01',
    helpfulCount: 41,
    helpfulUserIds: ['user-default-1', 'user-4'],
    tags: ['Safety First', 'Confidentiality', 'Text Hotline']
  },
  {
    id: 'rc-4',
    resourceId: 'res-2',
    authorId: 'user-elliott',
    authorName: 'Elliott Vance',
    authorPronouns: 'he/they',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorRole: 'member',
    isAnonymous: false,
    commentType: 'experience',
    content: 'Speaking to someone who understands the exact nuances of gender dysphoria and medical gatekeeping without the lingering dread of non-consensual emergency police dispatch made a night-and-day difference for me. They also helped guide me to their ID change microgrant application.',
    createdAt: '2026-08-18',
    helpfulCount: 35,
    helpfulUserIds: ['user-default-1', 'user-2'],
    tags: ['Peer Support', 'Anti-Police Intervention', 'Microgrants']
  },
  {
    id: 'rc-5',
    resourceId: 'res-2',
    authorId: 'user-casey',
    authorName: 'Casey Miller',
    authorPronouns: 'she/her',
    authorRole: 'member',
    isAnonymous: true,
    commentType: 'question',
    content: 'Do their operators offer support for non-binary or questioning folks who aren’t sure if they want medical transition?',
    createdAt: '2026-09-04',
    helpfulCount: 12,
    helpfulUserIds: [],
    tags: ['Nonbinary', 'Support Scope'],
    replies: [
      {
        id: 'reply-3',
        authorId: 'user-default-1',
        authorName: 'Taylor Morgan',
        authorPronouns: 'they/them',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        authorRole: 'admin',
        content: 'Absolutely! Trans Lifeline is explicitly for all gender-diverse, nonbinary, agender, two-spirit, and questioning individuals. No transition "requirements" or medical milestones are required.',
        createdAt: '2026-09-05'
      }
    ]
  },
  {
    id: 'rc-6',
    resourceId: 'res-5',
    authorId: 'user-dev',
    authorName: 'Dev Patel',
    authorPronouns: 'he/him',
    authorRole: 'member',
    isAnonymous: false,
    commentType: 'experience',
    content: 'The section on assessing personal physical and financial safety before coming out should be mandatory reading for every queer youth. It helped me realize that waiting until I had my own lease wasn’t cowardice—it was strategic self-preservation. Proudly out and thriving now!',
    createdAt: '2026-08-25',
    helpfulCount: 22,
    helpfulUserIds: ['user-default-1'],
    tags: ['Family', 'Safety Assessment', 'Workbook']
  }
];



import { Therapist, ServiceProgram, ApproachTab, Testimonial, FaqItem } from '../types';

// Asset imports handled natively by Vite build system
import ireneClinicImg from '../assets/images/irene_omondi_clinic_1787339153539.jpg';
import ireneKeynoteImg from '../assets/images/irene_omondi_keynote_1787339138050.jpg';
import approachSwingImg from '../assets/images/approach_artistic_swing_1787337010426.jpg';
import cogniwaveHandImg from '../assets/images/cogniwave_hero_hand_1787336992035.jpg';

// Uploaded & generated artwork assets for therapy pillars
import ireneOneOnOneImg from '../assets/images/irene one on one 1787379410559.jpg';
import mentalHealthLineartImg from '../assets/images/mental_health_lineart_1787378981497.jpg';
import mentalTangleCbtImg from '../assets/images/mental_tangle_cbt_1787378915730.jpg';
import handsSupportCircleImg from '../assets/images/hands_support_circle_1787378928725.jpg';
import speechBubbleBrainImg from '../assets/images/speech_bubble_brain_1787378940186.jpg';
import clinicalIntakeStethoscopeImg from '../assets/images/clinical_intake_stethoscope_1787378953318.jpg';
import youthGrassCircleImg from '../assets/images/youth_grass_circle_1787378970146.jpg';

export const WHATSAPP_URL = 'https://wa.me/254735773392?text=Hello%20Aora%20Mental%20Wellness%2C%20I%20would%20like%20to%20book%20a%20consultation%20with%20Psychologist%20Anyango%20Omondi.';

export const THERAPISTS: Therapist[] = [
  {
    id: 'anyango-omondi',
    name: 'Anyango Omondi',
    title: 'Lead Consultant Psychologist',
    credentials: 'Licensed Clinical Psychologist • 5th Avenue, Nairobi, Kenya',
    specialties: ['Anxiety & Stress Management', 'Trauma & Resilience', 'Couples & Relationship Therapy', 'Mindfulness Integration'],
    bio: 'Irene Omondi is a certified clinical psychologist based in Nairobi, Kenya. She synthesizes evidence-based cognitive behavioral therapy with compassionate, somatic regulation to help individuals and couples build enduring emotional balance and mental vitality.',
    rating: 4.99,
    reviewsCount: 184,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    avatar: ireneOneOnOneImg,
    badge: 'Lead Psychologist',
    experienceYears: 10,
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne, LMFT',
    title: 'Somatic & Relationship Specialist',
    credentials: 'M.A. • Licensed Marriage & Family Counselor',
    specialties: ['Couples Resonance', 'Attachment Repair', 'Somatic Experiencing'],
    bio: 'Marcus focuses on emotional attunement and nervous system regulation to help clients navigate relational impasses and deepen intimacy.',
    rating: 4.95,
    reviewsCount: 118,
    availableDays: ['Tue', 'Wed', 'Fri'],
    avatar: 'https://i.postimg.cc/SRDWjsKw/Marcus-Thorne.jpg',
    badge: 'Couples Lead',
    experienceYears: 9,
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin, LCSW',
    title: 'Integrative Wellness & Trauma Specialist',
    credentials: 'MSW • EMDR Certified Practitioner',
    specialties: ['Trauma Integration', 'Inner Child Healing', 'Breathwork'],
    bio: 'Maya bridges trauma-informed somatic interventions with compassionate inquiry, guiding individuals through gentle release and renewal.',
    rating: 4.99,
    reviewsCount: 164,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    avatar: 'https://i.postimg.cc/wTn12Jnf/Maya-Lin.jpg',
    badge: 'Trauma & EMDR',
    experienceYears: 11,
  },
  {
    id: 'dr-julian-croft',
    name: 'Dr. Julian Croft, M.D.',
    title: 'Holistic Neuro-Psychiatrist',
    credentials: 'Board Certified Psychiatrist & Sleep Specialist',
    specialties: ['Circadian Medicine', 'Bio-optimization', 'Mood Dynamics'],
    bio: 'Dr. Croft combines conservative biomarker tracking and lifestyle neuroscience to support mental clarity and restorative sleep patterns.',
    rating: 4.96,
    reviewsCount: 97,
    availableDays: ['Wed', 'Thu', 'Fri'],
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80',
    badge: 'Neuroscience',
    experienceYears: 14,
  },
  {
    id: 'sophia-kim',
    name: 'Sophia Kim, LPC, RYT',
    title: 'Mind-Body Resonance Counselor',
    credentials: 'Applied Psychology • Registered Yoga & Breath Guide',
    specialties: ['Life Transitions', 'Vagus Nerve Regulation', 'Creative Unblocking'],
    bio: 'Sophia works at the intersection of psychology, expressive arts, and polyvagal science to empower emotional resilience and creative joy.',
    rating: 4.97,
    reviewsCount: 125,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu'],
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80',
    badge: 'Mind-Body',
    experienceYears: 8,
  },
];

export const APPROACH_TABS: ApproachTab[] = [
  {
    id: 'holistic',
    title: 'Holistic Approach',
    subtitle: 'Mind • Body • Spirit Harmony',
    headline: 'Embracing your entire ecosystem for lasting equilibrium',
    description: 'Our holistic methodology treats mental wellness not as an isolated cognitive puzzle, but as a living ecology linking nervous system resilience, somatic awareness, and meaningful purpose.',
    detailedPoints: [
      {
        title: 'Nervous System Calibration',
        desc: 'Polyvagal mapping and heart-rate variability protocols to restore natural parasympathetic rest states.'
      },
      {
        title: 'Compassionate Inquiry',
        desc: 'Uncovering the underlying emotional drivers rather than merely suppressing superficial symptoms.'
      },
      {
        title: 'Somatic Mindfulness',
        desc: 'Grounding physical sensations to transmute tension into restorative emotional clarity.'
      }
    ],
    image: 'https://i.postimg.cc/bvQQXL1x/Holistic-Approach.jpg',
    statNumber: '86%',
    statLabel: 'Report sustained equilibrium after 6 weeks',
    badge: 'Mental Health Begins With Me'
  },
  {
    id: 'evidence-based',
    title: 'Unlock Your Potential',
    subtitle: 'Evidence-Based Neuroscience',
    headline: 'Clinically proven modalities tailored to your neuro-architecture',
    description: 'Discover the power within you. Our evidence-based techniques synthesize Acceptance & Commitment Therapy (ACT), Cognitive Behavioral Science (CBT), and EMDR to build measurable, enduring clarity.',
    detailedPoints: [
      {
        title: 'Cognitive Defusion',
        desc: 'Gentle frameworks to separate identity from intrusive cyclical thought patterns.'
      },
      {
        title: 'Targeted EMDR & Desensitization',
        desc: 'Reprocessing traumatic neural imprints with bilateral stimulation and guided containment.'
      },
      {
        title: 'Values-Aligned Behavioral Activation',
        desc: 'Translating emotional breakthroughs into concrete daily micro-rituals that compound over time.'
      }
    ],
    image: 'https://i.postimg.cc/kgj52S9c/unlock-your-potential-3.jpg',
    statNumber: '3.4x',
    statLabel: 'Higher retention of positive coping tools',
    badge: 'Untangling the Mind'
  },
  {
    id: 'mind-body',
    title: 'Mind-Body Resonance',
    subtitle: 'Vagal & Somatic Regulation',
    headline: 'Unlocking physical tension to liberate emotional vitality',
    description: 'The body remembers what the conscious mind buries. By honoring somatic intelligence through rhythmic breathwork, sensory grounding, and autonomic balancing, we open deep pathways for authentic joy.',
    detailedPoints: [
      {
        title: 'Diaphragmatic Vagal Pacing',
        desc: 'Structured breath cadences that signal safety straight to the brainstem in under 3 minutes.'
      },
      {
        title: 'Interoceptive Deep Listening',
        desc: 'Cultivating non-judgmental awareness of gut, chest, and postural emotional signatures.'
      },
      {
        title: 'Restorative Sleep Architecture',
        desc: 'Aligning light exposure, melatonin timing, and wind-down rituals to rebuild REM rejuvenation.'
      }
    ],
    image: 'https://i.postimg.cc/6pQWxQRR/Mind-Body-Resonance-1.jpg',
    statNumber: '78%',
    statLabel: 'Reduction in somatic anxiety markers',
    badge: 'Youth & Communal Vitality'
  }
];

export const CLINIC_INFO = {
  name: 'Aora Mental Wellness',
  tagline: 'Professional Psychological Counseling & Somatic Care',
  leadPsychologist: 'Anyango Omondi',
  leadTitle: 'Lead Clinical Psychologist',
  address: '5th Avenue, Nairobi, Kenya',
  phone: '0735 773392',
  phoneFormatted: '+254 735 773 392',
  email: 'aoramentalwellness@gmail.com',
  workingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM EAT',
  onlineAvailable: true,
};

export const SERVICE_PROGRAMS: ServiceProgram[] = [
  {
    id: 'foundational-therapy',
    title: 'Foundational Individual Therapy',
    category: 'Individual',
    tagline: 'Personalized 1-on-1 psychotherapeutic care',
    description: 'Deep weekly sessions focused on navigating life transitions, unwinding chronic anxiety, and reclaiming your natural baseline of peace.',
    longDescription: 'Our foundational individual therapy is tailored to your distinct emotional landscape. Working 1-on-1 with Irene Omondi and her clinical team, you will map out historical patterns, establish reliable nervous system anchors, and cultivate practical tools for cognitive freedom.',
    duration: '50 mins / session',
    sessions: 'Weekly or Bi-weekly',
    price: 'KES 4,500 / $45',
    features: [
      'Dedicated licensed clinical psychologist (Irene Omondi)',
      'Personalized care blueprint & progress tracker',
      'Confidential direct messaging & check-ins',
      'Guided somatic audio exercises library'
    ],
  image: ireneOneOnOneImg,
    therapistLead: 'Anyango Omondi (Lead Psychologist)',
    recommendedFor: ['Generalized Anxiety', 'Life Transitions', 'Overthinking & Burnout', 'Self-Esteem'],
    methods: ['CBT & ACT', 'Mindfulness Integration', 'Psychodynamic Inquiry']
  },
  {
    id: 'couples-resonance',
    title: 'Couples & Relational Therapy',
    category: 'Couples',
    tagline: 'Transform disconnection into deep emotional intimacy',
    description: 'Evidence-backed relational frameworks designed to break negative communication loops, heal attachment wounds, and foster mutual safety.',
    longDescription: 'Whether navigating recurring conflict, lifecycle transitions, or seeking to revitalize intimacy, our couples therapy provides a neutral, deeply supportive container in Nairobi or virtually.',
    duration: '75 mins / session',
    sessions: '6 to 12 Week Series',
    price: 'KES 6,500 / $65',
    features: [
      'Attachment style & conflict pattern diagnostics',
      'Live guided de-escalation dialogue practice',
      'Home intimacy & connection micro-prompts',
      'Joint & optional individual check-ins'
    ],
    image: 'https://i.postimg.cc/mg7wRbsN/Couples-Relational-Therapy.jpg',
    therapistLead: 'Marcus Thorne, LMFT & Anyango Omondi',
    recommendedFor: ['Communication Breakdown', 'Trust Restoration', 'Pre-Marital Alignment', 'Attachment Repair'],
    methods: ['Emotionally Focused Therapy (EFT)', 'Gottman Method', 'Somatic Co-regulation']
  },
  {
    id: 'trauma-emdr',
    title: 'EMDR & Somatic Trauma Healing',
    category: 'Individual',
    tagline: 'Gentle neural reprocessing for deep emotional release',
    description: 'Targeted bilateral stimulation and somatic containment protocols to discharge stored trauma and restore autonomic balance.',
    longDescription: 'Eye Movement Desensitization and Reprocessing (EMDR) combined with somatic experiencing allows traumatic memories to be re-encoded in the brain without retraumatization.',
    duration: '60-80 mins / session',
    sessions: '8 to 16 Sessions',
    price: 'KES 5,500 / $55',
    features: [
      'Certified clinical trauma specialists',
      'Advanced bilateral audio/visual stimulation tech',
      'Safe container stabilization preparation',
      'Somatic release tracking'
    ],
    image: 'https://i.postimg.cc/N02q42qf/EMDR-Somatic-Trauma-Healing-4.jpg',
    therapistLead: 'Maya Lin & Anyango Omondi',
    recommendedFor: ['PTSD & Complex Trauma', 'Childhood Emotional Wounds', 'Phobias', 'Intrusive Flashbacks'],
    methods: ['EMDR Protocol', 'Somatic Experiencing', 'Resource Tapping']
  },
  {
    id: 'mindful-resilience-circle',
    title: 'Mindful Resilience Circle',
    category: 'Group',
    tagline: 'Small cohort supportive group therapy',
    description: 'A confidential, therapist-guided circle of 6–8 peers exploring shared challenges, emotional regulation, and collective wisdom.',
    longDescription: 'Group therapy creates a profound sense of shared humanity. In this weekly 8-week circle led by Irene Omondi, members explore vulnerability, boundary-setting, and emotional resonance.',
    duration: '90 mins / session',
    sessions: '8-Week Cohort',
    price: 'KES 2,500 / $25',
    features: [
      'Intimate curated cohorts (max 8 participants)',
      'Weekly thematic experiential exercises',
      'Peer community forum & reflection journal',
      'One 1-on-1 private intake session included'
    ],
    image: handsSupportCircleImg || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    therapistLead: 'Anyango Omondi & Sophia Kim',
    recommendedFor: ['Social Isolation', 'Emotional Regulation', 'Boundary Setting', 'Empathetic Connection'],
    methods: ['Interpersonal Process Group', 'Polyvagal Grounding', 'Expressive Dialogue']
  },
  {
    id: 'neuro-sleep-mastery',
    title: 'Circadian & Neuro-Sleep Mastery',
    category: 'Workshops',
    tagline: 'Clinical protocols for deep, restorative sleep',
    description: 'A 4-week interactive intensive combining CBT-I sleep restriction, light therapy architecture, and nervous system wind-downs.',
    longDescription: 'Sleep is the master regulator of emotional resilience. Developed by our clinical staff, this immersive program resolves chronic insomnia and waking anxiety by resetting circadian rhythms.',
    duration: '4-Week Intensive',
    sessions: '4 Live Workshops + 1:1 Check-in',
    price: 'KES 7,500 / $75',
    features: [
      'Comprehensive CBT for Insomnia (CBT-I) curriculum',
      'Custom sleep architecture diagnostic',
      'Binaural sleep soundscape generator kit',
      'Wearable & biomarker sleep metric integration'
    ],
    image: 'https://i.postimg.cc/Vk1d21LL/Circadian-Rhythm-Better-Sleep-Council.jpg',
    therapistLead: 'Dr. Julian Croft & Anyango Omondi',
    recommendedFor: ['Chronic Insomnia', 'Midnight Racing Thoughts', 'Circadian Disruption', 'Morning Brain Fog'],
    methods: ['CBT-I Protocol', 'Photobiomodulation Guidance', 'Autonomic Down-Regulation']
  },
  {
    id: 'executive-clarity-retreat',
    title: 'Executive Burnout & Clarity Sprint',
    category: 'Workshops',
    tagline: 'High-leverage mental renewal for leaders & creators',
    description: 'An intensive, discreet 2-day virtual retreat and 30-day integration protocol designed to reverse adrenal fatigue and restore creative fire.',
    longDescription: 'Specifically structured for founders, corporate leaders, and clinicians operating in Nairobi and across East Africa under intense pressure. We disassemble cognitive overload and install neuro-protective rituals.',
    duration: '2-Day Intensive + 30-Day Support',
    sessions: 'Intensive Immersion',
    price: 'KES 25,000 / $250',
    features: [
      'Confidential 1-on-1 deep diagnostic interview',
      'Heart Rate Variability (HRV) biofeedback kit',
      'Custom cognitive recovery schedule design',
      'Weekly asynchronous executive check-ins'
    ],
    image: youthGrassCircleImg || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    therapistLead: 'Irene Omondi & Clinical Team',
    recommendedFor: ['Founder Burnout', 'Decision Fatigue', 'Chronic Overwhelm', 'Compassion Fatigue'],
    methods: ['HRV Biofeedback', 'Cognitive Load Re-engineering', 'Somatic Reset']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Wanjiru Mwangi',
    role: 'Creative Director & Founder',
    location: 'Nairobi, Kenya',
    quote: 'Aora completely altered how I relate to my own mind. Anyango Omondi didn’t just give me textbook advice—she helped me understand my nervous system in a way that felt liberating, empathetic, and deeply transformative.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    focus: 'Overcoming Chronic Anxiety & Burnout',
    timeframe: '6 months with Irene Omondi'
  },
  {
    id: 'test-2',
    author: 'Brian & Faith K.',
    role: 'Couple of 7 Years',
    location: 'Nairobi, Kenya',
    quote: 'Therapy at Aora gave us the safe container and vocabulary to discuss difficult emotions without triggering defensive walls. Our communication went from high-tension standoffs to empathetic curiosity.',
    avatar: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400&q=80',
    focus: 'Couples & Attachment Healing',
    timeframe: '10 sessions completed'
  },
  {
    id: 'test-3',
    author: 'Emmanuel Ochieng',
    role: 'Tech Lead & Entrepreneur',
    location: 'Nairobi / Remote',
    quote: 'The synthesis of clinical psychology and somatic breathwork is extraordinary. I went from surviving on fragmented sleep and panic to having sustained focus, grounded energy, and inner peace.',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80',
    focus: 'Executive Clarity & Stress Resilience',
    timeframe: '4 months with Aora'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a session with Anyango Omondi?',
    answer: 'You can easily reserve an initial consultation online through our booking system, call or WhatsApp us directly at 0735 773392, or email alexandernathan.ceo@outlook.com. We will match your schedule and prepare your confidential intake form.',
    category: 'Therapy'
  },
  {
    id: 'faq-2',
    question: 'Where is your clinic located in Nairobi, Kenya?',
    answer: 'Our physical sanctuary is located on 5th Avenue, Nairobi, Kenya. We also provide secure, confidential high-definition online video sessions for clients across Kenya and internationally.',
    category: 'General'
  },
  {
    id: 'faq-3',
    question: 'What are the consultation fees and payment methods?',
    answer: 'Individual sessions start from KES 4,500 ($45). We accept M-Pesa, bank transfers, and major credit/debit cards. Detailed receipts and psychological assessment reports are provided upon request.',
    category: 'Insurance & Pricing'
  },
  {
    id: 'faq-4',
    question: 'How is my privacy and medical data protected?',
    answer: 'Confidentiality is our strictest ethical priority. All sessions, notes, and communications are strictly protected under clinical data protection standards. Nothing is shared without your explicit written consent.',
    category: 'Privacy'
  },
  {
    id: 'faq-5',
    question: 'What issues can psychologist Anyango Omondi help me with?',
    answer: 'Anyango Omondi specializes in anxiety disorders, depression, work-related stress & burnout, trauma recovery, grief, relationship & marriage counseling, self-esteem, and emotional regulation using evidence-based CBT and somatic techniques.',
    category: 'General'
  }
];

export const CLINICAL_METRICS = [
  { label: 'Clinically Measured Anxiety Reduction', value: '78%', sub: 'within 8 weeks of care' },
  { label: 'Sleep Quality & REM Improvement', value: '+64%', sub: 'measured by biometric tracking' },
  { label: 'Licensed Doctoral & Master Clinicians', value: '100%', sub: 'vetted with 8+ years experience' },
  { label: 'Client Care Satisfaction Score', value: '4.98/5', sub: 'across 4,800+ completed sessions' }
];

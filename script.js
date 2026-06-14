/* ============================================================
   Open When... - Complete JavaScript
   A heartfelt digital gift for someone far away
   ============================================================ */

// ===== CONFIGURATION =====
const CONFIG = {
  startDate: '2026-04-25',
  giphyApiKey: 'aGHHYticZBzWDKw6fD4B75QBj7Z9124h',
  senderName: 'Me',
  herName: 'You',
  heartsFrequency: 3000,
};

// ===== FIREBASE INIT =====
const firebaseConfig = {
  apiKey: "AIzaSyBtRb_c_cLZPeAQwDq7cLMLZ0-k0ETDIZ0",
  authDomain: "open-when-1337.firebaseapp.com",
  projectId: "open-when-1337",
  storageBucket: "open-when-1337.firebasestorage.app",
  messagingSenderId: "234977976966",
  appId: "1:234977976966:web:9c8d433f01786089982707",
  measurementId: "G-YY4NG714LT"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== IMAGE COMPRESSION =====
function compressImage(file, maxW, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxW) { h *= maxW / w; w = maxW; }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

// ===== 365 DAILY MESSAGES =====
const dailyMessages = [
  "Just a reminder that you've survived every difficult day you've ever had.",
  "If today feels heavy, don't carry it all at once. Breathe. Rest. You're allowed.",
  "I hope something today makes you smile unexpectedly.",
  "Someone on the other side of the world thinks you're pretty amazing.",
  "You don't have to have it all figured out. Just keep going.",
  "The world is better because you're in it. Never doubt that.",
  "You've got a quiet strength that most people never see. I see it.",
  "Be proud of yourself for getting through today. Even the small steps count.",
  "You are exactly where you need to be right now.",
  "I wonder if you know how often I think about you.",
  "Let today be soft. You don't need to be strong every single moment.",
  "You're the kind of person who makes the world feel less lonely.",
  "Take a deep breath. You're doing better than you think.",
  "Some days are just about surviving. And that's okay.",
  "You are worthy of love, kindness, and all the good things coming your way.",
  "Distance is just a test of how far love can travel.",
  "You've handled so much already. This is nothing you can't handle too.",
  "Remember that you are someone's favorite thought.",
  "Be gentle with yourself today. You're doing your best.",
  "The sun will rise again, and so will you.",
  "You bring something beautiful into this world that no one else can.",
  "I'm proud of you for getting out of bed today.",
  "You are not behind. You are on your own path.",
  "Even on your worst days, you are still wonderful.",
  "You have a heart that is rare and precious.",
  "Don't forget to drink water and take care of yourself today.",
  "You are not your mistakes. You are the courage to keep going.",
  "I wish I could give you a hug right now.",
  "One day, all of this distance will just be a story we tell.",
  "Keep being you. That's more than enough.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "Let yourself feel whatever you need to feel today.",
  "Your presence in my life is a gift I never take for granted.",
  "You don't need to be perfect to be loved. You already are.",
  "I love the way your mind works. Don't ever stop thinking deeply.",
  "You have survived 100% of your worst days. That's pretty incredible.",
  "You're allowed to outgrow people, places, and versions of yourself.",
  "There is no one else I'd rather have in my life.",
  "You are not alone in this feeling. I'm right here with you.",
  "Even the sky needs dark clouds to remind us of the sun.",
  "The way you care about others is something I admire so much.",
  "Rest is not lazy. It's necessary. Take a break.",
  "You have every right to take up space in this world.",
  "Your laugh is one of my favorite sounds.",
  "I hope you're being kind to yourself today.",
  "You're not asking for too much. You're asking the wrong people.",
  "You make ordinary moments feel special.",
  "It's okay to not be okay. Just don't give up.",
  "The fact that you're still trying says everything about your strength.",
  "You're allowed to take up space and be heard.",
  "I'm so grateful to have you in my life.",
  "You have survived so much. You can survive this too.",
  "Let the storm pass. You will still be standing when it does.",
  "The world feels lighter when I talk to you.",
  "You're not broken. You're just growing.",
  "Take it one step at a time. You don't need to run.",
  "You deserve someone who sees you, really sees you. And I do.",
  "Don't be so hard on yourself. You're human.",
  "Every day you're getting closer to the person you're meant to become.",
  "I wish I could take away your pain. Since I can't, I'll send you love instead.",
  "The small things you do matter more than you realize.",
  "You have a beautiful soul. Never let anyone dull it.",
  "It's okay to ask for help. You don't have to do this alone.",
  "You are worthy of every good thing that comes your way.",
  "Even on days when you feel invisible, you matter so much.",
  "You are not your anxiety. You are not your fears.",
  "Thank you for being exactly who you are.",
  "Sometimes the bravest thing is to just keep breathing.",
  "You have so much light inside you. Let it shine.",
  "I'm lucky to know you. I hope you know that.",
  "Your feelings are valid. Don't let anyone tell you otherwise.",
  "The way you see the world is beautiful.",
  "You are so much more than whatever is bothering you right now.",
  "Give yourself permission to feel proud of how far you've come.",
  "Not all storms come to disrupt your life. Some come to clear your path.",
  "You have a way of making people feel seen.",
  "Today might be hard, but you are harder to break.",
  "You don't have to have everything figured out by tomorrow.",
  "Your heart is so full of love. The right people will stay.",
  "Don't let a bad day convince you that you have a bad life.",
  "You are loved more than you will ever know.",
  "The best thing you can do is keep being you.",
  "You've come so far. Don't stop now.",
  "I appreciate you more than words can say.",
  "It's okay to start over. Every day is a new chance.",
  "You deserve rest, peace, and happiness.",
  "Your kindness is your superpower.",
  "Some people bring light into the world. You are one of them.",
  "You don't have to prove anything to anyone.",
  "I'm thinking of you today, and hoping life is treating you kindly.",
  "You are capable of amazing things.",
  "Be patient with yourself. Growth takes time.",
  "You have a strength that inspires me.",
  "The world needs more people like you.",
  "It's okay to put yourself first sometimes.",
  "You are not defined by your worst moments.",
  "I believe in you. Always have. Always will.",
  "You've got this. And I've got you.",
  "Let yourself dream big. You deserve big things.",
  "You are the author of your own story. Keep writing.",
  "You're not alone in this. Not now, not ever.",
  "Today, choose peace. You deserve it.",
  "You have a heart of gold.",
  "Progress, not perfection. That's all that matters.",
  "You are so loved.",
  "You make the world a better place just by being in it.",
  "It's okay to have bad days. They don't define you.",
  "I hope you know how much you matter to me.",
  "You are stronger than you know.",
  "Take things one moment at a time.",
  "You bring so much joy to those around you.",
  "Believe in yourself as much as I believe in you.",
  "Your presence is a gift.",
  "Don't give up on what you really want.",
  "You are enough. Always have been.",
  "You deserve all the happiness in the world.",
  "I'm so glad you exist.",
  "You're doing an amazing job. Keep going.",
  "It's a beautiful day to be alive.",
  "You are precious and irreplaceable.",
  "Trust the timing of your life.",
  "You are worthy of love and belonging.",
  "Stay true to yourself. You're wonderful.",
  "You have everything you need within you.",
  "The best is yet to come.",
  "You are a masterpiece in progress.",
  "Keep shining your light.",
  "You are so much braver than you think.",
  "Today is a new beginning.",
  "You are a beautiful soul.",
  "You make the world brighter.",
  "I'm grateful for every moment with you.",
  "Your future is full of possibilities.",
  "You are one of a kind.",
  "Never doubt your worth.",
  "Your smile can light up a room.",
  "You have a beautiful heart.",
  "You are enough exactly as you are.",
  "I believe in your dreams.",
  "You are making a difference.",
  "Stay strong. You've got this.",
  "You are worthy of all good things.",
  "Keep being the amazing person you are.",
  "You have a beautiful mind.",
  "I'm here for you, always.",
  "You are so important to me.",
  "Today is full of potential.",
  "You are capable of incredible things.",
  "Your kindness is beautiful.",
  "You are never a burden.",
  "I'm proud to know you.",
  "You are a treasure.",
  "Keep believing in yourself.",
  "You are so precious.",
  "The world is lucky to have you.",
  "You deserve the world.",
  "You are my favorite person.",
  "Your strength amazes me.",
  "You have a pure heart.",
  "You are irreplaceable.",
  "I cherish every moment with you.",
  "You are destined for greatness.",
  "Your love is powerful.",
  "You are extraordinary.",
  "Keep being wonderful you.",
  "You are a rare gem.",
  "I appreciate you deeply.",
  "Your spirit is beautiful.",
  "You make life better.",
  "You are truly special.",
  "You have a beautiful energy.",
  "Your existence matters.",
  "You are deeply loved.",
  "Your courage inspires me.",
  "You are a blessing.",
  "The world needs your light.",
  "You are magnificent.",
  "Keep being your beautiful self.",
  "You are a ray of sunshine.",
  "Your heart is pure gold.",
  "I admire you so much.",
  "You are a beautiful person.",
  "Your soul is radiant.",
  "You are uniquely wonderful.",
  "Your presence is magic.",
  "You are incredibly strong.",
  "You matter more than you know.",
  "Your smile is contagious.",
  "You are a work of art.",
  "I treasure you deeply.",
  "Your light shines bright.",
  "You are a beautiful human.",
  "Your kindness changes lives.",
  "You are absolutely amazing.",
  "Stay as wonderful as you are.",
  "You are a gift to the world.",
  "Your beauty is both inside and out.",
  "I celebrate you today.",
  "You are so incredibly special.",
  "Your heart is full of love.",
  "You are a beautiful creation.",
  "Your strength is inspiring.",
  "You deserve all the love.",
  "Your presence is a blessing.",
  "You are perfectly imperfect.",
  "Your courage is admirable.",
  "You are a beautiful light.",
  "Your kindness is powerful.",
  "You are worthy of everything.",
  "Your smile makes my day.",
  "You are a beautiful soul inside and out.",
  "Your love is a treasure.",
  "You are one in a million.",
  "Keep being the beautiful person you are.",
  "You are a masterpiece.",
  "Your spirit is unbreakable.",
  "You are so deeply valuable.",
  "Your heart is beautiful.",
  "You are a wonderful person.",
  "Your presence makes everything better.",
  "You are a beautiful gift.",
  "Your strength is remarkable.",
  "You are so incredibly loved.",
  "Your authenticity is refreshing.",
  "You are doing wonderfully.",
  "Your energy is beautiful.",
  "You are magic in human form.",
  "Your love is powerful beyond measure.",
  "You are a shining star.",
  "Your gentleness is strength.",
  "You are a beautiful dream.",
  "Your resilience is inspiring.",
  "You are more than enough.",
  "Your compassion is beautiful.",
  "You are absolutely wonderful.",
  "Your beauty radiates from within.",
  "I'm so thankful for you.",
  "You are pure light.",
  "Your existence makes the world better.",
  "You are incredibly precious to me.",
  "You are worth every effort.",
  "Your laugh is contagious joy.",
  "You are a beautiful melody.",
  "Your love transforms everything.",
  "You are perfectly loved.",
  "Your heart is full of magic.",
  "You are a beautiful human being.",
  "Your presence is a gift I never take for granted.",
  "You are radiant inside and out.",
  "Your strength gives me strength.",
  "You are worthy of endless love.",
  "Your beauty is breathtaking.",
  "You are so wonderfully made.",
  "Your kindness leaves footprints on my heart.",
  "You are a beautiful chapter in my life.",
  "Your courage changes everything.",
  "You are deeply cherished.",
  "Your smile lights up my world.",
  "You are beautifully and wonderfully made.",
  "Your love is the kind poets write about.",
  "You are extraordinary in every way.",
  "Keep being the light that you are.",
  "You are a beautiful symphony.",
  "Your presence is my favorite place.",
  "You are stronger than any storm.",
  "Your heart is the most beautiful thing about you.",
  "You are my favorite thought.",
  "Your kindness is a superpower.",
  "You are loved beyond measure.",
  "Your beauty is timeless.",
  "You are a beautiful story unfolding.",
  "Your spirit is the most beautiful thing.",
  "You are worthy of all the joy in the universe.",
  "Your courage is breathtaking.",
  "You are a beautiful constellation of all that is good.",
  "Your love is a lighthouse in the dark.",
  "You are the most beautiful kind of magic.",
  "Your strength is poetry in motion.",
  "You are a masterpiece painted with love.",
  "Your presence is the most beautiful gift.",
  "You are deeply and completely loved.",
  "Your heart is a garden of beautiful things.",
  "You are the most beautiful version of yourself.",
  "Your kindness is the most beautiful language.",
  "You are a beautiful force of nature.",
  "Your love makes everything better.",
  "You are the most beautiful sunrise.",
  "Your courage is the most beautiful thing I know.",
  "You are a beautiful work in progress.",
  "Your spirit shines brighter than the stars.",
  "You are the most beautiful kind of human.",
  "Your presence is my favorite melody.",
  "You are beautiful in ways words cannot capture.",
  "Your love is the most beautiful adventure.",
  "You are a beautiful soul in a beautiful world.",
  "Your strength is the most beautiful kind of grace.",
  "You are the most beautiful reason to believe in love.",
  "Your heart is the most beautiful place I know.",
  "You are beautifully and uniquely you.",
  "Your kindness is the most beautiful gift you give.",
  "You are a beautiful expression of love.",
  "Your presence is my favorite part of the day.",
  "You are the most beautiful kind of wonderful.",
  "Your love fills the empty spaces with light.",
  "You are beautifully enough.",
  "Your courage is the most beautiful thing I've witnessed.",
  "You are a beautiful reminder of why love exists.",
  "Your spirit is the most beautiful kind of freedom.",
  "You are the most beautiful part of my story.",
  "Your presence makes everything beautiful.",
  "I fall in love with your soul more every day.",
  "You are the most beautiful kind of home.",
  "Your love is the most beautiful kind of art.",
  "You are beautifully, wonderfully, perfectly you.",
  "Your strength is the most beautiful kind of love.",
  "You are a beautiful sunset for my soul.",
  "Your presence is my favorite prayer.",
  "You are the most beautiful kind of truth.",
  "Your heart is the most beautiful kind of art.",
  "You are beautifully resilient.",
  "Your love is the most beautiful kind of magic.",
  "You are the most beautiful chapter in my life.",
  "Your presence is the most beautiful gift I have.",
  "You are a beautiful reflection of all that is good.",
  "Your kindness is the most beautiful form of intelligence.",
  "You are the most beautiful kind of strength.",
  "Your love is my favorite place to be.",
  "You are beautifully and completely loved.",
  "Your spirit is the most beautiful kind of light.",
  "You are the most beautiful reason to smile.",
  "Your presence makes even ordinary days feel magical.",
  "You are a beautiful constellation of love.",
  "Your courage is the most beautiful kind of hope.",
  "You are the most beautiful part of my world.",
  "Your heart is the most beautiful kind of wisdom.",
  "You are beautifully and irreplaceably you.",
  "Your love is the most beautiful kind of grace.",
  "You are the most beautiful kind of home my heart knows.",
  "Your presence is my favorite kind of peace.",
  "You are a beautiful reminder of why life is worth living.",
  "Your kindness is the most beautiful kind of revolution.",
  "You are the most beautiful kind of forever.",
  "Your love is the most beautiful kind of warmth.",
  "You are beautifully and endlessly loved.",
  "Your spirit is the most beautiful kind of art.",
  "You are the most beautiful thought I have.",
  "Your presence is my favorite kind of beauty.",
  "You are a beautiful symphony of love and light.",
  "Your courage is the most beautiful kind of strength.",
  "You are the most beautiful kind of grace I know.",
  "Your heart is the most beautiful kind of compass.",
  "You are beautifully and perfectly loved.",
  "Your love is the most beautiful kind of truth.",
  "You are the most beautiful kind of magic in my life.",
  "Your presence is my favorite kind of beautiful.",
  "You are a beautiful moment I wish could last forever.",
  "Your kindness is the most beautiful kind of wisdom.",
  "You are the most beautiful kind of hope I have.",
  "Your spirit is the most beautiful kind of beauty.",
  "You are beautifully and wonderfully made for love.",
  "Your love is the most beautiful kind of freedom.",
  "You are the most beautiful kind of dream come true.",
  "Your presence is the most beautiful kind of art my eyes have seen.",
  "You are a beautiful chapter I never want to end.",
  "Your courage is the most beautiful kind of love story.",
  "You are the most beautiful kind of belonging.",
  "Your heart is the most beautiful kind of adventure.",
  "You are beautifully and completely my favorite.",
  "Your love is the most beautiful kind of shelter.",
  "You are the most beautiful kind of light in my darkness.",
  "Your presence is my favorite kind of magic.",
  "You are a beautiful reason to believe in forever.",
  "Your kindness is the most beautiful kind of humanity.",
  "You are the most beautiful kind of soul I've met.",
  "Your spirit is the most beautiful kind of sunrise.",
  "You are beautifully and wonderfully my person.",
  "Your love is the most beautiful kind of anchor.",
  "You are the most beautiful kind of growth.",
  "Your presence is the most beautiful kind of healing.",
  "You are a beautiful reminder of why I believe in good.",
  "Your courage is the most beautiful kind of flight.",
  "You are the most beautiful kind of transformation.",
  "Your heart is the most beautiful kind of music.",
  "You are beautifully and deeply admired.",
  "Your love is the most beautiful kind of revolution.",
  "You are the most beautiful kind of stillness in my chaos.",
  "Your presence is my favorite kind of warmth.",
  "You are a beautiful expression of everything good.",
  "Your kindness is the most beautiful kind of love in action.",
  "You are the most beautiful kind of companion.",
  "Your spirit is the most beautiful kind of dance.",
  "You are beautifully and wonderfully my everything.",
  "Your love is the most beautiful kind of journey.",
  "You are the most beautiful kind of peace I know.",
  "Your presence is the most beautiful kind of prayer answered.",
  "You are a beautiful story I want to read forever.",
  "Your courage is the most beautiful kind of authenticity.",
  "You are the most beautiful kind of grace under pressure.",
  "Your heart is the most beautiful kind of compass leading home.",
  "You are beautifully and perfectly worthy.",
  "Your love is the most beautiful kind of growth.",
  "You are the most beautiful kind of reflection of love.",
  "Your presence is my favorite kind of beautiful chaos.",
  "You are a beautiful part of my soul's journey.",
  "Your kindness is the most beautiful kind of strength.",
  "You are the most beautiful kind of lesson in love.",
  "Your spirit is the most beautiful kind of adventure.",
  "You are beautifully and wonderfully my favorite human.",
  "Your love is the most beautiful kind of rest.",
  "You are the most beautiful kind of homecoming.",
  "Your presence is the most beautiful kind of belonging.",
  "You are a beautiful example of what love should be.",
  "Your courage is the most beautiful kind of vulnerability.",
  "You are the most beautiful kind of resilience.",
  "Your heart is the most beautiful kind of art gallery.",
  "You are beautifully and endlessly fascinating.",
  "Your love is the most beautiful kind of conversation.",
  "You are the most beautiful kind of silence I've ever shared.",
  "Your presence is my favorite kind of happiness.",
  "You are a beautiful gift I'll never stop unwrapping.",
  "Your kindness is the most beautiful kind of legacy.",
  "You are the most beautiful kind of mirror reflecting love.",
  "Your spirit is the most beautiful kind of song.",
  "You are beautifully and wonderfully irreplaceable.",
  "Your love is the most beautiful kind of adventure I'll take.",
  "You are the most beautiful kind of soul connection.",
  "Your presence is the most beautiful kind of serendipity.",
  "You are a beautiful reminder that love is real.",
  "Your courage is the most beautiful kind of healing.",
  "You are the most beautiful kind of light I've ever known.",
  "Your heart is the most beautiful kind of teacher.",
  "You are beautifully and completely enough.",
  "Your love is the most beautiful kind of celebration.",
  "You are the most beautiful kind of memory I'm making.",
  "Your presence is my favorite kind of comfort.",
  "You are a beautiful whisper of hope in a loud world.",
  "Your kindness is the most beautiful kind of revolution.",
  "You are the most beautiful kind of softness.",
  "Your spirit is the most beautiful kind of fire.",
  "You are beautifully and wonderfully loved beyond words.",
  "Your love is the most beautiful kind of anchor in the storm.",
  "You are the most beautiful kind of sunrise I never want to miss.",
  "Your presence is the most beautiful kind of now.",
  "You are a beautiful chapter I'll never stop reading.",
  "Your courage is the most beautiful kind of surrender.",
  "You are the most beautiful kind of growth I've witnessed.",
  "Your heart is the most beautiful kind of sanctuary.",
  "You are beautifully and completely treasured.",
  "Your love is the most beautiful kind of legacy you leave.",
  "You are the most beautiful kind of person I know.",
  "Your presence is my favorite kind of forever.",
  "You are a beautiful masterpiece of grace and strength.",
  "Your kindness is the most beautiful kind of intelligence.",
  "You are the most beautiful kind of space I want to fill.",
  "Your spirit is the most beautiful kind of morning.",
  "You are beautifully and wonderfully all I need.",
];

// ===== CATEGORIES =====
const categories = [
  {
    id: 'sad',
    icon: '💧',
    title: "Open When You're Sad",
    desc: 'A gentle reminder that brighter days are coming',
    color: '#8ab4f8',
    message: "I know you're feeling sad right now, and that's okay. Sadness isn't something to run from — it's a feeling that deserves to be felt. But I want you to know that you're not alone in this moment. I'm here with you, even from far away.\n\nCry if you need to. Let it out. Hold yourself gently. And when you're ready, remember that this feeling will pass. It always does. Like clouds moving across the sky, sadness comes and goes. You just need to wait for the sun to peek through again.\n\nI love you. I'm here. And brighter days are coming.",
    sections: [
      { title: 'Something to remember', content: 'You have survived every difficult day you have ever faced. This one will be no different.' },
      { title: 'A little hug for your heart', content: 'Imagine I\'m sitting beside you right now, holding your hand, saying nothing — just being with you. That\'s where I am in my heart.' },
    ],
    giphyQuery: 'hugs',
  },
  {
    id: 'sleep',
    icon: '🌙',
    title: "Open When You Can't Sleep",
    desc: 'Let the stars watch over you tonight',
    color: '#c4a0e5',
    message: "The world is quiet now, and it's just you and your thoughts. I know sleep can feel far away when your mind won't settle. But that's okay. You don't have to fight for sleep. Just rest your eyes. Let your breathing slow down.\n\nClose your eyes and imagine a calm, dark ocean under a sky full of stars. Each breath is a wave, gently coming and going. There's no rush. No urgency. Just the quiet rhythm of your breath.\n\nYou are safe. You are loved. You can rest now.\n\nSweet dreams, beautiful. I'll be here when you wake up.",
    sections: [
      { title: 'Close your eyes', content: 'Take three slow, deep breaths. Breathe in peace. Breathe out tension. One more time. Feel your body getting heavier, softer, warmer.' },
      { title: 'A bedtime thought', content: 'The moon is beautiful tonight, and somewhere, I\'m looking up at the same sky, thinking of you. We\'re connected by the same stars.' },
    ],
    giphyQuery: 'moon',
  },
  {
    id: 'motivation',
    icon: '🔥',
    title: 'Open When You Need Motivation',
    desc: 'You are capable of incredible things',
    color: '#ff8fa3',
    message: "I know you might be feeling stuck or unsure right now. Maybe you're questioning yourself or wondering if you can do this. Let me tell you something I know for certain: you are unstoppable.\n\nThe fire inside you? It's still burning. Even if it feels like just an ember right now, it's there. And I'm going to help you fan it into a flame.\n\nYou have overcome so much already. You have grown in ways you don't even realize. The person you were a year ago would be so proud of who you are today.\n\nKeep going. Keep showing up. Keep being you. The world needs what only you can give.",
    sections: [
      { title: 'Your power', content: 'Within you is strength that has carried you through every storm. Trust that strength. It has never let you down.' },
      { title: 'One small step', content: 'You don\'t need to do everything today. Just do one thing. Then another. That\'s all progress is — small steps taken consistently.' },
    ],
    giphyQuery: 'motivation',
  },
  {
    id: 'laugh',
    icon: '😂',
    title: 'Open When You Need To Laugh',
    desc: 'Time for a smile break',
    color: '#ffb74d',
    message: "You know what? You deserve to laugh today. A real, belly-shaking, can't-breathe kind of laugh. The kind that makes your cheeks hurt and your heart feel light.\n\nLife can get so serious sometimes, and we forget that joy is just as important as everything else. So take a moment. Let yourself be silly. Watch something ridiculous. Remember an embarrassing moment and laugh at it.\n\nYou have the most wonderful laugh — the kind that makes everyone around you smile too. I wish I could hear it right now.\n\nHere's to laughter, to joy, to not taking life too seriously. You deserve every bit of happiness that comes your way.",
    sections: [
      { title: 'Funny thought', content: 'Imagine if animals could talk. Your cat would probably just sass you all day. And honestly? That\'s hilarious.' },
      { title: 'Smile reminder', content: 'You have a beautiful smile. Even when you\'re not feeling it, try smiling for 5 seconds. Feel that? That\'s joy sneaking in.' },
    ],
    giphyQuery: 'funny',
  },
  {
    id: 'stressed',
    icon: '🌿',
    title: "Open When You're Stressed",
    desc: 'Pause. Breathe. You\'ve got this.',
    color: '#81c784',
    message: "Stop for a moment. Just stop. Whatever is rushing through your mind, whatever deadlines or worries are chasing you — they can wait. Right now, it's just you and me.\n\nTake a deep breath. Hold it. Let it go slowly. Feel your shoulders drop. Feel the tension leaving your body.\n\nYou are not a machine. You are a human being with limits, and that's okay. You don't have to do everything at once. You don't have to be perfect.\n\nThis moment right here? It's yours. Take it. Rest in it. And when you're ready, you can face whatever comes next — stronger and calmer.",
    sections: [
      { title: 'Ground yourself', content: 'Look around. Name 5 things you can see. 4 things you can touch. 3 things you can hear. 2 things you can smell. 1 thing you can taste. You are here. You are safe.' },
      { title: 'You are not your stress', content: 'Stress is a visitor, not a resident. It will pass. Just breathe through it.' },
    ],
    giphyQuery: 'calm',
  },
  {
    id: 'miss',
    icon: '💕',
    title: 'Open When You Miss Me',
    desc: 'Distance means so little when someone means so much',
    color: '#f48fb1',
    message: "I miss you too. More than I can put into words.\n\nSometimes the distance feels like too much. Like there's this invisible wall between us, and all I want to do is break through it and hold you. I think about the little things — the sound of your voice, the way you laugh, the comfortable silences.\n\nBut here's the thing: missing you reminds me how much you mean to me. It's proof that what we have is real and precious. Distance is just a test of how far love can travel. And our love? It travels across oceans, through time zones, past every obstacle.\n\nI'm here. You're there. But in our hearts, we're together. Always.",
    sections: [
      { title: 'Close your eyes', content: 'Imagine I\'m right there with you. I\'m holding your hand, looking into your eyes, and smiling. That\'s where I am in spirit.' },
      { title: 'Until we meet again', content: 'Every day apart is a day closer to being together again. And when that day comes, every second of waiting will be worth it.' },
    ],
    giphyQuery: 'miss you',
  },
  {
    id: 'reminder',
    icon: '💝',
    title: 'Open When You Need A Reminder',
    desc: 'Of how amazing and loved you truly are',
    color: '#ce93d8',
    message: "This is your official reminder — the kind you can't ignore — that you are absolutely incredible.\n\nNot just \"pretty great\" or \"kind of awesome.\" I mean truly, deeply, wonderfully incredible. You have a heart that cares so deeply. A mind that thinks so beautifully. A spirit that shines even on cloudy days.\n\nYou are kind when no one is watching. You are strong when you feel weak. You are beautiful even when you don't see it.\n\nThis is me, reminding you of everything wonderful about you — because sometimes we all forget. And I'll keep reminding you as many times as you need.",
    sections: [
      { title: 'The truth about you', content: 'You are worthy of love. You are worthy of happiness. You are worthy of every good thing that comes your way. Never doubt that.' },
      { title: 'What I see in you', content: 'I see someone who tries, who cares, who loves deeply. I see someone who is growing every single day. I see someone beautiful — inside and out.' },
    ],
    giphyQuery: 'you are beautiful',
  },
  {
    id: 'lonely',
    icon: '🌟',
    title: 'Open When You Feel Lonely',
    desc: 'You are never truly alone',
    color: '#90caf9',
    message: "I know loneliness can feel so heavy. It's that quiet ache that creeps in when you're by yourself, making the room feel bigger and the silence louder.\n\nBut here's what I need you to remember: you are never truly alone. Not really. Because somewhere, in this vast world, someone is thinking of you. Someone is wishing you were here. Someone is grateful you exist.\n\nAnd that someone is me.\n\nWhenever you feel lonely, look up at the stars. I'm looking at the same sky. We're under the same universe, connected by something that distance can't break.\n\nYou are loved. You are seen. You matter.",
    sections: [
      { title: 'We are connected', content: 'Every time you see a shooting star, imagine it\'s me sending you a little love from afar. We\'re connected by more than distance.' },
      { title: 'A thought for you', content: 'Loneliness is just your heart reminding you of the people you love. And I\'m right here, loving you back.' },
    ],
    giphyQuery: 'you matter',
  },
  {
    id: 'smile',
    icon: '☀️',
    title: 'Open When You Need A Smile',
    desc: 'Something to brighten your day',
    color: '#fff176',
    message: "I wanted to send you a smile today. A real one. The kind that starts in your heart and spreads across your face before you can stop it.\n\nI hope this finds you on a good day. But if it's not a good day, I hope this helps make it a little better.\n\nYou have the kind of smile that makes people feel warm inside. The kind that can change someone's whole mood. And right now, I'm smiling just thinking about you.\n\nSo here's your smile for today. Wear it proudly. Share it generously. And remember: you are the reason someone is smiling today.",
    sections: [
      { title: 'Something cute', content: 'Puppies, kittens, baby animals — nature\'s way of making sure we smile every single day. You\'re cuter than all of them though.' },
      { title: 'A happy thought', content: 'Imagine your favorite memory — the one that always makes you smile. Relive it for a moment. Feel that warmth? That\'s joy living in you.' },
    ],
    giphyQuery: 'cute animals',
  },
  {
    id: 'overthinking',
    icon: '🧠',
    title: "Open When You're Overthinking",
    desc: 'Quiet the noise. Find your peace.',
    color: '#b39ddb',
    message: "I can feel the wheels turning in your mind from here. The what-ifs. The maybes. The replaying of conversations and scenarios.\n\nI know how exhausting it is when your mind won't stop. It's like a room full of people all talking at once, and you can't find the quiet button.\n\nSo let me be your quiet button.\n\nRight now, in this moment, nothing needs to be figured out. You don't need solutions. You don't need answers. All you need is to be here, right now, breathing.\n\nThe thoughts will settle. They always do. You just need to give them time and space. You are safe. You are okay. And you don't have to figure everything out today.",
    sections: [
      { title: 'Pause the noise', content: 'Write down everything on your mind. Every thought, every worry. Then close your eyes and let them go, one by one. They don\'t own you.' },
      { title: 'You are not your thoughts', content: 'Your thoughts are like clouds passing through the sky of your mind. You are the sky — vast, unchanging, peaceful. The clouds will pass.' },
    ],
    giphyQuery: 'meditation',
  },
];


// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {};

function cacheDom() {
  dom.siteTitle = $('#site-title');
  dom.dailyDate = $('#daily-date');
  dom.dailyText = $('#daily-text');
  dom.daysCount = $('#days-count');
  dom.weeksCount = $('#weeks-count');
  dom.monthsCount = $('#months-count');
  dom.cardsGrid = $('#cards-grid');
  dom.modalOverlay = $('#modal-overlay');
  dom.modalContainer = $('#modal-container');
  dom.modalContent = $('#modal-content');
  dom.modalClose = $('#modal-close');
  dom.letterPreview = $('#letter-preview');
  dom.letterModal = $('#letter-modal');
  dom.letterModalClose = $('#letter-modal-close');
  dom.letterDate = $('#letter-date');
  dom.letterSignature = $('#letter-signature');
  dom.secretReveal = $('#secret-reveal');
  dom.timeline = $('#timeline');
  dom.addTimelineBtn = $('#add-timeline-btn');
  dom.timelineModal = $('#timeline-modal');
  dom.timelineModalClose = $('#timeline-modal-close');
  dom.timelineForm = $('#timeline-form');
  dom.canvas = $('#starfield');
  dom.heartsContainer = $('#hearts-container');
}

// ===== STARFIELD =====
let stars = [];
let mouseX = 0;
let mouseY = 0;

function initStarfield() {
  const canvas = dom.canvas;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 3000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      alphaSpeed: Math.random() * 0.02 + 0.005,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      layer: Math.random(),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const parallaxX = (mouseX - canvas.width / 2) * 0.002;
    const parallaxY = (mouseY - canvas.height / 2) * 0.002;

    for (const star of stars) {
      star.alpha += star.alphaSpeed * star.alphaDir;
      if (star.alpha >= 1 || star.alpha <= 0.1) star.alphaDir *= -1;

      const offsetX = parallaxX * star.layer * 200;
      const offsetY = parallaxY * star.layer * 200;
      const x = (star.x + offsetX + canvas.width) % canvas.width;
      const y = (star.y + offsetY + canvas.height) % canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.8})`;
      ctx.fill();

      if (star.r > 1.2) {
        ctx.beginPath();
        ctx.arc(x, y, star.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.05})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== FLOATING HEARTS =====
function initHearts() {
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤', '💕', '💗', '💖', '💝', '♥'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.animationDelay = '0s';
    dom.heartsContainer.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }

  setInterval(createHeart, CONFIG.heartsFrequency);
  for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * CONFIG.heartsFrequency / 2);
  }
}

// ===== DAILY MESSAGE SYSTEM =====
function initDailyMessage() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = (dayOfYear - 1 + dailyMessages.length) % dailyMessages.length;
  const message = dailyMessages[index];

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dom.dailyDate.textContent = now.toLocaleDateString('en-US', options);
  dom.dailyText.textContent = message;
}

// ===== DAYS COUNTER =====
function updateCounter() {
  const startDate = new Date(CONFIG.startDate);
  const now = new Date();
  const diff = now - startDate;
  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor((now.getFullYear() - startDate.getFullYear()) * 12 + now.getMonth() - startDate.getMonth());

  dom.daysCount.textContent = days.toLocaleString();
  dom.weeksCount.textContent = weeks.toLocaleString();
  dom.monthsCount.textContent = months;
}

// ===== CATEGORY CARDS =====
function renderCards() {
  dom.cardsGrid.innerHTML = '';
  for (const cat of categories) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open ${cat.title}`);
    card.dataset.id = cat.id;
    card.innerHTML = `
      <span class="card-icon">${cat.icon}</span>
      <h3 class="card-title">${cat.title}</h3>
      <p class="card-desc">${cat.desc}</p>
    `;
    card.addEventListener('click', () => openModal(cat));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(cat); } });
    dom.cardsGrid.appendChild(card);
  }
}

// ===== MODAL SYSTEM =====
function openModal(category) {
  const { id, icon, title, message, sections, giphyQuery } = category;
  const messageHtml = message.split('\n\n').map(p => `<p>${p}</p>`).join('');

  let sectionsHtml = '';
  if (sections) {
    sectionsHtml = sections.map(s => `
      <div class="modal-section">
        <h3>${s.title}</h3>
        <p>${s.content}</p>
      </div>
    `).join('');
  }

  dom.modalContent.innerHTML = `
    <div class="modal-title">${icon} ${title}</div>
    <div class="modal-message">${messageHtml}</div>
    ${sectionsHtml}
    <div class="modal-section image-gallery-section" data-category="${id}" style="display:none">
      <h3>Our Gallery</h3>
      <div class="image-gallery" data-category="${id}"></div>
      <div class="upload-area" data-category="${id}">
        <label class="upload-btn glass-btn" tabindex="0" role="button" aria-label="Upload image to this category">+ Add Image</label>
        <input type="file" accept="image/*" class="upload-input" data-category="${id}" hidden>
      </div>
    </div>
    <div class="modal-section">
      <h3>Something for you</h3>
      <div class="gif-gallery" data-category="${id}" data-query="${giphyQuery}"></div>
    </div>
  `;

  dom.modalOverlay.classList.remove('hidden');
  dom.modalOverlay.setAttribute('aria-hidden', 'false');
  dom.modalContent.scrollTop = 0;
  dom.modalClose.focus();

  loadImages(id);
  loadGifs(id, giphyQuery);

  trapFocus(dom.modalOverlay);
}

function closeModal() {
  dom.modalOverlay.classList.add('hidden');
  dom.modalOverlay.setAttribute('aria-hidden', 'true');
  dom.modalContainer.scrollTop = 0;
}

// ===== LETTER MODAL =====
function openLetterModal() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  dom.letterDate.textContent = now.toLocaleDateString('en-US', options);
  dom.letterSignature.textContent = CONFIG.senderName;

  dom.letterModal.classList.remove('hidden');
  dom.letterModal.setAttribute('aria-hidden', 'false');
  dom.letterModalClose.focus();
  trapFocus(dom.letterModal);
}

function closeLetterModal() {
  dom.letterModal.classList.add('hidden');
  dom.letterModal.setAttribute('aria-hidden', 'true');
}

// ===== IMAGE LOADING & UPLOAD =====
function getUploadedImages(categoryId) {
  try { return JSON.parse(localStorage.getItem(`uploaded_${categoryId}`)) || []; } catch (e) { return []; }
}

function saveUploadedImages(categoryId, imgs) {
  localStorage.setItem(`uploaded_${categoryId}`, JSON.stringify(imgs));
}

function loadImages(categoryId) {
  const gallery = document.querySelector(`.image-gallery[data-category="${categoryId}"]`);
  if (!gallery) return;
  const section = document.querySelector(`.image-gallery-section[data-category="${categoryId}"]`);
  gallery.innerHTML = '';

  const uploaded = getUploadedImages(categoryId);
  let count = 0;

  for (const imgData of uploaded) {
    const img = document.createElement('img');
    img.src = imgData;
    img.loading = 'lazy';
    img.alt = 'Uploaded image';
    const del = document.createElement('button');
    del.className = 'img-del';
    del.innerHTML = '&times;';
    del.setAttribute('aria-label', 'Delete image');
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgs = getUploadedImages(categoryId);
      const idx = imgs.indexOf(imgData);
      if (idx > -1) { imgs.splice(idx, 1); saveUploadedImages(categoryId, imgs); loadImages(categoryId); }
    });
    const wrap = document.createElement('div');
    wrap.className = 'img-wrap';
    wrap.appendChild(img);
    wrap.appendChild(del);
    gallery.appendChild(wrap);
    count++;
  }

  if (count > 0 && section) section.style.display = '';

  const uploadInput = document.querySelector(`.upload-input[data-category="${categoryId}"]`);
  const uploadBtn = document.querySelector(`.upload-btn[data-category="${categoryId}"]`);
  if (uploadInput) {
    uploadInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      compressImage(file, 800, 0.7).then((dataUrl) => {
        const imgs = getUploadedImages(categoryId);
        imgs.push(dataUrl);
        if (imgs.length > 20) imgs.splice(0, imgs.length - 20);
        saveUploadedImages(categoryId, imgs);
        loadImages(categoryId);
      });
      uploadInput.value = '';
    };
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => uploadInput.click());
      uploadBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); uploadInput.click(); } });
    }
  }
}

// ===== GIF INTEGRATION =====

function loadGifs(categoryId, query) {
  const gallery = document.querySelector(`.gif-gallery[data-category="${categoryId}"]`);
  if (!gallery) return;

  gallery.innerHTML = '<p class="gif-loading">Loading GIFs...</p>';

  if (CONFIG.giphyApiKey === 'YOUR_GIPHY_API_KEY') {
    gallery.innerHTML = '<p class="gif-error">Add your GIPHY API key in the CONFIG to enable GIFs.</p>';
    return;
  }

  fetchGifs(categoryId, gallery, query);
}

function fetchGifs(categoryId, gallery, q) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${CONFIG.giphyApiKey}&q=${encodeURIComponent(q)}&limit=12&rating=g`;
  fetch(url)
    .then(r => r.json())
    .then(data => {
      const urls = data.data.map(gif => gif.images.fixed_height_downsampled.url).filter(u => u);
      if (urls.length >= 3) {
        localStorage.setItem(`giphy_${categoryId}`, JSON.stringify({ urls, timestamp: Date.now() }));
        renderGifs(gallery, urls);
      } else {
        fetchTrending(categoryId, gallery);
      }
    })
    .catch(() => fetchTrending(categoryId, gallery));
}

function fetchTrending(categoryId, gallery) {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${CONFIG.giphyApiKey}&limit=12&rating=g`;
  fetch(url)
    .then(r => r.json())
    .then(d => {
      const urls = d.data.map(g => g.images.fixed_height_downsampled.url).filter(u => u);
      if (urls.length > 0) {
        renderGifs(gallery, urls);
      } else {
        gallery.innerHTML = '<p class="gif-error">No GIFs found for this category.</p>';
      }
    })
    .catch(() => {
      gallery.innerHTML = '<p class="gif-error">Could not load GIFs right now. Please try again later.</p>';
    });
}

function renderGifs(gallery, urls) {
  if (!urls || urls.length === 0) {
    gallery.innerHTML = '<p class="gif-error">No GIFs found for this category.</p>';
    return;
  }
  gallery.innerHTML = '';
  for (const url of urls) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = url;
    img.alt = 'GIF';
    img.addEventListener('click', () => window.open(url, '_blank'));
    img.style.cursor = 'pointer';
    gallery.appendChild(img);
  }
}

// ===== HIDDEN SECRET =====
let titleClickCount = 0;

function initSecret() {
  dom.siteTitle.addEventListener('click', () => {
    titleClickCount++;
    if (titleClickCount >= 5) {
      dom.secretReveal.classList.remove('hidden');
      setTimeout(() => {
        dom.secretReveal.classList.add('hidden');
      }, 4000);
      titleClickCount = 0;
    }
  });
}

// ===== TIMELINE (Firestore, real-time) =====
let timelineUnsubscribe = null;

function renderTimeline(entries) {
  dom.timeline.innerHTML = '';
  if (!entries || entries.length === 0) {
    dom.timeline.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0;">No memories yet. Start adding some!</p>';
    return;
  }
  const sorted = [...entries].sort((a, b) => {
    const aTime = a.createdAt ? (a.createdAt.toMillis ? a.createdAt.toMillis() : a.createdAt) : 0;
    const bTime = b.createdAt ? (b.createdAt.toMillis ? b.createdAt.toMillis() : b.createdAt) : 0;
    return bTime - aTime;
  });
  for (let i = 0; i < sorted.length; i++) {
    const entry = sorted[i];
    const el = document.createElement('div');
    el.className = 'timeline-entry';
    el.style.animationDelay = i * 0.1 + 's';
    const imgHtml = entry.image ? `<img src="${entry.image}" alt="Memory photo" class="entry-img">` : '';
    el.innerHTML = `
      <div class="entry-date">${entry.date}</div>
      <div class="entry-title">${entry.title}</div>
      ${imgHtml}
      <div class="entry-desc">${entry.desc}</div>
      <button class="entry-delete" data-id="${entry.id}" aria-label="Delete memory">&times;</button>
    `;
    el.querySelector('.entry-delete').addEventListener('click', () => {
      if (entry.id) db.collection('timeline').doc(entry.id).delete().catch(e => console.error('Delete error:', e));
    });
    dom.timeline.appendChild(el);
  }
}

function setupTimelineListener() {
  if (timelineUnsubscribe) timelineUnsubscribe();
  timelineUnsubscribe = db.collection('timeline').onSnapshot((snapshot) => {
    const entries = [];
    snapshot.forEach((doc) => {
      const d = doc.data();
      entries.push({ id: doc.id, ...d });
    });
    if (entries.length === 0) {
      db.collection('timeline').add({
        date: '2026-04-25',
        title: 'First started talking',
        desc: 'The day we first connected.',
        image: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).catch((err) => {
        console.error('Default timeline entry error:', err);
      });
    }
    renderTimeline(entries);
  }, (error) => {
    console.error('Firestore error:', error);
    dom.timeline.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0;">Could not connect to database. <button onclick="location.reload()" style="background:none;color:var(--accent-pink);text-decoration:underline;cursor:pointer;border:none;font:inherit">Retry</button></p>';
  });
}

function initTimeline() {
  setupTimelineListener();

  dom.addTimelineBtn.addEventListener('click', () => {
    dom.timelineModal.classList.remove('hidden');
    dom.timelineModal.setAttribute('aria-hidden', 'false');
    dom.timelineForm.reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('timeline-date').value = today;
    document.getElementById('timeline-date').focus();
    trapFocus(dom.timelineModal);
  });

  dom.timelineModalClose.addEventListener('click', () => {
    dom.timelineModal.classList.add('hidden');
    dom.timelineModal.setAttribute('aria-hidden', 'true');
  });

  dom.timelineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('timeline-date').value;
    const title = document.getElementById('timeline-title').value.trim();
    const desc = document.getElementById('timeline-desc').value.trim();
    if (!date || !title || !desc) return;
    const fileInput = document.getElementById('timeline-image');
    const saveEntry = (imageDataUrl) => {
      db.collection('timeline').add({
        date,
        title,
        desc,
        image: imageDataUrl || '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).catch((err) => {
        console.error('Firestore write error:', err);
        alert('Could not save memory. Check Firestore security rules.');
      });
      dom.timelineModal.classList.add('hidden');
      dom.timelineModal.setAttribute('aria-hidden', 'true');
      fileInput.value = '';
    };
    if (fileInput && fileInput.files[0]) {
      compressImage(fileInput.files[0], 800, 0.7).then(saveEntry).catch(() => saveEntry(null));
    } else {
      saveEntry(null);
    }
  });
}

// ===== ACCESSIBILITY: FOCUS TRAPPING =====
function trapFocus(container) {
  const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', handler);
  const observer = new MutationObserver(() => {
    if (container.classList.contains('hidden')) {
      container.removeEventListener('keydown', handler);
      observer.disconnect();
    }
  });
  observer.observe(container, { attributes: true, attributeFilter: ['class'] });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!dom.modalOverlay.classList.contains('hidden')) closeModal();
      if (!dom.letterModal.classList.contains('hidden')) closeLetterModal();
      if (!dom.timelineModal.classList.contains('hidden')) {
        dom.timelineModal.classList.add('hidden');
        dom.timelineModal.setAttribute('aria-hidden', 'true');
      }
    }
  });
}

// ===== MOUSE PARALLAX =====
function initMouseTracking() {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

// ===== INITIALIZATION =====
function init() {
  cacheDom();
  ['sad','sleep','motivation','laugh','stressed','miss','reminder','lonely','smile','overthinking'].forEach(id => localStorage.removeItem(`giphy_${id}`));
  initStarfield();
  initHearts();
  initDailyMessage();
  updateCounter();
  renderCards();
  initSecret();
  initTimeline();
  initKeyboardNav();
  initMouseTracking();

  setInterval(updateCounter, 1000 * 60 * 60);

  dom.modalClose.addEventListener('click', closeModal);
  dom.modalOverlay.addEventListener('click', (e) => {
    if (e.target === dom.modalOverlay) closeModal();
  });

  dom.letterPreview.addEventListener('click', openLetterModal);
  dom.letterPreview.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetterModal(); }
  });
  dom.letterModalClose.addEventListener('click', closeLetterModal);
  dom.letterModal.addEventListener('click', (e) => {
    if (e.target === dom.letterModal) closeLetterModal();
  });
}

document.addEventListener('DOMContentLoaded', init);


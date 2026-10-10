/**
 * Shared JS for all pages of the Apostle Prosper O. S. Okujere Memorial Site
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollTracker();
  initReveal();
  initInPageWidget();
  initMobileDrawer();
  setActiveNavLink();
});

/* ── 1. Theme ── */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('site-theme', next);
    });
  }
}

/* ── 2. Scroll tracker (progress bar + side thumb + navbar compact) ── */
function initScrollTracker() {
  const bar = document.getElementById('scroll-indicator');
  const thumb = document.getElementById('scroll-thumb');
  const dir = document.getElementById('scroll-direction');
  const navbar = document.querySelector('.navbar');
  let last = 0;

  window.addEventListener('scroll', () => {
    const top = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const frac = h > 0 ? top / h : 0;

    if (bar) bar.style.width = (frac * 100) + '%';
    if (thumb) thumb.style.transform = `translateY(${frac * 136}px)`;
    if (dir) {
      dir.textContent = top > last ? '▼' : '▲';
      dir.style.color = top > last ? '#00a3a3' : '#c59b27';
    }
    if (navbar) navbar.classList.toggle('scrolled', top > 60);
    last = top <= 0 ? 0 : top;
  }, { passive: true });
}

/* ── 3. Scroll Reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── 4. In-Page Navigation Widget ── */
function initInPageWidget() {
  const sections = document.querySelectorAll('section[id]');
  const widget = document.getElementById('inpage-widget');
  if (!widget || !sections.length) return;

  widget.innerHTML = '';
  sections.forEach(sec => {
    const id = sec.id;
    const label = sec.dataset.sectionTitle || id.replace(/-/g, ' ');
    const item = document.createElement('div');
    item.className = 'widget-dot-item';
    item.dataset.target = id;
    item.innerHTML = `<div class="widget-dot"></div><span class="widget-label">${cap(label)}</span>`;
    item.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    widget.appendChild(item);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.widget-dot-item').forEach(d => {
          d.classList.toggle('active', d.dataset.target === e.target.id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => obs.observe(s));
}

function cap(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

/* ── 5. Mobile Drawer ── */
function initMobileDrawer() {
  const toggle = document.getElementById('mobile-toggle');
  const close  = document.getElementById('close-drawer');
  const drawer = document.getElementById('mobile-drawer');
  const overlay= document.getElementById('mobile-overlay');
  const links  = document.querySelectorAll('.mobile-nav-link');

  const open  = () => { drawer?.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const shut  = () => { drawer?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; };

  toggle?.addEventListener('click', open);
  close?.addEventListener('click', shut);
  overlay?.addEventListener('click', shut);
  links.forEach(l => l.addEventListener('click', shut));
}

/* ── 6. Mark active nav link by current page ── */
function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .drawer-links a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop() || '';
    if (href === page || (page === 'index.html' && (href === '' || href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

/* ── Tributes data & renderer (used on tributes.html) ── */
const FAMILY_TRIBUTES = [
  {
    id: 'fam-wife', name: "Rev. Rita A. Okujere", relation: "Beloved Wife",
    image: '../assets/images/tributes/wife.png',
    isFeatured: true, isWide: true,
    message: `My husband, my darling. You were the love of my life, my heartbeat. You taught me what real love meant. You were a man of integrity, honourable, caring, and loving. There are not enough words to describe you or the kind of person you were.\n\nRight from the time I set my eyes on you, I knew you were the man for me. You were so gentle, and you were so caring. You were the one who truly taught me what love is all about. You taught me how to love. You were the epitome of love.\n\nFor the 31 years we have been married, and the almost two years we knew each other before that, it has been bliss. I knew you were the one for me. I never wanted to be apart from you. We both knew we were one for each other.\n\nYou were my friend, my confidant. You were the one I could tell the secrets I could never share with another. I will always thank God for giving me a man like you.\n\nSometimes I wonder how I could live without you. I wonder how I can go through life without you. I never thought we would part so soon. I never thought a day would come when I would look for you and I wouldn't find you, when I would call you and you would not answer.\n\nWho will love me like you did? Who will be my life partner, my helper, my companion? Who will stand by me like my love? You were kind to everyone who came your way.\n\nYou showed love to my family and to your family. I am glad because I know my children were blessed to have a father like you, and I was blessed to have a husband like you.\n\nI love you, darling. Till the day I die, I will always love you. I can never forget you. Only God can help me to go through life without you, because He says He is a father to the fatherless and the husband of the widow.\n\nMy heart, my eyes, my thoughts, my everything. God alone will see me through. I love you.`,
    date: "October 2026"
  },
  {
    id: 'fam-faith', name: "Mrs. Faith O. Ebiogbe", relation: "First Daughter",
    image: '../assets/images/tributes/Faith egiobe.jpeg',
    message: "Daddy, you were my protector, my example of what a godly man and father should be. From childhood to womanhood, you guided me with patience and strength, you showed me what true devotion looks like. You lived for God and served Him faithfully to your last breath. Rest well, Daddy. I love you always.",
    date: "October 2026"
  },
  {
    id: 'fam-favour-m', name: "Mrs. Favour Mbaekwe", relation: "Daughter",
    image: '../assets/images/tributes/mrs favour mbaekwe.jpeg',
    message: `Dad, you were a lovable man, and everyone who met you felt it. You had a warmth that drew people close and a smile that made them feel at home.\n\nYou were firm, but always fair. You set standards for us, not to be hard on us, but because you believed we could reach them. When you corrected us, it came with love, and when you praised us, we knew we had earned it.\n\nAbove all, you put God and family first. You didn't only preach your faith; you lived it every day, in how you served, how you gave, and how you loved. Your devotion to God was matched by your devotion to us, and we never once doubted where we stood in your heart.\n\nYou were a good man, the kind the world needs more of. You have left us a legacy of faith, integrity, and love that we will carry for the rest of our lives.\n\nRest well, Dad. You fought a good fight, you finished your race, and you kept the faith.`,
    date: "October 2026"
  },
  {
    id: 'fam-precious', name: "Evang. Precious Peter Okujere Jr.", relation: "First Son",
    image: '../assets/images/tributes/precious okujere.png',
    isFeatured: true,
    message: `What a father my dad was! A destiny like mine won't have succeeded under a different kind of man. God used my father to guide me into my life's purpose. I'm short of words to write a tribute because where do I start from.\n\nHe taught me perseverance, determination, optimisation, spirituality towards Jesus Christ and devotion of life and resources to the Holy Spirit and to family above financial advantage. He taught me how to work on my anger, he discipled me on love for God, family and for people. He taught me forgiveness first hand. He prioritised mercy above vengeance and actually lived it.\n\nHe will say: "Everyone has peace in themselves. Every protracted conflict is because one person in that conflict is refusing to volunteer their peace to end the conflict."\n\nMy dad was a good man and I miss my dad. May his rest be without worry for his progeny here on earth. May the Lord look favourably on his nuclear family and remember his resting servant's labour of love for Him. Until resurrection day, Dad rest — your children got it from here, God helping us.`,
    date: "October 2026"
  },
  {
    id: 'fam-gideon', name: "Mr. Gideon Okujere", relation: "Son",
    image: '../assets/images/tributes/gideon okujere.jpeg',
    message: `My Daddy, My mentor! You always taught me about the love of Christ and the love of a man and his family. I have never come across any man better than you and all I have always wanted to do was to make you proud and happy. You are my template for what a real man should be.\n\nI know we will meet again in heaven because you made sure to teach me about making heaven, but for now I will continue to carry your memory, principles, words of wisdom and love in my heart all the days of my life.\n\nI will not let you down Daddy. I love and miss you so much.`,
    date: "October 2026"
  },
  {
    id: 'fam-praise', name: "Ms. Praise Okujere, Esq.", relation: "Daughter",
    image: '../assets/images/tributes/praise okujere.jpeg',
    message: "As a father you were everything I needed you to be at every stage of my life. As a husband you never stopped trying to get it right with your wife and you succeeded. As a priest you loved your God and served him till your last breath. Daddy you were excellent, I love you, rest well.",
    date: "October 2026"
  },
  {
    id: 'fam-blessing', name: "Ms. Blessing Ajise", relation: "Daughter",
    image: '../assets/images/tributes/Blessing Ajise.jpeg',
    message: `You were the perfect dad anyone could have asked for and of all the special gifts in life, you were one of the greatest I got.\n\nIn so many ways you impacted and changed my life. Your love, kindness, godliness and teachings will always be in my heart. I will always remember you with smiles and not with tears, knowing you are in the place you have always longed to be.`,
    date: "October 2026"
  },
  {
    id: 'fam-favour-o', name: "Ms. Favour Okujere", relation: "Daughter",
    image: '../assets/images/tributes/faith okujere.jpeg',
    message: "It still feels like a dream; I can't believe daddy is gone. Most handsome man, intelligent, best dressed, God fearing, God's own Apostle, man of honour. How do I forget you? I will always remember you my strong man. I love you always and forever. Rest on king. We miss you more each day.",
    date: "October 2026"
  }
];

const GENERAL_TRIBUTES = [
  { id: 'gen-house-of-freedom', name: "Rev. (Dr.) Williams Chiedu", relation: "National Pastor For the Bishop, Freedom Ministries Int'l (House of Freedom)", isFeatured: true, isWide: true,
    message: "Having to write this tribute today is not what I would have wanted to do. No. At least not at this point in time. One year ago, almost to the date, you were with us at the Jubilee International Convention 2025 hale and hearty and we all rejoiced to have you in our midst and we were all looking forward to many more Jubilee Conventions to celebrate together. But alas! It would not be so. Indeed, man proposes but God disposes.\n\nRev Prosper O. S. Okujere came into Freedom Ministries International Inc Asaba (House of Freedom) as one seeking truth and knowledge, and quickly integrated himself into the flow of activities in the church. He joined the Ushering / Protocol team, where he rose to become the Head within a short time. He grew steadily in his faith and love for God's kingdom being elevated from the position of a deacon to a Pastor, then a Reverend Minister and finally becoming our National Pastor. Together with his entire family members (his wife being ordained as a Pastor too), he became a rallying point in the ministry. He used his office as a National Pastor to bring into the ministry his own peculiar grace and functionality, developing robust and cordial relationships with members and other pastors.\n\nDespite the hiccups that resulted in his leaving Freedom Ministries, we are grateful to God that a proper and cordial resolution of matters and a full reunion was carried out during Jubilee Convention 2025. Apostle Prosper Okujere was a man of great faith, love for Jesus and the Kingdom of God, who carried out his assignment with dignity, love, compassion and respect for all. Indeed, he came, he saw, participated and conquered, and he has returned to his Maker and Creator, whom he loved and served wholeheartedly while on this side of eternity. Rest on in the bosom of the Lord, gallant soldier of the Cross, until the resurrection when we meet to part no more." },
  { id: 'gen-patience', name: "Lady Patience Ajeoyibo Taghwo", relation: "Immediate Younger Sister", isFeatured: true,
    message: "Ose one, it is unbelievable that you left me just like that on this planet earth. My great adviser, my teacher, my father, my encourager, how I enjoy your spiritual teaching and your empowerment to everyone that comes around you. I miss you my father, God knows the best for you. Rest on daddy. Adieu my number one in my mother's gate." },
  { id: 'gen-abos', name: "Bishop Abos Willie", relation: "Chairman, PFN Delta State", isFeatured: true,
    message: "Apostle Prosper Okujere lived a good life. He loved God and served him faithfully till the end. I would say he finished well. My prayer is for God to bless his family that he left behind with much more blessing beyond what he got from God. We cannot blame God… in all we give thanks to God." },
  { id: 'gen-obaro', name: "Obaro", relation: "Sister",
    message: `Dad, my greatest challenge presently is to write a tribute about you right now because I still find it difficult to believe that I'm going to miss you for the rest of my life. I called you dad because you acted as one — you did for me what my father couldn't, you gave me a job, prepared me to face life, gave me out in marriage and never left me and my family alone in all areas of life.\n\nMy children's "BIG DADDY", daddy S.O, my children's grandpa, to which end can I look to? My heart is heavy but in all I will not fail thanking God for all things. My greatest joy is meeting again to part no more. Daddy good night.` },
  { id: 'gen-rita-niece', name: "Rita Okujere", relation: "Niece",
    message: `Dear Big Daddy, it is very sad to write about you now that you are gone. I remember when you would say if we put our heart and mind to pray, God answers. I still cannot forget your perfect smile and the way you made me feel safe. You've been the best uncle to me and I will never forget your kind heart.\n\nI always bragged to my friends about you: the way you carry yourself, the way you preach God's word, kind-hearted, God-fearing, fearless, handsome, loveable, strong man. You will always be my legend. Rest well sir. Forever loved, forever missed.` },
  { id: 'gen-lawson', name: "Mr. Okujere Oviguen Lawson", relation: "Brother / Relative",
    message: "Pastor Prosper Okujere is more than a father to me. Since I lost my dad, Deacon Peter Okujere, in 1997, Pastor Prosper wore the shoes of father — dishing civil service jobs to my brothers and numerous friends. God used him mightily to raise our standard of living without asking for returns. Nobody can fill his place in my life and in our entire family. Goodbye direction." },
  { id: 'gen-esiso', name: "Barr. Esiso Ifie Esther", relation: "Deputy, CDC Governor's Office Annex Warri",
    message: "My Oga, that is how I usually called you. I never knew you would be leaving us so soon. I enjoyed working with you and your style of life was amazing. God knows why he called you; nobody can question him. May your gentle soul rest in peace in Jesus name. Amen." },
  { id: 'gen-violet', name: "Mrs. Violet Onowakpokpo", relation: "Director, Governor's Office Annex Warri",
    message: "What a shock. The Lord giveth and taketh away. We give him all the glory. Mr. Okujere, my former boss, lived a Godly life. Your legacy in the Governor's office annex Warri (the fellowship) is waxing stronger. RIP my dear Oga." },
  { id: 'gen-tadafe', name: "Tadafe Patrick", relation: "Mentee & Brother",
    message: "Daddy, the news of your departure came as such a shock. I do remember when we last spoke — you directed me to read 2nd John 7–10. I always tell people that if you were the state governor all unemployed youth would be employed. You helped me shape my life; you are best described as a mentor, a teacher, handsome, a preacher, a genuine man of God, impeccable and hardworking." },
  { id: 'gen-hannah', name: "Hannah", relation: "Spiritual Daughter",
    message: "I love you; you never stopped providing for me and as my spiritual father you led me to salvation. Despite some of my attitudes you embraced me like your daughter. You were like a pillar holding my life, giving me every reason to smile. May your soul rest in perfect peace." },
  { id: 'gen-linda', name: "Mrs. Linda Koroma", relation: "Daughter-in-law",
    message: "Daddy, my very important father-in-law, so dear to my heart — always cheerful. You will be in my heart and always be remembered. Your good deeds can never be forgotten. Little did I know that I would be putting these words together in your absence. It is well, my best father-in-law." },
  { id: 'gen-dominion', name: "Koroma Dominion", relation: "Grandchild",
    message: "Grandpa, I will always remember you. You always called me Dominic, a name I will never forget. You took care and supported me and my younger ones spiritually and physically. Rest in peace grandpa." },
  { id: 'gen-desire', name: "Desire Koroma", relation: "Grandchild",
    message: "Grandpa, I will always remember every good thing you have done for me. You are the best grandpa ever, I love you grandpa. Rest in peace." },
  { id: 'gen-love', name: "Akporode Love", relation: "Grandchild",
    message: "I love you grandpa and I will forever miss you. I will never forget you and I will always remember you. May your soul rest in peace." },
  { id: 'gen-ikpotor', name: "Ikpotor Prosper", relation: "Namesake & Disciple",
    message: "I will always remember you daddy, because you always inspire me and you made me come to the full realisation of what salvation is. You taught me how to genuinely serve God. Colossians 2:14–15 and Romans 8:37 live in my spirit because of you. My namesake, rest in perfect peace." },
  { id: 'gen-akpos', name: "Pst. Akpos Ojigho", relation: "Pastor & Minister",
    message: "Daddy, this all came to me as a dream. We ate breakfast together just weeks back and I can't forget your counsels to me that day. Daddy I will surely miss you, this hurts deeply." },
  { id: 'gen-fedrick', name: "Fedrick", relation: "Son in the Lord",
    message: "Daddy, you made me believe that God is real. Your legacy remains in my heart and you will always be in my heart. Adieu man of faith. I miss you so much." },
  { id: 'gen-adaeze', name: "Adaeze Augustine", relation: "Daughter in the Lord",
    message: "Dear Daddy, I hope you can hear me from heaven. You were more than a pastor to me; you were a father and an angel to me and my family. You encouraged us and taught us the word of God. Rest well." },
  { id: 'gen-mercy', name: "Mercy Akpofure", relation: "Spiritual Daughter",
    message: "Dear Daddy, you were the water I drew my Christian life from. The words you taught me still linger in my heart; your preachment was always renewed in our hearts. Rest in the bosom of the Lord." },
  { id: 'gen-edijala', name: "Rev. Edijala", relation: "Fellow Minister",
    message: "Dear Apostle, thank God for your life of giving and devotion to the service of the Lord. Thank you for the way God used you to help me and my family all the years I was with you. Adieu dear servant of God." },
  { id: 'gen-ese', name: "Evangelist Ese Eghagha", relation: "Minister",
    message: "Dear Bro Sunny, we give God glory for the good work that you did on this earth. You indeed fought a good fight and ended well. Rest in peace Apostle Prosper." },
  { id: 'gen-kenneth-ebiogbe', name: "Mr. Kenneth Ebiogbe", relation: "In-Law",
    message: "Apostle Prosper Okujere , a man of will and steel, he always want to be there for you whenever you needs his assistance, I call him my father because he does things that even my biological father cannot do for me, he calls me frequently to pray for me and my wife his daughter, I miss you Daddy, rest in peace" },
  { id: 'gen-omini', name: "Omini Godwin", relation: "In-Law",
    message: "My great in-law, the first time I saw you, you were like a father, a mother and God's choosing one. I miss you dearly. Rest in the Lord. Adieu." },
  { id: 'gen-akporode-fam', name: "Akporode & Family", relation: "Family",
    message: "Your life is a testimony that will never be forgotten. You will forever live in our hearts, daddy and grandpa. We love you.",
    date: "October 2026" },
  { id: 'gen-mrs-akporode', name: "Mrs. Akporode", relation: "Family",
    message: "Surely I'm convinced that neither sickness, disease, principalities nor powers could snatch you away from us daddy. You died 'the death of a righteous man' who came to earth, pursued his course and finished his race. Adieu grandpa.",
    date: "October 2026" },
  { id: 'gen-osiki-children', name: "Daddy Osiki's Children", relation: "Cousins / Family",
    message: "Daddy, your death came so shocking to me and my siblings, when we least expected. Well daddy, may your gentle soul rest in the bosom of the Lord.",
    date: "October 2026" },
  { id: 'gen-efia', name: "Efia Ese Osiki", relation: "Family",
    message: "Daddy why now? You are a father indeed, we miss you. Rest in peace.",
    date: "October 2026" },
  { id: 'gen-jefe', name: "Jefe (Martha's Daughter)", relation: "Family",
    message: "With heavy heart words fail me. Big daddy like I always call you, heaven's gain. We can't question our maker. We miss you daddy, rest on.",
    date: "October 2026" },
  { id: 'gen-lizzy', name: "Lizzy Zuma (Martha's Daughter)", relation: "Family",
    message: "Daddy your passing came as a shock to us all. We can't question God. We know you are in a better place. Rest in peace daddy, we love and miss you.",
    date: "October 2026" },
  { id: 'gen-sodje', name: "Prosper Sodje", relation: "Disciple / Friend",
    message: "Daddy, you lived a good life worthy of emulation. You sowed seeds that will produce great harvest. Thank God your life was a living epistle of the wonder only God can do. Adieu Daddy.",
    date: "October 2026" },
  { id: 'gen-ochukme', name: "Bishop Akpoigbe Ochukme", relation: "Minister",
    message: "Earthly pain & heavenly gain. Good night Daddy.",
    date: "October 2026" },
  { id: 'gen-atebefia', name: "M.O Atebefia Esq.", relation: "Colleague / Friend",
    message: "'The boss' as I usually called you in our discussions. I can't question God on why you left us so soon. May the angels of the Almighty God guard you to your new home until resurrection day.",
    date: "October 2026" },
  { id: 'gen-ebakivie', name: "Ebakivie", relation: "Friend",
    message: "Daddy Prosper Okujere, it pleased God to call you at the time he did. We miss you so much but you had to answer the call of your maker and we know you are smiling in heaven.",
    date: "October 2026" },
  { id: 'gen-queen', name: "Madam Queen", relation: "Co-landlady",
    message: "Nobody can ask God questions; daddy sleep well in the Lord.",
    date: "October 2026" },
  { id: 'gen-augusta', name: "Augusta", relation: "Well-wisher",
    message: "May your gentle soul rest in perfect peace. Amen.",
    date: "October 2026" },
  { id: 'gen-andrew', name: "Mrs. Andrew-Fotoh, O.G.", relation: "Colleague / Friend",
    message: "God knows best. May your gentle soul rest in perfect peace. Amen.",
    date: "October 2026" },
  { id: 'gen-obruche', name: "Obruche Taghwo", relation: "Family",
    message: "A caring father, you always looked out for the good in every person. Daddy I will miss you greatly. You fought a good fight and won. Rest in the bosom of the Lord daddy.",
    date: "October 2026" },
  { id: 'gen-helen', name: "Miss Emmanuel Nkem Helen", relation: "Mentee & Family Friend",
    message: "To a helper and a father, I will miss you daddy. Thank you for believing in us and moulding us into becoming better people. Farewell daddy, till we meet to part no more.",
    date: "October 2026" },
  { id: 'gen-tomamei', name: "Evangelist Tomamei Eric", relation: "Minister",
    message: "I met you twice and I saw in you a true reflection of a gentle man. May the Lord rest your soul in the bosom of our Lord Jesus. Amen.",
    date: "October 2026" },
  { id: 'gen-omoberaye', name: "Elder Friday Omoberaye", relation: "Elder",
    message: "We lost a great and humble man. To God be the glory. May his soul rest in perfect peace. Amen.",
    date: "October 2026" },
  { id: 'gen-notoma', name: "Mrs. Ogheneovo Notoma", relation: "Friend",
    message: "Daddy, I miss you so much. You are the one God used to lighten my life. Even though you are gone from our sight, you are never from our hearts.",
    date: "October 2026" },
  { id: 'gen-eviyimah', name: "Mr. & Mrs. Kenneth Eviyimah", relation: "Friends",
    message: "Your impact on earth will never be forgotten. Rest in the bosom of the Lord. We miss you.",
    date: "October 2026" },
  { id: 'gen-gift', name: "Miss Gift", relation: "Well-wisher",
    message: "Rest on sir.",
    date: "October 2026" }
];

/* Renders tribute cards into a container element */
function renderTributes(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  data.forEach(item => {
    const initials = item.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const paragraphs = item.message.split('\n\n').map(p => `<p>${esc(p.replace(/\n/g, '<br>'))}</p>`).join('');
    const card = document.createElement('div');
    const classes = ['tribute-card'];
    if (item.isFeatured) classes.push('tribute-featured');
    if (item.isWide) classes.push('tribute-wide');
    card.className = classes.join(' ');

    // Pre-seed an initial row span so cards never collapse before measurement
    const estSpan = item.isWide ? Math.max(50, Math.ceil(item.message.length / 28)) : Math.max(22, Math.ceil(item.message.length / 14));
    card.style.gridRowEnd = `span ${estSpan}`;

    const avatarHtml = item.image
      ? `<div class="tribute-avatar tribute-avatar-img"><img src="${esc(item.image)}" alt="${esc(item.name)}" loading="eager"></div>`
      : `<div class="tribute-avatar">${initials}</div>`;
    card.innerHTML = `
      <div class="tribute-header">
        ${avatarHtml}
        <div>
          <div class="tribute-author">${esc(item.name)}</div>
          <div class="tribute-relation">${esc(item.relation)}</div>
        </div>
      </div>
      <div class="tribute-body">${paragraphs}</div>`;
    container.appendChild(card);
  });
}

function resizeMasonryItems() {
  const visibleWalls = document.querySelectorAll('.tributes-wall');
  const rowHeight = 10;
  visibleWalls.forEach(wall => {
    if (wall.offsetParent === null) return;
    const cards = wall.querySelectorAll('.tribute-card');
    cards.forEach(card => {
      card.style.gridRowEnd = 'auto';
    });
    cards.forEach(card => {
      const height = card.getBoundingClientRect().height;
      const rowSpan = Math.ceil((height + 28) / rowHeight);
      card.style.gridRowEnd = `span ${rowSpan}`;
    });
  });
}

/* Tribute tabs */
function initTributeTabs() {
  const tabs = document.querySelectorAll('.tributes-tab-btn');
  const famWrap = document.getElementById('tab-family-wrapper');
  const genWrap = document.getElementById('tab-general-wrapper');
  if (!tabs.length) return;

  // Render both on load
  renderTributes('general-tributes-grid', GENERAL_TRIBUTES);
  renderTributes('family-tributes-grid', FAMILY_TRIBUTES);

  // Trigger masonry calculation across frames and lifecycle events
  requestAnimationFrame(resizeMasonryItems);
  setTimeout(resizeMasonryItems, 50);
  setTimeout(resizeMasonryItems, 200);

  if (document.fonts) {
    document.fonts.ready.then(resizeMasonryItems);
  }

  window.addEventListener('load', resizeMasonryItems);
  window.addEventListener('resize', resizeMasonryItems);

  // Re-run if avatar images load asynchronously
  document.querySelectorAll('.tributes-wall img').forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', resizeMasonryItems);
    }
  });

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      if (tab === 'family') {
        if (famWrap) famWrap.style.display = 'block';
        if (genWrap) genWrap.style.display = 'none';
      } else {
        if (famWrap) famWrap.style.display = 'none';
        if (genWrap) genWrap.style.display = 'block';
      }
      resizeMasonryItems();
      requestAnimationFrame(resizeMasonryItems);
      setTimeout(resizeMasonryItems, 50);
      setTimeout(resizeMasonryItems, 200);
    });
  });
}

function esc(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, t => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[t] || t));
}

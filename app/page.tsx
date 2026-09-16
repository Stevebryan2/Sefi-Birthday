"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, X, Heart, Sparkles, Quote, Lock, ArrowRight, Mail, MailOpen, Camera, ArrowLeft, BookOpen, ChevronRight, ChevronLeft, Film, PenTool, Send } from "lucide-react";

// ==========================================
// 1. DATA TEMEN-TEMEN & UCAPAN
// ==========================================
type WishItem = {
  id: number;
  name: string;
  category: string;
  message: string;
  videoUrl?: string; 
  isWide?: boolean; 
};

const WISHES_DATA: WishItem[] = [
  // --- INFINITE ---
  { id: 1, name: "Iwu", category: "infinite", message: "Happy birthdaay cepiii, enggak kerasa udah 22 tahunn yah sobat anime sd ku🫶 🥰 😘 iloveu kayak ilovepdf bebiih 😘 muaaaachhhhh", videoUrl: "assets/iwu.mp4" },
  { id: 2, name: "Elisa", category: "infinite", message: "happy birthdayyy ceppp 🎂, anjay dah 22 🌹, dah tuek slebewww ✌🏼. Semoga makin lancar dalam segala hal (pekerjaan, percintaan, masalah hidup WKWKWK), semoga makin semoq, semakin tidak nggosu, tidak mesum dan makin banyak bertobat. Tambah sayang keluarga, temen (terkhususnya infi), bryan (boleh laa), dll mwah 💋. Ga nyangka banget pertemanan kita langgeng sampe sekarang?!?! kayak cepet banget, padahal kayak baru kemarin kita main ke G36 trs foto\" di dpn rmh wu trs koe foto freak bgtt, tp trnyt itu dah lama banget !!!, happy bgt bisa temenan sama koe!!! 🤍 semoga kita bisa gini terus sampe tua dan terus main\" barenggg ✨ 💗. lovee youu ceppp 🥺 💗 (tapi boonk eaaaa)", videoUrl: "assets/elisa.mp4" },
  { id: 3, name: "Iput", category: "infinite", message: "Happy birthday cep! Semoga diumur yang baru ini selalu diberi kesehatan, kebahagiann dan dipermudahkan dalam segala hal. Semoga doa, harapan, keinginan mu bisa segara terwujud. love youuu sekebon sawit.", videoUrl: "assets/iput.mp4" },
  { id: 4, name: "Jen", category: "infinite", message: 'Happy birthday, NCEP! 🥳 semoga makin waras, panjang umur, lancar rejeki, langgeng juga! ojo bipolar, pokoe lancar" God bless brok!🫶🏻', videoUrl: "assets/jen.mp4" },
  { id: 5, name: "Josevine", category: "infinite", message: "Happy bday ncep mi bestie smoga koe makin berlimpah rejekinyaa, makin cantik, makin freakk, makin makin dahhh pokoke jossss jangan lupain aku yaaa ayukk kita mainn aku kangen ktawamu yang banter ituuu 🧚‍♂️🤩🫶🏻😘", videoUrl: "assets/jos.mp4" },
  { id: 6, name: "Veve", category: "infinite", message: `Happy birthday ceppp!!\n\nMay your life always be filled with love, joy, happiness, and of course moneeyyyy 💸\n\nSemoga semua impian dan wishes satu-satu bisa tercapai ya cepirit, yang lagi dikerjain dan perjuangin sekarang bisa terbayarkan dan eventually, all your hard work will pay off! ea\n\nGa berasa kita udah kenal since kelas 8?!?!yang dulunya kocak geming bareng, sleepova bareng di rumahmu, nangis bareng, dan literally doing everything together… sekarang udah 22 TAHUN AJA?!?\n\nSemoga nanti kita bisa terus make more memories together yang ga kalah memorable dari zaman bahulaaa owkaii!\n\nOnce again, happy birthday CEPIRITT!Happy terus yaaa, semoga selalu dikelilingi orang orang baik dan makin deket sama Tuhan. May this year be kinder, happier, and full of good things for you 🫶🏻\n\n-veve`, videoUrl: "assets/veve.mp4" },
  
  // --- OTHERS ---
  { id: 7, name: "Tasia", category: "Others", message: "Happy Birthday! Kiranya damai sejahtera dan berkat Tuhan melimpah selalu dalam hidupmu. Keep shining and growing!", videoUrl: "assets/tasia.mp4" },
  { id: 8, name: "Yenny", category: "Others", isWide: true, message: `Happy Birthday Eunike Sefiani Irawan ❤️❤️❤️\n\nI love you so much Sefi muachhh. Semoga lu selalu bahagia, sehat dan sukses, dilancarkan segala-galanya. Di umur yg ke-22 ini, semoga lu juga bisa jadi pribadi yang lebih baik lagi dan menjadi berkat bagi banyak orang.\n\nTerima kasih sudah menjadi sahabat gw 4 tahun ini. It’s nice to have you as my best friend. Semoga kita bisa terus berbagi canda dan tawa sampai tua nanti *azekkkkk\n\nAbis lulus jangan jadi asing yeeee. Ayo kita main lagi`, videoUrl: "assets/yenny.mp4" },
  { id: 9, name: "Nonne", category: "Others", isWide: true, message: `selamat dirgahayu sut happy birthday yh sefi?\n\ni do really wish u all the bestest things in life for u, semoga sehat selalu, panjang umur, selalu happy, semakin dikelilingi orang” baik, semoga makin suksess, makin banyak berkat mengalir di hidup kamyu, makin berbakti ke orang tua dan makin deket sm Tuhan, dannn bisa terus berkembang di kehidupan yg gonjang ganjing inii, GOD BLESS ‼️💕💓🎉`, videoUrl: "assets/nonne.mp4" },
  { id: 10, name: "Shelma", category: "Others", message: "Happy birthday, Sefi. Semoga panjang umur, sehat selalu, lancar rezekinya, semakin gacor,   dapat pekerjaan yg diinginkan, makin kaya dan sukses selaluu", videoUrl: "assets/shelma.mp4" },
  { id: 11, name: "Diyan", category: "Others", isWide: true, message: `dd`, videoUrl: "assets/diyan.mp4" },
  
  // --- CG 73 (1 KOMPILASI TANPA TEKS) ---
  { id: 12, name: "CG 73 Family", category: "CG", message: "", videoUrl: "assets/cg73.mp4" },
  
  // --- KOKO (TAB BARU KHUSUS KAKAK LAKI-LAKI) ---
  { id: 25, name: "Koko Kevin", category: "koko", message: "Happy 22nd Birthday, Sef! 🎂🤍 May God bless you always, guide you in every step, and fill your 22nd year with lots of joy, love, and beautiful memories. Stay happy and keep shining!" },

  // --- WISHES ---
  { id: 13, name: "Justin", category: "Wish", message: "hepi bretdayy ci sefii smoga panjang umur sehat selalu Tuhan Yesus memberkatii muehehe" },
  { id: 14, name: "Michelle", category: "Wish", message: "happiest bday cii sefi! hopee ur bday is as special as u areee. may God bless u💗" },
  { id: 15, name: "Nuel", category: "Wish", message: "HABEDE CE SEFIIII 🥳🥳🥳" },
  { id: 16, name: "Nelson", category: "Wish", message: "habedee ce sepp, kalo berantem tolong lebih galak lgi😋🙌🏻" },
  { id: 17, name: "Benaya", category: "Wish", message: "selamat ulang tahun sef, semoga diusia tahun ini bisa bertumbuh terus" },
  { id: 18, name: "Jovan", category: "Wish", message: "Happy Birthday ci sef, semoga langgeng terus sama ko bry sampe pelaminan" },
  { id: 19, name: "Calista", category: "Wish", message: `happy birthday cee sefiii, a.k.a. cee apipinyaa ko bryy, uwiii suda bertambah usia,semoga panjang umur sehat selalu buat cce n fam, semogaa apa yang cece kejar ditahun ini dapat dicapai, makinnn cantikkk ceee, sukses jugaa dalam kerjanyaa nanti, hooo dan langgeng sama ko bryy, kalo ko bry macem² sikatt ajaa ceee , God bless u, wish u all the best 𐔌՞ ܸ.ˬ.ܸ՞𐦯❤️✨` },
  { id: 20, name: "Kiev", category: "Wish", message: `Selamat habede sef, smoga makin sukses selaluu !!!` },
  { id: 21, name: "Feli", category: "Wish", message: "HAPPY BIRTHDAYYYY CE SEFIIIIIII 🥳🤩 selamat selimit sudah bertambah satu tahunnn, panjang umur ya ceee sehat selaluuuu, stay pretty alwayssss, semoga semua karirnya di sukseskann di lancarkann, langgeng langgeng sama ko bryyy, ketik 1 klo butuh bantuan 😌 WKWKWK, semogaa kita bisa hangout lagii lebih seringg semakin kenall God Bless U always ceeee, All the best for uuuu 💗" },
  { id: 22, name: "Ko Jo", category: "Wish", message: "hipibedayy sepii🥳🥳 God bless 😇" },
  { id: 23, name: "Catherine", category: "Wish", message: "CII SEFII happy birthdayy moodbooster kitaa kamu seru poll!! WUATB yaa GBU ALWAYSS🤓😻❤️‍🔥♥️♥️♥️" },
  { id: 24, name: "Moses", category: "Wish", message: "happy birthdayyy ci sefiiii semangat terus kerjanya jangan lupa buat berenti ketawa WUATB  GBU" },
  { id: 26, name: "Audrey", category: "Wish", message: "habede sefi semoga yang dicita citakan tersemogakan, plis tetep jadi orang yang suka kepencet emot yak wkwkwk God Bless" },
  { id: 27, name: "Vio", category: "Wish", message: `happy birthdayy ce seffii, panjang umurr may wish u all the besttt, sehat slaluuuu, slalu dipakai tuhan stiap langkah cc, makin diberkati banyak orangg, smoga apa yg cc wujudkan/cita"kan tercapai yaaa, god bless youu alwayss ce`},
  { id: 28, name: "Ci Eirene", category: "Wish", message: "Hai Sefi!! Have a blessed birthday yaa, cici berdoa di ulang tahunmu inii kamu terus jadi sefi yang ceria, menjadi berkat buat temen temen dan keluargamu. Let God’s love fulfills your life always yaa🤗."},
  { id: 29, name: "Anas", category: "Wish", message: "happyy birthdayy sefii semogaa selalu diberi kesehatan, dilancarkan rezeki & kerjaannya, and may God bless you in every step of the wayy!!" },
  { id: 30, name: "Nadya", category: "Wish", message: "happy birthdayyyy ci sefiiiii 🤩🤩🥳🥳🥳, wish u all the best, sukses selalu, semoga di umur ini cici selalu happy 🥰 langgeng terus 🤭 God Bless u cii 🫶🏻🫶🏻😘🥳" },
  { id: 31, name: "Marcel", category: "Wish", message: "Happy birthday Sefii... Long long umurnyaa, healthy always dan Jesus bless youuu.... 🥳🥳🙌🏻"},
  { id: 32, name: "Ko Vilu", category: "Wish", message: "HBD seff, WUATB GBU 🥳🎉, semoga di umur yang baru makin sukses, makin bertumbuh & makin banyak hal baik yang datang yaa" },
  { id: 33, name: "Sera", category: "Wish", message: "happy birthday cecee!! 🥳"},
  { id: 34, name: "David", category: "Wish", message: "Happy birthday Sefii... Long long umurnyaa, healthy always dan Jesus bless youuu.... 🥳🥳🙌🏻"},
  { id: 35, name: "Oskar", category: "Wish", message: "HBD seff, WUATB GBU 🥳🎉, semoga di umur yang baru makin sukses, makin bertumbuh & makin banyak hal baik yang datang yaa" },
  { id: 36, name: "Sera", category: "Wish", message: "happy birthday cecee!! 🥳"},
];

const BACKGROUND_PHOTOS = [
  "assets/sefi1.jpeg",
  "assets/sefi2.jpeg",
  "assets/sefi3.jpeg",
  "assets/sefi4.jpeg",
  "assets/sefi5.jpeg",
  "assets/sefi6.jpeg",
];

// ==========================================
// 2. KOMPONEN KUIS (GATEKEEPER)
// ==========================================
function QuizGatekeeper({ onUnlock }: { onUnlock: () => void }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const questions = [
    { question: "Sebelum masuk, jawab dulu ya. Siapa cowok paling ganteng sedunia?", correctAnswers: ["kamu", "pacarku", "sayang", "steve", "bryan", "sayangku", "stevebryan", "stevebryan jonathan imanuel"] },
    { question: `kapan tanggal ulang tahun aku? hehehe (Format: DD-MM-YYYY)`, correctAnswers: ["02-02-2004"] },
    { question: "kapan tanggal jadian kita hayooo? wkwkwkwk (Format: DD-MM-YYYY)", correctAnswers: ["09-09-2026"] }
  ];

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = questions[step].correctAnswers.some(ans => answer.toLowerCase().trim().includes(ans));
    if (isCorrect) {
      setError(false);
      setAnswer("");
      if (step < questions.length - 1) setStep(step + 1);
      else onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center p-6 selection:bg-[#FBEF7A] selection:text-neutral-900 relative z-10">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/50 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FEF9E1] to-[#FBEF7A] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#D4A017] shadow-inner rotate-3 hover:rotate-0 transition-all">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2">Access Restricted!</h2>
        <p className="text-sm text-neutral-500 mb-8 font-medium">Pertanyaan {step + 1} dari {questions.length}</p>

        <form onSubmit={handleSumbit}>
          <label className="block text-neutral-700 font-medium text-lg mb-6 leading-relaxed">{questions[step].question}</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setError(false); }}
            placeholder="Ketik jawaban kamu di sini..."
            className={`w-full px-5 py-4 rounded-2xl border bg-white/50 text-neutral-900 focus:outline-none focus:ring-4 transition-all ${error ? "border-red-300 focus:ring-red-100 bg-red-50/50" : "border-neutral-200 focus:border-[#FBEF7A] focus:ring-[#FEF9E1]"}`}
          />
          {error && <p className="text-red-500 text-sm mt-3 animate-pulse font-medium">Tetoooot! Salah sayang, coba lagi wkwk 😝</p>}
          <button type="submit" className="mt-8 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
            {step === questions.length - 1 ? "Buka Kado 🎁" : "Lanjut"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 3. KOMPONEN BACKGROUND BERGERAK
// ==========================================
function MovingBackground({ isBlurred, isCinema, isYours, isVhs }: { isBlurred: boolean; isCinema: boolean; isYours: boolean; isVhs: boolean }) {
  const column1 = [...BACKGROUND_PHOTOS, ...BACKGROUND_PHOTOS];
  const column2 = [...BACKGROUND_PHOTOS.slice().reverse(), ...BACKGROUND_PHOTOS.slice().reverse()];
  const column3 = [...BACKGROUND_PHOTOS, ...BACKGROUND_PHOTOS];

  const overlayClass = isYours 
    ? 'bg-[#050505]/95 backdrop-blur-3xl' 
    : isBlurred 
      ? ((isCinema || isVhs) ? 'bg-black/85 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm') 
      : 'bg-gradient-to-b from-black/40 via-[#212529]/20 to-black/40';

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#212529] pointer-events-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        @keyframes scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }
        .animate-scroll-up { animation: scrollUp 40s linear infinite; }
        .animate-scroll-down { animation: scrollDown 40s linear infinite; }
        .cinema-scroll::-webkit-scrollbar { width: 6px; }
        .cinema-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .cinema-scroll::-webkit-scrollbar-thumb { background: rgba(212, 160, 23, 0.5); border-radius: 10px; }
        
        /* Animasi Pulpen Latin */
        @keyframes revealText { 0% { clip-path: inset(0 100% 0 0); } 100% { clip-path: inset(0 -10% 0 0); } }
        @keyframes movePenX {
          0% { left: 0%; transform: translateY(0) rotate(220deg); opacity: 0; }
          5% { opacity: 1; }
          15% { transform: translateY(-10px) rotate(235deg); }
          30% { transform: translateY(10px) rotate(210deg); }
          45% { transform: translateY(-15px) rotate(225deg); }
          60% { transform: translateY(5px) rotate(215deg); }
          75% { transform: translateY(-10px) rotate(230deg); }
          90% { transform: translateY(5px) rotate(210deg); }
          95% { opacity: 1; }
          100% { left: 100%; transform: translateY(0) rotate(220deg); opacity: 0; }
        }
        .animate-reveal { animation: revealText 3s ease-in-out forwards; }
        .animate-pen { animation: movePenX 3s ease-in-out forwards; }

        /* Animasi TV Tabung & Glitch untuk VHS */
        @keyframes tvFlicker {
          0% { opacity: 0.1; } 5% { opacity: 0.5; } 10% { opacity: 0.1; } 15% { opacity: 0.8; }
          20% { opacity: 0.2; } 50% { opacity: 0.1; } 80% { opacity: 0.4; } 100% { opacity: 0.1; }
        }
        @keyframes trackingLine { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes vhsInsert { 0% { transform: scale(1) translateY(0); opacity: 1; } 100% { transform: scale(0.9) translateY(100px); opacity: 0; } }
        
        .tv-noise { animation: tvFlicker 0.15s infinite; background: repeating-radial-gradient(#000 0.0001%, #ffffff 0.0002%); background-size: 100% 100%; }
        .tv-tracking { animation: trackingLine 2s linear infinite; }
        .animate-vhs-insert { animation: vhsInsert 0.6s ease-in forwards; }
        
        /* Utility 3D Umum */
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
      <div className={`flex w-full h-full gap-4 md:gap-8 p-4 md:p-8 -rotate-6 scale-125 transition-all duration-1000 ${isBlurred ? 'blur-md scale-110 opacity-30' : 'opacity-50'}`}>
        <div className={`w-1/3 flex flex-col gap-4 md:gap-8 animate-scroll-up ${isBlurred ? '[animation-play-state:paused]' : ''}`}>
          {column1.map((src, i) => <img key={`col1-${i}`} src={src} className="w-full object-cover rounded-3xl aspect-[3/4]" alt="" />)}
        </div>
        <div className={`w-1/3 flex flex-col gap-4 md:gap-8 animate-scroll-down ${isBlurred ? '[animation-play-state:paused]' : ''}`}>
          {column2.map((src, i) => <img key={`col2-${i}`} src={src} className="w-full object-cover rounded-3xl aspect-square" alt="" />)}
        </div>
        <div className={`w-1/3 flex flex-col gap-4 md:gap-8 animate-scroll-up ${isBlurred ? '[animation-play-state:paused]' : ''}`}>
          {column3.map((src, i) => <img key={`col3-${i}`} src={src} className="w-full object-cover rounded-3xl aspect-[3/4]" alt="" />)}
        </div>
      </div>
      <div className={`absolute inset-0 transition-all duration-1000 ${overlayClass}`}></div>
    </div>
  );
}

// ==========================================
// 4a. THE RETRO VHS TAPE (KHUSUS CG 73)
// ==========================================
function VhsPlayerComponent({ videoUrl, onPhaseChange }: { videoUrl: string, onPhaseChange: (phase: string) => void }) {
  const [phase, setPhase] = useState<"idle" | "inserting" | "glitch" | "playing">("idle");

  const handlePlay = () => {
    setPhase("inserting");
    onPhaseChange("inserting");
    setTimeout(() => { setPhase("glitch"); onPhaseChange("glitch"); }, 600);
    setTimeout(() => { setPhase("playing"); onPhaseChange("playing"); }, 1500);
  };

  const handleClose = () => {
    setPhase("idle");
    onPhaseChange("idle");
  };

  return (
    <div className="w-full flex justify-center items-center py-10 md:py-20 z-20 relative">
      {phase === "idle" && (
        <div className="flex flex-col items-center animate-fadeIn">
          <button onClick={handlePlay} className="relative w-[320px] md:w-[400px] h-[200px] md:h-[240px] bg-[#1a1a1a] rounded-xl border-2 border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between p-3 md:p-4 group hover:scale-[1.03] hover:-translate-y-4 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="w-full h-2 flex justify-center gap-3 opacity-20">{Array.from({length: 8}).map((_, i) => <div key={i} className="w-6 h-full bg-neutral-500 rounded-sm"></div>)}</div>
            <div className="w-[90%] h-20 md:h-24 bg-[#e0d8c3] rounded-sm absolute top-6 md:top-8 flex flex-col items-center justify-center border-t-8 border-b-8 border-rose-900 shadow-inner z-10 px-4 group-hover:border-rose-800 transition-colors">
               <div className="w-full border-b-2 border-neutral-400/30 mb-1 md:mb-2"></div>
               <p className="font-mono text-neutral-800 font-bold text-sm md:text-base text-center uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-90">CG 73 Memories</p>
               <p className="font-serif italic text-rose-900 font-bold text-xs md:text-sm mt-1" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>Sefi's 22nd 🤍</p>
               <div className="w-full border-b-2 border-neutral-400/30 mt-1 md:mt-2"></div>
            </div>
            <div className="w-[75%] h-16 md:h-20 bg-black rounded-full mt-16 md:mt-20 border-[3px] border-[#2a2a2a] shadow-[inset_0_5px_15px_rgba(0,0,0,1)] flex justify-between items-center px-4 md:px-6 relative z-0">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ddd] rounded-full border-[3px] border-neutral-800 flex items-center justify-center relative overflow-hidden group-hover:rotate-[360deg] transition-transform duration-[3000ms]"><div className="w-full h-1 bg-neutral-800 absolute"></div><div className="w-1 h-full bg-neutral-800 absolute"></div><div className="w-3 h-3 bg-[#111] rounded-full z-10"></div></div>
               <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ddd] rounded-full border-[3px] border-neutral-800 flex items-center justify-center relative overflow-hidden group-hover:rotate-[360deg] transition-transform duration-[3000ms]"><div className="w-full h-1 bg-neutral-800 absolute"></div><div className="w-1 h-full bg-neutral-800 absolute"></div><div className="w-3 h-3 bg-[#111] rounded-full z-10"></div></div>
               <div className="absolute top-1/2 left-10 right-10 h-1 bg-[#111] -translate-y-1/2"></div>
            </div>
            <div className="w-[60%] h-5 md:h-6 bg-[#222] border-t border-x border-[#333] mt-2 md:mt-3 rounded-t-sm flex justify-around px-2 pt-1.5 shadow-inner">
               {Array.from({length: 6}).map((_, i) => <div key={i} className="w-1.5 h-full bg-[#111] rounded-t-sm opacity-50"></div>)}
            </div>
          </button>
          <div className="mt-8 flex items-center gap-2 text-neutral-400 font-mono text-xs tracking-widest uppercase animate-pulse"><ChevronRight className="w-4 h-4" /> Click to Insert Tape <ChevronLeft className="w-4 h-4" /></div>
        </div>
      )}
      {phase === "inserting" && (
        <div className="relative w-[320px] md:w-[400px] h-[200px] md:h-[240px] bg-[#1a1a1a] rounded-xl border-2 border-[#333] flex flex-col items-center justify-between p-3 md:p-4 animate-vhs-insert pointer-events-none">
            <div className="w-[90%] h-20 md:h-24 bg-[#e0d8c3] rounded-sm absolute top-6 md:top-8 flex flex-col items-center justify-center border-t-8 border-b-8 border-rose-900 px-4"><p className="font-mono text-neutral-800 font-bold text-sm md:text-base text-center uppercase tracking-[0.2em] md:tracking-[0.3em]">CG 73 Memories</p></div>
            <div className="w-[75%] h-16 md:h-20 bg-black rounded-full mt-16 md:mt-20 border-[3px] border-[#2a2a2a] relative z-0"></div>
        </div>
      )}
      {phase === "glitch" && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col justify-between overflow-hidden">
           <div className="absolute inset-0 tv-noise mix-blend-screen opacity-30"></div>
           <div className="absolute w-full h-12 bg-white/20 tv-tracking blur-sm"></div>
           <div className="absolute font-mono text-[#0f0] bottom-12 left-12 text-3xl animate-[pulse_0.1s_infinite] tracking-widest" style={{ textShadow: "2px 2px 0px #000" }}>PLAY ►</div>
           <div className="absolute top-12 right-12 text-white/80 font-mono text-lg tracking-widest">SP</div>
        </div>
      )}
      {phase === "playing" && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center animate-fadeIn">
           <div className="absolute inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
           <div className="absolute top-8 left-8 text-[#0f0] font-mono text-2xl md:text-3xl tracking-widest opacity-80 drop-shadow-md z-50 pointer-events-none">PLAY ►</div>
           <div className="absolute bottom-8 right-8 text-white font-mono text-lg md:text-xl tracking-widest opacity-60 drop-shadow-md z-50 pointer-events-none">00:00:00</div>
           <button onClick={handleClose} className="absolute top-8 right-8 z-50 text-white/50 hover:text-white font-mono tracking-widest uppercase flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/20 transition-all hover:bg-black/80"><X className="w-5 h-5"/> Eject Tape</button>
           <video src={videoUrl} controls autoPlay playsInline className="w-full h-full object-contain relative z-40"></video>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4b. THE VINTAGE POSTCARD (KHUSUS TAB KOKO)
// ==========================================
function VintagePostcard({ item }: { item: WishItem }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full flex justify-center py-10 md:py-20 z-20 relative animate-fadeIn" style={{ perspective: '2500px' }}>
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative w-[340px] md:w-[600px] lg:w-[700px] h-[480px] md:h-[400px] cursor-pointer transition-all duration-700 ease-in-out preserve-3d shadow-2xl hover:scale-105 ${isFlipped ? 'rotate-y-180' : 'hover:-rotate-2 rotate-1'}`}
      >
        {/* === FRONT SIDE (COVER POSTCARD) === */}
        <div className="absolute inset-0 backface-hidden bg-[#F4ECD8] rounded-md border-[10px] md:border-[12px] border-white flex flex-col items-center justify-center p-6 overflow-hidden">
           {/* Texture/Pattern (Border putus-putus ala kertas pos) */}
           <div className="absolute inset-2 border-2 border-dashed border-[#8C6D46]/30 rounded-sm pointer-events-none"></div>
           
           <Send className="w-10 h-10 md:w-14 md:h-14 text-[#8C6D46] mb-6 opacity-40 -rotate-12" />
           <h3 className="text-4xl md:text-5xl text-[#3E2723] text-center mb-4 leading-tight drop-shadow-sm" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>
             To my annoying <br/> but lovely sister...
           </h3>
           
           {/* Hiasan garis */}
           <div className="w-24 h-px bg-[#8C6D46]/40 mt-4 mb-8"></div>
           
           <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#8C6D46] bg-white/50 px-4 py-2 rounded-full font-bold shadow-sm">
             Tap to flip
           </p>
        </div>

        {/* === BACK SIDE (ISI PESAN POSTCARD) === */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#F4ECD8] rounded-md border-[10px] md:border-[12px] border-white p-6 md:p-8 flex flex-col relative overflow-hidden">
           
           {/* Garis tengah pemisah alamat & pesan (Khusus di layar besar) */}
           <div className="absolute left-1/2 top-10 bottom-10 w-px bg-[#8C6D46]/30 hidden md:block border-r border-dashed border-white"></div>
           
           {/* Stempel & Perangko Pojok Kanan Atas */}
           <div className="absolute top-4 right-4 md:top-6 md:right-6 w-14 h-16 md:w-16 md:h-20 bg-[#e0d8c3] border-2 border-white shadow-sm p-1 flex items-center justify-center rotate-3 z-10">
             <div className="w-full h-full border border-dashed border-[#8C6D46]/60 flex flex-col items-center justify-center">
                <span className="font-serif text-[10px] md:text-xs text-[#8C6D46] font-bold">22</span>
                <span className="font-mono text-[6px] md:text-[8px] text-[#8C6D46] tracking-widest">CENTS</span>
             </div>
             {/* Cap pos (Postmark) bulat nimpa perangko */}
             <div className="absolute w-20 h-20 md:w-24 md:h-24 border-2 border-[#8C6D46]/40 rounded-full flex items-center justify-center -rotate-12 opacity-70 pointer-events-none" style={{ left: '-20px', top: '-10px' }}>
                <span className="font-mono text-[6px] md:text-[8px] tracking-[0.2em] text-[#8C6D46] mb-12 md:mb-14">SEP 2026</span>
             </div>
           </div>

           {/* Area Pesan Tulisan Tangan (Kiri di Desktop, Full di HP) */}
           <div className="w-full md:w-[45%] h-full flex flex-col justify-center relative z-20">
             <Quote className="w-6 h-6 text-[#8C6D46] opacity-20 absolute -top-4 -left-2" />
             <p className="text-[#4A3B2C] text-lg md:text-xl leading-relaxed whitespace-pre-wrap pl-2" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>
               "{item.message}"
             </p>
             <p className="mt-8 text-[#8C6D46] font-bold font-serif text-lg text-right md:text-left pr-4 md:pr-0">
               - {item.name}
             </p>
           </div>
           
           {/* FIX: Alamat di-split 2 baris biar nggak nabrak stempel */}
           <div className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-[40%] w-[42%] flex-col gap-9 z-0">
             <div className="w-full h-px bg-[#8C6D46]/40 relative">
               <span className="absolute bottom-1 left-2 font-serif text-2xl lg:text-3xl text-[#3E2723] whitespace-nowrap" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>
                 Eunike Sefiani
               </span>
             </div>
             <div className="w-full h-px bg-[#8C6D46]/40 relative">
               <span className="absolute bottom-1 left-2 font-serif text-2xl lg:text-3xl text-[#3E2723] whitespace-nowrap" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>
                 Irawan
               </span>
             </div>
             <div className="w-full h-px bg-[#8C6D46]/40 relative">
               <span className="absolute bottom-1 left-2 font-serif text-lg lg:text-xl text-[#3E2723] opacity-80 whitespace-nowrap" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>
                 South Tangerang, ID
               </span>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4c. TEMPLATE KERTAS BUKU SCRAPBOOK
// ==========================================
const ScrapbookLeftPage = ({ data }: any) => {
  if (data.isFinale) {
    return (
      <div className="w-full h-full bg-[#F4ECD8] flex flex-col items-center justify-center px-4 md:px-12 relative overflow-hidden">
        <Sparkles className="w-8 h-8 text-[#8C6D46] mb-4 opacity-50" />
        <h2 className="text-3xl md:text-5xl font-serif text-[#3E2723] font-bold mb-6 text-center leading-tight">
          Sefi di Mata <br/><span className="text-[#8C6D46] italic">Infinite</span> ✨
        </h2>
      </div>
    );
  }

  const wish = data.wish;
  if (!wish) return <div className="w-full h-full bg-[#F4ECD8]"></div>;

  return (
    <div className="w-full h-full bg-[#F4ECD8] flex flex-col pt-16 pb-6 px-6 md:px-12 overflow-hidden">
      <div className="mb-4 shrink-0">
        <p className="text-[10px] md:text-xs text-[#8C6D46] uppercase tracking-widest font-bold mb-1">Pesan dari</p>
        <h3 className="text-3xl md:text-4xl font-serif text-[#3E2723] font-bold">{wish.name}</h3>
      </div>
      <div className="relative flex-grow overflow-y-auto custom-scrollbar pr-2 pb-4">
        <Quote className="w-10 h-10 text-[#D4C4A8] absolute -top-1 -left-2 opacity-50 -z-10" />
        <p className="text-[#4A3B2C] leading-loose text-sm md:text-lg font-medium italic whitespace-pre-wrap relative z-10 pl-2">
          {wish.message}
        </p>
      </div>
    </div>
  );
};

const ScrapbookRightPage = ({ data }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => { setIsPlaying(false); }, [data]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true); } 
      else { videoRef.current.pause(); setIsPlaying(false); }
    }
  };

  if (data.isFinale) {
    return (
      <div className="w-full h-full bg-[#EADDCA] pt-16 pb-6 px-4 md:px-6 relative overflow-hidden flex flex-col justify-center gap-3 z-0">
        <Heart className="absolute top-24 left-6 w-20 h-20 text-[#D4C4A8] opacity-30 -rotate-12 -z-10" />
        <Sparkles className="absolute bottom-16 right-8 w-16 h-16 text-[#D4C4A8] opacity-40 z-0" />
        <div className="flex justify-between items-start w-full relative z-10">
          <div className="bg-[#F9F7F1] p-3 rounded-xl shadow-md border border-[#D4C4A8] relative w-[48%] -rotate-3 hover:rotate-0 transition-transform origin-bottom-left group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-white/60 shadow-sm rotate-2"></div>
            <p className="text-[#4A3B2C] italic font-medium text-[9px] md:text-[11px] leading-relaxed">"Temen receh ga jelas -Josevine"</p>
          </div>
          <div className="bg-[#F9F7F1] p-3 rounded-xl shadow-md border border-[#D4C4A8] relative w-[46%] rotate-3 hover:rotate-0 transition-transform origin-bottom-right mt-3 group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-white/60 shadow-sm -rotate-2"></div>
            <p className="text-[#4A3B2C] italic font-medium text-[9px] md:text-[11px] leading-relaxed">"temen edan -veve"</p>
          </div>
        </div>
        <div className="flex justify-center w-full relative z-10 -mt-1">
          <div className="bg-[#F9F7F1] p-3 rounded-xl shadow-md border border-[#D4C4A8] relative w-[85%] -rotate-1 hover:rotate-0 transition-transform -translate-x-2 group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-white/60 shadow-sm -rotate-1"></div>
            <p className="text-[#4A3B2C] italic font-medium text-[9px] md:text-[11px] leading-relaxed text-center">"si soft spoken + receh ngguyu teros -jeni"</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full relative z-10 -mt-1">
          <div className="bg-[#F9F7F1] p-3 rounded-xl shadow-md border border-[#D4C4A8] relative w-[45%] rotate-2 hover:rotate-0 transition-transform translate-x-2 group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-2.5 bg-white/60 shadow-sm rotate-3"></div>
            <p className="text-[#4A3B2C] italic font-medium text-[9px] md:text-[11px] leading-relaxed">"temen receh suka ketawa -iput"</p>
          </div>
          <div className="bg-[#F9F7F1] p-3 rounded-xl shadow-md border border-[#D4C4A8] relative w-[49%] -rotate-2 hover:rotate-0 transition-transform translate-y-2 group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-white/60 shadow-sm -rotate-1"></div>
            <p className="text-[#4A3B2C] italic font-medium text-[9px] md:text-[11px] leading-relaxed">"temenn freak bangettt + minus bgt kelakuannya -elisa"</p>
          </div>
        </div>
        <div className="flex justify-center w-full relative z-10 mt-1">
          <div className="bg-[#F9F7F1] p-3 md:p-4 rounded-xl shadow-md border border-[#D4C4A8] relative w-[95%] rotate-1 hover:rotate-0 transition-transform group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-white/60 shadow-sm rotate-2"></div>
            <p className="text-[#4A3B2C] italic font-medium text-[9px] md:text-[11px] leading-relaxed">"temen makan jam 6 sore di kosmu o cepp☺️ + temen 'makasih yah bisa nginep'🙆🏻‍♀️😙 upsie + TEMEN TABRAKAN 2x WKAKKKAKKAW -iwu"</p>
          </div>
        </div>
      </div>
    );
  }

  const wish = data.wish;
  if (!wish) return <div className="w-full h-full bg-[#EADDCA]"></div>;

  return (
    <div className="w-full h-full bg-[#EADDCA] flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <div className="relative bg-[#F9F7F1] p-3 md:p-4 pb-14 md:pb-16 shadow-xl border border-[#D4C4A8] rotate-2 w-full max-w-[420px]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-md shadow-sm -rotate-2 z-20 border border-white/50"></div>
        {wish.videoUrl ? (
          <div className="flex flex-col items-center w-full">
            <video ref={videoRef} src={wish.videoUrl} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} className="w-full aspect-video object-cover bg-black border border-[#D4C4A8] rounded-sm shadow-inner"></video>
            <button onClick={togglePlay} className="mt-4 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8C6D46] to-[#6A5135] hover:from-[#6A5135] hover:to-[#4A3B2C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 border border-[#4A3B2C]/20">
              {isPlaying ? <><div className="w-2.5 h-2.5 bg-white rounded-[2px]"></div> Pause Video</> : <><Play className="w-3.5 h-3.5 fill-white" /> Putar Video</>}
            </button>
          </div>
        ) : (
          <div className="w-full aspect-video bg-[#EADDCA] flex items-center justify-center text-[#8C6D46] text-sm font-medium border border-dashed border-[#8C6D46] mb-8">No Video Available</div>
        )}
        <div className="absolute bottom-3 left-0 w-full text-center"><p className="font-serif text-[#5A3D22] text-sm md:text-lg font-bold">{wish.name}'s Video</p></div>
      </div>
    </div>
  );
};

function InfiniteScrapbook({ wishes }: { wishes: WishItem[] }) {
  const [bookState, setBookState] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [coverZ, setCoverZ] = useState(40); 
  const [pageIndex, setPageIndex] = useState(0);
  const [animatingFrom, setAnimatingFrom] = useState(0);
  const [pageAnim, setPageAnim] = useState<"idle" | "next" | "prev">("idle");

  const handleOpen = () => { if (bookState !== "closed") return; setBookState("opening"); setTimeout(() => setCoverZ(5), 750); setTimeout(() => setBookState("open"), 1500); };
  const handleClose = () => { if (bookState !== "open") return; setBookState("closing"); setTimeout(() => setCoverZ(40), 300); setTimeout(() => { setBookState("closed"); setPageIndex(0); }, 1500); };
  const handleNext = () => { if (pageAnim !== "idle") return; setAnimatingFrom(pageIndex); setPageIndex(pageIndex + 1); setPageAnim("next"); setTimeout(() => setPageAnim("idle"), 1200); };
  const handlePrev = () => { if (pageAnim !== "idle") return; setAnimatingFrom(pageIndex); setPageIndex(pageIndex - 1); setPageAnim("prev"); setTimeout(() => setPageAnim("idle"), 1200); };

  const getWishData = (idx: number) => ({ isFinale: idx >= wishes.length, wish: idx < wishes.length ? wishes[idx] : null });
  let leftData, rightData, flipFrontData, flipBackData;
  if (pageAnim === "idle") { leftData = getWishData(pageIndex); rightData = getWishData(pageIndex); } else if (pageAnim === "next") { leftData = getWishData(animatingFrom); rightData = getWishData(pageIndex); flipFrontData = getWishData(animatingFrom); flipBackData = getWishData(pageIndex); } else if (pageAnim === "prev") { leftData = getWishData(pageIndex); rightData = getWishData(animatingFrom); flipFrontData = getWishData(pageIndex); flipBackData = getWishData(animatingFrom); }

  const isFinale = pageIndex >= wishes.length;

  return (
    <div className="w-full flex justify-center mt-10 mb-20 overflow-visible px-2 z-20 relative">
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-book { perspective: 2500px; } .preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; } .rotate-y-0 { transform: rotateY(0deg); } .rotate-y-180 { transform: rotateY(180deg); } .-rotate-y-180 { transform: rotateY(-180deg); } .origin-left-center { transform-origin: left center; }
        @keyframes pageTurnNextReal { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-180deg); } } @keyframes pageTurnPrevReal { 0% { transform: rotateY(-180deg); } 100% { transform: rotateY(0deg); } }
        .animate-page-next-real { animation: pageTurnNextReal 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards; } .animate-page-prev-real { animation: pageTurnPrevReal 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards; }
      `}} />

      <div className={`relative perspective-book transition-transform duration-[1500ms] ease-in-out ${bookState === 'closed' ? 'translate-x-0 md:-translate-x-1/4' : 'translate-x-0'}`} style={{ width: 'min(95vw, 1000px)', height: 'min(80vh, 600px)' }}>
        <div className={`absolute right-0 w-1/2 h-full rounded-r-xl shadow-2xl border-y border-r border-[#5A3D22]/30 flex flex-col transition-opacity duration-500 ease-in-out z-10 overflow-hidden ${bookState === 'closed' ? 'opacity-0 delay-0 pointer-events-none' : 'opacity-100 delay-[500ms] pointer-events-auto'}`}>
          <div className="absolute top-4 right-4 z-50 flex gap-4">
            <span className="hidden md:block text-xs font-bold tracking-widest text-[#8C6D46] uppercase pt-1 drop-shadow-sm">Hal {pageIndex + 1} / {wishes.length + 1}</span>
            <button onClick={() => pageIndex < wishes.length ? handleNext() : handleClose()} disabled={pageAnim !== "idle"} className="flex items-center gap-1 text-[#5A3D22] hover:text-[#3E2723] font-bold text-sm bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm active:scale-95 transition-all cursor-pointer">{isFinale ? "Tutup" : "Lanjut"} {isFinale ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</button>
          </div>
          <ScrapbookRightPage data={rightData} />
        </div>

        <div className={`absolute left-0 w-1/2 h-full rounded-l-xl shadow-inner border-y border-l border-[#5A3D22]/30 flex flex-col transition-opacity duration-500 ease-in-out z-10 overflow-hidden ${bookState === 'closed' || bookState === 'closing' ? 'opacity-0 delay-0 pointer-events-none' : 'opacity-100 delay-[750ms] pointer-events-auto'}`}>
          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <button onClick={() => pageIndex === 0 ? handleClose() : handlePrev()} disabled={pageAnim !== "idle"} className="flex items-center gap-1 text-[#5A3D22] hover:text-[#3E2723] font-bold text-sm bg-[#D4C4A8]/50 px-3 py-1 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer backdrop-blur-sm"><ChevronLeft className="w-4 h-4" /> {pageIndex === 0 ? "Tutup" : "Balik"}</button>
          </div>
          <ScrapbookLeftPage data={leftData} />
        </div>

        {pageAnim !== 'idle' && (
          <div className={`absolute right-0 w-1/2 h-full origin-left-center preserve-3d z-50 pointer-events-none ${pageAnim === 'next' ? 'animate-page-next-real' : 'animate-page-prev-real'}`}>
            <div className="absolute inset-0 backface-hidden rounded-r-xl border-y border-r border-[#5A3D22]/30 shadow-[inset_15px_0_30px_rgba(0,0,0,0.08)] overflow-hidden bg-[#EADDCA]"><ScrapbookRightPage data={flipFrontData} /></div>
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-l-xl border-y border-l border-[#5A3D22]/30 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.08)] overflow-hidden bg-[#F4ECD8]"><ScrapbookLeftPage data={flipBackData} /></div>
          </div>
        )}

        <div className={`absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none transition-opacity duration-1000 z-20 ${bookState === 'closed' ? 'opacity-0' : 'opacity-100 delay-[500ms]'}`}></div>

        <div className={`absolute right-0 w-1/2 h-full origin-left-center preserve-3d transition-transform duration-[1500ms] ease-in-out ${bookState !== 'closed' ? '-rotate-y-180 pointer-events-none' : 'rotate-y-0 cursor-pointer hover:scale-[1.02]'}`} style={{ zIndex: coverZ }}>
          <div className="absolute inset-0 backface-hidden bg-[#8C6D46] rounded-r-xl border-l-[12px] border-[#5A3D22] shadow-[15px_15px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center group" onClick={bookState === 'closed' ? handleOpen : undefined}>
            <div className="absolute inset-0 opacity-30 mix-blend-multiply rounded-r-xl pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black/40"></div>
            <div className="absolute top-12 left-10 w-28 h-32 bg-[#F4ECD8] p-2 shadow-md rotate-[-8deg] z-10 border border-black/10 group-hover:rotate-[-4deg] transition-all"><img src="assets/infi1.jpeg" className="w-full h-full object-cover grayscale opacity-90" alt="Foto 1" /><div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/50 backdrop-blur-md rotate-3 shadow-sm"></div></div>
            <div className="absolute top-24 right-10 w-32 h-36 bg-[#F4ECD8] p-2 shadow-lg rotate-[10deg] z-10 border border-black/10 group-hover:rotate-[6deg] transition-all"><img src="assets/infi2.jpeg" className="w-full h-full object-cover grayscale opacity-90" alt="Foto 2" /><div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/50 backdrop-blur-md -rotate-2 shadow-sm"></div></div>
            <div className="relative z-20 mt-32 text-center border-y border-[#5A3D22] py-4 px-4 bg-[#F4ECD8]/10 backdrop-blur-sm w-full"><h2 className="text-3xl md:text-4xl font-serif text-[#3E2723] tracking-wider mb-2 font-bold drop-shadow-[0_2px_2px_rgba(255,255,255,0.2)]">Wishes from<br/>Infinite</h2><p className="text-[#3E2723] text-xs uppercase tracking-[0.3em] font-bold">A Chapter of Us</p></div>
            {bookState === 'closed' && (
              <div className="absolute bottom-6 flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity"><BookOpen className="w-5 h-5 text-[#3E2723] mb-2 animate-bounce" /><span className="text-[#3E2723] text-xs font-bold uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">Buka Scrapbook</span></div>
            )}
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#F4ECD8] rounded-l-xl shadow-inner border-r-[12px] border-[#5A3D22]"><div className="w-full h-full opacity-30 bg-gradient-to-tr from-black/10 to-transparent rounded-l-xl pointer-events-none"></div></div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. THE MIDNIGHT TYPEWRITER (KO BRY / STEVE)
// ==========================================
function MidnightTypewriter() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showSignature, setShowSignature] = useState(false);

  const message = `Halo sayang...\n\nSelamat ulang tahun yang ke-22 ya. 🎉\n\nMungkin kado dan web ini ngga seberapa, tapi ini aku bikin dan coding khusus cuma buat kamu doang.\nSeneng banget rasanya bisa nemenin kamu sampai di titik ini. Apalagi kita baru aja ngelewatin tanggal 9 kemarin hehe.\n\nSemoga di umur yang baru ini, kamu makin dewasa, makin cantik, dilancarkan semua urusan dan kerjaannya.\nDan yang paling penting... semoga kamu selalu sehat dan bahagia sama aku.\n\nMakasih udah jadi bagian paling indah di hidup aku.`;

  useEffect(() => {
    let i = 0;
    setIsTyping(true);
    setDisplayedText("");
    setShowSignature(false);
    
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (i < message.length) {
        setDisplayedText(message.slice(0, i + 1));
        
        let delay = 60; 
        const char = message[i];
        
        if (char === '.' || char === ',' || char === '!' || char === '?') delay = 600; 
        if (char === '\n') delay = 1000; 

        i++;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
        setTimeout(() => setShowSignature(true), 1200); 
      }
    };

    timeoutId = setTimeout(typeNextChar, 60);
    return () => clearTimeout(timeoutId);
  }, [message]);

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 sm:p-10 animate-fadeIn z-20 relative">
      <div className="max-w-2xl w-full text-left relative">
        <Quote className="w-8 h-8 text-neutral-800 mb-6 opacity-60" />
        <p className="font-mono text-[#D4C4A8] text-sm md:text-lg leading-relaxed md:leading-loose whitespace-pre-wrap drop-shadow-sm">
          {displayedText}
          <span className={`inline-block w-2 h-4 md:h-5 ml-1 translate-y-1 bg-[#FBEF7A] ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
        </p>

        {showSignature && (
          <div className="mt-12 md:mt-16 ml-2 md:ml-10 relative h-32 w-fit min-w-[280px]">
            <div className="relative z-20 animate-reveal" style={{ clipPath: 'inset(0 100% 0 0)' }}>
               <p className="font-serif italic text-3xl md:text-4xl text-[#FBEF7A] drop-shadow-[0_0_10px_rgba(251,239,122,0.3)] whitespace-nowrap pr-8" style={{ fontFamily: "'Brush Script MT', cursive, serif" }}>
                 I love you so much, Sefi 🤍
               </p>
            </div>
            <p className="font-mono text-neutral-500 text-xs mt-4 tracking-widest uppercase pl-2 animate-[fadeIn_1s_ease-in_forwards] opacity-0 delay-[3000ms]">
              - Steve Bryan
            </p>
            <div className="absolute top-[-25px] md:top-[-20px] z-30 animate-pen opacity-0">
               <PenTool className="w-10 h-10 text-white fill-white/10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN MEMORY BOARD 
// ==========================================
function MemoryBoardCard({ item, index }: { item: WishItem, index: number }) {
  const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1", "rotate-4"];
  const rotationClass = rotations[index % rotations.length];

  return (
    <div className={`relative w-full ${rotationClass} transition-all duration-500 hover:rotate-0 hover:scale-[1.05] hover:z-50 z-10 cursor-pointer`}>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-7 bg-white/40 backdrop-blur-sm shadow-sm rotate-2 z-20 rounded-sm"></div>
      <div className="bg-[#FEF8CD]/95 backdrop-blur-md px-6 py-8 rounded-sm shadow-lg border border-[#FBEF7A]/40 flex flex-col items-center text-center">
        <Quote className="w-6 h-6 text-[#D4A017] opacity-20 mb-3" />
        <p className="text-neutral-700 text-sm md:text-base leading-relaxed font-light italic mb-6 whitespace-pre-wrap">{item.message}</p>
        <div className="mt-auto pt-4 border-t border-[#D4A017]/20 w-3/4">
          <h3 className="font-serif text-neutral-900 font-bold text-lg">{item.name}</h3>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. HALAMAN UTAMA MAIN CONTENT
// ==========================================
function MainContent() {
  const [activeTab, setActiveTab] = useState<string>("infinite");
  
  const [playingCinema, setPlayingCinema] = useState<WishItem | null>(null);
  const [cinemaAnimPhase, setCinemaAnimPhase] = useState("idle"); 

  const [vhsPhase, setVhsPhase] = useState("idle"); 
  const isVhsActive = vhsPhase !== "idle"; 

  const [visitedTabs, setVisitedTabs] = useState<string[]>(["infinite"]);
  const [lockedMsg, setLockedMsg] = useState(false);

  const categories = [
    { id: "infinite", label: "Infinite" },
    { id: "others", label: "Others" },
    { id: "CG", label: "CG 73" },
    { id: "Wish", label: "Wishes"},
    { id: "koko", label: "Koko"}, 
    { id: "yours", label: "For You 🤍" }
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === "yours") {
      const requiredTabs = ["infinite", "others", "CG", "Wish", "koko"];
      const hasVisitedAll = requiredTabs.every(t => visitedTabs.includes(t));
      if (!hasVisitedAll) {
        setLockedMsg(true);
        setTimeout(() => setLockedMsg(false), 3000);
        return; 
      }
    }
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) setVisitedTabs([...visitedTabs, tabId]);
    setLockedMsg(false);
  };

  const activeWishes = WISHES_DATA.filter((item) => item.category.toLowerCase() === activeTab.toLowerCase());
  
  const handleOpenCinema = (item: WishItem) => {
    if (cinemaAnimPhase !== "idle") return;
    setPlayingCinema(item);
    setTimeout(() => setCinemaAnimPhase("playing"), 50);
  };
  const handleCloseCinema = () => {
    setCinemaAnimPhase("exiting");
    setTimeout(() => { setPlayingCinema(null); setCinemaAnimPhase("idle"); }, 600); 
  };

  const isScrapbookMode = activeTab === "infinite";
  const isBoardMode = activeTab.toLowerCase() === "wish";
  const isCinemaMode = activeTab.toLowerCase() === "others";
  const isCgMode = activeTab.toLowerCase() === "cg";
  const isKokoMode = activeTab.toLowerCase() === "koko";
  const isYoursMode = activeTab.toLowerCase() === "yours"; 

  const hasVisitedRequired = ["infinite", "others", "CG", "Wish", "koko"].every(t => visitedTabs.includes(t));

  return (
    <div className="min-h-screen text-neutral-800 font-sans selection:bg-[#FBEF7A] selection:text-neutral-900 pb-20 relative bg-[#F3F0E1]">
      <MovingBackground isBlurred={isBoardMode || isScrapbookMode || isCinemaMode || isYoursMode || isCgMode || isKokoMode} isCinema={isCinemaMode} isYours={isYoursMode} isVhs={isCgMode} />

      {lockedMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-rose-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-[bounce_0.5s_ease-in-out_infinite] font-medium text-sm border border-rose-400 whitespace-nowrap">
          <Lock className="w-4 h-4" /> Eits, baca ucapan yang lain dulu ya sayang... 😋
        </div>
      )}

      <header className={`relative pt-20 pb-8 px-6 max-w-4xl mx-auto text-center z-10 animate-fadeIn transition-opacity duration-500 ${isVhsActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-8 shadow-sm transition-all duration-700 ${
          isYoursMode ? "bg-[#111]/80 text-neutral-400 border-neutral-800" :
          (isCinemaMode || isCgMode) ? "bg-[#111]/80 text-[#FBEF7A] border-[#FBEF7A]/30" : 
          "bg-white/90 text-[#735A00] border-[#FBEF7A]/60"}`}>
          
          {isYoursMode ? <Lock className="w-3.5 h-3.5" /> : (isCinemaMode || isCgMode) ? <Film className="w-3.5 h-3.5" /> : isKokoMode ? <Mail className="w-3.5 h-3.5 text-[#D4A017]" /> : <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />}
          {isYoursMode ? "Strictly Confidential" : isCinemaMode ? "Exclusive Premiere" : isCgMode ? "A Trip Down Memory Lane" : isKokoMode ? "Special Delivery" : "A Special Delivery for You"}
        </div>
        
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight mb-6 drop-shadow-xl transition-colors duration-1000 ${isYoursMode ? "text-neutral-300" : "text-white"}`}>
          {isYoursMode ? "For Sefi," : isScrapbookMode ? "Our Infinite Chapter" : isBoardMode ? "The Wall of Love" : isCinemaMode ? "Sefi's Mini Cinema" : isCgMode ? "CG 73 Memories" : isKokoMode ? "From Big Bro" : "Happy Birthday Sefi"} 
          <span className={`italic relative whitespace-nowrap ${isYoursMode ? "text-[#D4C4A8]" : "text-white"} ${isBoardMode || isScrapbookMode || isCinemaMode || isYoursMode || isCgMode || isKokoMode ? 'hidden' : ''}`}> -CG 73<span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-[#FBEF7A] -z-10 rounded-full opacity-80 rotate-1"></span></span>
        </h1>
      </header>

      {/* TAB BAR */}
      <div className={`sticky top-6 z-30 max-w-fit mx-auto px-4 mb-12 transition-opacity duration-500 ${isVhsActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className={`flex items-center gap-2 p-2 rounded-2xl border shadow-xl overflow-x-auto transition-colors duration-700 ${
          isYoursMode ? "bg-[#111]/80 backdrop-blur-xl border-white/10" :
          (isCinemaMode || isCgMode) ? "bg-black/60 backdrop-blur-xl border-[#FBEF7A]/20" : 
          "bg-white/90 backdrop-blur-xl border-white"}`}>
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            const isYoursTab = tab.id === "yours";
            const isLocked = isYoursTab && !hasVisitedRequired;
            
            let tabClass = "";
            if (isActive) {
              if (isYoursMode) tabClass = "bg-neutral-800 text-[#D4C4A8] shadow-sm border border-neutral-700";
              else if (isCinemaMode || isCgMode) tabClass = "bg-gradient-to-r from-[#FBEF7A] to-[#D4A017] text-neutral-900 shadow-sm";
              else tabClass = "bg-gradient-to-r from-[#FEF9E1] to-[#FBEF7A] text-neutral-900 shadow-sm border border-[#FBEF7A]/50";
            } else {
              if (isLocked) tabClass = "text-neutral-400 hover:text-rose-500 hover:bg-rose-50"; 
              else if (isYoursMode || isCinemaMode || isCgMode) tabClass = "text-neutral-500 hover:text-neutral-300 hover:bg-white/10";
              else tabClass = "text-neutral-500 hover:text-neutral-900 hover:bg-white/90";
            }

            return (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`whitespace-nowrap flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${tabClass}`}>
                {isLocked && <Lock className="w-3.5 h-3.5 mb-0.5 opacity-60" />}
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 relative">
        
        {isYoursMode && <MidnightTypewriter />}
        {isScrapbookMode && <InfiniteScrapbook wishes={activeWishes} />}

        {/* TAB WISHES (MEMORY BOARD) */}
        {isBoardMode && (
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start animate-fadeIn py-10 max-w-5xl mx-auto">
            <div className="flex flex-col gap-10 w-full md:w-1/3">
              {activeWishes.filter((_, i) => i % 3 === 0).map((item, idx) => <MemoryBoardCard key={item.id} item={item} index={idx * 3} />)}
            </div>
            <div className="flex flex-col gap-10 w-full md:w-1/3 mt-0 md:mt-12">
              {activeWishes.filter((_, i) => i % 3 === 1).map((item, idx) => <MemoryBoardCard key={item.id} item={item} index={idx * 3 + 1} />)}
            </div>
            <div className="flex flex-col gap-10 w-full md:w-1/3 mt-0 md:mt-24">
              {activeWishes.filter((_, i) => i % 3 === 2).map((item, idx) => <MemoryBoardCard key={item.id} item={item} index={idx * 3 + 2} />)}
            </div>
          </div>
        )}

        {/* TAB OTHERS (MINI CINEMA) */}
        {isCinemaMode && (
          <div className="w-full flex justify-center py-10 overflow-visible transition-opacity duration-700">
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl relative z-10">
              {activeWishes.map((item, idx) => (
                <div key={item.id} onClick={() => handleOpenCinema(item)} className="relative w-72 h-44 cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
                  <div className="absolute inset-0 bg-[#1A1A1A] rounded-lg shadow-2xl overflow-hidden border-y-[12px] border-[#111] flex flex-col justify-between"
                       style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 10px, #000 10px, #000 16px)', backgroundSize: '100% 10px', backgroundRepeat: 'no-repeat', backgroundPosition: 'top, bottom' }}>
                    <div className="w-full h-2 flex justify-between px-2 pt-1 opacity-70">
                       {Array.from({length: 8}).map((_,i) => <div key={i} className="w-3 h-2 bg-[#F3F0E1] rounded-sm shadow-inner"></div>)}
                    </div>
                    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#111] mx-1 border border-neutral-700/50 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[#D4A017] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                       <Film className="w-8 h-8 text-[#FBEF7A] opacity-40 mb-2 group-hover:text-[#D4A017] group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                       <span className="text-neutral-400 font-mono text-[10px] tracking-[0.2em] uppercase">Take {idx + 1}</span>
                       <h3 className="font-serif text-white text-xl font-bold mt-1 text-center px-4 leading-tight">{item.name}</h3>
                    </div>
                    <div className="w-full h-2 flex justify-between px-2 pb-1 opacity-70">
                       {Array.from({length: 8}).map((_,i) => <div key={i} className="w-3 h-2 bg-[#F3F0E1] rounded-sm shadow-inner"></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CG 73 (RETRO VHS TAPE) */}
        {isCgMode && activeWishes.length > 0 && (
          <VhsPlayerComponent videoUrl={activeWishes[0].videoUrl || ""} onPhaseChange={setVhsPhase} />
        )}

        {/* TAB BARU: KOKO (VINTAGE POSTCARD) */}
        {isKokoMode && activeWishes.length > 0 && (
          <VintagePostcard item={activeWishes[0]} />
        )}

      </main>

      <footer className={`text-center mt-24 drop-shadow-md max-w-fit mx-auto py-2 px-6 rounded-full text-xs font-medium tracking-wide relative z-10 transition-opacity duration-500 ${isYoursMode ? 'text-neutral-700' : 'text-neutral-400'} ${isVhsActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        made by Bebe<Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline drop-shadow-sm mx-1" />
      </footer>


      {/* ============================================================== */}
      {/* MODAL / OVERLAY SECTION (MINI CINEMA PLAYER)                   */}
      {/* ============================================================== */}
      {playingCinema && (
        <div className={`fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/95 backdrop-blur-xl transition-all duration-700 ease-out ${cinemaAnimPhase === "playing" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          
          <button onClick={handleCloseCinema} className="absolute top-6 right-6 md:top-8 md:right-8 text-neutral-500 hover:text-white flex items-center gap-2 text-sm font-mono tracking-widest uppercase transition-colors z-50 bg-black/40 md:bg-transparent p-2 md:p-0 rounded-full">
            <X className="w-6 h-6" /> <span className="hidden md:inline">Exit Theater</span>
          </button>

          <div className={`w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 transition-all duration-700 ease-out ${cinemaAnimPhase === "playing" ? "scale-100 translate-y-0" : "scale-95 translate-y-12"}`}>
            
            <div className="relative w-full md:w-[60%] lg:w-[65%] aspect-video shrink-0 bg-black shadow-[0_0_80px_rgba(212,160,23,0.15)] border border-[#FBEF7A]/20 rounded-xl overflow-hidden group">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none -z-10 blur-3xl"></div>
               {playingCinema.videoUrl ? (
                 <video src={playingCinema.videoUrl} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-contain z-10"></video>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600 z-10">
                    <Film className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-mono text-sm uppercase tracking-widest">No Footage Available</p>
                 </div>
               )}
            </div>

            <div className="w-full md:w-[40%] lg:w-[35%] max-h-[70vh] flex flex-col justify-center text-center md:text-left shrink-0">
               <h4 className="text-[#FBEF7A] font-serif text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{playingCinema.name}</h4>
               <div className="w-16 h-1 bg-[#D4A017]/40 mb-6 mx-auto md:mx-0 rounded-full"></div>
               <div className="overflow-y-auto cinema-scroll pr-2 max-h-[50vh]">
                 <p className="text-neutral-300 font-mono text-sm md:text-base leading-loose whitespace-pre-wrap italic opacity-90">{playingCinema.message}</p>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  if (!isUnlocked) return <QuizGatekeeper onUnlock={() => setIsUnlocked(true)} />;
  return <MainContent />;
}
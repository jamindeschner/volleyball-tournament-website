"use client"

import React, { useState, useEffect } from "react"
import { Calendar, MapPin, Users, Award, Mail, MessageSquare, Menu, X, CheckCircle, Trophy, Sun, Volleyball } from "lucide-react"

// Turnier-Datenstrukturen
const TOURNAMENTS = {
  halle: {
    title: "14. FBG Hallen-Cup 2026",
    date: "Samstag, 14. November 2026",
    time: "Ab 09:00 Uhr (Einlass/Warm-up ab 08:15 Uhr)",
    targetDate: "2026-11-14T09:00:00",
    location: "FBG Sporthalle, Erlangen (Eingang West)",
    mode: "6 vs. 6 Mixed (mind. 2 Frauen auf dem Feld)",
    fee: "25,- € pro Team",
    prizes: "Wanderpokal, Sachpreise für Plätze 1-3 & Urkunden für alle Teams",
    details: "Für das leibliche Wohl ist gesorgt! Unser legendäres Buffet mit hausgemachten Kuchen, Salaten, warmen Snacks und kalten Getränken steht euch den ganzen Tag zu fairen Preisen zur Verfügung.",
    mailSubject: "Anmeldung Hallen-Cup 2026",
    mailBody: "Hallo Orga-Team,\n\nhiermit möchten wir unser Team für den 14. FBG Hallen-Cup am 14.11.2026 anmelden.\n\nTeamname:\nAnsprechpartner:\nTelefonnummer:\n\nViele Grüße!"
  },
  beach: {
    title: "FBG Beach-Summer-Special 2026",
    date: "Samstag, 11. Juli 2026",
    time: "Ab 10:00 Uhr (Technical Meeting um 09:30 Uhr)",
    targetDate: "2026-07-11T10:00:00",
    location: "Beacharena Erlangen (Sandplätze am Westbad)",
    mode: "2 vs. 2 Mixed / Quattro-Mixed (je nach Anmeldung)",
    fee: "15,- € pro Team",
    prizes: "Beach-Vorteilspakete, Grillgut-Gutscheine & kühle Finalgetränke",
    details: "Sommer, Sonne, Beachvolleyball! Wir grillen gemeinsam ab mittags. Bringt gerne eure Picknickdecken mit. Musik, Cocktails und Summer-Vibes sind garantiert!",
    mailSubject: "Anmeldung Beach-Special 2026",
    mailBody: "Hallo Orga-Team,\n\nhiermit möchten wir unser Team für das FBG Beach-Summer-Special am 11.07.2026 anmelden.\n\nTeamname/Namen:\nDisziplin (2vs2 oder Quattro):\nTelefonnummer:\n\nViele Grüße!"
  }
}

export default function VolleyballPage() {
  const [type, setType] = useState<"halle" | "beach">("halle")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isDone: false })
  
  // Formular-States
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const current = TOURNAMENTS[type]

  // Dynamic Countdown Logic
  useEffect(() => {
    const target = new Date(current.targetDate).getTime()
    
    const tick = () => {
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) {
        setCountdown(prev => ({ ...prev, isDone: true }))
        return
      }

      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      setCountdown({ days, hours, minutes, seconds, isDone: false })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [type, current.targetDate])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setContactForm({ name: "", email: "", message: "" })
      }, 5000)
    }
  }

  // Theme-abhängige Klassen generieren
  const themeClass = type === "halle" 
    ? {
        bg: "bg-[#0f1623] text-[#eef2f7]",
        card: "bg-[#131c2c]/80 border-white/10 text-[#eef2f7]",
        accentText: "text-[#ffb02e]",
        accentBg: "bg-[#ffb02e]",
        accentHover: "hover:bg-[#e0961b]",
        accentBorder: "border-[#ffb02e]/30",
        pillActive: "bg-[#ffb02e] text-[#0f1623]",
        pillInactive: "bg-[#1d293d] text-[#97a3b6] hover:text-white",
        mutedText: "text-[#97a3b6]",
        heroOverlay: "bg-gradient-to-b from-transparent to-[#0f1623]"
      }
    : {
        bg: "bg-[#fcfbf7] text-[#2c3539]",
        card: "bg-white border-[#e6e2af]/40 shadow-sm text-[#2c3539]",
        accentText: "text-[#d48c00]",
        accentBg: "bg-[#ffcc00]",
        accentHover: "hover:bg-[#e6b800]",
        accentBorder: "border-[#ffcc00]/40",
        pillActive: "bg-[#ffcc00] text-[#2c3539] font-semibold shadow-sm",
        pillInactive: "bg-[#f0ede4] text-[#707a8a] hover:text-[#2c3539]",
        mutedText: "text-[#657383]",
        heroOverlay: "bg-gradient-to-b from-transparent to-[#fcfbf7]"
      }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${themeClass.bg}`}>
      
      {/* HEADER & NAVIGATION */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${type === 'halle' ? 'bg-[#0f1623]/80 border-white/5' : 'bg-[#fcfbf7]/80 border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${type === 'halle' ? 'bg-white/5 text-[#ffb02e]' : 'bg-[#ffcc00]/10 text-[#d48c00]'}`}>
              {type === 'halle' ? <Volleyball className="w-7 h-7" /> : <Sun className="w-7 h-7 animate-spin-slow" />}
            </div>
            <div>
              <span className="font-black text-xl tracking-wider block">FBG ERLANGEN</span>
              <span className={`text-xs font-bold uppercase tracking-widest ${themeClass.accentText}`}>Volleyball-Cup</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#turnier" className="hover:opacity-80 transition-opacity">Turnier-Infos</a>
            <a href="#anmeldung" className="hover:opacity-80 transition-opacity">Anmeldung</a>
            <a href="#kontakt" className="hover:opacity-80 transition-opacity">Kontakt</a>
            
            {/* Event Switcher */}
            <div className={`p-1 rounded-full flex gap-1 ${type === 'halle' ? 'bg-[#0b101a]' : 'bg-[#edf0ec]'}`}>
              <button 
                onClick={() => setType("halle")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${themeClass.pillActive} ${type !== 'halle' && themeClass.pillInactive}`}
              >
                Halle
              </button>
              <button 
                onClick={() => setType("beach")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${type === 'beach' ? themeClass.pillActive : ''} ${type !== 'beach' ? themeClass.pillInactive : ''}`}
              >
                Beach
              </button>
            </div>
          </nav>

          {/* Mobile Hamburguer */}
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
          <div className={`fixed right-0 top-0 bottom-0 w-80 p-6 flex flex-col justify-between shadow-2xl transition-transform ${type === 'halle' ? 'bg-[#131c2c]' : 'bg-white'}`}>
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold tracking-wide">NAVIGATION</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex flex-col gap-5 text-lg font-semibold">
                <a href="#turnier" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500">Turnier-Infos</a>
                <a href="#anmeldung" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500">Anmeldung</a>
                <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-500">Kontakt</a>
              </nav>
            </div>
            
            <div className="border-t pt-6">
              <span className="text-xs uppercase tracking-widest block mb-3 font-bold opacity-60">Modus wechseln</span>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { setType("halle"); setMobileMenuOpen(false); }} className={`py-2.5 rounded-xl font-bold text-center text-sm ${type === 'halle' ? 'bg-[#ffb02e] text-black' : 'bg-gray-200 text-gray-700'}`}>Hallen-Cup</button>
                <button onClick={() => { setType("beach"); setMobileMenuOpen(false); }} className={`py-2.5 rounded-xl font-bold text-center text-sm ${type === 'beach' ? 'bg-[#ffcc00] text-black' : 'bg-gray-200 text-gray-700'}`}>Beach-Cup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm border ${type === 'halle' ? 'bg-[#ffb02e]/10 text-[#ffb02e] border-[#ffb02e]/30' : 'bg-[#ffcc00]/20 text-[#d48c00] border-[#ffcc00]/40'}`}>
            {type === 'halle' ? '🏆 Indoor-Event' : '☀️ Outdoor-Special'}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            {current.title}
          </h1>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium ${themeClass.mutedText}`}>
            Das sportliche Highlight der FBG Erlangen. Bist du bereit für packende Ballwechsel, pure Team-Energie und jede Menge Spaß?
          </p>

          {/* DYNAMIC COUNTDOWN BOX */}
          <div className={`max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border backdrop-blur-md mb-12 shadow-xl ${themeClass.card}`}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-75">Das Match startet in</h3>
            {countdown.isDone ? (
              <div className="text-xl font-bold text-emerald-500 animate-pulse">🎉 Das Turnier läuft oder hat bereits stattgefunden!</div>
            ) : (
              <div className="flex justify-center items-center gap-3 sm:gap-6">
                {[
                  { value: countdown.days, label: "Tage" },
                  { value: countdown.hours, label: "Std" },
                  { value: countdown.minutes, label: "Min" },
                  { value: countdown.seconds, label: "Sek" }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl sm:text-5xl font-black tracking-mono tabular-nums block">{String(item.value).padStart(2, '0')}</span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-60 mt-1">{item.label}</span>
                    </div>
                    {idx < 3 && <span className="text-2xl sm:text-4xl font-light opacity-30 pb-4">:</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#anmeldung" className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold tracking-wide transition-all shadow-lg transform hover:-translate-y-0.5 text-black ${themeClass.accentBg} ${themeClass.accentHover}`}>
              Jetzt Team anmelden
            </a>
            <a href="#turnier" className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold tracking-wide border transition-all hover:bg-black/5 ${type === 'halle' ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}>
              Mehr erfahren
            </a>
          </div>
        </div>
      </section>

      {/* TOURNAMENT DETAILS */}
      <section id="turnier" className="py-20 border-t border-b backdrop-soft transition-colors duration-300 theme-section-split">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-3">Wichtigste Turnierinfos</h2>
            <p className={themeClass.mutedText}>Alle Details und Rahmenbedingungen für eure Match-Planung auf einen Blick.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar className="w-6 h-6" />, title: "Wann & Wer", desc: current.date, sub: current.time },
              { icon: <MapPin className="w-6 h-6" />, title: "Austragungsort", desc: current.location, sub: "Zuschauer herzlich willkommen!" },
              { icon: <Users className="w-6 h-6" />, title: "Spielmodus", desc: current.mode, sub: `Startgebühr: ${current.fee}` },
              { icon: <Award className="w-6 h-6" />, title: "Preise & Gewinne", desc: current.prizes, sub: "Urkunden für jeden Platz" }
            ].map((box, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] shadow-sm ${themeClass.card}`}>
                <div className={`p-3 rounded-xl inline-block mb-4 ${type === 'halle' ? 'bg-white/5 text-[#ffb02e]' : 'bg-[#ffcc00]/20 text-[#d48c00]'}`}>
                  {box.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{box.title}</h4>
                <p className="text-sm font-medium mb-1">{box.desc}</p>
                <p className={`text-xs ${themeClass.mutedText}`}>{box.sub}</p>
              </div>
            ))}
          </div>

          <div className={`mt-10 p-6 sm:p-8 rounded-3xl border max-w-4xl mx-auto text-center ${themeClass.card}`}>
            <h4 className="font-bold text-lg mb-2">Verpflegung & Catering</h4>
            <p className={`text-sm leading-relaxed ${themeClass.mutedText}`}>{current.details}</p>
          </div>
        </div>
      </section>

      {/* ANMELDUNG (REGISTRATION) */}
      <section id="anmeldung" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl ${themeClass.card}`}>
            <Trophy className={`w-12 h-12 mx-auto mb-4 ${themeClass.accentText}`} />
            <h2 className="text-3xl font-black tracking-tight mb-4">Sichere dir deinen Startplatz!</h2>
            <p className={`max-w-xl mx-auto mb-8 text-sm leading-relaxed ${themeClass.mutedText}`}>
              Die Plätze sind streng limitiert, um einen reibungslosen Turnierablauf zu garantieren. Klicke auf den Button, um direkt eine vorgefertigte E-Mail an unser Orga-Team zu senden.
            </p>
            
            <a 
              href={`mailto:turnier@fbg-erlangen.de?subject=${encodeURIComponent(current.mailSubject)}&body=${encodeURIComponent(current.mailBody)}`}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold tracking-wide text-black transition-all shadow-md transform hover:-translate-y-0.5 ${themeClass.accentBg} ${themeClass.accentHover}`}
            >
              <Mail className="w-5 h-5" />
              Per Mail anmelden
            </a>
            
            <span className={`block text-xs mt-4 font-semibold ${themeClass.mutedText}`}>
              Alternativ kannst du uns direkt eine Mail an <strong className={type === 'halle' ? 'text-white' : 'text-black'}>turnier@fbg-erlangen.de</strong> schicken.
            </span>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="kontakt" className={`py-20 border-t ${type === 'halle' ? 'border-white/5 bg-[#0b101a]' : 'border-black/5 bg-[#f5f3eb]'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight mb-2">Fragen oder Wünsche?</h2>
            <p className={themeClass.mutedText}>Schreib unserem Organisationsteam einfach eine Nachricht.</p>
          </div>

          <form onSubmit={handleContactSubmit} className={`p-8 rounded-3xl border shadow-sm ${themeClass.card}`}>
            {formSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
                <h4 className="text-lg font-bold">Nachricht erfolgreich gesendet!</h4>
                <p className={`text-sm ${themeClass.mutedText}`}>Vielen Dank für dein Feedback. Wir melden uns in Kürze bei dir.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Dein Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm(prev => ({...prev, name: e.target.value}))}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 ${type === 'halle' ? 'border-white/10 focus:ring-[#ffb02e]' : 'border-black/10 focus:ring-[#ffcc00]'}`} 
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Deine E-Mail</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={e => setContactForm(prev => ({...prev, email: e.target.value}))}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 ${type === 'halle' ? 'border-white/10 focus:ring-[#ffb02e]' : 'border-black/10 focus:ring-[#ffcc00]'}`} 
                      placeholder="max@beispiel.de"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Deine Nachricht</label>
                  <textarea 
                    rows={4} 
                    required
                    value={contactForm.message}
                    onChange={e => setContactForm(prev => ({...prev, message: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 ${type === 'halle' ? 'border-white/10 focus:ring-[#ffb02e]' : 'border-black/10 focus:ring-[#ffcc00]'}`} 
                    placeholder="Wie können wir dir helfen?..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`w-full py-3.5 rounded-xl font-bold tracking-wide text-black transition-all flex items-center justify-center gap-2 ${themeClass.accentBg} ${themeClass.accentHover}`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Nachricht absenden
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-8 text-center text-xs border-t font-medium ${type === 'halle' ? 'border-white/5 bg-[#0a0e17] text-[#56657a]' : 'border-black/5 bg-[#eae7de] text-[#707a8a]'}`}>
        <p>&copy; 2026 FBG Erlangen &bull; Abteilung Volleyball. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  )
}

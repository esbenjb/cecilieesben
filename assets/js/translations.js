/*
 * All visitor-facing text lives here. Danish (da) is the default language,
 * English (en) is the toggle. Every key must exist in both objects.
 *
 * Lines marked TODO hold placeholder content that Esben & Cecilie should replace.
 */
window.TRANSLATIONS = {
  da: {
    'meta.title': 'Cecilie & Esben · 12. juni 2027',
    'meta.description':
      'Cecilie Gyldenvang Møller og Esben Jørgensen Bager bliver gift den 12. juni 2027 på Gl. Skovridergaard i Silkeborg.',
    'meta.title.venue': 'Stedet · Gl. Skovridergaard · Cecilie & Esben',
    'meta.description.venue':
      'Gl. Skovridergaard ved Silkeborg — rammen om vores bryllupsweekend den 11.–13. juni 2027.',
    'meta.title.plan': 'Planen · Cecilie & Esben',
    'meta.description.plan':
      'Hele programmet for bryllupsweekenden den 11.–13. juni 2027 på Gl. Skovridergaard.',
    'meta.title.invitation': 'Invitation · Cecilie & Esben',
    'meta.description.invitation':
      'Invitationen til Cecilie og Esbens bryllup den 12. juni 2027 — til print på A4.',

    'lang.label': 'Skift sprog',
    'lang.da': 'Dansk',
    'lang.en': 'Engelsk',
    'nav.label': 'Hovedmenu',
    'nav.toggle': 'Åbn menu',
    'nav.program': 'Program',
    'nav.venue': 'Stedet',
    'nav.practical': 'Praktisk',
    'nav.gifts': 'Gaver',
    'nav.rsvp': 'Svar',
    'nav.home': 'Forsiden',
    'lightbox.close': 'Luk billedet',

    'hero.dateline': '— 12. juni 2027 —',
    'hero.tagline': 'vi skal giftes!',
    'hero.venue': 'Gl. Skovridergaard · Silkeborg · 11.–13. juni',
    'hero.scene.alt':
      'Akvarel af Silkeborgsøerne med skovklædte odder, der spejler sig i det blanke vand',
    'hero.cta': 'Svar på invitationen',

    'countdown.title': 'Der er ikke længe til',
    'countdown.days': 'dage',
    'countdown.hours': 'timer',
    'countdown.minutes': 'minutter',
    'countdown.seconds': 'sekunder',
    'countdown.today': 'I dag er dagen!',
    'countdown.past': 'Tak fordi I fejrede dagen med os',

    'welcome.eyebrow': 'Velkommen',
    'welcome.body':
      'Efter mange gode år sammen siger vi endelig ja til hinanden — og vi kan ikke forestille os at gøre det uden jer. Vi har lejet hele Gl. Skovridergaard en hel weekend, så vi kan nå at se jer alle sammen, spise godt, danse længe og sove ud bagefter.', // TODO: skriv jeres egen velkomsttekst
    'welcome.signature': 'Kærlig hilsen Cecilie & Esben',

    'program.eyebrow': 'Programmet',
    'program.title': 'Weekendens plan',
    'program.intro':
      'I er velkomne fra fredag den 11. juni. Kom, når det passer jer — og bliv så længe I kan.',
    'program.link': 'Se planen som flyer',

    'program.fri.day': 'Fredag',
    'program.fri.date': '11. juni 2027',
    'program.fri.title': 'Ankomst & grill',
    'program.fri.1.time': '17.00',
    'program.fri.1.title': 'Ankomst & fredagsdrink',
    'program.fri.1.text':
      'Der er åbent fra kl. 17. Tjek ind på værelset, få en drink i hånden, og spil med i haven når I har lyst.',
    'program.fri.2.time': '19.00–21.00',
    'program.fri.2.title': 'Grillen er tændt',
    'program.fri.2.text':
      'Aftensmad fra grillen — men ingen siddende middag. Ingen bordplan, ingen taler, ingen faste tidspunkter: grillen står klar i to timer, så kig forbi når det passer jer, og spis når I bliver sultne.',
    'program.fri.note': 'I er velkomne fra fredag, så tag gerne hele weekenden med.',

    'program.sat.day': 'Lørdag',
    'program.sat.date': '12. juni 2027',
    'program.sat.title': 'Bryllupsdagen',
    'program.sat.1.time': '09.00',
    'program.sat.1.title': 'Morgenbad & champagne',
    'program.sat.1.text':
      'Vi springer i søen og skåler i champagne bagefter. Håndklæde og godt humør er alt, hvad der skal til.',
    'program.sat.2.time': '09.30–11.00',
    'program.sat.2.title': 'Morgenmad',
    'program.sat.2.text': 'Langt morgenbord. Tag god tid — dagen er lang.',
    'program.sat.3.time': '13.00',
    'program.sat.3.title': 'Vielsen',
    'program.sat.3.text': 'Vi bliver viet. Vær på plads i god tid inden.',
    'program.sat.4.time': '13.45',
    'program.sat.4.title': 'Frokost, kaffe & kage',
    'program.sat.4.text': 'Gratulationer, frokost og kage i løbet af eftermiddagen.',
    'program.sat.5.time': '15.00',
    'program.sat.5.title': 'Sejltur på søerne',
    'program.sat.5.text': 'Vi sejler ud på Silkeborgsøerne sammen. Husk en trøje.',
    'program.sat.6.time': '17.30',
    'program.sat.6.title': 'Festmiddag',
    'program.sat.6.text': 'Middag, taler og alt det, der hører sig til.',
    'program.sat.7.time': 'Før midnat',
    'program.sat.7.title': 'Cocktails & dansegulv',
    'program.sat.7.text': 'Baren åbner, og gulvet bliver ryddet.',
    'program.sat.8.time': '02.00',
    'program.sat.8.title': 'Natmad',
    'program.sat.8.text': 'Noget varmt til dem, der stadig danser.',
    'program.sat.note': 'Og så fortsætter festen, til den sidste gæst går hjem.',

    'program.sun.day': 'Søndag',
    'program.sun.date': '13. juni 2027',
    'program.sun.title': 'Afsked',
    'program.sun.1.time': '09.00–11.00',
    'program.sun.1.title': 'Morgenmad',
    'program.sun.1.text': 'Sidste fælles bord, før vi siger farvel.',
    'program.sun.2.time': 'Senest 13.00',
    'program.sun.2.title': 'Udtjekning',
    'program.sun.2.text':
      'Værelserne skal være tømt senest kl. 13. Gå ikke uden at give os et kram.',
    'program.sun.note':
      'Ingen faste programpunkter. Sov længe, spis godt, og tag afsked i jeres eget tempo.',

    'inv.eyebrow': 'Invitationen',
    'inv.intro':
      'A4 på tværs, foldet som en portlåge: de to flapper åbnes ud til siden. Print dobbeltsidet — vend om den lange kant — og fold flapperne ind mod midten.',
    'inv.print': 'Print invitationen',
    'inv.link': 'Se invitationen',
    'inv.side.a': 'Side 1 · inderside',
    'inv.side.b': 'Side 2 · yderside',
    'inv.fold.note':
      'Foldemærkerne printes som små, lyse streger i top og bund — fold efter dem, så forsvinder de i ombukket.',

    'inv.main.eyebrow': 'I anledning af vores bryllup',
    'inv.main.invite': 'Det vil glæde os at se jer, når vi siger ja til hinanden',
    'inv.main.date': 'Lørdag den 12. juni 2027 · kl. 13.00',
    'inv.main.venue': 'Gl. Skovridergaard',
    'inv.main.address': 'Marienlundsvej 36 · 8600 Silkeborg',
    'inv.main.weekend':
      'Vi fejrer hele weekenden — fra fredag den 11. til søndag den 13. juni.',
    'inv.main.closing': 'Vi glæder os til at se jer',

    'inv.practical.title': 'Praktisk',
    'inv.practical.1.label': 'Sted',
    'inv.practical.1.value': 'Gl. Skovridergaard · Marienlundsvej 36 · 8600 Silkeborg',
    'inv.practical.2.label': 'Overnatning',
    'inv.practical.2.value':
      'Der er værelser på gården til alle weekendgæster. Skriv i jeres svar, hvilke nætter I ønsker.',
    'inv.practical.3.label': 'Dresscode',
    'inv.practical.3.value':
      'Festligt tøj. Vielsen og receptionen er udendørs på græs — vælg skoene derefter.',
    'inv.practical.4.label': 'S.U.',
    'inv.practical.4.value': 'Senest den 1. marts 2027', // TODO: bekræft frist
    'inv.practical.web.label': 'Svar og al info',

    'inv.program.title': 'Programmet',
    'inv.program.note': 'Alle tidspunkter er vejledende.',

    'inv.back.text':
      'Hele programmet, praktisk info og svar på invitationen finder I på',
    'inv.cover.date': '12. juni 2027',
    'inv.cover.weekend': 'Bryllupsweekend · 11.–13. juni',
    'inv.web': 'cecilieesben.dk', // TODO: bekræft domænet

    'plan.eyebrow': 'Planen',
    'plan.title': 'Bryllupsweekend',
    'plan.dates': '11.–13. juni 2027',
    'plan.intro':
      'Hele weekendens plan på én side. Print den, eller gem den på telefonen — den er lavet til at fylde en A6-flyer.',
    'plan.print': 'Print planen',
    'plan.back': 'Tilbage til forsiden',
    'plan.footer': 'Gl. Skovridergaard · Marienlundsvej 36 · 8600 Silkeborg',

    'venue.eyebrow': 'Stedet',
    'venue.title': 'Gl. Skovridergaard',
    'venue.teaser':
      'En gammel skovridergård fra 1798 midt i Søhøjlandet — med egen park, skoven som nabo og Almindsø få minutters gang væk.',
    'venue.cta': 'Se stedet',

    'venuepage.eyebrow': 'Stedet',
    'venuepage.title': 'Gl. Skovridergaard',
    'venuepage.lead':
      'Vi holder hele bryllupsweekenden på Gl. Skovridergaard lige uden for Silkeborg. Gården går tilbage til 1798 og ligger i hjertet af det midtjyske søhøjland — med sin egen park, Silkeborg-skovene som nabo og Almindsø inden for gåafstand. I dag er det et hotel og konferencecenter, så alle gæster kan sove samme sted, som vi fejrer.',
    'venuepage.gallery.title': 'Billeder fra stedet',
    'venuepage.shot.1': 'Hovedbygningen',
    'venuepage.shot.2': 'Gården i parken',
    'venuepage.shot.3': 'Havesalen',
    'venuepage.shot.4': 'Restauranten',
    'venuepage.shot.5': 'Værelserne',
    'venuepage.shot.6': 'Ringene i Almindsø',
    'venuepage.shot.7': 'Vindfløjen fra 1798',
    'venuepage.gallery.note':
      'Billederne er hotellets egne. Flere følger, når vi selv har været på besøg igen.',
    'venuepage.facts.title': 'Kort fortalt',
    'venuepage.fact.1.label': 'Adresse',
    'venuepage.fact.1.value': 'Marienlundsvej 36, 8600 Silkeborg',
    'venuepage.fact.2.label': 'Fra 1798',
    'venuepage.fact.2.value': 'Tidligere skovridergård og kursted, i dag hotel',
    'venuepage.fact.3.label': 'Omgivelser',
    'venuepage.fact.3.value': 'Egen park, skov, Gudenåen og Almindsø tæt på',
    'venuepage.fact.4.label': 'Overnatning',
    'venuepage.fact.4.value': 'Enkelt- og dobbeltværelser samt junior suites på stedet',
    'venuepage.fact.5.label': 'Parkering',
    'venuepage.fact.5.value': 'Gratis parkering og ladestandere til elbiler',
    'venuepage.fact.6.label': 'Til byen',
    'venuepage.fact.6.value': 'Silkeborg centrum ligger i gåafstand',
    'venuepage.map': 'Åbn i Google Maps',
    'venuepage.website': 'Hotellets hjemmeside',
    'venuepage.around.title': 'Hvis I får tid til overs',
    'venuepage.around.body':
      'Weekenden er lang nok til at nå lidt mere end fest. Gå en tur i skoven, tag en svømmetur i Almindsø, lej en cykel gennem Søhøjlandet, eller besøg Museum Jorn og KunstCentret Silkeborg Bad, som begge ligger få minutter væk.',
    'venuepage.back': 'Tilbage til forsiden',

    'us.eyebrow': 'Os to',
    'us.title': 'Vejen hertil',
    'us.intro':
      'Vi har rejst, spist, vandret og sovet i telt sammen i mange år. Her er tolv nedslag undervejs — og den 12. juni samler vi jer alle sammen ét sted.',

    'travel.hint': 'Hold musen over et billede for at se hvor det er taget — og klik for at se det stort.',
    'travel.island.place': 'Jökulsárlón',
    'travel.island.country': 'Island',
    'travel.island.alt':
      'Cecilie og Esben foran isbjergene i gletsjerlagunen Jökulsárlón',
    'travel.budapest.place': 'Budapest',
    'travel.budapest.country': 'Ungarn',
    'travel.budapest.alt':
      'Cecilie og Esben på en mur med udsigt over Donau og Budapest',
    'travel.kitzbuhel.place': 'Kitzbühel',
    'travel.kitzbuhel.country': 'Østrig',
    'travel.kitzbuhel.alt':
      'Cecilie og Esben på en solbeskinnet hytteterrasse med hver sin fadøl',
    'travel.monza.place': 'Monza',
    'travel.monza.country': 'Italien',
    'travel.monza.alt':
      'Cecilie og Esben på tribunen til Formel 1 på Monza',
    'travel.zanzibar.place': 'Nungwi',
    'travel.zanzibar.country': 'Zanzibar',
    'travel.zanzibar.alt':
      'Cecilie og Esben ved morgenbordet med et dannebrogsflag på stranden i Nungwi',
    'travel.uganda.place': 'Murchison Falls',
    'travel.uganda.country': 'Uganda',
    'travel.uganda.alt':
      'Cecilie og Esben på savannen med giraffer i baggrunden',
    'travel.thailand.place': 'Chiang Mai',
    'travel.thailand.country': 'Thailand',
    'travel.thailand.alt':
      'Cecilie og Esben i vandet ved siden af en elefant',
    'travel.teotihuacan.place': 'Teotihuacán',
    'travel.teotihuacan.country': 'Mexico',
    'travel.teotihuacan.alt':
      'Cecilie og Esben i en luftballon over Teotihuacán ved solopgang',
    'travel.galapagos.place': 'Galápagos',
    'travel.galapagos.country': 'Ecuador',
    'travel.galapagos.alt':
      'Cecilie og Esben spiser aftensmad ved vandet i solnedgangen',
    'travel.brasilien.place': 'Rio de Janeiro',
    'travel.brasilien.country': 'Brasilien',
    'travel.brasilien.alt':
      'Cecilie og Esben foran et vægmaleri med ordet Brasil',
    'travel.patagonien.place': 'El Chaltén',
    'travel.patagonien.country': 'Argentina',
    'travel.patagonien.alt':
      'Cecilie og Esben med bjerget Fitz Roy i baggrunden',
    'travel.torres.place': 'Torres del Paine',
    'travel.torres.country': 'Chile',
    'travel.torres.alt':
      'Cecilie og Esben i teltet på en træplatform i skoven',

    'around.eyebrow': 'Søhøjlandet',
    'around.title': 'Landet omkring os',
    'around.intro':
      'Gården ligger midt i det, folk kører langt for at se. Her er fem af vores yndlingssteder inden for en kort tur fra Gl. Skovridergaard.',
    'fig.soerne.title': 'Silkeborgsøerne',
    'fig.soerne.text':
      'Ni søer på stribe langs Gudenåen, fra byen og hele vejen ud til Himmelbjerget. Lej en kano, hop i fra en badebro, eller sæt jer på bredden og se på — vandet er aldrig langt væk.',
    'fig.soerne.alt':
      'Akvarel af Silkeborgsøerne med skovklædte odder, der spejler sig i det blanke vand',
    'fig.himmelbjerget.title': 'Himmelbjerget',
    'fig.himmelbjerget.text':
      'Danmarks mest berømte bakke — 147 meter, med Julsø bredt ud nedenfor. Tårnet på toppen er fra 1875, og sidst på sommeren blomstrer lyngen hele vejen rundt om det.',
    'fig.himmelbjerget.alt':
      'Akvarel af Himmelbjergtårnet med udsigt ud over skoven og Julsø',
    'fig.hjejlen.title': 'Hjejlen',
    'fig.hjejlen.text':
      'Verdens ældste kulfyrede hjuldamper har sejlet fra Silkeborg til Himmelbjerget siden 1861. Turen tager halvanden time — og er stadig den smukkeste måde at se søerne på.',
    'fig.hjejlen.alt': 'Akvarel af hjuldamperen Hjejlen på Silkeborgsøerne',
    'fig.ringene.title': 'Ringene i Almindsø',
    'fig.ringene.text':
      'Østre Søbad ligger få minutters gang fra gården: to cirkelformede træbroer ude i søen — den ene med lavt vand, den anden dyb nok til at springe i. Tag badetøj med.',
    'fig.ringene.alt': 'Akvarel af de to cirkelformede badebroer ved Almindsø set oppefra',
    'fig.bakkerne.title': 'Sindbjerg & Stoubjerg',
    'fig.bakkerne.text':
      'Lyngbakkerne over Sejs-Svejbæk. Herfra kan man se ud over Julsø og Himmelbjerget — og sidst på sommeren står hele skrænten lilla af lyng.',
    'fig.bakkerne.alt':
      'Akvarel af lyngbakkerne Sindbjerg og Stoubjerg ved Sejs-Svejbæk',

    'practical.eyebrow': 'Praktisk',
    'practical.title': 'Det I skal vide',
    'practical.1.title': 'Overnatning',
    'practical.1.body':
      'Vi har reserveret værelser på Gl. Skovridergaard til alle weekendgæster. Skriv i formularen, hvilke nætter I ønsker, så fordeler vi værelserne.', // TODO: pris og booking-detaljer
    'practical.2.title': 'Transport',
    'practical.2.body':
      'I kan køre hele vejen til gården — der er ca. 45 minutter i bil fra Aarhus. Nærmeste lufthavn er Billund, og derfra er der også ca. 45 minutter i bil. Kommer I med toget, så stå af på Silkeborg Station og sig til — så henter vi jer.',
    'practical.3.title': 'Dresscode',
    'practical.3.body':
      'Festligt tøj. Vielsen og receptionen foregår udendørs på græs, så tag hensyn i valget af sko — og husk et lag til aftenen i parken.',
    'practical.4.title': 'Kosthensyn',
    'practical.4.body':
      'Har I allergier, eller er der noget I ikke spiser, så skriv det i formularen. Køkkenet laver gerne alternativer — bare vi ved det i god tid.',
    'practical.5.title': 'Taler & indslag',
    'practical.5.body':
      'Vil I holde tale eller lave et indslag, så kontakt vores toastmaster i god tid.', // TODO: indsæt toastmaster
    'practical.5.contact': 'Toastmaster: navn og telefon følger',
    'practical.6.title': 'Spørgsmål',
    'practical.6.body': 'I er altid velkomne til at skrive eller ringe til os.',
    'practical.6.contact': 'bryllup@example.dk', // TODO: indsæt jeres e-mail

    'gifts.eyebrow': 'Gaver',
    'gifts.title': 'Ønskeseddel',
    'gifts.body':
      'Den største gave er, at I kommer og fejrer dagen med os. Har I alligevel lyst til at give noget, laver vi en ønskeseddel, som kommer til at ligge her.',
    'gifts.link': 'Se ønskesedlen',
    'gifts.note': 'Ønskesedlen er på vej — vi lægger den op i god tid inden bryllupet.',

    'rsvp.eyebrow': 'Svar udbedes',
    'rsvp.title': 'Kommer I?',
    'rsvp.deadline': 'Vi skal have jeres svar senest den 1. marts 2027.', // TODO: bekræft frist
    'rsvp.name': 'Navn(e)',
    'rsvp.name.placeholder': 'Fx Anne og Peter Hansen',
    'rsvp.email': 'E-mail',
    'rsvp.email.placeholder': 'navn@eksempel.dk',
    'rsvp.phone': 'Telefon',
    'rsvp.phone.placeholder': 'Valgfrit',
    'rsvp.attending.legend': 'Deltager I?',
    'rsvp.attending.yes': 'Ja, vi kommer',
    'rsvp.attending.no': 'Desværre ikke',
    'rsvp.days.legend': 'Hvilke dage deltager I?',
    'rsvp.days.fri': 'Fredag 11. juni',
    'rsvp.days.sat': 'Lørdag 12. juni',
    'rsvp.days.sun': 'Søndag 13. juni',
    'rsvp.guests': 'Antal gæster',
    'rsvp.overnight.legend': 'Overnatning på Gl. Skovridergaard',
    'rsvp.overnight.fri': 'Natten til lørdag',
    'rsvp.overnight.sat': 'Natten til søndag',
    'rsvp.diet': 'Allergier eller hensyn til maden',
    'rsvp.diet.placeholder': 'Fx vegetar, nødeallergi, glutenfri',
    'rsvp.song': 'Hvilken sang får jer ud på dansegulvet?',
    'rsvp.song.placeholder': 'Kunstner – titel',
    'rsvp.message': 'Hilsen til os',
    'rsvp.message.placeholder': 'Valgfrit',
    'rsvp.submit': 'Send svar',
    'rsvp.sending': 'Sender …',
    'rsvp.success': 'Tak! Vi har modtaget jeres svar og glæder os til at se jer.',
    'rsvp.success.mail':
      'Jeres mailprogram åbner nu med svaret. Tryk send, så er I tilmeldt.',
    'rsvp.error': 'Noget gik galt. Prøv igen, eller skriv til os direkte.',
    'rsvp.error.name': 'Skriv jeres navn(e).',
    'rsvp.error.email': 'Skriv en gyldig e-mailadresse.',
    'rsvp.error.attending': 'Vælg, om I deltager.',
    'rsvp.error.days': 'Vælg mindst én dag.',

    'footer.title': 'Vi glæder os til at se jer',
    'footer.names': 'Cecilie & Esben',
    'footer.date': '12. juni 2027 · Gl. Skovridergaard, Silkeborg',
  },

  en: {
    'meta.title': 'Cecilie & Esben · 12 June 2027',
    'meta.description':
      'Cecilie Gyldenvang Møller and Esben Jørgensen Bager are getting married on 12 June 2027 at Gl. Skovridergaard in Silkeborg, Denmark.',
    'meta.title.venue': 'The venue · Gl. Skovridergaard · Cecilie & Esben',
    'meta.description.venue':
      'Gl. Skovridergaard near Silkeborg — the setting for our wedding weekend, 11–13 June 2027.',
    'meta.title.plan': 'The plan · Cecilie & Esben',
    'meta.description.plan':
      'The full programme for the wedding weekend, 11–13 June 2027 at Gl. Skovridergaard.',
    'meta.title.invitation': 'Invitation · Cecilie & Esben',
    'meta.description.invitation':
      'The invitation to Cecilie and Esben’s wedding on 12 June 2027 — for printing on A4.',

    'lang.label': 'Change language',
    'lang.da': 'Danish',
    'lang.en': 'English',
    'nav.label': 'Main menu',
    'nav.toggle': 'Open menu',
    'nav.program': 'Programme',
    'nav.venue': 'Venue',
    'nav.practical': 'Practical',
    'nav.gifts': 'Gifts',
    'nav.rsvp': 'RSVP',
    'nav.home': 'Home',
    'lightbox.close': 'Close the picture',

    'hero.dateline': '— 12 June 2027 —',
    'hero.tagline': 'are getting married!',
    'hero.venue': 'Gl. Skovridergaard · Silkeborg · 11–13 June',
    'hero.scene.alt':
      'Watercolour of the Silkeborg lakes, wooded headlands mirrored in still water',
    'hero.cta': 'RSVP',

    'countdown.title': 'Counting down',
    'countdown.days': 'days',
    'countdown.hours': 'hours',
    'countdown.minutes': 'minutes',
    'countdown.seconds': 'seconds',
    'countdown.today': 'Today is the day!',
    'countdown.past': 'Thank you for celebrating with us',

    'welcome.eyebrow': 'Welcome',
    'welcome.body':
      "After many good years together we are finally saying yes to each other — and we cannot imagine doing it without you. We have booked all of Gl. Skovridergaard for an entire weekend, so there is time to see everyone, eat well, dance late and sleep in afterwards.",
    'welcome.signature': 'Love, Cecilie & Esben',

    'program.eyebrow': 'Programme',
    'program.title': 'The plan for the weekend',
    'program.intro':
      'You are welcome from Friday 11 June. Come when it suits you — and stay as long as you can.',
    'program.link': 'See the plan as a flyer',

    'program.fri.day': 'Friday',
    'program.fri.date': '11 June 2027',
    'program.fri.title': 'Arrival & barbecue',
    'program.fri.1.time': '17.00',
    'program.fri.1.title': 'Arrival & a Friday drink',
    'program.fri.1.text':
      'The doors are open from 5pm. Check in, get a drink in your hand, and join a game in the garden whenever you feel like it.',
    'program.fri.2.time': '19.00–21.00',
    'program.fri.2.title': 'The grill is on',
    'program.fri.2.text':
      'Dinner off the grill — but no sit-down dinner. No seating plan, no speeches, no fixed times: the grill runs for two hours, so drop in when it suits you and eat when you get hungry.',
    'program.fri.note': 'You are welcome from Friday, so do take the whole weekend with us.',

    'program.sat.day': 'Saturday',
    'program.sat.date': '12 June 2027',
    'program.sat.title': 'The wedding day',
    'program.sat.1.time': '09.00',
    'program.sat.1.title': 'Morning swim & champagne',
    'program.sat.1.text':
      'We jump in the lake and toast with champagne afterwards. A towel and good spirits are all you need.',
    'program.sat.2.time': '09.30–11.00',
    'program.sat.2.title': 'Breakfast',
    'program.sat.2.text': 'A long breakfast table. Take your time — it is a long day.',
    'program.sat.3.time': '13.00',
    'program.sat.3.title': 'The ceremony',
    'program.sat.3.text': 'We get married. Please be seated in good time beforehand.',
    'program.sat.4.time': '13.45',
    'program.sat.4.title': 'Lunch, coffee & cake',
    'program.sat.4.text': 'Congratulations, lunch and cake through the afternoon.',
    'program.sat.5.time': '15.00',
    'program.sat.5.title': 'Boat trip on the lakes',
    'program.sat.5.text': 'We sail out on the Silkeborg lakes together. Bring a jumper.',
    'program.sat.6.time': '17.30',
    'program.sat.6.title': 'Wedding dinner',
    'program.sat.6.text': 'Dinner, speeches and everything that comes with it.',
    'program.sat.7.time': 'Before midnight',
    'program.sat.7.title': 'Cocktails & dancing',
    'program.sat.7.text': 'The bar opens and the floor is cleared.',
    'program.sat.8.time': '02.00',
    'program.sat.8.title': 'Late-night food',
    'program.sat.8.text': 'Something warm for everyone still dancing.',
    'program.sat.note': 'And then the party carries on until the last guest goes home.',

    'program.sun.day': 'Sunday',
    'program.sun.date': '13 June 2027',
    'program.sun.title': 'Farewell',
    'program.sun.1.time': '09.00–11.00',
    'program.sun.1.title': 'Breakfast',
    'program.sun.1.text': 'One last table together before we say goodbye.',
    'program.sun.2.time': 'By 13.00',
    'program.sun.2.title': 'Check-out',
    'program.sun.2.text':
      'Rooms need to be empty by 1pm. Do not leave without giving us a hug.',
    'program.sun.note':
      'Nothing scheduled. Sleep in, eat well, and say your goodbyes at your own pace.',

    'inv.eyebrow': 'The invitation',
    'inv.intro':
      'A4 landscape, folded as a gatefold: the two flaps open outwards. Print double-sided — flip on the long edge — and fold the flaps in towards the middle.',
    'inv.print': 'Print the invitation',
    'inv.link': 'See the invitation',
    'inv.side.a': 'Sheet side 1 · inside',
    'inv.side.b': 'Sheet side 2 · outside',
    'inv.fold.note':
      'The fold marks print as small pale ticks at the top and bottom edges — fold along them and they vanish into the crease.',

    'inv.main.eyebrow': 'On the occasion of our wedding',
    'inv.main.invite': 'We would be delighted to see you when we say yes to each other',
    'inv.main.date': 'Saturday 12 June 2027 · 13.00',
    'inv.main.venue': 'Gl. Skovridergaard',
    'inv.main.address': 'Marienlundsvej 36 · 8600 Silkeborg, Denmark',
    'inv.main.weekend':
      'We are celebrating all weekend — from Friday 11 to Sunday 13 June.',
    'inv.main.closing': 'We look forward to seeing you',

    'inv.practical.title': 'Practical',
    'inv.practical.1.label': 'Where',
    'inv.practical.1.value': 'Gl. Skovridergaard · Marienlundsvej 36 · 8600 Silkeborg',
    'inv.practical.2.label': 'Accommodation',
    'inv.practical.2.value':
      'There are rooms at the estate for everyone staying the weekend. Tell us in your reply which nights you would like.',
    'inv.practical.3.label': 'Dress code',
    'inv.practical.3.value':
      'Festive. The ceremony and reception are outdoors on grass — choose your shoes accordingly.',
    'inv.practical.4.label': 'RSVP',
    'inv.practical.4.value': 'By 1 March 2027 at the latest',
    'inv.practical.web.label': 'Reply and full details',

    'inv.program.title': 'The programme',
    'inv.program.note': 'All times are approximate.',

    'inv.back.text':
      'The full programme, practical details and the reply form are all at',
    'inv.cover.date': '12 June 2027',
    'inv.cover.weekend': 'Wedding weekend · 11–13 June',
    'inv.web': 'cecilieesben.dk',

    'plan.eyebrow': 'The plan',
    'plan.title': 'Wedding weekend',
    'plan.dates': '11–13 June 2027',
    'plan.intro':
      'The whole weekend on one page. Print it, or keep it on your phone — it is made to fill an A6 flyer.',
    'plan.print': 'Print the plan',
    'plan.back': 'Back to the front page',
    'plan.footer': 'Gl. Skovridergaard · Marienlundsvej 36 · 8600 Silkeborg, Denmark',

    'venue.eyebrow': 'The venue',
    'venue.title': 'Gl. Skovridergaard',
    'venue.teaser':
      'A former forester’s estate from 1798 in the middle of the Danish Lake District — with its own park, the forest next door and Lake Almindsø a short walk away.',
    'venue.cta': 'See the venue',

    'venuepage.eyebrow': 'The venue',
    'venuepage.title': 'Gl. Skovridergaard',
    'venuepage.lead':
      'The whole wedding weekend takes place at Gl. Skovridergaard just outside Silkeborg. The estate dates back to 1798 and sits in the heart of the mid-Jutland lake highlands — with its own park, the Silkeborg forests next door and Lake Almindsø within walking distance. Today it is a hotel and conference centre, so every guest can sleep in the same place we celebrate.',
    'venuepage.gallery.title': 'Pictures from the venue',
    'venuepage.shot.1': 'The main house',
    'venuepage.shot.2': 'The house in the park',
    'venuepage.shot.3': 'The garden room',
    'venuepage.shot.4': 'The restaurant',
    'venuepage.shot.5': 'The rooms',
    'venuepage.shot.6': 'The rings in Almindsø',
    'venuepage.shot.7': 'The 1798 weather vane',
    'venuepage.gallery.note':
      'The photographs are the hotel’s own. More will follow after our next visit.',
    'venuepage.facts.title': 'In brief',
    'venuepage.fact.1.label': 'Address',
    'venuepage.fact.1.value': 'Marienlundsvej 36, 8600 Silkeborg, Denmark',
    'venuepage.fact.2.label': 'Since 1798',
    'venuepage.fact.2.value': 'A former forester’s estate and spa, today a hotel',
    'venuepage.fact.3.label': 'Surroundings',
    'venuepage.fact.3.value': 'Its own park, forest, the Gudenå river and Lake Almindsø nearby',
    'venuepage.fact.4.label': 'Accommodation',
    'venuepage.fact.4.value': 'Single and double rooms plus junior suites on site',
    'venuepage.fact.5.label': 'Parking',
    'venuepage.fact.5.value': 'Free parking and EV charging points',
    'venuepage.fact.6.label': 'Into town',
    'venuepage.fact.6.value': 'Silkeborg town centre is within walking distance',
    'venuepage.map': 'Open in Google Maps',
    'venuepage.website': 'The hotel’s website',
    'venuepage.around.title': 'If you have time to spare',
    'venuepage.around.body':
      'The weekend is long enough for more than a party. Walk in the forest, swim in Lake Almindsø, rent a bike through the lake highlands, or visit Museum Jorn and Silkeborg Bad Art Centre, both a few minutes away.',
    'venuepage.back': 'Back to the front page',

    'travel.hint': 'Hover a photograph to see where it was taken — click to open it.',
    'travel.island.place': 'Jökulsárlón',
    'travel.island.country': 'Iceland',
    'travel.island.alt':
      'Cecilie and Esben in front of the icebergs in the Jökulsárlón glacier lagoon',
    'travel.budapest.place': 'Budapest',
    'travel.budapest.country': 'Hungary',
    'travel.budapest.alt':
      'Cecilie and Esben on a wall overlooking the Danube and Budapest',
    'travel.kitzbuhel.place': 'Kitzbühel',
    'travel.kitzbuhel.country': 'Austria',
    'travel.kitzbuhel.alt':
      'Cecilie and Esben on a sunny mountain hut terrace with a beer each',
    'travel.monza.place': 'Monza',
    'travel.monza.country': 'Italy',
    'travel.monza.alt':
      'Cecilie and Esben in the grandstand at the Monza Formula 1 race',
    'travel.zanzibar.place': 'Nungwi',
    'travel.zanzibar.country': 'Zanzibar',
    'travel.zanzibar.alt':
      'Cecilie and Esben at the breakfast table with a Danish flag on the beach in Nungwi',
    'travel.uganda.place': 'Murchison Falls',
    'travel.uganda.country': 'Uganda',
    'travel.uganda.alt':
      'Cecilie and Esben on the savannah with giraffes behind them',
    'travel.thailand.place': 'Chiang Mai',
    'travel.thailand.country': 'Thailand',
    'travel.thailand.alt':
      'Cecilie and Esben in the water beside an elephant',
    'travel.teotihuacan.place': 'Teotihuacán',
    'travel.teotihuacan.country': 'Mexico',
    'travel.teotihuacan.alt':
      'Cecilie and Esben in a hot air balloon above Teotihuacán at sunrise',
    'travel.galapagos.place': 'Galápagos',
    'travel.galapagos.country': 'Ecuador',
    'travel.galapagos.alt':
      'Cecilie and Esben having dinner by the water at sunset',
    'travel.brasilien.place': 'Rio de Janeiro',
    'travel.brasilien.country': 'Brazil',
    'travel.brasilien.alt':
      'Cecilie and Esben in front of a mural reading Brasil',
    'travel.patagonien.place': 'El Chaltén',
    'travel.patagonien.country': 'Argentina',
    'travel.patagonien.alt':
      'Cecilie and Esben with Mount Fitz Roy behind them',
    'travel.torres.place': 'Torres del Paine',
    'travel.torres.country': 'Chile',
    'travel.torres.alt':
      'Cecilie and Esben in their tent on a wooden platform in the forest',

    'us.eyebrow': 'The two of us',
    'us.title': 'How we got here',
    'us.intro':
      'We have travelled, eaten, hiked and slept in tents together for many years. Here are twelve moments along the way — and on 12 June we gather all of you in one place.',

    'around.eyebrow': 'The Lake District',
    'around.title': 'The country around us',
    'around.intro':
      'The estate sits in the middle of what people drive a long way to see. Here are five of our favourite places within a short trip of Gl. Skovridergaard.',
    'fig.soerne.title': 'Silkeborgsøerne',
    'fig.soerne.text':
      'Ni søer på stribe langs Gudenåen, fra byen og hele vejen ud til Himmelbjerget. Lej en kano, hop i fra en badebro, eller sæt jer på bredden og se på — vandet er aldrig langt væk.',
    'fig.soerne.alt':
      'Akvarel af Silkeborgsøerne med skovklædte odder, der spejler sig i det blanke vand',
    'fig.himmelbjerget.title': 'Himmelbjerget',
    'fig.himmelbjerget.text':
      'Danmarks mest berømte bakke — 147 meter, med Julsø bredt ud nedenfor. Tårnet på toppen er fra 1875, og sidst på sommeren blomstrer lyngen hele vejen rundt om det.',
    'fig.himmelbjerget.alt':
      'Akvarel af Himmelbjergtårnet med udsigt ud over skoven og Julsø',
    'fig.soerne.title': 'The Silkeborg lakes',
    'fig.soerne.text':
      'Nine lakes strung along the Gudenå, from the town all the way out to Himmelbjerget. Rent a canoe, jump in off a jetty, or just sit on the bank and watch — the water is never far away.',
    'fig.soerne.alt':
      'Watercolour of the Silkeborg lakes, wooded headlands mirrored in still water',
    'fig.himmelbjerget.title': 'Himmelbjerget',
    'fig.himmelbjerget.text':
      'Denmark’s most famous hill — 147 metres, with Julsø spread out below. The tower on top dates from 1875, and late in the summer the heather flowers all around it.',
    'fig.himmelbjerget.alt':
      'Watercolour of the Himmelbjerget tower looking out over the forest and Julsø',
    'fig.hjejlen.title': 'Hjejlen',
    'fig.hjejlen.text':
      'The world’s oldest coal-fired paddle steamer has sailed from Silkeborg to Himmelbjerget since 1861. The trip takes an hour and a half — and is still the loveliest way to see the lakes.',
    'fig.hjejlen.alt': 'Watercolour of the paddle steamer Hjejlen on the Silkeborg lakes',
    'fig.ringene.title': 'The rings in Almindsø',
    'fig.ringene.text':
      'Østre Søbad is a few minutes’ walk from the estate: two circular timber jetties out in the lake — one over shallow water, the other deep enough to dive into. Bring swimwear.',
    'fig.ringene.alt':
      'Watercolour of the two circular bathing jetties at Almindsø seen from above',
    'fig.bakkerne.title': 'Sindbjerg & Stoubjerg',
    'fig.bakkerne.text':
      'The heather hills above Sejs-Svejbæk. From the top you look out over Lake Julsø and Himmelbjerget — and by late summer the whole slope turns purple with heather.',
    'fig.bakkerne.alt':
      'Watercolour of the heather hills Sindbjerg and Stoubjerg near Sejs-Svejbæk',

    'practical.eyebrow': 'Practical',
    'practical.title': 'What you need to know',
    'practical.1.title': 'Accommodation',
    'practical.1.body':
      'We have reserved rooms at Gl. Skovridergaard for everyone staying the weekend. Tell us in the form which nights you would like, and we will allocate the rooms.',
    'practical.2.title': 'Getting there',
    'practical.2.body':
      'You can drive all the way — about 45 minutes from Aarhus. The nearest airport is Billund, and that is also about a 45-minute drive. If you come by train, get off at Silkeborg Station and tell us — we will come and collect you.',
    'practical.3.title': 'Dress code',
    'practical.3.body':
      'Festive. The ceremony and reception are outdoors on grass, so choose your shoes accordingly — and bring a layer for the evening in the park.',
    'practical.4.title': 'Dietary needs',
    'practical.4.body':
      'If you have allergies, or there is something you do not eat, put it in the form. The kitchen is happy to make alternatives — we just need to know in good time.',
    'practical.5.title': 'Speeches & performances',
    'practical.5.body':
      'If you would like to give a speech or perform something, please contact our toastmaster in good time.',
    'practical.5.contact': 'Toastmaster: name and phone number to follow',
    'practical.6.title': 'Questions',
    'practical.6.body': 'You are always welcome to write or call us.',
    'practical.6.contact': 'bryllup@example.dk',

    'gifts.eyebrow': 'Gifts',
    'gifts.title': 'Wish list',
    'gifts.body':
      'The greatest gift is that you come and celebrate the day with us. If you would still like to give something, we are putting together a wish list, and it will appear here.',
    'gifts.link': 'See the wish list',
    'gifts.note': 'The wish list is on its way — we will put it up in good time before the wedding.',

    'rsvp.eyebrow': 'RSVP',
    'rsvp.title': 'Will you be there?',
    'rsvp.deadline': 'Please reply no later than 1 March 2027.',
    'rsvp.name': 'Name(s)',
    'rsvp.name.placeholder': 'E.g. Anne and Peter Hansen',
    'rsvp.email': 'Email',
    'rsvp.email.placeholder': 'name@example.com',
    'rsvp.phone': 'Phone',
    'rsvp.phone.placeholder': 'Optional',
    'rsvp.attending.legend': 'Are you coming?',
    'rsvp.attending.yes': 'Yes, we will be there',
    'rsvp.attending.no': 'Sadly not',
    'rsvp.days.legend': 'Which days will you join?',
    'rsvp.days.fri': 'Friday 11 June',
    'rsvp.days.sat': 'Saturday 12 June',
    'rsvp.days.sun': 'Sunday 13 June',
    'rsvp.guests': 'Number of guests',
    'rsvp.overnight.legend': 'Staying at Gl. Skovridergaard',
    'rsvp.overnight.fri': 'Friday night',
    'rsvp.overnight.sat': 'Saturday night',
    'rsvp.diet': 'Allergies or dietary requirements',
    'rsvp.diet.placeholder': 'E.g. vegetarian, nut allergy, gluten free',
    'rsvp.song': 'Which song gets you onto the dance floor?',
    'rsvp.song.placeholder': 'Artist – title',
    'rsvp.message': 'A message to us',
    'rsvp.message.placeholder': 'Optional',
    'rsvp.submit': 'Send reply',
    'rsvp.sending': 'Sending …',
    'rsvp.success': 'Thank you! We have received your reply and look forward to seeing you.',
    'rsvp.success.mail':
      'Your mail app is opening with the reply. Press send and you are signed up.',
    'rsvp.error': 'Something went wrong. Please try again, or write to us directly.',
    'rsvp.error.name': 'Please enter your name(s).',
    'rsvp.error.email': 'Please enter a valid email address.',
    'rsvp.error.attending': 'Please tell us whether you are coming.',
    'rsvp.error.days': 'Please choose at least one day.',

    'footer.title': 'We look forward to seeing you',
    'footer.names': 'Cecilie & Esben',
    'footer.date': '12 June 2027 · Gl. Skovridergaard, Silkeborg',
  },
};

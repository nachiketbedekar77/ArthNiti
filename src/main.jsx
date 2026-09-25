import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft, ArrowRight, BarChart3, Check, CheckCircle2, ChevronDown, Calculator,
  ClipboardCheck, FileCheck2, HeartPulse, Info, Landmark, LifeBuoy, Menu, Search,
  ShieldCheck, Sparkles, TrendingUp, Wallet, X,
} from 'lucide-react'
import './index.css'

const money = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value)
const crores = (value) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(value / 10000000)

const languageOptions = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'te', label: 'Telugu', native: 'తెలుగు' },
]

const copy = {
  en: {
    profile: 'User Profile Setup', profileHint: 'Personalise your recommendations for a sharper financial plan.',
    age: 'Age', income: 'Annual income', dependents: 'Dependents', cityTier: 'City tier',
    completion: 'Profile completion', completionHint: 'Your profile powers every recommendation on this page.',
    cockpit: 'Financial cockpit', greeting: 'Good morning, Arjun.', subtitle: 'A clear view of your money, protection and public benefits.',
    synced: 'Profile synced just now', taxTab: 'Tax & Wealth Optimizer', protectionTab: 'Protection Engine', civicTab: 'Civic Navigator',
    personalised: 'Personalised for you', taxSnapshot: 'Your tax snapshot', taxTitle: 'Choose the route that works harder.',
    taxCopy: 'Compare your estimated tax liability and make informed decisions before the financial year closes.',
    oldTax: 'Old Regime Tax', newTax: 'New Regime Tax', recommended: 'Recommended', saving: 'estimated annual saving',
    seeCalculation: 'See full calculation', deductions: 'Build your deductions', actions: 'Recommended tax-saving actions',
    investUpTo: 'Invest up to', lifeRecommendation: 'Actuarial Recommendation', lifeTitle: 'A safety net, designed around you.',
    lifeCopy: 'Your protection plan balances your family’s needs, location and income replacement requirements.',
    termLife: 'Term Life Cover', health: 'Health Cover', explorePlans: 'Explore plans', priority: 'Priority cover',
    civicEyebrow: 'Public benefits, simplified', civicTitle: 'Find support you can act on.',
    civicCopy: 'Explore government schemes matched to your profile, with the paperwork clearly laid out.',
    matches: 'relevant matches', search: 'Search schemes, housing, healthcare...', eligibility: 'View eligibility',
    back: 'Back to your dashboard', eligibilityGuide: 'Eligibility guide', taxReport: 'Tax planning report',
    actionPlan: 'Personalised action plan', checklist: 'Eligibility checklist', download: 'Download checklist',
    start: 'Start application', taxCalculation: 'Your tax calculation', nextSteps: 'Next steps',
    downloadTax: 'Download tax report', continuePlan: 'Continue with this plan', compare: 'Compare plans',
    officialPortal: 'You’ll be taken to the official government portal in a new tab.',
    docs: 'Documents to keep ready', noMatch: 'No schemes match your search.',
  },
  mr: {
    profile: 'वापरकर्ता प्रोफाइल सेटअप', profileHint: 'अधिक अचूक आर्थिक शिफारसींसाठी तुमचे प्रोफाइल वैयक्तिकृत करा.',
    age: 'वय', income: 'वार्षिक उत्पन्न', dependents: 'अवलंबित व्यक्ती', cityTier: 'शहराचा स्तर',
    completion: 'प्रोफाइल पूर्णता', completionHint: 'तुमचे प्रोफाइल या पृष्ठावरील प्रत्येक शिफारसीला सामर्थ्य देते.',
    cockpit: 'आर्थिक डॅशबोर्ड', greeting: 'सुप्रभात, अर्जुन.', subtitle: 'तुमचे पैसे, संरक्षण आणि सरकारी लाभ यांचा स्पष्ट आढावा.',
    synced: 'प्रोफाइल आत्ताच सिंक केले', taxTab: 'कर आणि संपत्ती ऑप्टिमायझर', protectionTab: 'संरक्षण इंजिन', civicTab: 'नागरी नेव्हिगेटर',
    personalised: 'तुमच्यासाठी वैयक्तिकृत', taxSnapshot: 'तुमचा कर आढावा', taxTitle: 'तुमच्यासाठी योग्य मार्ग निवडा.',
    taxCopy: 'अंदाजे कराची तुलना करा आणि आर्थिक वर्ष संपण्यापूर्वी योग्य निर्णय घ्या.', oldTax: 'जुना कर पद्धत', newTax: 'नवीन कर पद्धत',
    recommended: 'शिफारस', saving: 'अंदाजे वार्षिक बचत', seeCalculation: 'संपूर्ण गणना पहा', deductions: 'कर वजावटी तयार करा',
    actions: 'शिफारस केलेल्या कर-बचत कृती', investUpTo: 'गुंतवणूक मर्यादा', lifeRecommendation: 'अॅक्च्युरियल शिफारस',
    lifeTitle: 'तुमच्यासाठी तयार केलेले सुरक्षा कवच.', lifeCopy: 'तुमच्या कुटुंबाच्या गरजा, ठिकाण आणि उत्पन्नाची जागा यांचा समतोल साधणारे संरक्षण.',
    termLife: 'मुदत जीवन विमा', health: 'आरोग्य विमा', explorePlans: 'योजना पहा', priority: 'प्राधान्य संरक्षण',
    civicEyebrow: 'सरकारी लाभ, सोप्या पद्धतीने', civicTitle: 'तुमच्यासाठी उपलब्ध मदत शोधा.', civicCopy: 'तुमच्या प्रोफाइलशी जुळणाऱ्या सरकारी योजना आणि आवश्यक कागदपत्रे पाहा.',
    matches: 'जुळणाऱ्या योजना', search: 'योजना, घरकुल, आरोग्य शोधा...', eligibility: 'पात्रता पहा', back: 'डॅशबोर्डवर परत',
    eligibilityGuide: 'पात्रता मार्गदर्शक', taxReport: 'कर नियोजन अहवाल', actionPlan: 'वैयक्तिक कृती योजना', checklist: 'पात्रता तपासणी',
    download: 'तपासणी डाउनलोड करा', start: 'अर्ज सुरू करा', taxCalculation: 'तुमची कर गणना', nextSteps: 'पुढील पावले',
    downloadTax: 'कर अहवाल डाउनलोड करा', continuePlan: 'या योजनेसह पुढे जा', compare: 'योजनांची तुलना करा',
    officialPortal: 'तुम्हाला अधिकृत सरकारी पोर्टलवर नवीन टॅबमध्ये नेले जाईल.', docs: 'तयार ठेवायची कागदपत्रे', noMatch: 'तुमच्या शोधाशी जुळणाऱ्या योजना नाहीत.',
  },
  hi: {
    profile: 'यूज़र प्रोफ़ाइल सेटअप', profileHint: 'बेहतर वित्तीय सुझावों के लिए अपनी प्रोफ़ाइल को व्यक्तिगत बनाएं.', age: 'उम्र', income: 'वार्षिक आय', dependents: 'आश्रित', cityTier: 'शहर का स्तर',
    completion: 'प्रोफ़ाइल पूर्णता', completionHint: 'आपकी प्रोफ़ाइल इस पेज के हर सुझाव को बेहतर बनाती है.', cockpit: 'वित्तीय डैशबोर्ड', greeting: 'सुप्रभात, अर्जुन.', subtitle: 'आपके पैसे, सुरक्षा और सरकारी लाभों का स्पष्ट दृश्य.',
    synced: 'प्रोफ़ाइल अभी सिंक हुई', taxTab: 'टैक्स और वेल्थ ऑप्टिमाइज़र', protectionTab: 'प्रोटेक्शन इंजन', civicTab: 'सिविक नेविगेटर', personalised: 'आपके लिए व्यक्तिगत',
    taxSnapshot: 'आपका टैक्स सारांश', taxTitle: 'वह रास्ता चुनें जो आपके लिए बेहतर काम करे.', taxCopy: 'अनुमानित टैक्स की तुलना करें और वित्तीय वर्ष समाप्त होने से पहले सही निर्णय लें.',
    oldTax: 'पुरानी टैक्स व्यवस्था', newTax: 'नई टैक्स व्यवस्था', recommended: 'सुझाव', saving: 'अनुमानित वार्षिक बचत', seeCalculation: 'पूरी गणना देखें', deductions: 'टैक्स बचत बनाएं', actions: 'सुझाई गई टैक्स-बचत गतिविधियां', investUpTo: 'निवेश सीमा',
    lifeRecommendation: 'एक्चुरियल सुझाव', lifeTitle: 'आपके लिए तैयार सुरक्षा कवच.', lifeCopy: 'आपके परिवार, स्थान और आय की जरूरतों के अनुसार सुरक्षा योजना.', termLife: 'टर्म लाइफ कवर', health: 'हेल्थ कवर', explorePlans: 'प्लान देखें', priority: 'प्राथमिकता कवर',
    civicEyebrow: 'सरकारी लाभ, सरल तरीके से', civicTitle: 'वह सहायता खोजें जिस पर आप कार्रवाई कर सकें.', civicCopy: 'आपकी प्रोफ़ाइल से मेल खाने वाली सरकारी योजनाएं और कागज़ात देखें.', matches: 'मेल खाने वाले परिणाम', search: 'योजना, घर, स्वास्थ्य खोजें...', eligibility: 'पात्रता देखें',
    back: 'डैशबोर्ड पर वापस', eligibilityGuide: 'पात्रता गाइड', taxReport: 'टैक्स योजना रिपोर्ट', actionPlan: 'व्यक्तिगत कार्रवाई योजना', checklist: 'पात्रता चेकलिस्ट', download: 'चेकलिस्ट डाउनलोड करें', start: 'आवेदन शुरू करें', taxCalculation: 'आपकी टैक्स गणना', nextSteps: 'अगले कदम', downloadTax: 'टैक्स रिपोर्ट डाउनलोड करें', continuePlan: 'इस योजना के साथ आगे बढ़ें', compare: 'प्लान की तुलना करें', officialPortal: 'आपको नए टैब में आधिकारिक सरकारी पोर्टल पर ले जाया जाएगा.', docs: 'तैयार रखने वाले दस्तावेज़', noMatch: 'आपकी खोज से मेल खाने वाली कोई योजना नहीं मिली.',
  },
}

copy.kn = { ...copy.en, profile: 'ಬಳಕೆದಾರರ ಪ್ರೊಫೈಲ್ ಸೆಟಪ್', profileHint: 'ಉತ್ತಮ ಹಣಕಾಸು ಸಲಹೆಗಳಿಗಾಗಿ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ವೈಯಕ್ತೀಕರಿಸಿ.', age: 'ವಯಸ್ಸು', income: 'ವಾರ್ಷಿಕ ಆದಾಯ', dependents: 'ಅವಲಂಬಿತರು', cityTier: 'ನಗರದ ಹಂತ', completion: 'ಪ್ರೊಫೈಲ್ ಪೂರ್ಣತೆ', cockpit: 'ಹಣಕಾಸು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', greeting: 'ಶುಭೋದಯ, ಅರ್ಜುನ್.', subtitle: 'ನಿಮ್ಮ ಹಣ, ರಕ್ಷಣೆ ಮತ್ತು ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳ ಸ್ಪಷ್ಟ ನೋಟ.', taxTab: 'ತೆರಿಗೆ ಮತ್ತು ಸಂಪತ್ತು', protectionTab: 'ರಕ್ಷಣೆ ಎಂಜಿನ್', civicTab: 'ನಾಗರಿಕ ನ್ಯಾವಿಗೇಟರ್', personalised: 'ನಿಮಗಾಗಿ ವೈಯಕ್ತಿಕ', taxSnapshot: 'ನಿಮ್ಮ ತೆರಿಗೆ ಸಾರಾಂಶ', taxTitle: 'ನಿಮಗೆ ಉತ್ತಮವಾಗಿ ಕೆಲಸ ಮಾಡುವ ಮಾರ್ಗ ಆರಿಸಿ.', lifeRecommendation: 'ಆಕ್ಚುರಿಯಲ್ ಶಿಫಾರಸು', lifeTitle: 'ನಿಮಗಾಗಿ ರೂಪಿಸಿದ ಸುರಕ್ಷತಾ ಜಾಲ.', health: 'ಆರೋಗ್ಯ ರಕ್ಷಣೆ', termLife: 'ಅವಧಿ ಜೀವ ವಿಮೆ', civicTitle: 'ನೀವು ಬಳಸಬಹುದಾದ ಸಹಾಯ ಹುಡುಕಿ.', eligibility: 'ಅರ್ಹತೆ ನೋಡಿ', back: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ', download: 'ಚೆಕ್‌ಲಿಸ್ಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', start: 'ಅರ್ಜಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ', compare: 'ಯೋಜನೆಗಳನ್ನು ಹೋಲಿಸಿ' }
copy.ta = { ...copy.en, profile: 'பயனர் சுயவிவர அமைப்பு', profileHint: 'சிறந்த நிதி பரிந்துரைகளுக்காக உங்கள் சுயவிவரத்தை தனிப்பயனாக்குங்கள்.', age: 'வயது', income: 'ஆண்டு வருமானம்', dependents: 'சார்ந்தவர்கள்', cityTier: 'நகர வகை', completion: 'சுயவிவர நிறைவு', cockpit: 'நிதி டாஷ்போர்டு', greeting: 'காலை வணக்கம், அர்ஜுன்.', subtitle: 'உங்கள் பணம், பாதுகாப்பு மற்றும் அரசு நலன்களின் தெளிவான பார்வை.', taxTab: 'வரி மற்றும் செல்வம்', protectionTab: 'பாதுகாப்பு இயந்திரம்', civicTab: 'குடிமக்கள் வழிகாட்டி', personalised: 'உங்களுக்காக தனிப்பயனாக்கப்பட்டது', taxSnapshot: 'உங்கள் வரி சுருக்கம்', taxTitle: 'உங்களுக்கு சிறப்பாக செயல்படும் வழியை தேர்வு செய்யுங்கள்.', lifeRecommendation: 'ஆக்சுவரியல் பரிந்துரை', lifeTitle: 'உங்களுக்காக வடிவமைக்கப்பட்ட பாதுகாப்பு.', health: 'சுகாதார பாதுகாப்பு', termLife: 'கால ஆயுள் காப்பீடு', civicTitle: 'நீங்கள் பயன்படுத்தக்கூடிய உதவியை கண்டறியுங்கள்.', eligibility: 'தகுதியை காண்க', back: 'டாஷ்போர்டுக்கு திரும்பு', download: 'சரிபார்ப்பு பட்டியலை பதிவிறக்கு', start: 'விண்ணப்பத்தை தொடங்கு', compare: 'திட்டங்களை ஒப்பிடு' }
copy.te = { ...copy.en, profile: 'వినియోగదారు ప్రొఫైల్ సెటప్', profileHint: 'మెరుగైన ఆర్థిక సూచనల కోసం మీ ప్రొఫైల్‌ను వ్యక్తిగతీకరించండి.', age: 'వయస్సు', income: 'వార్షిక ఆదాయం', dependents: 'ఆధారితులు', cityTier: 'నగర స్థాయి', completion: 'ప్రొఫైల్ పూర్తి', cockpit: 'ఆర్థిక డ్యాష్‌బోర్డ్', greeting: 'శుభోదయం, అర్జున్.', subtitle: 'మీ డబ్బు, రక్షణ మరియు ప్రభుత్వ ప్రయోజనాల స్పష్టమైన వీక్షణ.', taxTab: 'పన్ను మరియు సంపద', protectionTab: 'రక్షణ ఇంజిన్', civicTab: 'సివిక్ నావిగేటర్', personalised: 'మీ కోసం వ్యక్తిగతీకరించబడింది', taxSnapshot: 'మీ పన్ను సారాంశం', taxTitle: 'మీకు మెరుగ్గా పనిచేసే మార్గాన్ని ఎంచుకోండి.', lifeRecommendation: 'యాక్చువేరియల్ సిఫార్సు', lifeTitle: 'మీ కోసం రూపొందించిన భద్రతా వలయం.', health: 'ఆరోగ్య కవర్', termLife: 'టర్మ్ లైఫ్ కవర్', civicTitle: 'మీరు ఉపయోగించగల సహాయాన్ని కనుగొనండి.', eligibility: 'అర్హతను చూడండి', back: 'డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి', download: 'చెక్‌లిస్ట్ డౌన్‌లోడ్ చేయండి', start: 'దరఖాస్తు ప్రారంభించండి', compare: 'ప్లాన్‌లను పోల్చండి' }

const officialLinks = {
  'PM Mudra Yojana': 'https://www.udyamimitra.in/',
  'PM Awas Yojana': 'https://pmaymis.gov.in/PMAYMIS2_2024/PmayDefault.aspx',
  'Ayushman Bharat': 'https://beneficiary.nha.gov.in/',
}

function ExternalAction({ href, children, className = 'button-primary' }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function downloadChecklist(scheme) {
  downloadFile(`${scheme.title.toLowerCase().replaceAll(' ', '-')}-checklist.txt`, [
    `${scheme.title} — ArthNiti eligibility checklist`,
    '',
    `Match score: ${scheme.score}%`,
    '',
    'Documents to keep ready:',
    '- Aadhaar card linked to your mobile number',
    '- PAN card or valid identity proof',
    '- Latest income proof or salary slips',
    '- Active bank account details',
    '',
    `Official portal: ${officialLinks[scheme.title]}`,
  ].join('\n'))
}

function downloadTaxReport(tax, profile) {
  downloadFile('arthniti-tax-planning-report.txt', [
    'ArthNiti — Tax planning report',
    '',
    `Annual income: ${money(profile.income)}`,
    `Old Regime estimate: ${money(tax.oldTax)}`,
    `New Regime estimate: ${money(tax.newTax)}`,
    `Recommended regime: ${tax.recommended}`,
    `Estimated saving: ${money(tax.saved)}`,
    '',
    'This is a planning estimate, not tax advice. Verify final figures with a qualified tax professional.',
  ].join('\n'))
}

const tabs = [
  { id: 'optimizer', label: 'Tax & Wealth Optimizer', icon: Calculator },
  { id: 'protection', label: 'Protection Engine', icon: ShieldCheck },
  { id: 'civic', label: 'Civic Navigator', icon: Landmark },
]

function App() {
  const [profile, setProfile] = useState({ age: 31, income: 1800000, dependents: 2, cityTier: 'Tier 1' })
  const [language, setLanguage] = useState(() => localStorage.getItem('arthniti-language') || 'en')
  const [activeTab, setActiveTab] = useState('optimizer')
  const [page, setPage] = useState({ type: 'dashboard' })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')

  const tax = useMemo(() => calculateTax(profile.income), [profile.income])
  const schemes = useMemo(() => getSchemes(profile.income).filter((item) => {
    const text = `${item.title} ${item.tag}`.toLowerCase()
    return text.includes(query.toLowerCase())
  }), [profile.income, query])
  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }))
  const goTab = (id) => { setActiveTab(id); setPage({ type: 'dashboard' }); setMobileOpen(false) }
  const openDetail = (detail) => { setPage(detail); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const t = (key) => (copy[language] && copy[language][key]) || copy.en[key] || key
  const changeLanguage = (value) => { setLanguage(value); localStorage.setItem('arthniti-language', value) }

  return (
    <div className="min-h-screen bg-mist text-ink">
      <Sidebar profile={profile} update={update} language={language} changeLanguage={changeLanguage} t={t} mobileOpen={mobileOpen} close={() => setMobileOpen(false)} />
      {mobileOpen && <button aria-label="Close menu" className="mobile-scrim lg:hidden" onClick={() => setMobileOpen(false)} />}
      <main className="lg:pl-[292px]">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8 lg:px-12 lg:py-10">
          <MobileHeader open={() => setMobileOpen(true)} />
          {page.type === 'dashboard' ? (
            <>
              <header className="flex items-start justify-between gap-4">
                <div><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t('cockpit')}</div><h1 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{t('greeting')}</h1><p className="mt-2 text-sm text-slate-500">{t('subtitle')}</p></div>
                <div className="hidden items-center gap-3 sm:flex"><div className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 text-sm font-semibold text-white">AK</div><div><div className="text-sm font-semibold text-navy-950">Arjun Kapoor</div><div className="text-xs text-slate-500">{t('synced')}</div></div></div>
              </header>
              <nav className="mt-8 flex gap-1 overflow-x-auto border-b border-slate-200" aria-label="Primary">{tabs.map(({ id, icon: Icon }) => <button key={id} onClick={() => goTab(id)} className={`tab-button ${activeTab === id ? 'tab-active' : ''}`}><Icon size={17} />{t({ optimizer: 'taxTab', protection: 'protectionTab', civic: 'civicTab' }[id])}</button>)}</nav>
              {activeTab === 'optimizer' && <Optimizer profile={profile} tax={tax} openDetail={openDetail} t={t} />}
              {activeTab === 'protection' && <Protection profile={profile} openDetail={openDetail} t={t} />}
              {activeTab === 'civic' && <Civic query={query} setQuery={setQuery} schemes={schemes} openDetail={openDetail} t={t} />}
            </>
          ) : <DetailPage page={page} profile={profile} tax={tax} back={() => setPage({ type: 'dashboard' })} t={t} />}
        </div>
      </main>
    </div>
  )
}

function Sidebar({ profile, update, language, changeLanguage, t, mobileOpen, close }) {
  return <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
    <div className="flex items-center justify-between"><Brand /><button aria-label="Close menu" onClick={close} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"><X size={20} /></button></div>
    <div className="mt-12"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{t('profile')}</p><Info size={15} className="text-slate-500" /></div><p className="mt-2 text-sm leading-6 text-slate-400">{t('profileHint')}</p></div>
    <div className="mt-8 space-y-7">
      <Slider label={t('age')} value={profile.age} min={18} max={60} suffix=" yrs" onChange={(e) => update('age', Number(e.target.value))} />
      <Slider label={t('income')} value={profile.income} min={300000} max={5000000} step={50000} display={money(profile.income)} onChange={(e) => update('income', Number(e.target.value))} />
      <Slider label={t('dependents')} value={profile.dependents} min={0} max={5} onChange={(e) => update('dependents', Number(e.target.value))} />
      <div><label className="text-sm font-medium text-slate-200">{t('cityTier')}</label><div className="relative mt-2"><select value={profile.cityTier} onChange={(e) => update('cityTier', e.target.value)} className="input-dark appearance-none"><option>Tier 1</option><option>Tier 2</option><option>Tier 3</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-500" size={16} /></div></div>
      <div><label className="text-sm font-medium text-slate-200">Language / भाषा</label><div className="relative mt-2"><select value={language} onChange={(e) => changeLanguage(e.target.value)} className="input-dark appearance-none">{languageOptions.map((item) => <option key={item.id} value={item.id}>{item.native} · {item.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-500" size={16} /></div></div>
    </div>
    <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="flex items-center justify-between text-sm"><span className="text-slate-300">{t('completion')}</span><span className="font-semibold text-emerald-400">100%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full bg-emerald-500" /></div><p className="mt-3 text-xs leading-5 text-slate-500">{t('completionHint')}</p></div>
  </aside>
}

function Brand() {
  return <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-navy-950 shadow-lg shadow-emerald-500/20"><Landmark size={21} /></div><div><div className="text-xl font-bold tracking-tight">ArthNiti</div><div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Clarity for every rupee</div></div></div>
}
function MobileHeader({ open }) {
  return <div className="mb-5 flex items-center justify-between lg:hidden"><button aria-label="Open profile menu" onClick={open} className="rounded-xl border border-slate-200 bg-white p-2.5 text-navy-900 shadow-sm"><Menu size={20} /></button><BrandMobile /><div className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-xs font-semibold text-white">AK</div></div>
}
function BrandMobile() { return <div className="flex items-center gap-2 text-lg font-bold text-navy-950"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-navy-950"><Landmark size={17} /></span>ArthNiti</div> }
function Slider({ label, value, min, max, step = 1, suffix = '', display, onChange }) {
  return <div><div className="flex items-center justify-between"><label className="text-sm font-medium text-slate-200">{label}</label><span className="text-sm font-semibold text-emerald-400">{display || `${value}${suffix}`}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={onChange} className="mt-4 w-full" /></div>
}

function Optimizer({ profile, tax, openDetail, t }) {
  const gap = Math.max(0, 150000 - Math.round(profile.income * .08))
  return <section className="animate-in"><Intro eyebrow={t('taxSnapshot')} title={t('taxTitle')} copy={t('taxCopy')} t={t} /><div className="mt-7 grid gap-5 md:grid-cols-2"><TaxCard title={t('oldTax')} amount={tax.oldTax} recommended={tax.recommended === 'Old Regime'} description="Assuming standard ₹2L deductions applied." icon={Wallet} t={t} /><TaxCard title={t('newTax')} amount={tax.newTax} recommended={tax.recommended === 'New Regime'} description={tax.newTax === 0 ? 'Nil tax up to ₹12L taxable income under Section 87A rebate.' : 'New-regime slabs with ₹75,000 standard deduction.'} icon={TrendingUp} t={t} /></div><div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-white text-emerald-600 shadow-sm"><Check size={19} /></div><div><p className="text-sm font-semibold text-emerald-900">{money(tax.saved)} {t('saving')}</p><p className="mt-0.5 text-xs text-emerald-700">{t('recommended')}: {tax.recommended}</p></div></div><button onClick={() => openDetail({ type: 'tax', title: t('taxCalculation') })} className="button-secondary">{t('seeCalculation')} <ArrowRight size={15} /></button></div><div className="mt-12"><div className="flex items-end justify-between"><div><p className="eyebrow">{t('deductions')}</p><h2 className="mt-2 text-xl font-bold text-navy-950">{t('actions')}</h2></div><span className="text-xs font-medium text-slate-500">80C + 80D eligible</span></div><div className="mt-5 grid gap-4 md:grid-cols-3"><ActionCard icon="PPF" title="Public Provident Fund" desc="Long-term, tax-exempt wealth building." amount={gap} openDetail={openDetail} t={t} /><ActionCard icon="ELSS" title="ELSS mutual funds" desc="Tax-saving equity with 3-year lock-in." amount={Math.round(gap * .62)} openDetail={openDetail} t={t} /><ActionCard icon="+" title="Health insurance" desc="Protect your family and claim 80D." amount={30000} openDetail={openDetail} t={t} /></div></div></section>
}
function Intro({ eyebrow, title, copy, t }) { return <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-2xl font-bold text-navy-950">{title}</h2><p className="mt-2 max-w-xl text-sm text-slate-500">{copy}</p></div><div className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"><Sparkles size={14} />{t('personalised')}</div></div> }
function TaxCard({ title, amount, recommended, description, icon: Icon, t }) { return <div className={`relative rounded-2xl border bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift ${recommended ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'}`}>{recommended && <span className="absolute -top-3 right-5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{t('recommended')}</span>}<div className="flex items-center justify-between"><div className={`grid h-10 w-10 place-items-center rounded-xl ${recommended ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}><Icon size={19} /></div><span className="text-xs font-medium text-slate-400">FY 2024–25</span></div><p className="mt-6 text-sm font-medium text-slate-500">{title}</p><p className="mt-1 text-3xl font-bold tracking-tight text-navy-950">{money(amount)}</p><p className="mt-2 text-xs text-slate-400">{description}</p></div> }
function ActionCard({ icon, title, desc, amount, openDetail, t }) { return <button onClick={() => openDetail({ type: 'action', title, amount })} className="group text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-navy-700/20 hover:shadow-lift"><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-950 text-[10px] font-bold tracking-tight text-white">{icon}</span><ArrowRight size={16} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-navy-800" /></div><h3 className="mt-5 text-sm font-bold text-navy-950">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-500">{t('investUpTo')}</span><span className="text-sm font-bold text-emerald-600">{money(amount)}</span></div></button> }

function Protection({ profile, openDetail, t }) {
  const life = profile.dependents ? Math.max(10000000, profile.income * 10) : profile.income * 5
  const health = profile.cityTier === 'Tier 1' ? 1000000 : profile.cityTier === 'Tier 2' ? 750000 : 500000
  return <section className="animate-in"><Intro eyebrow={t('lifeRecommendation')} title={t('lifeTitle')} copy={t('lifeCopy')} t={t} /><div className="mt-8 grid gap-5 xl:grid-cols-2"><ProtectionCard type={t('termLife')} icon={LifeBuoy} amount={life} accent="navy" onClick={() => openDetail({ type: 'life', amount: life })} t={t} bullets={[profile.dependents ? `Supports ${profile.dependents} dependents if income stops unexpectedly.` : 'Creates an income replacement buffer for your future family.', 'Keeps education and long-term goals on track.', 'Suggested tenure: up to age 65.']} /><ProtectionCard type={t('health')} icon={HeartPulse} amount={health} accent="emerald" onClick={() => openDetail({ type: 'health', amount: health })} t={t} bullets={[`${profile.cityTier} medical costs are reflected in this cover estimate.`, 'Covers hospitalisation, daycare and pre/post care.', 'Consider a super top-up after your first policy year.']} /></div><div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex gap-3"><FileCheck2 size={18} className="mt-0.5 text-emerald-600" /><div><p className="text-sm font-semibold text-navy-950">A note from your advisor</p><p className="mt-1 text-sm leading-6 text-slate-500">These are planning estimates, not a policy quote. Compare claim settlement history and exclusions before choosing a provider.</p></div></div></div></section>
}
function ProtectionCard({ type, icon: Icon, amount, accent, bullets, onClick, t }) { return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-lift"><div className="flex items-start justify-between"><div className={`grid h-11 w-11 place-items-center rounded-xl ${accent === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-navy-950 text-white'}`}><Icon size={20} /></div><span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{t('priority')}</span></div><p className="mt-7 text-sm font-medium text-slate-500">{type}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-3xl font-bold tracking-tight text-navy-950">{crores(amount)} Cr</p><span className="text-xs text-slate-400">recommended cover</span></div><ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">{bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-sm text-slate-600"><Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />{bullet}</li>)}</ul><button onClick={onClick} className="button-outline mt-7 w-full justify-center">{t('explorePlans')} <ArrowRight size={15} /></button></div> }

function Civic({ query, setQuery, schemes, openDetail, t }) {
  return <section className="animate-in"><div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">{t('civicEyebrow')}</p><h2 className="mt-2 text-2xl font-bold text-navy-950">{t('civicTitle')}</h2><p className="mt-2 max-w-xl text-sm text-slate-500">{t('civicCopy')}</p></div><div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500"><Sparkles size={14} className="text-emerald-500" />{schemes.length} {t('matches')}</div></div><div className="relative mt-7 max-w-2xl"><Search className="absolute left-4 top-3.5 text-slate-400" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('search')} className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm shadow-card outline-none transition placeholder:text-slate-400 focus:border-navy-700 focus:ring-4 focus:ring-navy-700/5" /></div><div className="mt-7 grid gap-4 xl:grid-cols-3">{schemes.map((scheme) => <SchemeCard key={scheme.title} scheme={scheme} onClick={() => openDetail({ type: 'scheme', scheme })} t={t} />)}</div>{!schemes.length && <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">{t('noMatch')}</div>}</section>
}
function SchemeCard({ scheme, onClick, t }) { const iconColor = scheme.color === 'amber' ? 'bg-amber-50 text-amber-600' : scheme.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'; return <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift"><div className="flex items-center justify-between"><div className={`grid h-10 w-10 place-items-center rounded-xl ${iconColor}`}><Landmark size={19} /></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{scheme.score}% Match</span></div><p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{scheme.tag}</p><h3 className="mt-1 text-lg font-bold text-navy-950">{scheme.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{scheme.summary}</p><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('docs')}</p><div className="mt-3 space-y-2.5">{['Aadhaar card', 'PAN card', 'Income proof'].map((doc) => <div className="flex items-center gap-2 text-sm text-slate-600" key={doc}><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-600"><Check size={12} strokeWidth={3} /></span>{doc}</div>)}</div></div><button onClick={onClick} className="button-outline mt-5 w-full justify-center">{t('eligibility')} <ArrowRight size={15} /></button></article> }

function DetailPage({ page, profile, tax, back, t }) {
  const isScheme = page.type === 'scheme'
  const title = isScheme ? page.scheme.title : page.type === 'tax' ? 'Your tax calculation' : page.type === 'action' ? page.title : `${page.type === 'life' ? 'Term life' : 'Health'} cover plans`
  return <section className="animate-in"><button onClick={back} className="back-link"><ArrowLeft size={16} /> {t('back')}</button><div className="mt-8 max-w-4xl"><p className="eyebrow">{isScheme ? t('eligibilityGuide') : page.type === 'tax' ? t('taxReport') : t('actionPlan')}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{isScheme ? page.scheme.summary : 'Review the recommendation, understand the assumptions, and follow the next steps at your own pace.'}</p></div>{isScheme ? <SchemeDetail scheme={page.scheme} t={t} /> : page.type === 'tax' ? <TaxDetail tax={tax} profile={profile} t={t} /> : page.type === 'action' ? <ActionDetail page={page} t={t} /> : <CoverDetail page={page} profile={profile} t={t} />}</section>
}
function DetailShell({ children }) { return <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">{children}</div> }
function SchemeDetail({ scheme, t }) { return <div className="grid gap-5 lg:grid-cols-[1fr_280px]"><DetailShell><DetailHeading icon={ClipboardCheck} title={t('checklist')} /><p className="mt-2 text-sm text-slate-500">You are a {scheme.score}% match based on the profile shared. Keep these documents ready before starting your application.</p><Checklist items={['Aadhaar card linked to your mobile number', 'PAN card or valid identity proof', 'Latest income proof or salary slips', 'Active bank account details']} /><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><ExternalAction href={officialLinks[scheme.title]}>{t('start')} <ArrowRight size={15} /></ExternalAction><button onClick={() => downloadChecklist(scheme)} className="button-outline">{t('download')} <FileCheck2 size={15} /></button></div><p className="mt-4 text-xs text-slate-400">Opens the relevant application or beneficiary entry flow in a new tab.</p></DetailShell><SideSummary label="Match score" value={`${scheme.score}%`} note="Strong fit for your current profile" /></div> }
function TaxDetail({ tax, profile }) { return <div className="grid gap-5 lg:grid-cols-[1fr_280px]"><DetailShell><DetailHeading icon={Calculator} title="How your estimate is built" /><div className="mt-6 grid gap-3 sm:grid-cols-2"><Metric label="Old Regime" value={money(tax.oldTax)} /><Metric label="New Regime" value={money(tax.newTax)} /><Metric label="Annual income" value={money(profile.income)} /><Metric label="Recommended" value={tax.recommended} /></div><div className="mt-7 border-t border-slate-100 pt-6"><p className="text-sm font-semibold text-navy-950">Next steps</p><Checklist items={['Review your existing deductions and exemptions', 'Compare eligible 80C and 80D investments', 'Confirm the final regime while filing your return']} /><button onClick={() => downloadTaxReport(tax, profile)} className="button-outline mt-6">Download tax report <FileCheck2 size={15} /></button></div></DetailShell><SideSummary label="Estimated saving" value={money(tax.saved)} note={`Using the ${tax.recommended}`} /></div> }
function ActionDetail({ page }) { const url = page.title === 'Public Provident Fund' ? 'https://www.indiapost.gov.in/Financial/pages/content/post-office-savings-schemes.aspx' : 'https://www.amfiindia.com/investor-corner'; return <DetailShell><DetailHeading icon={Wallet} title="A simple way to get started" /><p className="mt-2 text-sm text-slate-500">This recommendation can help you use your available deduction room while building a stronger financial base.</p><div className="mt-6 rounded-xl bg-emerald-50 p-5"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Suggested allocation</p><p className="mt-1 text-2xl font-bold text-emerald-900">{money(page.amount)}</p><p className="mt-1 text-sm text-emerald-700">Maximum amount indicated for this profile.</p></div><Checklist items={['Choose a regulated provider or platform', 'Read lock-in, risk and withdrawal terms', 'Set up a recurring contribution']} /><ExternalAction href={url} className="button-primary mt-6">Continue with this plan <ArrowRight size={15} /></ExternalAction><p className="mt-3 text-xs text-slate-400">Opens the relevant investment application/reference flow in a new tab.</p></DetailShell> }
function CoverDetail({ page, profile }) { const url = page.type === 'life' ? 'https://www.policybazaar.com/term-insurance/' : 'https://www.policybazaar.com/health-insurance/'; return <DetailShell><DetailHeading icon={ShieldCheck} title="Compare the right cover" /><div className="mt-5 grid gap-4 sm:grid-cols-2"><Metric label="Recommended cover" value={`${crores(page.amount)} Cr`} /><Metric label="Profile basis" value={page.type === 'life' ? `${profile.dependents} dependents` : profile.cityTier} /></div><Checklist items={['Compare waiting periods and exclusions', 'Check claim settlement support', 'Review renewal and premium terms']} /><ExternalAction href={url} className="button-primary mt-6">Compare plans <ArrowRight size={15} /></ExternalAction><p className="mt-3 text-xs text-slate-400">Opens the relevant insurance comparison flow in a new tab.</p></DetailShell> }
function DetailHeading({ icon: Icon, title }) { return <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon size={19} /></div><h2 className="text-xl font-bold text-navy-950">{title}</h2></div> }
function Checklist({ items }) { return <ul className="mt-6 space-y-3">{items.map((item) => <li className="flex gap-3 text-sm text-slate-600" key={item}><CheckCircle2 size={18} className="shrink-0 text-emerald-500" />{item}</li>)}</ul> }
function Metric({ label, value }) { return <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-lg font-bold text-navy-950">{value}</p></div> }
function SideSummary({ label, value, note }) { return <div className="rounded-2xl bg-navy-950 p-6 text-white shadow-card"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-3 text-3xl font-bold text-emerald-400">{value}</p><p className="mt-3 text-sm leading-6 text-slate-300">{note}</p></div> }

function calculateTax(income) {
  const newer = Math.max(0, income - 75000)
  let newTax = 0
  if (newer > 2400000) newTax += (newer - 2400000) * .30
  if (newer > 2000000) newTax += (Math.min(newer, 2400000) - 2000000) * .25
  if (newer > 1600000) newTax += (Math.min(newer, 2000000) - 1600000) * .20
  if (newer > 1200000) newTax += (Math.min(newer, 1600000) - 1200000) * .15
  if (newer > 800000) newTax += (Math.min(newer, 1200000) - 800000) * .10
  if (newer > 400000) newTax += (Math.min(newer, 800000) - 400000) * .05
  // Section 87A rebate makes the new-regime tax nil up to ₹12L taxable income.
  if (newer <= 1200000) newTax = 0
  let older = Math.max(0, income - 200000); let oldTax = 0
  if (older > 1000000) { oldTax += (older - 1000000) * .3; older = 1000000 }
  if (older > 500000) { oldTax += (older - 500000) * .2; older = 500000 }
  if (older > 250000) oldTax += (older - 250000) * .05
  const values = { newTax: Math.round(newTax), oldTax: Math.round(oldTax) }
  return { ...values, recommended: values.newTax <= values.oldTax ? 'New Regime' : 'Old Regime', saved: Math.abs(values.newTax - values.oldTax) }
}
function getSchemes(income) { return [{ title: 'PM Mudra Yojana', tag: 'Business & credit', summary: 'Get collateral-free business loans for starting or growing a micro enterprise. Loans are available across Shishu, Kishor and Tarun categories.', score: 95, color: 'amber' }, { title: 'PM Awas Yojana', tag: 'Housing support', summary: 'Access interest subsidy and support for building or buying a pucca home. Eligibility considers household income and existing home ownership.', score: 88, color: 'blue' }, { title: 'Ayushman Bharat', tag: 'Healthcare', summary: 'Receive cashless hospitalisation cover for eligible families at empanelled hospitals. The scheme supports secondary and tertiary care needs.', score: income < 1000000 ? 98 : 81, color: 'rose' }] }

createRoot(document.getElementById('root')).render(<App />)

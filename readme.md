# ✨ Writora – KI-gestützte Bucherstellung

**Writora** ist eine moderne Plattform zur automatisierten Bucherstellung mit KI-Unterstützung. Egal ob Fachbuch, Roman, Kinderbuch oder Workbook – Writora hilft dir, deine Inhalte effizient zu strukturieren, zu gestalten und zu exportieren.  
Das Ziel: **Ein Klick zum fertigen Buch.**

---

## 🚀 Live-Demo  
🔗 https://writora.vercel.app

---

## 🔧 Features

- 🧠 **KI-gestützter Projekt-Chat** mit interaktiver Inhaltsplanung
- 📝 **Seiteneditor mit Live-Vorschau** (Kapitel, Texte, Strukturen)
- 📤 **PDF-Export** mit KDP-kompatiblen Einstellungen
- 🖼️ **Cover-Generator** (DALL·E + Custom Prompt)
- 💳 **Zahlungsintegration (Stripe)** für Pro-Features
- 🔐 **Login via Google oder E-Mail/Passwort (Supabase)**
- 🖼️ **Hover-Zoom auf Seiten**, Drag & Drop Auswahl
- 🌗 **Dark/Light Theme Umschaltung**
- 📦 **ZIP-Export mit PDF, Cover & Metadaten (KDP-ready)**
- 🧒 **Kinderbuch & Malbuch-Modus** als wählbare Option
- 🔄 **GPT Live-Streaming** für Chat-Antworten
- 🛡️ **Middleware für Free/Pro Zugriffsschutz**
- 📅 **Kalender & Aufgabenplaner für Buchprojekte**

---

## 🛠️ Tech-Stack

- **Frontend**: Next.js 14 · React 18 · Tailwind CSS
- **Backend**: Node.js · Vercel Serverless Functions
- **KI**: OpenAI API · DALL·E · GPT-4o (Streaming)
- **Auth**: Supabase
- **Bezahlsystem**: Stripe (Live-Modus)
- **Export**: `jsPDF` / PDFKit / ZIP
- **Deployment**: Vercel (Production-Branch: `main`)

---

## ⚙️ Installation (lokal)

```bash
git clone https://github.com/cylezzzz/writora.git
cd writora
npm install
cp .env.example .env.local
# ➕ Trage deine API-Schlüssel ein (siehe unten)
npm run dev

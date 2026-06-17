# MedicarePro Clinic Website

A highly-optimized, cinematic, and modern clinic website built for premium healthcare professionals. This project utilizes cutting-edge web technologies to deliver an awe-inspiring user experience, featuring 30+ FPS canvas animations, synchronized audio, 3D graphics, and buttery-smooth scrolling.

## 🚀 Technologies Used

- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Animation Engine:** GSAP (ScrollTrigger), Framer Motion
- **3D Graphics:** React Three Fiber, React Three Drei, Three.js
- **Smooth Scrolling:** Lenis
- **Form Handling & Validation:** React Hook Form, Zod
- **Email Integration:** EmailJS
- **Icons:** Lucide React

## ✨ Key Features

1. **Cinematic Intro Sequence**
   - A stunning, auto-playing sequence constructed from 300 ultra-high-definition WebP photo frames.
   - Drawn directly onto an HTML5 `<canvas>` element for pixel-perfect clarity.
   - Fully synchronized with an embedded audio soundtrack (`introsequence.mp3`), trimmed and timed to precision.
   - Built-in background buffering to prevent network blocking and ensure instantaneous playback.

2. **GSAP Scroll-Linked Hero Section**
   - The Hero background dynamically scrubs through a 300-frame image sequence linked directly to the user's scroll position via GSAP ScrollTrigger.
   - Enhanced with a dynamic 3D starfield layer powered by React Three Fiber.

3. **Performance Optimized (Code-Splitting)**
   - The application utilizes `React.lazy` and `Suspense` to code-split non-critical components (Services, About, Testimonials, FAQ, Footer).
   - This drastically reduces the initial JavaScript payload (by ~50%), ensuring a lightning-fast Time to Interactive (TTI).

4. **Smooth Scrolling**
   - Integrated Lenis smooth scrolling for a premium, native-feeling scroll experience across all modern browsers and devices.

5. **Direct Patient Integrations**
   - Floating Action Buttons for immediate Emergency Calls and WhatsApp chat.
   - Fully functional Book Appointment form that safely routes leads directly via EmailJS.

## 📦 Installation & Setup

1. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Run the Development Server**
   Start the Vite local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the site.

3. **Build for Production**
   To create an optimized production build:
   ```bash
   npm run build
   ```
   The generated static files will be located in the `dist` folder.

## 📁 Project Structure

- `src/components/`: Contains all the individual UI sections (Hero, Intro, About, Services, etc.).
- `src/data/`: Contains static JSON files with doctor details and configuration.
- `public/images/intro-bg/`: Contains the 300 individual WebP frames for the Canvas Intro Sequence.
- `public/images/hero-bg/`: Contains the WebP frames for the scroll-linked Hero background.
- `public/videos/`: Contains the `introsequence.mp3` synchronized soundtrack.

## 🛠 Asset Optimization Note
This project intentionally avoids large video formats (like `.mp4` or `.webm`) for cinematic sequences. Instead, it relies on dynamically loaded, ultra-compressed `.webp` image sequences rendered via HTML Canvas. This circumvents modern browser autoplay-blocking policies and delivers a vastly superior, stutter-free visual experience.

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
- **Testing:** Cypress

## 📁 Comprehensive Project Structure

### Root Files
- `index.html`: The main HTML entry point of the application.
- `package.json` & `package-lock.json`: Contains project dependencies, npm scripts, and metadata.
- `vite.config.ts`: Configuration file for the Vite bundler.
- `tailwind.config.js`: Tailwind CSS configuration, custom design system, and tokens.
- `postcss.config.js`: PostCSS configuration for processing CSS.
- `eslint.config.js`: ESLint configuration for code quality and formatting rules.
- `cypress.config.js`: Cypress end-to-end testing configuration.
- `firebase.json` & `.firebaserc`: Configuration for deploying to Firebase Hosting.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript compiler configurations.
- `.gitignore`: Specifies intentionally untracked files to ignore in Git.

### `/src` - Source Code
The core logic and presentation of the React application.
- `App.tsx`: Main React component where layout and routing are typically defined.
- `main.tsx`: React DOM entry point, mounting the `App` component to the DOM.
- `index.css`: Global CSS file containing Tailwind directives and core custom styles.
- `vite-env.d.ts`: TypeScript definitions for Vite environments and static asset imports.

#### `/src/components` - React Components
Contains all modular UI sections of the website.
- `AboutSection.tsx`: Component displaying the doctor's background, qualifications, and clinic details.
- `AppointmentSection.tsx`: A booking form utilizing React Hook Form and Zod for validation. It safely routes leads via EmailJS.
- `ContactSection.tsx`: Component displaying contact details, opening hours, and location.
- `FAQSection.tsx`: Interactive Frequently Asked Questions section.
- `FloatingActions.tsx`: Floating buttons for immediate actions (Emergency Call, WhatsApp).
- `Footer.tsx`: Website footer containing links and copyright information.
- `HeroSection.tsx`: The primary landing section linked directly to the user's scroll position via GSAP ScrollTrigger.
- `IntroSequence.tsx`: A stunning auto-playing sequence rendered on an HTML5 `<canvas>` using WebP frames and synchronized audio.
- `Navigation.tsx`: The top navigation bar of the website.
- `ServicesSection.tsx`: Component showcasing the healthcare services offered by the clinic.
- `TestimonialsSection.tsx`: Component displaying patient feedback and reviews.

#### `/src/data` - Static Content
JSON files serving as static data sources for the components, keeping data separate from presentation.
- `doctor.json`: Doctor's personal details, stats, and biography.
- `faq.json`: Array of questions and answers for the FAQ section.
- `services.json`: Descriptions of various medical services offered.
- `testimonials.json`: Patient reviews and ratings.

### `/public` - Static Assets
Assets served directly without Webpack/Vite processing.
- `favicon.svg`: Website favicon.
- `/public/images/intro-bg/`: Contains 300 ultra-high-definition WebP frames for the Canvas Intro Sequence.
- `/public/images/hero-bg/`: Contains 300 WebP frames for the scroll-linked Hero background.
- `/public/videos/`: Contains the `introsequence.mp3` synchronized soundtrack.

### `/cypress` - End-to-End Testing
Contains automated E2E tests and configurations.
- `/cypress/e2e/`: Test suites.
  - `homepage.cy.js`: Tests for the main homepage interactions.
  - `sections.cy.js`: Tests to verify the presence and functionality of different sections.
  - `services.cy.js`: Tests specifically for the services display and logic.
- `/cypress/support/`: Cypress custom commands and overrides.
  - `commands.js`: Custom Cypress commands.
  - `e2e.js`: Global configuration and behavior that runs before every test.

### `/.github` - CI/CD Workflows
- `/workflows/firebase-hosting-merge.yml`: Automates deployment to Firebase live channel upon merging to the main branch.
- `/workflows/firebase-hosting-pull-request.yml`: Automates deployment to a Firebase preview channel upon creating a Pull Request.

### Miscellaneous
- `.agents`, `.local`, `.replit`: Environment-specific tooling or sandbox configuration files.

## ✨ Key Features

1. **Cinematic Intro Sequence**: An auto-playing sequence constructed from 300 ultra-high-definition WebP photo frames. Drawn directly onto an HTML5 `<canvas>` element for pixel-perfect clarity. Synchronized with an embedded audio soundtrack (`introsequence.mp3`).
2. **GSAP Scroll-Linked Hero Section**: Background dynamically scrubs through a 300-frame image sequence linked directly to scroll position via GSAP ScrollTrigger, enhanced with a dynamic 3D starfield layer powered by React Three Fiber.
3. **Performance Optimized (Code-Splitting)**: Utilizes `React.lazy` and `Suspense` to code-split non-critical components, reducing initial JS payload by ~50%.
4. **Smooth Scrolling**: Integrated Lenis smooth scrolling for a premium, native-feeling scroll experience.
5. **Direct Patient Integrations**: Floating Action Buttons and fully functional Book Appointment form.

## 📦 Installation & Setup

1. **Install Dependencies**: `npm install`
2. **Run Development Server**: `npm run dev` (Opens http://localhost:5173)
3. **Build for Production**: `npm run build` (Generates files in `dist` folder)
4. **Run Tests**: `npm run cypress:open` (Interactive UI) or `npm run cypress:run` (Headless)

## 🛠 Asset Optimization Note
This project intentionally avoids large video formats (`.mp4`, `.webm`) for cinematic sequences. Instead, it relies on dynamically loaded, ultra-compressed `.webp` image sequences rendered via HTML Canvas. This circumvents modern browser autoplay-blocking policies and delivers a vastly superior, stutter-free visual experience.

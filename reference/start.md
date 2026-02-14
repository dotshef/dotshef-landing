You are a senior frontend engineer and UI designer.

Build a minimal but bold 1-page landing website for a sole proprietorship brand named "Dotshef".

## 🎨 Design System

### Core Concept
- High contrast
- Strong visual rhythm
- Alternating section color pattern
- No decorative clutter
- Clean, bold typography
- Subtle geometric “3D-feel” animated backgrounds per section (must not distract from headline)

### Colors
- Yellow background: #FFD600 (strong vivid yellow)
- Black background: #000000
- Text on yellow → black
- Text on black → yellow
- No additional accent colors
- Animations must use only these colors via opacity (no new colors)

### Typography
- Use Pretendard font (via CDN or local import)
- Font weight should feel bold and confident
- Large headline typography
- Generous whitespace

---

## 🧱 Layout Structure

### Header
- Fixed at top
- Background: Black
- Text color: Yellow
- Left: Logo text "Dotshef"
- Right: Button "문의하기"
- Minimal style (no shadow, no border clutter)
- Responsive

---

## 🟨 Section Pattern Rule

Sections must strictly alternate colors:

1st section → Yellow background, Black text  
2nd section → Black background, Yellow text  
(Continue this pattern for future scalability)

---

## 🧩 Animated Background FX (IMPORTANT)

Each section MUST include a background layer that creates a geometric 3D illusion with animated dots/waves.

### Constraints
- The animation is a BACKGROUND ONLY (behind text). Text must remain perfectly readable.
- Keep it subtle: low opacity, no flashy movement.
- No external heavy libs (avoid Three.js / R3F). Prefer SVG filter animation OR Canvas 2D.
- Must support "prefers-reduced-motion": if enabled, render a static pattern (no animation).
- Performance: avoid high CPU usage. If using Canvas, pause when section is offscreen (IntersectionObserver).

### Preferred Implementation (SVG)
- Put an absolutely positioned SVG inside each section: `position: absolute; inset: 0; pointer-events: none;`
- Render a grid of dots (circles) with low opacity.
- Apply wave motion using SVG filters:
    - `feTurbulence` + `feDisplacementMap` to distort the dot field like gentle water.
    - Animate turbulence `baseFrequency` or `seed` / or animate the displacement `scale`.
- Create a “3D feel”:
    - Duplicate the dot layer with a 1–2px offset and lower opacity to mimic lighting/shadow.
    - Apply a slight CSS perspective transform to the background layer (very subtle).

### Section-specific variation (MUST be different per section)
- Section 1: calm, small amplitude, slow wave (gentle motion)
- Section 2: deeper wave, slightly faster OR different direction (diagonal drift), still subtle
- Do not use the same parameters for both sections (change seed, scale, speed, baseFrequency)

---

## 🟨 Section 1

Background: Yellow  
Text color: Black

Centered vertically and horizontally

Headline:
세상에 필요한 맛있는 소프트웨어

Large, bold typography.
Minimal supporting spacing.
No extra text.

Animated FX preset for Section 1:
- Dot grid on yellow with black dots at very low opacity
- Very gentle displacement (small scale)
- Slow animation (long duration)

---

## ⬛ Section 2

Background: Black  
Text color: Yellow

Centered vertically and horizontally

Headline:
당신의 사업에 꼭 필요한 웹서비스

Large, bold typography.
No additional paragraph.

Animated FX preset for Section 2:
- Dot grid on black with yellow dots at very low opacity
- Slightly stronger displacement than section 1 OR different wave direction
- Different turbulence seed/frequency and animation duration from section 1

---

## 🧾 Footer

- Background: Yellow
- Text: Black
- Include business info:

상호: Dotshef  
대표: 박시준  
사업자등록번호: 251-12-03141  
이메일: contact@dotshef.com  
주소: 서울특별시 영등포구 영등포로 150, 지하1층 가라지 204호

Minimal layout.
Small but readable typography.

---

## ⚙️ Technical Requirements
- Use Next.js (App Router)
- Use TailwindCSS
- No unnecessary libraries
- Fully responsive
- Clean semantic HTML
- Accessibility-friendly markup
- No images
- No gradients
- Keep it production-clean

---

## 🧠 Design Tone
Confident.
Minimal.
Bold.
Modern.
Like a design agency landing page.

Do NOT over-design.
Do NOT add unnecessary UI elements.
Keep it sharp and minimal.

Deliverables:
- Provide the complete Next.js page code (app/page.tsx) and any required small components (e.g., components/SectionFx.tsx).
- Include Pretendard setup.
- Ensure the fixed header does not overlap section content (proper padding/margin).You are a senior frontend engineer and UI designer.

Build a minimal but bold 1-page landing website for a sole proprietorship brand named "Dotshef".

## 🎨 Design System

### Core Concept
- High contrast
- Strong visual rhythm
- Alternating section color pattern
- No decorative clutter
- Clean, bold typography
- Subtle geometric “3D-feel” animated backgrounds per section (must not distract from headline)

### Colors
- Yellow background: #FFD600 (strong vivid yellow)
- Black background: #000000
- Text on yellow → black
- Text on black → yellow
- No additional accent colors
- Animations must use only these colors via opacity (no new colors)

### Typography
- Use Pretendard font (via CDN or local import)
- Font weight should feel bold and confident
- Large headline typography
- Generous whitespace

---

## 🧱 Layout Structure

### Header
- Fixed at top
- Background: Black
- Text color: Yellow
- Left: Logo text "Dotshef"
- Right: Button "문의하기"
- Minimal style (no shadow, no border clutter)
- Responsive

---

## 🟨 Section Pattern Rule

Sections must strictly alternate colors:

1st section → Yellow background, Black text  
2nd section → Black background, Yellow text  
(Continue this pattern for future scalability)

---

## 🧩 Animated Background FX (IMPORTANT)

Each section MUST include a background layer that creates a geometric 3D illusion with animated dots/waves.

### Constraints
- The animation is a BACKGROUND ONLY (behind text). Text must remain perfectly readable.
- Keep it subtle: low opacity, no flashy movement.
- No external heavy libs (avoid Three.js / R3F). Prefer SVG filter animation OR Canvas 2D.
- Must support "prefers-reduced-motion": if enabled, render a static pattern (no animation).
- Performance: avoid high CPU usage. If using Canvas, pause when section is offscreen (IntersectionObserver).

### Preferred Implementation (SVG)
- Put an absolutely positioned SVG inside each section: `position: absolute; inset: 0; pointer-events: none;`
- Render a grid of dots (circles) with low opacity.
- Apply wave motion using SVG filters:
    - `feTurbulence` + `feDisplacementMap` to distort the dot field like gentle water.
    - Animate turbulence `baseFrequency` or `seed` / or animate the displacement `scale`.
- Create a “3D feel”:
    - Duplicate the dot layer with a 1–2px offset and lower opacity to mimic lighting/shadow.
    - Apply a slight CSS perspective transform to the background layer (very subtle).

### Section-specific variation (MUST be different per section)
- Section 1: calm, small amplitude, slow wave (gentle motion)
- Section 2: deeper wave, slightly faster OR different direction (diagonal drift), still subtle
- Do not use the same parameters for both sections (change seed, scale, speed, baseFrequency)

---

## 🟨 Section 1

Background: Yellow  
Text color: Black

Centered vertically and horizontally

Headline:
세상에 필요한 맛있는 소프트웨어

Large, bold typography.
Minimal supporting spacing.
No extra text.

Animated FX preset for Section 1:
- Dot grid on yellow with black dots at very low opacity
- Very gentle displacement (small scale)
- Slow animation (long duration)

---

## ⬛ Section 2

Background: Black  
Text color: Yellow

Centered vertically and horizontally

Headline:
당신의 사업에 꼭 필요한 웹서비스

Large, bold typography.
No additional paragraph.

Animated FX preset for Section 2:
- Dot grid on black with yellow dots at very low opacity
- Slightly stronger displacement than section 1 OR different wave direction
- Different turbulence seed/frequency and animation duration from section 1

---

## 🧾 Footer

- Background: Yellow
- Text: Black
- Include business info:

상호: Dotshef  
대표: 박시준  
사업자등록번호: 251-12-03141  
이메일: contact@dotshef.com  
주소: 서울특별시 영등포구 영등포로 150, 지하1층 가라지 204호

Minimal layout.
Small but readable typography.

---

## ⚙️ Technical Requirements
- Use Next.js (App Router)
- Use TailwindCSS
- No unnecessary libraries
- Fully responsive
- Clean semantic HTML
- Accessibility-friendly markup
- No images
- No gradients
- Keep it production-clean

---

## 🧠 Design Tone
Confident.
Minimal.
Bold.
Modern.
Like a design agency landing page.

Do NOT over-design.
Do NOT add unnecessary UI elements.
Keep it sharp and minimal.

Deliverables:
- Provide the complete Next.js page code (app/page.tsx) and any required small components (e.g., components/SectionFx.tsx).
- Include Pretendard setup.
- Ensure the fixed header does not overlap section content (proper padding/margin).
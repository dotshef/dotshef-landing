You are a senior frontend engineer and UI designer.

We are building a bold, minimal 1-page landing website for the brand "Dotshef".

The design system is already defined:
- Yellow: #FFD600
- Black: #000000
- Pretendard Variable font
- Alternating section colors
- No gradients
- No decorative clutter
- Strong contrast
- Clean modern typography

We now need to implement a new animated component for the second section.

------------------------------------------------------------
🎯 GOAL

In the second section ("당신의 사업에 꼭 필요한 웹서비스"),
add a revenue-growth animation using 5 vertical bar graphs.

This animation must visually represent increasing revenue.

------------------------------------------------------------
📊 BAR GRAPH ANIMATION SPEC

There must be exactly 5 vertical bars.

Default height ratios:
1st bar → short
2nd bar → slightly taller
3rd bar → medium
4th bar → slightly tall
5th bar → tallest

Use relative height ratios:
[0.25, 0.35, 0.55, 0.72, 0.92]

------------------------------------------------------------
🎬 ANIMATION BEHAVIOR

When the section becomes visible:

- Bars animate sequentially from left to right.
- Each bar starts at almost zero height.
- Each bar grows upward from the bottom.
- After reaching its final height, it remains static.
- Do NOT loop infinitely.
- Animation must feel confident and premium (not playful).

Animation details:
- Use transform: scaleY with transform-origin: bottom
- Use cubic-bezier easing (smooth acceleration)
- Slight overshoot (1.03 ~ 1.05) allowed
- Each bar delayed by 120–160ms
- Total animation duration per bar: 500–700ms

------------------------------------------------------------
🎨 DESIGN RULES

This section background is BLACK.
Bars must be YELLOW (#FFD600).
No other colors allowed.

Bars:
- Rounded corners (subtle, not cartoonish)
- No gradients
- No shadows except very subtle inset highlight
- Spacing between bars must feel premium
- Maintain symmetry

------------------------------------------------------------
⚙️ IMPLEMENTATION REQUIREMENTS

- Use React + Next.js App Router
- Use TailwindCSS
- No heavy libraries
- No chart library
- No Three.js
- No GSAP
- Pure CSS animation + minimal JS allowed

The animation should trigger only when the section is in viewport.
Use IntersectionObserver for that.

If prefers-reduced-motion is enabled:
- Skip animation
- Render bars at full height immediately

------------------------------------------------------------
📦 DELIVERABLES

Provide:

1. A reusable component:
   components/GrowthBars.tsx

   Props:
    - width
    - height
    - color (default: brand yellow)
    - heights array (default provided)
    - duration
    - stagger

2. Required CSS additions in globals.css

3. Example usage inside Section 2 layout

------------------------------------------------------------
📐 LAYOUT PLACEMENT

Inside Section 2:

Option A (Preferred):
- Two-column layout (responsive)
- Left: headline
- Right: animated bar graph

On mobile:
- Headline on top
- Graph below
- Center aligned

------------------------------------------------------------
🧠 TONE

The animation should communicate:
- Growth
- Confidence
- Business results
- Stability
- Momentum

It must NOT feel playful, cute, or startup-gimmicky.
It should feel like a serious digital agency.

------------------------------------------------------------
Produce clean, production-ready code.
No extra commentary.
Only code and necessary explanation comments.
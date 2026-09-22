import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import avatarImg from './avatar.png'

const playgroundItems = [
  { id: 1, title: 'Plastic Surgery Hospital', cursorLabel: '3D printing work', category: '3D Printing', img: '/projects/project-1.webp' },
  { id: 2, title: 'Banner Design', cursorLabel: 'graphic design', category: 'Brand & Visual', img: '/projects/project-2.webp' },
  { id: 3, title: 'Save Birds', cursorLabel: 'game design', category: 'UX & Engineering', img: '/projects/project-3.webp' },
  { id: 4, title: 'Whale Deal', cursorLabel: 'branding design', category: 'Brand & Visual', img: '/projects/project-4.png' },
  { id: 6, title: 'Medical Equipment', cursorLabel: 'service and product design', category: 'Service & Product Design', img: '/projects/project-6.png' },
  { id: 5, title: 'Photography', cursorLabel: 'photography', category: 'Photography', img: '/projects/project-5.webp' },
]

const projects = [
  {
    id: 4,
    title: 'Studio Pro Design System',
    cursorLabel: 'design system work',
    category: 'Service Design',
    year: '2023',
    description: 'Studio Pro Design System offers a wide variety of components. Each page includes live examples, usage guidelines, and interaction behaviors.',
    tags: ['Components Library', 'Usage Guideline', 'Storybook', 'Accessibility'],
    bg: '#A8C9FF',
    img: '/projects/spds-hero.png',
    imgFit: 'contain',
    imgBg: '#deeaf4',
  },
  {
    id: 2,
    title: 'Product Design — Mendix Studio Pro',
    cursorLabel: 'product design',
    category: 'Product & UX Design',
    year: '2024',
    description: 'Studio Pro is an IDE that allows you to easily create, modify, integrate, test, and deploy your applications—all in one place.',
    tags: ['IDE', 'User Research', 'User Experience', 'AI'],
    bg: '#D4E4F8',
    img: '/projects/mendix-studio-pro-hero.png',
    lightText: true,
  },
  {
    id: 3,
    title: 'MyEUShop Website & App Redesign',
    cursorLabel: 'web and app design',
    category: 'Interaction Design',
    year: '2023',
    description: 'I redesigned the MyEUShop website and app for a better and more consistent e-commerce experience.',
    tags: ['E-commerce', 'Customer Experience', 'Web', 'App'],
    bg: '#FFC400',
    img: '/projects/myeushop-hero.png',
  },
  {
    id: 1,
    title: 'dr. Dom',
    cursorLabel: 'user experience design',
    category: 'Design Systems',
    year: '2024',
    description: 'dr.Dom is a digital tool by Domos that helps people understand and fix Wi-Fi issues at home. It uses AI to provide simple suggestions, explain Wi-Fi problems, and help users communicate with their internet service providers.',
    tags: ['Mobile', 'User Experience', 'AI', 'User Testing'],
    bg: '#CDCBFF',
    img: '/projects/dr-dom.jpg',
  },
]

// Unified project list for routing — work cards get slugs project-1..4,
// playground tiles get project-5..10
const allProjects = [
  ...projects.map((p, i) => ({ ...p, slug: `project-${i + 1}`, type: 'work' as const })),
  ...playgroundItems.map((p, i) => ({
    slug: `project-${i + 5}`,
    type: 'playground' as const,
    id: p.id,
    title: p.title,
    category: p.category,
    img: p.img,
    year: undefined as string | undefined,
    description: undefined as string | undefined,
    tags: undefined as string[] | undefined,
    bg: undefined as string | undefined,
  })),
]

// ── Project page sub-components ──────────────────────────────────────────────

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <img
        src={src}
        alt={alt}
        style={{ display: 'block', width: '100%', aspectRatio: '1048 / 584', objectFit: 'cover' }}
      />
    </figure>
  )
}

function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0)
  if (!images.length) return null
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)
  return (
    <div style={{ marginTop: '20px', userSelect: 'none' }}>
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#f0f0ee' }}>
        <img
          src={images[current].src}
          alt={images[current].alt}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >‹</button>
            <button
              onClick={next}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ width: i === current ? '20px' : '8px', height: '8px', borderRadius: '999px', border: 'none', background: i === current ? '#1c1c1c' : '#ccc', cursor: 'pointer', padding: 0, transition: 'all 0.2s ease' }}
            />
          ))}
          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#888884' }}>{current + 1} / {images.length}</span>
        </div>
      )}
    </div>
  )
}

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  )
}

function renderPara(para: string, i: number) {
  if (para.startsWith('### ')) {
    return (
      <h4 key={i} className="font-display" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: '26px', fontWeight: 700, color: '#1c1c1c', margin: i === 0 ? 0 : '24px 0 8px' }}>
        {para.slice(4)}
      </h4>
    )
  }
  const lines = para.split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.every(l => l.startsWith('* '))) {
    return (
      <ul key={i} style={{ margin: i === 0 ? 0 : '12px 0 0', paddingLeft: '20px', color: '#4a4a4a', fontFamily: 'Outfit, sans-serif', fontSize: '15px', lineHeight: '25px' }}>
        {lines.map((l, j) => <li key={j}>{renderBold(l.slice(2))}</li>)}
      </ul>
    )
  }
  return (
    <p key={i} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', lineHeight: '25px', color: '#4a4a4a', margin: i === 0 ? 0 : '16px 0 0' }}>
      {renderBold(para)}
    </p>
  )
}

function CopySection({ title, body, subSections, links }: { title: string; body: string; subSections?: { title: string; body: string; bodyAfterImage?: string; image?: { src: string; alt: string }; image2?: { src: string; alt: string }; bodyAfterImage2?: string; trailingImages?: { src: string; alt: string }[]; extraBlocks?: { body: string; image?: { src: string; alt: string } }[]; video?: string; gallery?: { src: string; alt: string }[]; gridImages?: { src: string; alt: string }[]; gridHeaders?: string[]; gridImageMaxWidth?: string }[]; links?: { label: string; url: string }[] }) {
  return (
    <section style={{ paddingTop: 'clamp(28px, 3.5vw, 48px)', paddingBottom: body.trim() || subSections?.length || links?.length ? 'clamp(28px, 3.5vw, 48px)' : '12px' }}>
      {title && (
        <h2 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: '44px', fontWeight: 700, color: '#1c1c1c', margin: '0 0 16px' }}>
          {title}
        </h2>
      )}
      {body.split('\n\n').filter(p => p.trim()).map((para, i) => renderPara(para, i))}
      {subSections?.map((sub, i) => (
        <div key={i} style={{ marginTop: '32px' }}>
          <h3 className="font-display" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '30px', fontWeight: 700, color: '#1c1c1c', margin: '0 0 10px' }}>
            {sub.title}
          </h3>
          {sub.body.split('\n\n').filter(p => p.trim()).map((para, j) => renderPara(para, j))}
          {sub.image && (
            <img src={sub.image.src} alt={sub.image.alt} style={{ display: 'block', width: '100%', height: 'auto', marginTop: '20px' }} />
          )}
          {sub.bodyAfterImage && sub.bodyAfterImage.split('\n\n').filter(p => p.trim()).map((para, j) => renderPara(para, j))}
          {sub.image2 && (
            <img src={sub.image2.src} alt={sub.image2.alt} style={{ display: 'block', width: '100%', height: 'auto', marginTop: '20px' }} />
          )}
          {sub.bodyAfterImage2 && sub.bodyAfterImage2.split('\n\n').filter(p => p.trim()).map((para, j) => renderPara(para, j))}
          {sub.trailingImages && sub.trailingImages.map((img, j) => (
            <img key={j} src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', height: 'auto', marginTop: '20px' }} />
          ))}
          {sub.extraBlocks && sub.extraBlocks.map((block, j) => (
            <div key={j}>
              {block.body.split('\n\n').filter(p => p.trim()).map((para, k) => renderPara(para, k))}
              {block.image && (
                <img src={block.image.src} alt={block.image.alt} style={{ display: 'block', width: '100%', height: 'auto', marginTop: '20px' }} />
              )}
            </div>
          ))}
          {sub.video && (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe src={sub.video} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            </div>
          )}
          {sub.gallery && sub.gallery.length > 0 && <ImageCarousel images={sub.gallery} />}
          {sub.gridImages && sub.gridImages.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              {sub.gridHeaders && sub.gridHeaders.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '8px' }}>
                  {sub.gridHeaders.map((h, j) => (
                    <p key={j} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 600, color: '#888884', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{h}</p>
                  ))}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: sub.gridHeaders ? 'repeat(2, 1fr)' : `repeat(${sub.gridImages.length}, 1fr)`, gap: '8px' }}>
                {sub.gridImages.map((img, j) => (
                  <img key={j} src={img.src} alt={img.alt} style={{ display: 'block', maxWidth: sub.gridImageMaxWidth ?? '100%', width: 'auto', height: 'auto', borderRadius: '6px' }} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {links && links.length > 0 && (
        <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {links.map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #e0e0dc', background: '#fff', textDecoration: 'none', color: '#1c1c1c', fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 600, gap: '40px', minWidth: '240px' }}>
              {link.label}
              <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1c1c1c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>↗</span>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function FeatureCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div style={{ background: '#f5ddd0', borderRadius: '16px', padding: '32px', flex: '1', minWidth: 0 }}>
      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', lineHeight: '16px', textTransform: 'uppercase', letterSpacing: '2.4px', color: '#888884', margin: '0 0 12px' }}>
        {label}
      </p>
      <h3 className="font-display" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: '32px', fontWeight: 700, color: '#1c1c1c', margin: '0 0 12px' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', lineHeight: '22px', color: '#4a4a4a', margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

function ProjectNavigation({
  previous, next, onNavigate, noTopMargin,
}: {
  previous: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
  onNavigate: (slug: string) => void
  noTopMargin?: boolean
}) {
  return (
    <nav aria-label="Project navigation" style={{ background: '#e2d9f0', marginTop: noTopMargin ? 0 : '80px' }}>
      <div style={{ maxWidth: '1048px', marginInline: 'auto', padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4.2vw, 48px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previous ? (
            <button onClick={() => onNavigate(previous.slug)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', lineHeight: '16px', textTransform: 'uppercase', letterSpacing: '2.4px', color: '#888884', margin: '0 0 8px' }}>← Previous</p>
              <p className="font-display" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '28px', fontWeight: 900, color: '#1c1c1c', margin: 0 }}>{previous.title}</p>
            </button>
          ) : <div />}
          {next ? (
            <button onClick={() => onNavigate(next.slug)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'right', marginLeft: 'auto', width: '100%' }} className="md:text-right">
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', lineHeight: '16px', textTransform: 'uppercase', letterSpacing: '2.4px', color: '#888884', margin: '0 0 8px' }}>Next →</p>
              <p className="font-display" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '28px', fontWeight: 900, color: '#1c1c1c', margin: 0 }}>{next.title}</p>
            </button>
          ) : <div />}
        </div>
      </div>
    </nav>
  )
}

// ── Per-project page content ──────────────────────────────────────────────────

type ProjectPageData = {
  intro: string
  images: { src: string; alt: string }[]
  gallery?: { src: string; alt: string }[]
  hiddenSections?: number[]
  hideSecondImage?: boolean
  outcomeGallery?: { src: string; alt: string }[]
  videoEmbed?: string
  heroNoCrop?: boolean
  processGallery?: { src: string; alt: string }[]
  galleryColumns?: number
  hideHeroImage?: boolean
  sections: { title: string; body: string; links?: { label: string; url: string }[]; subSections?: { title: string; body: string; bodyAfterImage?: string; image?: { src: string; alt: string }; image2?: { src: string; alt: string }; bodyAfterImage2?: string; trailingImages?: { src: string; alt: string }[]; extraBlocks?: { body: string; image?: { src: string; alt: string } }[]; video?: string; gallery?: { src: string; alt: string }[]; gridImages?: { src: string; alt: string }[]; gridHeaders?: string[]; gridImageMaxWidth?: string }[] }[]
  extraImages?: Record<number, { src: string; alt: string }[]>
  hideFeatures?: boolean
  hideOutcomeImage?: boolean
  hideNext?: boolean
  links?: { label: string; url: string }[]
  linksNote?: string
  pushFooterToBottom?: boolean
  tailSections?: { title: string; body: string; subSections?: { title: string; body: string; bodyAfterImage?: string; image?: { src: string; alt: string }; image2?: { src: string; alt: string }; bodyAfterImage2?: string; trailingImages?: { src: string; alt: string }[]; extraBlocks?: { body: string; image?: { src: string; alt: string } }[]; video?: string; gallery?: { src: string; alt: string }[]; gridImages?: { src: string; alt: string }[]; gridHeaders?: string[]; gridImageMaxWidth?: string }[] }[]
  features: [{ label: string; title: string; body: string }, { label: string; title: string; body: string }, { label: string; title: string; body: string }]
}

const projectPageContent: Record<string, ProjectPageData> = {
  'project-1': {
    hiddenSections: [0, 1, 2],
    hideHeroImage: true,
    hideSecondImage: true,
    hideFeatures: true,
    hideOutcomeImage: true,
    intro: 'I built and maintained the Studio Pro Design System, including reusable components, design tokens, and usage documentation in Storybook, which is used across AppDev teams. I worked closely with developers throughout implementation, design reviews, testing, and technical discussions to ensure consistent and practical solutions. I also designed and developed an AI-powered tool that helps designers find and select the most suitable UI components based on their design requirements, making the design process faster and more efficient.',
    links: [
      { label: 'Figma Library', url: 'https://www.figma.com/files/883381446493054975/folder/63540415?fuid=1065636650927001226' },
      { label: 'Storybook', url: 'https://spds.pages.rnd.mendix.com/storybook' },
      { label: 'Confluence', url: 'https://mendix.atlassian.net/wiki/spaces/SPDS/overview' },
    ],
    linksNote: 'Please connect to the **Mendix VPN** to access the Storybook.',
    pushFooterToBottom: true,
    images: [],
    sections: [
      { title: 'The Challenge', body: '' },
      { title: 'Design Approach', body: '' },
      { title: 'Impact', body: '' },
    ],
    features: [
      { label: 'Foundation', title: 'Token Architecture', body: 'A three-tier system enabling global theming without breaking individual component styling.' },
      { label: 'Scale', title: '200+ Components', body: 'A full library covering forms, navigation, feedback, and layout — documented with usage guidelines.' },
      { label: 'Governance', title: 'Team Adoption', body: 'A contribution model that lets product teams extend the system while keeping cross-product consistency.' },
    ],
  },
  'project-2': {
    hideHeroImage: true,
    hideSecondImage: true,
    hideOutcomeImage: true,
    hiddenSections: [2],
    intro: 'As a Product Designer for Mendix Studio Pro, I work on designing new features and improving the overall usability and user experience of the product. My work involves understanding user needs, identifying opportunities for improvement, and translating these insights into intuitive and effective design solutions. I collaborate closely with product managers, engineers, and other designers throughout the product development process, from early exploration and concept development to validation and delivery.',
    images: [
      { src: '/projects/project-2.webp', alt: 'MyEUshop — banner campaign overview' },
      { src: '/projects/project-2.webp', alt: 'MyEUshop — product browsing flow' },
      { src: '/projects/project-2.webp', alt: 'MyEUshop — mobile checkout' },
    ],
    sections: [
      { title: 'Improving Contrast and Visual Hierarchy in Studio Pro', body: 'In Studio Pro, several form elements in dark mode had low visual contrast, particularly tab containers and group boxes. This made it difficult for users to understand the page hierarchy and distinguish between different sections of the interface.\n\nGroup box titles also had a similar visual treatment to input labels, making it harder to differentiate between section headings and individual form fields.\n\nI collaborated closely with other designers and engineers to address these issues and improve the overall dark mode experience. Together, we reviewed and refined the color system across Studio Pro, focusing on contrast, hierarchy, and consistency. The result was a more cohesive dark mode experience that makes the interface easier to scan, understand, and navigate.', subSections: [{ title: '', body: '', gridHeaders: ['Previous', 'Now'], gridImages: [{ src: '/projects/spds-contrast-1a.png', alt: 'Current — contrast example 1' }, { src: '/projects/spds-contrast-1b.png', alt: 'New — contrast example 1' }, { src: '/projects/spds-contrast-2a.png', alt: 'Current — contrast example 2' }, { src: '/projects/spds-contrast-2b.png', alt: 'New — contrast example 2' }, { src: '/projects/spds-contrast-3a.png', alt: 'Current — contrast example 3' }, { src: '/projects/spds-contrast-3b.png', alt: 'New — contrast example 3' }] }] },
      { title: 'New Properties Pane', body: 'The previous Properties pane was outdated, so I contributed to the design and specifications for the new Properties pane. I worked closely with other designers and collaborated with product managers and developers throughout the process to create a more modern and effective experience.', links: [{ label: 'More Features in Studio Pro', url: 'https://www.mendix.com/products/studio-pro/' }], subSections: [{ title: '', body: '', gridHeaders: ['Previous', 'Now'], gridImageMaxWidth: '220px', gridImages: [{ src: '/projects/spds-props-1a.png', alt: 'Previous — Properties pane' }, { src: '/projects/spds-props-1b.png', alt: 'Now — Properties pane' }] }] },
      { title: 'Ctrl+G', body: 'Post-launch, mobile conversion improved by 23% and average session duration increased by 18%. The new visual system was adopted across all marketing channels within two months.' },
    ],
    hideFeatures: true,
    features: [
      { label: 'Research', title: 'User Interviews', body: '16 sessions to map pain points across the buying journey from discovery to checkout.' },
      { label: 'Design', title: 'Mobile-first', body: 'Rebuilt checkout and product pages around touch interactions and smaller screens.' },
      { label: 'Outcome', title: '+23% Conversions', body: 'Mobile conversion improved within 6 weeks of launch through continuous testing.' },
    ],
  },
  'project-3': {
    intro: 'MyEUShop is an e-commerce platform specialising in Asian groceries in the Netherlands.',
    images: [
      { src: '/projects/myeushop-banner.png', alt: 'MyEUShop — brand banner' },
      { src: '/projects/myeushop-journey.png', alt: 'MyEUShop — customer journey map' },
      { src: '/projects/myeushop-journey.png', alt: 'MyEUShop — customer journey map' },
    ],
    heroNoCrop: true,
    gallery: [{ src: '/projects/myeushop-journey.png', alt: 'MyEUShop — customer journey map' }],
    sections: [
      { title: 'The Problem', body: 'Customers can shop through both the MyEUShop website and mobile app. These are the main digital products customers use to browse products, place orders, and manage their purchases.\n\nHowever, both customers and employees found the existing website and app difficult to use.\n\nOne of the main challenges for MyEUShop was that the number of orders and new registered users was not growing as expected. This led me to explore how improving the digital experience could make shopping easier and encourage more customers to use the platform.' },
      { title: '', body: 'Before focusing on the digital products, I looked at the complete customer journey.\n\nThe journey can be divided into four main stages:\n\n* MyEUShop orders products from suppliers\n* Products arrive at the MyEUShop warehouse\n* Customers place their orders\n* Delivery and after-sales service\n\nEach stage had its own pain points that could affect the overall customer experience and customer loyalty.\n\nFor example, some vegetables were already not very fresh when they arrived from suppliers, which affected their quality when they reached customers.\n\nThere were also problems with the delivery experience, including negative interactions with some drivers. In addition, some customers were not satisfied with the solutions provided by customer support.\n\nAs a designer, I decided to focus specifically on the part I could directly improve: the website and app experience.' },
      { title: 'User Research & User Testing', body: 'I started by looking at other Asian supermarkets in Western countries, as well as European supermarket platforms.\n\nInterestingly, the most useful examples were not necessarily the most visually beautiful.\n\nInstead, they had something in common:\n\n* A clear and consistent structure\n* Easy-to-understand information\n* Clear navigation\n* Important content highlighted, such as best sellers and promotions\n* Well-organised product categories\n* Useful content beyond simply selling products\n\nThis gave me an important direction: the redesign should focus less on decoration and more on clarity and usability.\n\nI also invited both Asian and European users in the Netherlands to test the existing MyEUShop website and app.\n\nI observed how they interacted with the products and asked them about their experience, including whether they would consider placing an order through MyEUShop.\n\nFrom the research, I identified two main areas of opportunity:\n\n1. Structure\n\n2. Information\n\n3. Product Information', subSections: [{ title: '', body: '', gridImages: [{ src: '/projects/myeushop-research-1.png', alt: 'MyEUShop user testing session' }, { src: '/projects/myeushop-research-2.gif', alt: 'MyEUShop competitor research' }] }] },
    ],
    hideFeatures: true,
    hideOutcomeImage: true,
    tailSections: [
      { title: 'Outcome', body: 'I created a clearer and more understandable structure for the website and app.\n\nThe homepage follows a simple hierarchy:\n\n### 1. Navigation\n\nUsers can immediately understand where they are and where they can go.\n\n### 2. Main Banner\n\nImportant campaigns, promotions, or featured content are shown at the top.\n\n### 3. New Arrivals, Best Sellers & Sales\n\nImportant shopping content is highlighted so users can quickly discover popular products and promotions.\n\n### 4. Recipes\n\nUsers can discover Asian recipes and learn how to prepare different dishes.\n\n### 5. Popular Categories\n\nThe homepage ends with popular product categories, such as:\n\n* Instant food\n* Fresh/farm products\n* Dried food\n\nThis creates a more predictable journey through the homepage and makes it easier for users to find what they need.', subSections: [{ title: '', body: '', gridImages: [{ src: '/projects/myeushop-outcome-1.png', alt: 'MyEUShop redesigned website homepage' }, { src: '/projects/myeushop-outcome-2.png', alt: 'MyEUShop redesigned app homepage' }, { src: '/projects/myeushop-outcome-3.png', alt: 'MyEUShop redesigned product page — website' }, { src: '/projects/myeushop-outcome-4.png', alt: 'MyEUShop redesigned product page — app' }, { src: '/projects/myeushop-outcome-5.png', alt: 'MyEUShop redesigned recipe page — website' }, { src: '/projects/myeushop-outcome-6.png', alt: 'MyEUShop redesigned recipe page — app' }] }] },
    ],
    features: [
      { label: 'Insight', title: 'Activation Mapping', body: '' },
      { label: 'Pattern', title: 'Progressive Disclosure', body: '' },
      { label: 'Validation', title: '–34% Drop-off', body: '' },
    ],
  },
  'project-4': {
    hideSecondImage: true,
    hideFeatures: true,
    hideOutcomeImage: true,
    hideNext: true,
    intro: '"dr.Dom" is a digital tool provided by Domos to help people fix their Wi-Fi issues at home.\n\n"dr.Dom" makes Wi-Fi issues understandable for ordinary people, provides AI service and gives suggestions about Wi-Fi issues. Besides, dr Dom also teaches people Wi-Fi knowledge and helps the users communicate with their internet service providers easier.',
    images: [
      { src: '/projects/dr-dom-hero.webp', alt: 'dr. Dom — app overview' },
      { src: '/projects/dr-dom-hero.webp', alt: 'dr. Dom — app overview' },
      { src: '/projects/dr-dom-hero.webp', alt: 'dr. Dom — app overview' },
    ],
    sections: [
      { title: 'Context', body: 'Wi-Fi issues can be frustrating and difficult to solve for everyday users. When people experience problems with their Wi-Fi, they often need help from their internet service provider (ISP), usually by calling customer service or searching online for a solution.\n\nDomos is a Norwegian business-to-business company that provides advanced in-home Wi-Fi solutions. Its technology monitors Wi-Fi performance, optimizes connection speed, and uses AI to identify and resolve issues. By helping customers solve common Wi-Fi problems themselves, Domos can also reduce support costs for ISPs while improving the overall customer experience.\n\nOne of Domos\' key products is its self-service app. For this project, I mainly worked on the app and explored how interaction design could help everyday users understand Wi-Fi issues and solve them independently. One of the biggest challenges was translating complex technical terminology into simple and understandable language, while making sure the app could provide clear and useful guidance.\n\nDomos was my project partner and provided technical knowledge, product insights, and feedback throughout the design process.' },
      { title: 'Progress', body: '', subSections: [
        { title: 'Understanding the Current Experience', body: 'I printed out each screen of the app to understand its structure, content, and user flow. I also highlighted the terms I did not understand and discussed them with experts to learn what they meant.\n\nNext, I downloaded the Domos app and asked 15 people aged 30–50 (9 men and 6 women) to test it. I gave them tasks such as using the troubleshooting feature to solve Wi-Fi issues and finding specific Wi-Fi information. I observed how they used the app and where they experienced difficulties.\n\nAfter the test, I asked participants about their overall experience and whether they understood the information presented in the app.', image: { src: '/projects/dr-dom-research.webp', alt: 'Understanding the Current Experience — user research' } },
        { title: 'Key Findings', image: { src: '/projects/dr-dom-findings.webp', alt: 'Key Findings — original app screens' }, body: 'Based on my research, I identified three key areas that could be improved: Communication, User Flow, and Branding.\n\n**1. Communication**\n\n**Visual Language**\n\nThe app contains a lot of data and charts, but users often found them difficult to understand. They did not know what the information meant, what was happening to their Wi-Fi, or what action they should take next.\n\nSome users were also interested in learning more about their Wi-Fi, but they did not know where to start or what information was important to them.\n\n**Layout**\n\nThe layouts across different screens are inconsistent, making the experience feel disconnected. The three example screens use very different structures and visual hierarchies.\n\n**Words**\n\nMany terms are too technical and difficult for everyday users to understand. For example, terms such as "radio noise" and "protocol issues" are not familiar to most people. The text is also often too long and lacks clear visual emphasis, making it harder to scan and understand.\n\n**2. User Flow**\n\nThe steps for solving Wi-Fi issues are complicated. Users are not always sure what to do next, which makes the troubleshooting process more difficult than it needs to be.\n\n**3. Branding**\n\nDomos\' brand values are **smart, fun, and helpful**. However, the current app does not fully reflect these qualities.\n\nBecause of the technical language, users found the app difficult to understand, which makes it less helpful. Visually, the app feels simple and technical, with little of the fun and approachable character associated with the Domos brand.' },
        { title: 'Understanding Wi-Fi: Expert Insights & Stories', body: 'I invited experts to a workshop to help me understand how routers work and simplify the technical terminology used in the app. Together, we created a simple story that explains how Wi-Fi works and what can cause common Wi-Fi issues.', gallery: [
          { src: '/projects/wifi-story-1.webp', alt: 'Wi-Fi Story — the router is a teacher' },
          { src: '/projects/wifi-story-2.webp', alt: 'Wi-Fi Story — Wi-Fi is the voice of the teacher' },
          { src: '/projects/wifi-story-3.webp', alt: 'Wi-Fi Story — students react to the teacher' },
          { src: '/projects/wifi-story-4.webp', alt: 'Wi-Fi Story — radio noise like birds' },
          { src: '/projects/wifi-story-5.webp', alt: 'Wi-Fi Story — coverage problem' },
          { src: '/projects/wifi-story-6.webp', alt: 'Wi-Fi Story — bandwidth issue' },
          { src: '/projects/wifi-story-7.webp', alt: 'Wi-Fi Story — congestion issue' },
          { src: '/projects/wifi-story-8.webp', alt: 'Wi-Fi Story — protocol issue' },
        ]},
        { title: 'Ideation', body: 'I made many sketches and grouped them into different ideas. I looked at how much Wi-Fi knowledge users would need and the pros and cons of each idea.\n\nI then tested the concepts with users and used their feedback to help choose the final direction.\n\n**Wi-Fi Fixing** — The main function, helping users find and fix Wi-Fi problems.\n\n**Wi-Fi Information** — Helping users learn more about their Wi-Fi.\n\n**Devices** — Helping users manage and group their connected devices.\n\n**Settings** — For general app and Wi-Fi settings.', gridImages: [
          { src: '/projects/dr-dom-ideation-1.webp', alt: 'Ideation — sketches wall' },
          { src: '/projects/dr-dom-ideation-2.webp', alt: 'Ideation — concept testing' },
          { src: '/projects/dr-dom-ideation-3.webp', alt: 'Ideation — Wi-Fi issues explanation' },
          { src: '/projects/dr-dom-ideation-4.webp', alt: 'Ideation — Wi-Fi issues solutions' },
          { src: '/projects/dr-dom-ia.webp', alt: 'Ideation — Information Architecture' },
        ]},
      ]},
      { title: 'Outcome', body: 'The app is called **dr.Dom**, a digital tool that helps people fix their Wi-Fi problems at home and learn more about Wi-Fi.\n\nI designed the experience around a familiar **"seeing a doctor"** scenario by introducing the dr.Dom character. Users can "see" dr.Dom, get a diagnosis, and follow simple steps to fix their Wi-Fi. This makes troubleshooting easier to understand and also brings Domos\' brand values into the app in a natural way.', subSections: [
        { title: 'Patterns', body: 'The app has four main sections:\n\n* **Troubleshoot** — Helps users find and fix their Wi-Fi problems.\n* **Wi-Fi Information** — Explains how Wi-Fi works and shows information about the user\'s connection.\n* **Device Organization** — Helps users manage individual devices or groups of devices.\n* **Settings** — Provides basic settings for the router and Wi-Fi.', image: { src: '/projects/dr-dom-patterns.webp', alt: 'dr. Dom — four main sections: Troubleshoot, Wi-Fi Information, Device Organization, Settings' }, bodyAfterImage: 'I designed the **Troubleshoot** page as the home screen because fixing Wi-Fi issues is the main function of the app. When users open the app, dr.Dom shows the current Wi-Fi quality and provides suggestions to help them solve any issues.', image2: { src: '/projects/dr-dom-troubleshoot.webp', alt: 'dr. Dom — Troubleshoot flow screens' }, bodyAfterImage2: 'Users who want to learn more about Wi-Fi can tap the router button in the menu bar. Here, they can see how their Wi-Fi works and learn the meaning of different terms.\n\nFor users who want to communicate more easily with their internet service provider, the Trend Analysis feature shows their Wi-Fi performance over different time periods, such as weekly, monthly, or all-time.', trailingImages: [{ src: '/projects/dr-dom-wifi-info-1.webp', alt: 'dr. Dom — Wi-Fi Information screens' }, { src: '/projects/dr-dom-wifi-info-2.webp', alt: 'dr. Dom — Wi-Fi Trend Analysis screens' }] },
        { title: 'Problem Solving', body: '### 1-1. Language — Visual Language — Troubleshoot\n\nI visualized the Wi-Fi quality by presenting the different faces of dr. Dom and small texts, which make it easier for users to understand the quality of their Wi-Fi rather than simple long texts in the current app.', image: { src: '/projects/dr-dom-problem-solving-1.webp', alt: 'Before and After — Visual Language for Wi-Fi quality' }, bodyAfterImage: '### 1-1. Visual Language — Wi-Fi Information\n\nI used red, yellow, and green to show different levels of Wi-Fi quality. Red means poor and needs attention, yellow means average, and green means good. This familiar color system helps users quickly understand the quality of different aspects of their Wi-Fi.', image2: { src: '/projects/dr-dom-problem-solving-2.webp', alt: 'Before and After — Color system for Wi-Fi Information' }, bodyAfterImage2: '### 1-2. Layout\n\nThe previous app had inconsistent and confusing layouts across different screens. I reorganized the content and created a simpler, more consistent layout. The main actions and selected items are clearly highlighted to help users understand where they are and what they can do.', trailingImages: [{ src: '/projects/dr-dom-problem-solving-3.webp', alt: 'Before and After — Layout redesign' }], extraBlocks: [{ body: '### 1-3. Words — Troubleshoot\n\nOn the Troubleshoot page, I illustrated common Wi-Fi issues and paired them with short, simple messages that explain what users can do to improve their connection. This helps users find the key information quickly instead of reading long blocks of text.\n\nFor users who want more details, the supporting text is clickable and provides a more detailed explanation.', image: { src: '/projects/dr-dom-problem-solving-4.webp', alt: 'Before and After — Words redesign for Troubleshoot' } }, { body: '### 1-3. Words — Wi-Fi Information\n\nIn the previous app, terms such as "radio noise" were only explained by saying that they could disturb Wi-Fi. I worked with Domos experts to understand what these terms actually mean and why they happen, then turned the technical information into simple explanations with a friendly tone of voice.\n\nThis makes the information easier for users to understand and helps them learn more about their Wi-Fi.', image: { src: '/projects/dr-dom-problem-solving-5.jpg', alt: 'Before and After — Words redesign for Wi-Fi Information' } }, { body: '### 2. Steps\n\nI simplified the process of fixing Wi-Fi issues in the Troubleshoot section. When users experience a problem, they can simply tap the button below the dr.Dom character to get a solution. This avoids unnecessary steps and makes troubleshooting quicker and easier.', image: { src: '/projects/dr-dom-problem-solving-6.gif', alt: 'Before and After — Simplified troubleshooting steps' } }, { body: '### 3. Branding\n\nAs this was a collaboration project, I wanted to bring Domos\' brand values—smart, fun, and helpful—into the app. I used the brand colors and visual style to create a stronger connection with the existing identity.\n\nThe dr.Dom character also makes the experience more fun and approachable. At the same time, I improved the app based on the problems found in the existing experience, making it more helpful and closer to the Domos brand values.', image: { src: '/projects/dr-dom-problem-solving-7.webp', alt: 'Branding — dr.Dom app screens' } }] },
        { title: 'Feedback', body: '### Expert Feedback', image: { src: '/projects/dr-dom-feedback.webp', alt: 'Expert feedback on dr. Dom app' }, bodyAfterImage: '### User Feedback', image2: { src: '/projects/dr-dom-feedback-2.webp', alt: 'User feedback on dr. Dom app' } },
        { title: 'Showcase', body: '', video: 'https://player.vimeo.com/video/271146488' },
      ]},
      { title: 'Customer Journey of Domos', body: '' },
      { title: 'Brand Identity of Domos', body: '' },
    ],
    extraImages: {
      3: [{ src: '/projects/dr-dom-journey.webp', alt: 'Customer Journey of Domos' }],
      4: [{ src: '/projects/dr-dom-identity.webp', alt: 'Identity of Domos' }],
    },
    features: [
      { label: 'Research', title: 'Clinical Observation', body: '4 weeks embedded with medical teams to understand real workflow and priority needs.' },
      { label: 'Design', title: 'Information Hierarchy', body: 'Prioritised critical alerts, then timelines, then supporting data — designed for at-a-glance scanning.' },
      { label: 'Accessibility', title: 'WCAG AA', body: 'All components designed and tested for accessibility — a non-negotiable in medical environments.' },
    ],
  },
  'project-5': {
    intro: 'This project is for the 3D-printing course exhibition, "Plastic Surgery Hospital." The concept allows participants to experiment with different facial features.',
    hiddenSections: [1, 2],
    images: [
      { src: '/projects/psh-hero.webp', alt: 'Plastic Surgery Hospital — visitors interacting with the exhibition' },
      { src: '/projects/psh-6.webp', alt: 'Plastic Surgery Hospital — exhibition group photo' },
      { src: '/projects/psh-3.webp', alt: 'Plastic Surgery Hospital — exhibition setup' },
    ],
    gallery: [
      { src: '/projects/psh-1.webp', alt: 'Installation with mirror and hanging facial features' },
      { src: '/projects/psh-2.webp', alt: '3D-printed facial feature components' },
      { src: '/projects/psh-3.webp', alt: 'Exhibition setup and installation process' },
      { src: '/projects/psh-4.webp', alt: 'Visitor trying a 3D-printed nose piece' },
      { src: '/projects/psh-5.webp', alt: 'Visitor examining their reflection' },
      { src: '/projects/psh-6.webp', alt: 'Exhibition group photo' },
    ],
    sections: [
      { title: 'Brief', body: 'Nowadays, many people are dissatisfied with their appearance and choose to undergo plastic surgery. However, these procedures can be risky, and some people may become addicted to changing their appearance.\n\nI chose two girls: one with single eyelids and a low nose bridge, and another with double eyelids and a high nose bridge. I scanned their faces and created 3D-printed versions of their features.\n\nDuring the exhibition, I engaged visitors by allowing them to look in a mirror and see themselves with different facial features. The goal was to show that having different appearances does not make someone ugly, and to satirize society\'s obsession with plastic surgery. True beauty does not come from appearance, but from within.' },
      { title: 'Process', body: 'Working with rapid prototyping and iterative 3D printing, we created a series of scale models and tactile information objects. Each iteration was tested with patients to evaluate comfort and comprehension.' },
      { title: 'Reflection', body: 'The project demonstrated how physical design can bridge the gap between clinical language and patient experience — making complex medical information approachable and less intimidating.' },
    ],
    features: [
      { label: 'Medium', title: '3D Printing', body: 'Rapid prototyping enabled multiple design iterations within a single testing cycle.' },
      { label: 'Focus', title: 'Patient Anxiety', body: 'Designed to reduce perceived clinical distance through familiar, tactile form.' },
      { label: 'Output', title: 'Physical Artefacts', body: 'A suite of patient-facing objects for the waiting room and pre-consultation space.' },
    ],
  },
  'project-6': {
    hiddenSections: [0, 1],
    hideSecondImage: true,
    outcomeGallery: [
      { src: '/projects/bd-1.webp', alt: 'Best-sellers campaign banners' },
      { src: '/projects/bd-2.webp', alt: 'Restock campaign banners' },
      { src: '/projects/bd-3.webp', alt: 'Chinese New Year campaign (English)' },
      { src: '/projects/bd-4.webp', alt: 'Chinese New Year campaign (Chinese)' },
      { src: '/projects/bd-5.webp', alt: "King's Day x MyEUShop 5th Anniversary campaign (English)" },
      { src: '/projects/bd-6.webp', alt: "King's Day x MyEUShop 5th Anniversary campaign (Chinese)" },
      { src: '/projects/bd-7.webp', alt: 'Happy Lantern Festival campaign (English)' },
      { src: '/projects/bd-8.webp', alt: 'Lantern Festival campaign (Chinese)' },
      { src: '/projects/bd-9.webp', alt: 'Easter Whale Surprise campaign (English)' },
      { src: '/projects/bd-10.webp', alt: 'Easter campaign (Chinese)' },
      { src: '/projects/bd-11.webp', alt: "Welcome Spring — Duck Meat campaign (English)" },
      { src: '/projects/bd-12.webp', alt: "Welcome Spring — Duck Meat campaign (Chinese)" },
      { src: '/projects/bd-13.webp', alt: 'Tasty Crabs campaign (English)' },
      { src: '/projects/bd-14.webp', alt: 'Tasty Crabs campaign (Chinese)' },
      { src: '/projects/bd-15.webp', alt: 'Taste of Sichuan campaign (English)' },
      { src: '/projects/bd-16.webp', alt: 'Taste of Sichuan campaign (Chinese)' },
      { src: '/projects/bd-17.webp', alt: 'Liuzhou River Snail Rice Noodles campaign' },
    ],
    intro: 'MyEUShop featured a different promotional theme every week, ranging from seasonal and cultural festivals to special discounts designed to encourage customers to place larger orders. Some campaigns also focused on promoting products or services from our suppliers.\n\nFor each weekly campaign, I developed a cohesive set of visual banners and promotional assets tailored to different channels, including the website, mobile app, app opening screen, WeChat accounts, and email campaigns.\n\nThe goal was to create a consistent visual identity across all touchpoints while adapting the campaign design to the specific format and user experience of each platform.',
    images: [
      { src: '/projects/project-2.webp', alt: 'Banner Design — seasonal campaign overview' },
      { src: '/projects/project-2.webp', alt: 'Banner Design — Lunar New Year campaign' },
      { src: '/projects/project-2.webp', alt: 'Banner Design — template system' },
    ],
    sections: [
      { title: 'Brief', body: 'The client needed a flexible banner system to support seasonal promotions — from Lunar New Year to Easter and summer campaigns. Designs needed to feel culturally resonant while driving clear commercial actions.' },
      { title: 'Design Process', body: 'Each campaign was approached as a visual system — beginning with colour and editorial hierarchy, then layering in cultural motifs and product photography. Typography was selected to balance Chinese and English audiences.' },
      { title: 'Outcome', body: '' },
    ],
    features: [
      { label: 'Visual', title: 'Cultural Context', body: 'Each design drew on relevant cultural motifs and colour associations for the target audience.' },
      { label: 'System', title: 'Reusable Templates', body: 'Flexible layouts adaptable across different product categories and seasonal campaigns.' },
      { label: 'Output', title: '6+ Campaigns', body: 'Applied across Lunar New Year, Easter, summer promotions, and product launches.' },
    ],
  },
  'project-7': {
    hiddenSections: [1],
    videoEmbed: 'https://player.vimeo.com/video/277048004',
    gallery: [
      { src: '/projects/sb-1.webp', alt: 'Save Birds — score screens on tablet' },
      { src: '/projects/sb-2.webp', alt: 'Save Birds — gameplay and branding' },
    ],
    intro: 'A mobile game concept exploring interaction, visual storytelling, and gesture-based gameplay.',
    images: [
      { src: '/projects/project-3.webp', alt: 'Save Birds — gameplay overview' },
      { src: '/projects/project-3.webp', alt: 'Save Birds — gesture mechanics' },
      { src: '/projects/project-3.webp', alt: 'Save Birds — level design' },
    ],
    sections: [
      { title: 'Brief', body: 'This project explores gesture-based interactive experiences and resulted in a game called "Save Birds."\n\nThe concept is simple: players help birds get safely into a net by dragging the net into the right position. If all the birds are successfully caught in a level, players can move on to the next one. The game has three levels in total.\n\nPlayers need to avoid dangerous obstacles, such as teeth at the top and sharp stones at the bottom. If a bird touches an obstacle, it dies and the game is over.\n\nWe collaborated with a developer to create a working prototype in two weeks.' },
      { title: 'Process', body: 'We worked with a developer to turn the concept into a working prototype in two weeks. We explored how gestures could create simple and intuitive interactions, while designing the levels, visual elements, and game mechanics around the core gesture of dragging the net.' },
      { title: 'Reflection', body: 'This project helped me explore how simple gestures can create intuitive and engaging interactions. Designing the game also taught me how small interaction details can affect the overall user experience and difficulty of a game.\n\nWorking closely with a developer to build the prototype in just two weeks also gave me valuable experience in turning an interaction concept into a functional experience and making design decisions within technical and time constraints.' },
    ],
    features: [
      { label: 'Core Mechanic', title: 'Gesture Paths', body: 'Draw paths to guide birds — a single interaction that scales to increasing puzzle complexity.' },
      { label: 'Visual', title: 'Minimal Language', body: 'Low-detail illustrations keep cognitive load low during active gameplay.' },
      { label: 'Platform', title: 'Mobile-first', body: 'Designed exclusively for touch interaction on tablet and phone.' },
    ],
  },
  'project-8': {
    heroNoCrop: true,
    hideSecondImage: true,
    processGallery: [
      { src: '/projects/wd-2.webp', alt: 'Whale Deal — brand guidelines and visual system' },
      { src: '/projects/wd-3.webp', alt: 'Whale Deal — whale character expressions' },
    ],
    intro: 'Whale Deal is MyEUShop\'s deals section, featuring special offers and promotions. I created the visual identity and graphic language to give the section a distinctive and engaging look.',
    images: [
      { src: '/projects/wd-hero.webp', alt: 'Whale Deal — brand identity overview' },
      { src: '/projects/project-4.png', alt: 'Whale Deal — mascot development' },
      { src: '/projects/wd-4.webp', alt: 'Whale Deal — Best Deal banner campaign' },
    ],
    sections: [
      { title: 'Challenge', body: 'Develop a bold and recognizable visual system for Whale Deal to make special offers more eye-catching and engaging, while keeping the design flexible for different promotions.' },
      { title: 'Process', body: 'I started by exploring different visual directions that could make Whale Deal feel more distinctive and attention-grabbing. I developed the core visual elements, including the color palette, typography, graphic shapes, and promotional assets.\n\nOnce the visual direction was established, I created a flexible system that could be adapted to different deals and campaigns while maintaining a consistent look across MyEUShop\'s digital touchpoints.' },
      { title: 'Banner', body: '' },
    ],
    features: [
      { label: 'Character', title: 'Whale Mascot', body: 'A hand-illustrated character that became the brand\'s core visual anchor.' },
      { label: 'Identity', title: 'Full Visual System', body: 'Colour, type, and motion guidelines applied across app, packaging, and social.' },
      { label: 'Audience', title: 'Chinese Diaspora', body: 'Designed to resonate with young Chinese expats living in Europe.' },
    ],
  },
  'project-10': {
    hiddenSections: [0, 1, 2],
    hideHeroImage: true,
    intro: 'A personal photography collection.',
    galleryColumns: 2,
    gallery: [
      { src: '/projects/project-5.webp', alt: 'Photography — Amersfoort castle' },
      { src: '/projects/photo-1.webp', alt: 'Photography' },
      { src: '/projects/photo-2.webp', alt: 'Photography' },
      { src: '/projects/photo-3.webp', alt: 'Photography' },
      { src: '/projects/photo-4.webp', alt: 'Photography' },
      { src: '/projects/photo-5.webp', alt: 'Photography' },
      { src: '/projects/photo-6.webp', alt: 'Photography' },
      { src: '/projects/photo-7.webp', alt: 'Photography' },
      { src: '/projects/photo-8.webp', alt: 'Photography' },
      { src: '/projects/photo-9.webp', alt: 'Photography' },
      { src: '/projects/photo-10.webp', alt: 'Photography' },
      { src: '/projects/photo-11.webp', alt: 'Photography' },
      { src: '/projects/photo-12.webp', alt: 'Photography' },
      { src: '/projects/photo-13.webp', alt: 'Photography' },
      { src: '/projects/photo-14.webp', alt: 'Photography' },
      { src: '/projects/photo-15.webp', alt: 'Photography' },
      { src: '/projects/photo-16.webp', alt: 'Photography' },
      { src: '/projects/photo-17.webp', alt: 'Photography' },

      { src: '/projects/photo-19.webp', alt: 'Photography' },
      { src: '/projects/photo-20.webp', alt: 'Photography' },
      { src: '/projects/photo-24.webp', alt: 'Photography' },
      { src: '/projects/photo-21.webp', alt: 'Photography' },
      { src: '/projects/photo-22.webp', alt: 'Photography' },
      { src: '/projects/photo-23.webp', alt: 'Photography' },
    ],
    images: [
      { src: '/projects/project-5.webp', alt: 'Photo Library — architectural reflection' },
      { src: '/projects/project-5.webp', alt: 'Photo Library — natural light study' },
      { src: '/projects/project-5.webp', alt: 'Photo Library — urban landscape' },
    ],
    sections: [
      { title: 'About the Work', body: 'This series explores the relationship between architecture, water, and reflected light. The photographs were taken during travels across the Netherlands, focusing on historical landmarks and their environments.' },
      { title: 'Approach', body: 'All images were captured on a smartphone, embracing the constraints of the medium. Post-processing was minimal — adjusting only exposure and contrast to preserve the original mood of each scene.' },
      { title: 'Reflection', body: 'Photography serves as a counterpoint to screen-based work — a way of observing the world slowly and noticing details that digital tools can flatten. These images inform how I think about composition and visual storytelling in design.' },
    ],
    features: [
      { label: 'Location', title: 'The Netherlands', body: 'Amersfoort, Rotterdam, and the surrounding countryside.' },
      { label: 'Medium', title: 'Smartphone Photography', body: 'Shot on iPhone — embracing the accessibility and constraints of the medium.' },
      { label: 'Theme', title: 'Light & Reflection', body: 'Water, architecture, and the intersection of built and natural environments.' },
    ],
  },
  'project-9': {
    hiddenSections: [0, 1, 2],
    hideHeroImage: true,
    gallery: [

      { src: '/projects/me-2.webp', alt: 'Medical Equipment — animation storyboard 1' },
      { src: '/projects/me-3.webp', alt: 'Medical Equipment — animation storyboard 2' },
      { src: '/projects/me-4.webp', alt: 'Medical Equipment — inspiration and concept' },
      { src: '/projects/me-5.webp', alt: 'Medical Equipment — prototype making' },
      { src: '/projects/me-6.webp', alt: 'Medical Equipment — instruction' },
      { src: '/projects/me-7.webp', alt: 'Medical Equipment — final design' },
    ],
    intro: 'A service and product design project for medical equipment.',
    images: [
      { src: '/projects/project-6.png', alt: 'Medical Equipment — product family overview' },
      { src: '/projects/project-6.png', alt: 'Medical Equipment — service journey map' },
      { src: '/projects/project-6.png', alt: 'Medical Equipment — prototype testing' },
    ],
    sections: [
      { title: 'Context', body: 'This project involved designing a suite of patient-facing medical devices for a hospital setting. The challenge was to create products that were functionally precise and approachable — reducing the intimidation common in clinical environments.' },
      { title: 'Design Process', body: 'The process combined industrial design with service design — mapping the full patient journey to identify where physical touchpoints created anxiety or confusion, then redesigning those interactions from the ground up.' },
      { title: 'Outcome', body: 'The resulting product family presented a coherent visual language across devices — signalling function through form and reducing perceived clinical distance while maintaining full medical standards.' },
    ],
    features: [
      { label: 'Discipline', title: 'Industrial Design', body: 'Physical form designed around ergonomics, function, and patient perception.' },
      { label: 'Method', title: 'Journey Mapping', body: 'The full patient experience mapped to identify friction and anxiety points.' },
      { label: 'Result', title: 'Coherent Family', body: 'A suite of devices with a shared visual language and reduced clinical intimidation.' },
    ],
  },
}

// ── Project Overview page ─────────────────────────────────────────────────────

function ProjectOverview({
  slug,
  onBack,
  onNavigate,
}: {
  slug: string
  onBack: () => void
  onNavigate: (slug: string) => void
}) {
  const p = allProjects.find(proj => proj.slug === slug)
  const content = projectPageContent[slug]
  const slugIndex = allProjects.findIndex(proj => proj.slug === slug)
  const previous = slugIndex > 0 ? allProjects[slugIndex - 1] : null
  const nextRaw = slugIndex < allProjects.length - 1 ? allProjects[slugIndex + 1] : null
  const next = content.hideNext ? null : nextRaw

  if (!p || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: '#888884', marginBottom: '24px' }}>Project not found.</p>
          <button onClick={onBack} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline', color: '#1c1c1c' }}>← Back to Home</button>
        </div>
      </div>
    )
  }

  const pad = 'clamp(20px, 4.2vw, 48px)'

  return (
    <div style={{ background: '#ffffff', fontFamily: 'Outfit, sans-serif', color: '#1c1c1c', ...(content.pushFooterToBottom ? { display: 'flex', flexDirection: 'column', minHeight: '100vh' } : {}) }}>

      {/* ProjectIntro */}
      <div style={{ paddingInline: pad }}>
        <div style={{ maxWidth: '1048px', marginInline: 'auto', padding: '48px 0 20px' }}>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4.2vw, 52px)', lineHeight: '105%', fontWeight: 900, color: '#1c1c1c', margin: '0 0 48px' }}>
            {p.title}
          </h1>
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', lineHeight: '25px', color: '#4a4a4a', margin: i === 0 ? 0 : '16px 0 0' }}>
              {para}
            </p>
          ))}
          {content.links && content.links.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                {content.links.map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #e0e0dc', background: '#ffffff', textDecoration: 'none', color: '#1c1c1c', fontFamily: 'Playfair Display, Georgia, serif', fontSize: '18px', fontWeight: 700, transition: 'border-color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#1c1c1c')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#e0e0dc')}
                  >
                    {link.label}
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#1c1c1c', color: '#ffffff', fontSize: '16px', flexShrink: 0, marginLeft: '16px' }}>↗</span>
                  </a>
                ))}
              </div>
              {content.linksNote && (
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', lineHeight: '20px', color: '#4a4a4a', margin: '10px 0 0' }}>{renderBold(content.linksNote)}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ProjectImage 1 */}
      {!content.hideHeroImage && (
        <div style={{ paddingInline: pad }}>
          <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
            {content.heroNoCrop ? (
              <img src={content.images[0].src} alt={content.images[0].alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
            ) : (
              <ProjectImage src={content.images[0].src} alt={content.images[0].alt} />
            )}
          </div>
        </div>
      )}

      {/* CopySection 1 */}
      {!content.hiddenSections?.includes(0) && (
        <div style={{ paddingInline: pad }}>
          <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
            <CopySection title={content.sections[0].title} body={content.sections[0].body} subSections={content.sections[0].subSections} />
          </div>
        </div>
      )}

      {/* Extra sections (indices 3+), rendered between Context and section 1 */}
      {[3, 4].map(i => content.sections[i] && !content.hiddenSections?.includes(i) && (
        <div key={i}>
          <div style={{ paddingInline: pad }}>
            <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
              <CopySection title={content.sections[i].title} body={content.sections[i].body} />
            </div>
          </div>
          {content.extraImages?.[i]?.map((img, j) => (
            <div key={j} style={{ paddingInline: pad }}>
              <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
                <img src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ProjectImage 2 (or gallery) */}
      {!content.hideSecondImage && (
        <div style={{ paddingInline: pad }}>
          <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
            {content.gallery ? (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${content.galleryColumns ?? 1}, 1fr)`, gap: '12px' }}>
                {content.gallery.map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                ))}
              </div>
            ) : (
              <ProjectImage src={content.images[1].src} alt={content.images[1].alt} />
            )}
          </div>
        </div>
      )}

      {/* CopySection 2 + FeatureCardStack */}
      {!content.hiddenSections?.includes(1) && (
        <>
          <div style={{ paddingInline: pad }}>
            <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
              <CopySection title={content.sections[1].title} body={content.sections[1].body} subSections={content.sections[1].subSections} links={content.sections[1].links} />
            </div>
          </div>
          {!content.hideFeatures && (
            <div style={{ paddingInline: pad }}>
              <div style={{ maxWidth: '1048px', marginInline: 'auto', paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
                {content.processGallery ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {content.processGallery.map((img, i) => (
                      <img key={i} src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-6">
                    {content.features.map(f => (
                      <FeatureCard key={f.title} label={f.label} title={f.title} body={f.body} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* CopySection 3 + ProjectImage 3 */}
      {!content.hiddenSections?.includes(2) && (
        <>
          <div style={{ paddingInline: pad }}>
            <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
              <CopySection title={content.sections[2].title} body={content.sections[2].body} subSections={content.sections[2].subSections} />
            </div>
          </div>
          {!content.hideOutcomeImage && (
            <div style={{ paddingInline: pad }}>
              <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
                {content.videoEmbed ? (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <iframe
                      src={content.videoEmbed}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : content.outcomeGallery ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {content.outcomeGallery.map((img, i) => (
                      <img key={i} src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                    ))}
                  </div>
                ) : (
                  <ProjectImage src={content.images[2].src} alt={content.images[2].alt} />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Tail sections (appear after CopySection 3) */}
      {content.tailSections?.map((sec, i) => (
        <div key={i} style={{ paddingInline: pad }}>
          <div style={{ maxWidth: '1048px', marginInline: 'auto' }}>
            <CopySection title={sec.title} body={sec.body} subSections={sec.subSections} />
          </div>
        </div>
      ))}

      {content.pushFooterToBottom && <div style={{ flex: 1 }} />}
      {/* ProjectNavigation */}
      <ProjectNavigation
        previous={previous ? { slug: previous.slug, title: previous.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
        onNavigate={onNavigate}
        noTopMargin={[0, 1, 2].every(i => content.hiddenSections?.includes(i))}
      />

    </div>
  )
}

const experiences = [
  { role: 'Product Designer', company: 'Mendix', tags: 'Design Systems · Product Design', period: '2022–Now' },
  { role: 'UX/UI Designer', company: 'MyEUshop', tags: 'Product · Mobile · Web · Graphic Design', period: '2021' },
]

const skills = [
  { label: 'Product Design', items: ['User Research', 'Mapping', 'Vibe Coding', 'Prototyping', 'Usability Testing'] },
  { label: 'Design System', items: ['Design System Strategy', 'Design Tokens', 'Component & UI Patterns', 'Accessibility', 'Design Guidelines', 'Governance & Maintenance'] },
  { label: 'Soft Skills', items: ['Cross-functional Collaboration', 'Stakeholder Communication', 'Storytelling', 'Ownership', 'Facilitation'] },
]

// Circular text badge

function RotatingBadge({ label, cta }: { label: string; cta: string }) {
  const radius = 58

  return (
    <button
      onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      className="group relative w-64 h-64 flex items-center justify-center cursor-pointer bg-transparent border-none p-0"
      style={{ flexShrink: 0 }}
    >
      {/* spinning ring text */}
      <svg
        viewBox="0 0 144 144"
        className="absolute inset-0 w-full h-full spin-slow"
        aria-hidden
      >
        <defs>
          <path
            id="circle-path"
            d={`M 72,72 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          className="font-sans"
          style={{ fontSize: '11px', fill: '#1C1C1C', fontFamily: 'Outfit, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          <textPath href="#circle-path">{label}</textPath>
        </text>
      </svg>
      {/* center button */}
      <span
        className="relative z-10 w-44 h-44 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ background: '#F2ECFF' }}
      >
        <img
          src={avatarImg}
          alt={cta}
          className="w-full h-full object-cover object-top"
        />
      </span>
    </button>
  )
}


function RoundCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dot = dotRef.current
    const tip = tipRef.current
    if (!dot || !tip) return
    let mx = -50, my = -50, cx = -50, cy = -50, raf: number
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY }
    const onOver = (e: MouseEvent) => {
      const card = (e.target as Element).closest('[data-cursor="view"]')
      const from = (e.relatedTarget as Element | null)?.closest('[data-cursor="view"]')
      if (card && card !== from) {
        const label = (card as HTMLElement).dataset.cursorLabel
        tip.textContent = label ? `View ${label}` : 'View the project'
        dot.style.opacity = '0'
        tip.classList.remove('visible')
        void tip.offsetWidth
        tip.classList.add('visible')
      } else if (!card && from) {
        dot.style.opacity = '1'
        tip.classList.remove('visible')
      }
    }
    const tick = () => {
      cx += (mx - cx) * 0.4
      cy += (my - cy) * 0.4
      const x = cx.toFixed(1) + 'px'
      const y = cy.toFixed(1) + 'px'
      dot.style.left = x
      dot.style.top = y
      tip.style.left = x
      tip.style.top = y
      raf = requestAnimationFrame(tick)
    }
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-cursor="view"]')) {
        dot.style.opacity = '1'
        tip.classList.remove('visible')
      }
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('click', onClick)
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <>
      <div ref={dotRef} className="round-cursor" aria-hidden="true" />
      <div ref={tipRef} className="cursor-tooltip" aria-hidden="true" />
    </>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentSlug, setCurrentSlug] = useState<string | null>(() => {
    const m = window.location.pathname.match(/^\/projects\/(project-\d+)$/)
    return m ? m[1] : null
  })
  const pendingScrollId = useRef<string | null>(null)

  const CARD_H = 480
  const PEEK = 32

  useLayoutEffect(() => {
    if (!currentSlug && pendingScrollId.current) {
      const id = pendingScrollId.current
      pendingScrollId.current = null
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [currentSlug])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPopState = () => {
      const m = window.location.pathname.match(/^\/projects\/(project-\d+)$/)
      setCurrentSlug(m ? m[1] : null)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (slug: string) => {
    history.pushState({}, '', `/projects/${slug}`)
    setCurrentSlug(slug)
    window.scrollTo(0, 0)
  }

  const goHome = () => {
    history.pushState({}, '', '/')
    setCurrentSlug(null)
    window.scrollTo(0, 0)
  }

  const scrollTo = (id: string | null) => {
    if (currentSlug) {
      pendingScrollId.current = id
      goHome()
      return
    }
    if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Home', id: null },
    { label: 'Work', id: 'work' },
    { label: 'Playground', id: 'playground' },
    { label: 'About', id: 'about' },
  ]

  if (currentSlug) {
    return (
      <div className="min-h-screen text-[#1C1C1C]" style={{ background: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
        <RoundCursor />
        {/* Nav */}
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ background: 'rgba(255,255,255,0.88)' }}
        >
          <nav className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
            <button onClick={goHome} className="text-sm font-medium tracking-wide text-[#1C1C1C] hover:opacity-60 transition-opacity bg-transparent border-none p-0 cursor-pointer">
              Yijun Guo
            </button>
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map(l => (
                <li key={l.label}>
                  <button onClick={() => scrollTo(l.id)} className="text-sm text-[#888884] hover:text-[#1C1C1C] transition-colors cursor-pointer bg-transparent border-none p-0">
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="https://drive.proton.me/urls/AE4MEDN21R#DhiB0iJwwh0p" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200" style={{ background: '#1C1C1C', color: '#FFFFFF' }}>
                  Résumé ↗
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="pt-14">
          <ProjectOverview slug={currentSlug} onBack={goHome} onNavigate={navigate} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-[#1C1C1C]" style={{ background: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
      <RoundCursor />
      {/* Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md' : ''
        }`}
        style={{ background: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent' }}
      >
        <nav className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
          <a href="#" className="text-sm font-medium tracking-wide text-[#1C1C1C] hover:opacity-60 transition-opacity">
            Yijun Guo
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <li key={l.label}>
                <button onClick={() => scrollTo(l.id)} className="text-sm text-[#888884] hover:text-[#1C1C1C] transition-colors cursor-pointer bg-transparent border-none p-0">
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="https://drive.proton.me/urls/AE4MEDN21R#DhiB0iJwwh0p"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
                style={{ background: '#1C1C1C', color: '#FFFFFF' }}
              >
                Résumé ↗
              </a>
            </li>
          </ul>
          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className="w-5 space-y-[5px]">
              <span className={`block h-px bg-[#1C1C1C] transition-all ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block h-px bg-[#1C1C1C] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-[#1C1C1C] transition-all ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t border-[#DDDDD8] px-8 py-6 flex flex-col gap-4" style={{ background: '#FFFFFF' }}>
            {navLinks.map(l => (
              <button key={l.label} onClick={() => { scrollTo(l.id); setMenuOpen(false) }} className="text-base text-[#888884] hover:text-[#1C1C1C] transition-colors cursor-pointer bg-transparent border-none p-0 text-left">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-8 pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden min-h-screen flex flex-col justify-between">


        {/* Giant headline + badge */}
        <div className="relative flex items-end justify-between">
          <h1
            className="font-display leading-[0.95] text-[#1C1C1C]"
            style={{ fontSize: 'clamp(6rem, 16.5vw, 15rem)', fontWeight: 900 }}
          >
            YIJUN<br />GUO
          </h1>
          <div className="hidden md:block">
            <RotatingBadge label="PRODUCT DESIGNER · DESIGN SYSTEM DESIGNER · " cta="About Me" />
          </div>
        </div>

        {/* Bottom row: contact left, bio right */}
        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm text-[#1C1C1C] mb-1">Let's Talk</p>
            <a
              href="mailto:yijun328@proton.me"
              className="text-sm text-[#1C1C1C] underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              yijun328@proton.me
            </a>
          </div>

          <p className="hidden md:block text-sm text-[#888884] leading-relaxed max-w-xs text-right">
            Hello, I'm Yijun. I'm a Product designer specializing<br />
            in UX/UI and design systems.
          </p>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-20">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Work 🧩</h2>
          </div>
        </div>

        <div style={{ position: 'relative', height: CARD_H + (projects.length - 1) * PEEK, overflow: 'visible' }}>
          {projects.map((p, idx) => {
            const depth = idx
            const isFront = depth === 0
            const isHovered = hoveredCard === idx
            const cardTop = (projects.length - 1) * PEEK
            return (
              <article
                key={p.id}
                data-cursor="view"
                data-cursor-label={(p as any).cursorLabel}
                className="overflow-hidden"
                style={{
                  position: 'absolute',
                  top: cardTop,
                  left: 0,
                  right: 0,
                  height: CARD_H,
                  background: p.bg,
                  border: '2px solid #1C1C1C',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'row',
                  zIndex: isHovered ? projects.length + 10 : projects.length - depth,
                  transform: `translateY(${-depth * PEEK}px) translateX(${depth * PEEK}px) scale(${isHovered && !isFront ? 1.015 : 1})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: isHovered && !isFront
                    ? '0 -8px 32px rgba(0,0,0,0.14)'
                    : depth > 0 ? '0 -4px 20px rgba(0,0,0,0.06)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`project-${idx + 1}`)}
              >
                {/* Left: image */}
                <div style={{ flex: '1', padding: '40px 20px 40px 40px', overflow: 'hidden' }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: (p as any).imgFit ?? 'cover', objectPosition: 'center', borderRadius: '12px', border: '2px solid #1C1C1C', background: (p as any).imgBg ?? 'transparent' }}
                  />
                </div>

                {/* Right: text */}
                <div style={{ flex: '0 0 45%', padding: 'clamp(28px, 3.5vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <h3 className="font-display" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 900, color: '#1C1C1C', lineHeight: '110%', marginBottom: '12px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#555552', lineHeight: '1.6', marginBottom: '20px' }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.6)', color: '#1C1C1C' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="transition-opacity duration-200 hover:opacity-70"
                    style={{ fontSize: '13px', fontWeight: 600, padding: '10px 20px', borderRadius: '999px', background: '#1C1C1C', color: '#F4F4F2', border: 'none', cursor: 'pointer', width: 'fit-content' }}
                  >
                    View Project →
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Playground ── */}
      <section id="playground" className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Playground 🎨</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {playgroundItems.map((p, i) => (
            <div
              key={p.id}
              data-cursor="view"
              data-cursor-label={(p as any).cursorLabel}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ aspectRatio: '4/3' }}
              onClick={() => navigate(`project-${i + 5}`)}
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="text-xs text-white/70 mb-0.5">{p.category}</p>
                  <h3 className="font-display text-sm font-bold text-white">{p.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── About ── */}
      <section id="about" style={{ background: '#EBEBEA' }}>
        <div className="max-w-6xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-12 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#888884] mb-3">About</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">
              Designing Experiences, Building Systems
            </h2>
            <div className="space-y-4 text-sm text-[#555552] leading-relaxed">
              <p>
                With a Bachelor's degree in Product Design and a Master's degree in Interaction Design, I bring several years of experience in UI/UX design, product design, and design systems.
              </p>
              <p>
                I enjoy solving complex problems and transforming them into intuitive, meaningful, and user-centered experiences. My work goes beyond individual screens—I think about the systems, patterns, and principles that make products consistent, scalable, and easier to evolve.
              </p>
              <p>
                I create flexible components, design systems, and guidelines that bridge the gap between design and development, helping teams work more efficiently while maintaining a coherent user experience.
              </p>
              <p>
                My background spans product design, interaction design, UI/UX, and branding, and I am always curious to explore new fields, technologies, and ways of thinking.
              </p>
              <p>
                Outside of design, I find inspiration in photography, illustration, and doll collecting—interests that continually influence how I observe, create, and think about visual storytelling.
              </p>
              <p>
                I'm always open to collaborations, and opportunities. Feel free to get in touch.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['The Netherlands', 'UX/UI Design', 'Design System'].map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border border-[#DDDDD8] text-[#555552]">
                  {tag === 'The Netherlands' && (
                    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 8 5 8s5-4.25 5-8c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z" fill="#555552"/>
                    </svg>
                  )}
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Capabilities ✨</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {skills.map(cat => (
            <div key={cat.label}>
              <h3 className="font-display text-lg font-bold mb-5 pb-3 border-b border-[#DDDDD8]">
                {cat.label}
              </h3>
              <ul className="space-y-3">
                {cat.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#888884]">
                    <span className="flex-shrink-0 w-3 h-px bg-[#DDDDD8]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#DDDDD8]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#888884] mb-5">Tools</p>
          <div className="flex flex-wrap gap-2">
            {['Figma & Sketch', 'Storybook', 'Claude Code', 'Copilot', 'Dovetail', 'Adobe Photoshop', 'Adobe Illustrator', 'Miro', '3D Printing'].map(tool => (
              <span
                key={tool}
                className="text-xs px-4 py-2 rounded-full border border-[#DDDDD8] text-[#888884] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ background: '#F2ECFF' }}>
        <div className="max-w-6xl mx-auto px-8 py-20 md:py-32">
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#1C1C1C' }}>Contact</p>
          <h2 className="font-display font-black leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', color: '#1C1C1C' }}>
            Let's design<br />what's next.
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-lg" style={{ color: '#1C1C1C' }}>
            Product design and design systems — thoughtfully designed to work for people and scale with teams.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="mailto:yijun328@proton.me"
              className="inline-flex items-center gap-3 text-lg pb-1 border-b transition-colors group"
              style={{ color: '#1C1C1C', borderColor: '#1C1C1C' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              yijun328@proton.me
            </a>
            <a
              href="https://www.linkedin.com/in/yijun-guo-ab3b10103/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg pb-1 border-b hover:opacity-80 transition-opacity"
              style={{ color: '#1C1C1C', borderColor: '#1C1C1C' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-[#D4C8F0] flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            <p className="text-xs" style={{ color: '#1C1C1C' }}>© 2026 Yijun Guo</p>
          </div>
        </div>
      </section>
    </div>
  )
}

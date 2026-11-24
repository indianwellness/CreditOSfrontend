import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type FormEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/financial-data-services', label: 'Financial Data Services' },
  { path: '/msme-financial-health', label: 'MSME Financial Health' },
  { path: '/loan-products', label: 'Loan Products' },
  { path: '/lender-offers', label: 'Lender Offers' },
  { path: '/partner-with-us', label: 'Partner With Us' },
]

const REVEAL = 'main .sec h2, main .sub, main .card, main .step, main details, main .band, main .split > div, main .facts .wrap > div, main .cta .wrap > *'

export type Item = { t: string; d: string; to?: string }
type Link2 = [string, string]

export function CountUp({ value }: { value: string }) {
  const m = value.match(/\d+(\.\d+)?/)
  const dec = m && m[1] ? m[1].length - 1 : 0
  const fmt = (n: number) => (m ? value.replace(m[0], n.toFixed(dec)) : value)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const ref = useRef<HTMLSpanElement>(null)
  const [txt, setTxt] = useState(reduce ? value : fmt(0))
  useEffect(() => {
    const el = ref.current
    if (!m || reduce || !el) return
    const target = parseFloat(m[0])
    let raf = 0, delay = 0
    const run = () => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 1300)
        setTxt(fmt(target * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(tick); else setTxt(value)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); delay = window.setTimeout(run, 450) } }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [value])
  return <span ref={ref}>{txt}</span>
}

export function Btn({ to, children, v = 'p' }: { to: string; children: ReactNode; v?: 'p' | 's' }) {
  const cls = `btn ${v}`
  return to.startsWith('#') ? <a className={cls} href={to}>{children}</a> : <Link className={cls} to={to}>{children}</Link>
}

const PATHS = [
  'M4 19h16M7 15V9m5 6V5m5 10v-4', 'M12 3l8 4v5c0 4-3 7-8 9-5-2-8-5-8-9V7z', 'M4 7h16M4 12h16M4 17h10',
  'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v8M8 12h8', 'M5 12l4 4 10-10', 'M4 5h16v14H4zM4 10h16', 'M3 12h4l3-8 4 16 3-8h4', 'M8 8h8v8H8z',
]
export function Icon({ n }: { n: number }) {
  return (
    <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E2A4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PATHS[n % PATHS.length]} /></svg></span>
  )
}

type ModalKind = 'login' | 'start' | 'enquiry' | 'offer' | 'loan'
type ModalState = { kind: ModalKind; data?: Record<string, string> } | null
type UI = { open: (k: ModalKind, d?: Record<string, string>) => void; toast: (m: string) => void }
const Ctx = createContext<UI>({ open: () => {}, toast: () => {} })
export const useUI = () => useContext(Ctx)

const Fld = ({ l, t = 'text' }: { l: string; t?: string }) => (
  <div style={{ marginBottom: 14 }}><label htmlFor={`m-${l}`}>{l}</label><input id={`m-${l}`} type={t} required /></div>
)

function Modal({ state, close, ui }: { state: NonNullable<ModalState>; close: () => void; ui: UI }) {
  const btn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'; btn.current?.focus()
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [close])
  const d = state.data || {}
  const done = (m: string) => (e: FormEvent) => { e.preventDefault(); close(); ui.toast(m) }
  let title = ''
  let body: ReactNode = null
  if (state.kind === 'login') {
    title = 'Log in to Credit OS'
    body = (<form onSubmit={done('Login is not connected in this prototype.')}><p className="mp">Sign in to your Credit OS account.</p><Fld l="Email" t="email" /><Fld l="Password" t="password" />
      <button className="btn p" style={{ width: '100%' }} type="submit">Log in</button></form>)
  } else if (state.kind === 'start') {
    title = 'How would you like to start?'
    body = (<div className="choices"><Link className="choice" to="/msme-financial-health" onClick={close}><b>I run a business</b><span>Understand your financial health and explore loans.</span></Link>
      <Link className="choice" to="/partner-with-us" onClick={close}><b>I represent a bank or NBFC</b><span>Access structured financial information and MSME customers.</span></Link></div>)
  } else if (state.kind === 'enquiry') {
    title = 'Talk to Credit OS'
    body = (<form onSubmit={done('Thanks. Your sample enquiry was recorded.')}><p className="mp">Tell us a little about you and we will follow up.</p><Fld l="Name" /><Fld l="Organisation" /><Fld l="Email" t="email" />
      <button className="btn p" type="submit">Send enquiry</button></form>)
  } else if (state.kind === 'offer') {
    title = d.n || 'Lender details'
    body = (<div><span className="tag w">Sample lender</span>
      <dl className="dl"><dt>Category</dt><dd>{d.c}</dd><dt>Financing purpose</dt><dd>{d.p}</dd><dt>Basic eligibility (sample)</dt><dd>{d.e}</dd><dt>Next step</dt><dd>Submit an enquiry. The lender then shares its own application process.</dd></dl>
      <p className="mp">Sample information only. No rates, approvals or guarantees are shown.</p>
      <div className="row"><button className="btn p" onClick={() => ui.open('enquiry')}>Submit Enquiry</button><button className="btn s" onClick={close}>Close</button></div></div>)
  } else {
    title = d.t || 'Loan details'
    body = (<div><p className="mp">{d.d}</p><dl className="dl"><dt>Often used for</dt><dd>{d.u}</dd><dt>What to check first</dt><dd>Your purpose, your financial position and your repayment capacity.</dd></dl>
      <p className="mp">Final terms and eligibility are decided by each lender.</p>
      <div className="row"><Link className="btn p" to="/lender-offers" onClick={close}>View lender offers</Link><button className="btn s" onClick={close}>Close</button></div></div>)
  }
  return (
    <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) close() }}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-t">
        <button ref={btn} className="x" aria-label="Close" onClick={close}>✕</button><h3 id="dlg-t">{title}</h3>{body}
      </div>
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)
  const [msg, setMsg] = useState('')
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [showUp, setShowUp] = useState(false)
  const [showDown, setShowDown] = useState(true)
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => { window.scrollTo(0, 0); setOpen(false) }, [pathname])
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`
      h.style.setProperty('--sy', String(Math.min(h.scrollTop, 900)))
      setScrolled(h.scrollTop > 8)
      setShowUp(h.scrollTop > 300)
      setShowDown(max - h.scrollTop > 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useLayoutEffect(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter(el => !el.closest('.hero'))
    const els = all.filter(el => !all.some(o => o !== el && o.contains(el)))
    els.forEach(el => el.classList.add('rv'))
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    const t = setTimeout(() => els.forEach(el => io.observe(el)), 150)
    return () => { clearTimeout(t); io.disconnect() }
  }, [pathname])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const card = t.closest?.('.card') as HTMLElement | null
      if (card) {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      const hero = document.querySelector<HTMLElement>('.hero')
      if (!hero) return
      if (t.closest?.('.hero')) {
        const r = hero.getBoundingClientRect()
        hero.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`)
        hero.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`)
      } else { hero.style.removeProperty('--rx'); hero.style.removeProperty('--ry') }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(''), 3800); return () => clearTimeout(t) }, [msg])
  const jump = (top: number) => window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  const close = useCallback(() => setModal(null), [])
  const ui: UI = { open: (kind, data) => setModal({ kind, data }), toast: setMsg }
  const links = ROUTES.map(r => <NavLink key={r.path} to={r.path} end className={({ isActive }) => (isActive ? 'active' : '')}>{r.label}</NavLink>)
  const auth = (<><button className="btn s" onClick={() => ui.open('login')}>Login</button><button className="btn p" onClick={() => ui.open('start')}>Get Started</button></>)
  return (
    <Ctx.Provider value={ui}>
      <div className="prog" ref={bar} aria-hidden="true" />
      <div className="topbar"><div className="wrap"><span>Financial information and lending, connected.</span><span className="aud"><Link to="/msme-financial-health">For MSMEs</Link><Link to="/financial-data-services">For banks and NBFCs</Link></span></div></div>
      <header className={`hdr${scrolled ? ' scrolled' : ''}`}><div className="wrap">
        <Link to="/" className="logo"><i />Credit OS</Link>
        <nav className="nav" aria-label="Main">{links}</nav>
        <div className="acts">{auth}<button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button></div>
      </div>
        <nav className={`mnav${open ? ' open' : ''}`} aria-label="Mobile">{links}<div className="row">{auth}</div></nav>
      </header>
      <main key={pathname} className="page">{children}</main>
      <footer className="ftr"><div className="wrap">
        <div className="fcols">
          <div><div className="logo" style={{ color: '#fff' }}><i />Credit OS</div><p>Connecting MSMEs, banks and NBFCs through structured financial information, financial health insight and loan discovery.</p></div>
          <div><h4>Platform</h4><Link to="/financial-data-services">Financial Data Services</Link><Link to="/msme-financial-health">MSME Financial Health</Link><Link to="/loan-products">Loan Products</Link><Link to="/lender-offers">Lender Offers</Link></div>
          <div><h4>Company</h4><Link to="/">About Credit OS</Link><Link to="/partner-with-us">Partner With Us</Link><Link to="/privacy-and-help#support">Contact Us</Link></div>
          <div><h4>Legal</h4><Link to="/privacy-and-help">Privacy Policy</Link><Link to="/privacy-and-help">Terms and Conditions</Link><Link to="/privacy-and-help">Consent and help</Link></div>
        </div>
        <small>© 2026 Credit OS. Figures and lender names on this site are illustrative samples.</small>
      </div></footer>
      <div className="jump">
        <button className={showUp ? '' : 'off'} aria-label="Scroll to top" tabIndex={showUp ? 0 : -1} onClick={() => jump(0)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
        </button>
        <button className={showDown ? '' : 'off'} aria-label="Scroll to bottom" tabIndex={showDown ? 0 : -1} onClick={() => jump(document.documentElement.scrollHeight)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </div>
      <button className="fab" onClick={() => ui.open('enquiry')}>Talk to us</button>
      {msg && <div className="toast" role="status">{msg}</div>}
      {modal && <Modal key={modal.kind} state={modal} close={close} ui={ui} />}
    </Ctx.Provider>
  )
}

export function Hero({ tag, title, text, a, b, visual }: { tag: string; title: string; text: string; a: Link2; b: Link2; visual: ReactNode }) {
  return (
    <section className="hero"><div className="wrap">
      <div><div className="tagline">{tag}</div><h1 aria-label={title}>{title.split(' ').map((w, i) => <span className="w" key={i} aria-hidden="true"><span style={{ animationDelay: `${0.15 + i * 0.07}s` }}>{w}</span></span>)}</h1><p>{text}</p>
        <div className="row"><Btn to={a[1]}>{a[0]}</Btn><Btn to={b[1]} v="s">{b[0]}</Btn></div></div>
      <div>{visual}</div>
    </div></section>
  )
}

export function Section({ title, sub, tint, id, children }: { title?: string; sub?: string; tint?: boolean; id?: string; children: ReactNode }) {
  return (
    <section className={`sec${tint ? ' tint' : ''}`} id={id}><div className="wrap">
      {title && <h2>{title}</h2>}{sub && <p className="sub">{sub}</p>}{children}
    </div></section>
  )
}

export function Cards({ items, cols = 3, more, from = 0 }: { items: Item[]; cols?: 2 | 3 | 4 | 5; more?: string; from?: number }) {
  return (
    <div className={`grid c${cols}`}>
      {items.map((x, i) => (
        <div className="card" key={x.t}><Icon n={i + from} /><h3>{x.t}</h3><p>{x.d}</p>
          {more && x.to && <Link className="lk" to={x.to}>{more}</Link>}</div>
      ))}
    </div>
  )
}

export function Steps({ items }: { items: Item[] }) {
  return (
    <div className="steps" style={{ gridTemplateColumns: `repeat(${items.length},1fr)` }}>
      {items.map((x, i) => (<div className="step" key={x.t}><div className="n">{i + 1}</div><h3>{x.t}</h3><p>{x.d}</p></div>))}
    </div>
  )
}

export function Faq({ items }: { items: [string, string][] }) {
  return <>{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</>
}

export function LineChart({ a, b }: { a: number[]; b?: number[] }) {
  const W = 400, H = 130
  const line = (d: number[]) => d.map((v, i) => `${i ? 'L' : 'M'}${(i * (W / (d.length - 1))).toFixed(1)} ${(H - (v / 100) * H).toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H + 4}`} width="100%" role="img" aria-label="Sample trend chart">
      {[0, 1, 2, 3].map(i => <line key={i} x1="0" x2={W} y1={(i * H) / 3} y2={(i * H) / 3} stroke="#E2E6EC" />)}
      <path d={`${line(a)} L${W} ${H} L0 ${H} Z`} fill="#8E2A4D" opacity=".09" />
      {b && <path d={line(b)} fill="none" stroke="#2B3A4F" strokeWidth="2" strokeDasharray="5 4" />}
      <path className="draw" pathLength={1} d={line(a)} fill="none" stroke="#8E2A4D" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

export function Dash({ title, kpis, bars, note = 'Illustrative sample data' }: { title: string; kpis: [string, string][]; bars: number[]; note?: string }) {
  const [tab, setTab] = useState(0)
  const tabs = ['Overview', 'Statements', 'Lenders']
  const series = [bars, [...bars].reverse(), bars.map((v, i) => Math.min(95, Math.round(v * 0.7) + ((i * 13) % 17) + 10))]
  const prev = series[tab].map((v, i) => Math.max(8, Math.min(95, v - 12 + ((i * 7) % 11))))
  const rowSets: [string, string][][] = [
    [['Tally data synced', 'Ready'], ['Statements generated', 'Ready'], ['Consent recorded', 'Authorised']],
    [['Balance Sheet', 'Standardised'], ['Profit and Loss', 'Standardised'], ['Cash Flow', 'Standardised']],
    [['Working capital', 'Match found'], ['Term loan', 'Match found'], ['Asset financing', 'Reviewing']]]
  return (
    <div className="win">
      <div className="winbar"><span className="dots"><i /><i /><i /></span><b>{title}</b><em>{note}</em></div>
      <div className="tabs" role="tablist">{tabs.map((t, i) => <button key={t} role="tab" aria-selected={tab === i} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>{t}</button>)}</div>
      <div className="winbody">
        <div className="kpis">{kpis.map(([l, v]) => <div className="kpi" key={l}><small>{l}</small><b><CountUp value={v} /></b></div>)}</div>
        <div className="chartbox">
          <div className="legend"><span><i style={{ background: '#8E2A4D' }} />Current period</span><span><i style={{ background: '#2B3A4F' }} />Previous period</span></div>
          <LineChart key={tab} a={series[tab]} b={prev} />
        </div>
        <table className="tbl"><tbody>{rowSets[tab].map(([l, s], i) => <tr key={l}><td>{l}</td><td style={{ textAlign: 'right' }}><span className={`tag${i === 2 ? ' w' : ''}`}>{s}</span></td></tr>)}</tbody></table>
      </div>
    </div>
  )
}

export function Donut({ parts }: { parts: [number, string][] }) {
  const R = 40, C = 2 * Math.PI * R, cols = ['#8E2A4D', '#2B3A4F', '#B8C2CF']
  let off = 0
  return (
    <svg viewBox="0 0 100 100" width="130" height="130" role="img" aria-label="Sample composition chart">
      {parts.map(([v], i) => { const len = (v / 100) * C; const el = <circle key={i} cx="50" cy="50" r={R} fill="none" stroke={cols[i % 3]} strokeWidth="14" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} transform="rotate(-90 50 50)" />; off += len; return el })}
    </svg>
  )
}

export function StatementVisual() {
  const rows: [string, string, string][] = [['Total assets', '₹ 2.40 Cr', ''], ['Current liabilities', '₹ 0.74 Cr', ''], ['Long-term liabilities', '₹ 0.36 Cr', ''], ['Net worth', '₹ 1.30 Cr', 'Derived']]
  return (
    <div className="win"><div className="winbar"><span className="dots"><i /><i /><i /></span><b>Balance Sheet · Standardised</b><em>Sample data</em></div>
      <div className="winbody"><table className="tbl"><tbody>{rows.map(([a, b, c]) => <tr key={a}><td>{a}</td><td style={{ textAlign: 'right', fontWeight: 600 }}><CountUp value={b} /></td><td style={{ textAlign: 'right' }}>{c && <span className="tag w">{c}</span>}</td></tr>)}</tbody></table>
        <p className="note">Mapped from Tally groups into one consistent structure.</p></div></div>
  )
}

export function HealthVisual() {
  const r: [string, number][] = [['Liquidity', 72], ['Profitability', 64], ['Leverage', 48], ['Working capital', 58]]
  return (
    <div className="win"><div className="winbar"><span className="dots"><i /><i /><i /></span><b>Financial health</b><em>Sample data</em></div>
      <div className="winbody" style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 20, alignItems: 'center' }}>
        <Donut parts={[[46, 'Assets'], [30, 'Liabilities'], [24, 'Equity']]} />
        <div>{r.map(([l, v]) => <div key={l} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>{l}</span><b>{v}</b></div><div className="meter"><i style={{ width: `${v}%` }} /></div></div>)}</div>
      </div></div>
  )
}

export function Split({ title, text, points, visual, flip }: { title: string; text: string; points: string[]; visual: ReactNode; flip?: boolean }) {
  return (
    <div className={`split${flip ? ' flip' : ''}`}>
      <div><h2>{title}</h2><p className="sub" style={{ marginBottom: 20 }}>{text}</p><ul className="pts">{points.map(p => <li key={p}>{p}</li>)}</ul></div>
      <div>{visual}</div>
    </div>
  )
}

export function Facts({ items }: { items: [string, string][] }) {
  return <div className="facts"><div className="wrap">{items.map(([a, b]) => <div key={a}><b><CountUp value={a} /></b><span>{b}</span></div>)}</div></div>
}

export function Cta({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return <section className="cta"><div className="wrap"><h2>{title}</h2><p>{text}</p><div className="row">{children}</div></div></section>
}

export function Form({ fields, label, thanks, extra }: { fields: [string, string?][]; label: string; thanks: string; extra?: string }) {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }
  if (sent) return <div className="card form"><h3>{thanks}</h3></div>
  return (
    <form className="card form" onSubmit={submit}>
      <div className="fgrid">{fields.map(([l, t]) => <div key={l}><label htmlFor={l}>{l}</label><input id={l} type={t || 'text'} required /></div>)}</div>
      <div style={{ marginBottom: 16 }}><label htmlFor="msg">{extra || 'Message'}</label><textarea id="msg" rows={4} /></div>
      <button className="btn p" type="submit">{label}</button>
    </form>
  )
}
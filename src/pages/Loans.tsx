import { Btn, Cards, Cta, Dash, Faq, Hero, Section, Steps, useUI } from '../components'
import { H, O } from '../paths'

export default function Loans() {
  const ui = useUI()
  const loans: [string, string, string][] = [
    ['Working Capital Loans', 'For everyday business operations and cash flow requirements.', 'inventory, payables, seasonal needs'],
    ['Term Loans', 'For planned business expansion and long-term requirements.', 'expansion, renovation, long-term projects'],
    ['Business Loans', 'For general business financing requirements.', 'general growth and operating needs'],
    ['Asset Financing', 'For machinery, equipment and other business assets.', 'machinery, vehicles, equipment']]
  return (
    <>
      <Hero tag="Loan Products" title="Find the Right Financing for Your Business." text="Learn how financing categories work, then explore lender opportunities that fit your purpose."
        a={['Explore Lender Offers', O]} b={['Understand Your Finances', H]}
        visual={<Dash title="Financing categories" kpis={[['Working capital', 'Daily'], ['Term', 'Planned'], ['Assets', 'Equipment']]} bars={[45, 60, 38, 72, 55, 66]} note="Illustrative" />} />
      <Section title="Loan categories" sub="Four ways businesses commonly borrow.">
        <div className="grid c2">{loans.map(([t, d, u], i) => (
          <div className="card" key={t}><h3>{t}</h3><p>{d}</p><p style={{ marginTop: 10 }}><b>Often used for:</b> {u}</p><button className="btn s" style={{ marginTop: 16 }} onClick={() => ui.open('loan', { t, d, u })}>Quick view</button></div>))}</div>
      </Section>
      <Section tint title="Choosing the right loan" sub="Final terms and eligibility are decided by each lender.">
        <Cards from={1} items={[{ t: 'Business purpose', d: 'What will the funds be used for, and for how long?' }, { t: 'Financial position', d: 'What do your statements say about your business today?' },
          { t: 'Repayment capacity', d: 'How comfortably can cash flow support repayments?' }]} />
      </Section>
      <Section title="How Credit OS helps"><Steps items={[{ t: 'Explore categories', d: 'Learn which category fits your purpose.' }, { t: 'Review your finances', d: 'See your financial position clearly.' }, { t: 'Discover lenders', d: 'Explore lender opportunities.' }]} /></Section>
      <Section tint title="Frequently asked questions">
        <Faq items={[['Does Credit OS guarantee approval?', 'No. Eligibility and approval are decided by each lender.'], ['Are interest rates shown here?', 'No. Rates and terms are set by lenders.'],
          ['Which loan type should I choose?', 'It depends on your purpose, financial position and repayment capacity.'], ['Is my data shared automatically?', 'No. Sharing needs your authorisation.']]} />
      </Section>
      <Cta title="Ready to explore financing?" text="Browse lending partners and submit an enquiry when you are ready."><Btn to={O}>View lender offers</Btn></Cta>
    </>
  )
}

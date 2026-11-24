import { Link } from 'react-router-dom'
import { Btn, Cards, Cta, Dash, Facts, Hero, HealthVisual, Section, Split, StatementVisual, Steps, useUI } from '../components'
import { S, H, L, P } from '../paths'

export default function Home() {
  const ui = useUI()
  return (
    <>
      <Hero tag="One platform for MSMEs, banks and NBFCs" title="Bringing Business Financials and Lending Opportunities Together."
        text="Credit OS helps MSMEs understand their financial health and discover financing opportunities, while enabling banks and NBFCs to access structured financial information and connect with businesses."
        a={['Explore Our Services', S]} b={['Partner With Us', P]}
        visual={<div className="relw"><Dash title="Business overview" kpis={[['Health score', '72/100'], ['Cash position', 'Stable'], ['Loan matches', '4 types']]} bars={[35, 50, 42, 66, 58, 84, 76]} />
          <button className="floatcard" onClick={() => ui.open('offer', { n: 'Working Capital Loan', c: 'Working Capital', p: 'Everyday operations and cash flow', e: 'Matched to a sample cash flow profile' })}><span className="tag w">Sample match</span><b>Working Capital Loan</b>Matched to your cash flow profile. Tap for details.</button></div>} />
      <Facts items={[['Tally integration', 'Extract data from accounting records'], ['3 structured statements', 'Balance sheet, P&L and cash flow'], ['Consent-based sharing', 'Only what the customer authorises'], ['4 loan categories', 'Explore lender opportunities']]} />
      <Section title="Two business areas, one platform" sub="Financial information services for institutions. Financial health and loan discovery for MSMEs.">
        <Cards items={[
          { t: 'Financial Data Services', d: 'Tally data extraction, standardisation and structured statements for banks and NBFCs.', to: S },
          { t: 'MSME Financial Health', d: 'Reports and insights that help businesses understand their financial position.', to: H },
          { t: 'Loan Discovery', d: 'Explore loan categories and lender offers suited to your business.', to: L }]} more="Learn more" />
      </Section>
      <Section tint>
        <Split title="Structured statements, ready for review" text="Credit OS turns accounting records into consistent financial statements that banks and NBFCs can read in one format."
          points={['Extracted from Tally with customer authorisation', 'Standardised across businesses and account structures', 'Balance sheet, profit and loss and cash flow']} visual={<StatementVisual />} />
      </Section>
      <Section>
        <Split flip title="Financial health, explained simply" text="Business owners see liquidity, profitability, leverage and working capital in plain terms, before approaching a lender."
          points={['Clear reports and ratios from their own data', 'Understand strengths and gaps early', 'Prepare for financing conversations']} visual={<HealthVisual />} />
      </Section>
      <Section tint title="How Credit OS works" sub="From accounting records to financing options in four steps.">
        <Steps items={[{ t: 'Connect', d: 'Connect financial information from accounting systems.' }, { t: 'Organise', d: 'Organise and standardise financial data.' },
          { t: 'Understand', d: 'Understand business financial health.' }, { t: 'Explore', d: 'Explore financing opportunities.' }]} />
      </Section>
      <Section title="Loan products" sub="Understand the main ways businesses borrow.">
        <Cards cols={4} from={4} more="Explore products" items={[
          { t: 'Working Capital Loans', d: 'For everyday operations and cash flow needs.', to: L }, { t: 'Term Loans', d: 'For planned expansion and long-term needs.', to: L },
          { t: 'Business Loans', d: 'For general business financing requirements.', to: L }, { t: 'Asset Financing', d: 'For machinery, equipment and other assets.', to: L }]} />
      </Section>
      <Section tint title="Built for both sides of lending">
        <div className="aud2">
          <div className="card"><h3>For MSMEs and business owners</h3><p>Understand your financial position, read your reports and explore loan categories and lender offers.</p><Link className="lk" to={H}>Understand your financial health →</Link></div>
          <div className="card"><h3>For banks and NBFCs</h3><p>Access structured, customer-authorised financial information and connect with MSME businesses.</p><Link className="lk" to={P}>Explore partnership →</Link></div>
        </div>
      </Section>
      <section className="sec"><div className="wrap"><div className="band">
        <div><h2>Connect with More MSME Opportunities.</h2>
          <p>Credit OS provides financial information services and helps banks and NBFCs connect with MSME businesses through customer-authorised information.</p>
          <Btn to={P}>Partner With Us</Btn></div>
        <div className="card" style={{ color: '#1A2230' }}><h3>Authorised data, structured for review</h3><p>Balance sheet, profit and loss and cash flow statements, shared only with customer consent.</p></div>
      </div></div></section>
      <Section tint title="Trust and security" sub="Your information stays under your control.">
        <Cards cols={4} from={1} items={[{ t: 'Customer-authorised sharing', d: 'Data is shared only when the customer authorises it.' }, { t: 'Secure handling', d: 'Financial information is handled securely.' },
          { t: 'Data privacy', d: 'Privacy and consent guide how information is used.' }, { t: 'Transparency', d: 'Clear information on how data is used and by whom.' }]} />
      </Section>
      <Cta title="Move Towards Smarter Financial Decisions with Credit OS." text="Understand your finances, explore financing and connect with lending partners.">
        <Btn to={H}>Get Started</Btn><Btn to={P} v="s">Partner With Us</Btn></Cta>
    </>
  )
}

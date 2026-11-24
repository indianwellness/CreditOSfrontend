import { Btn, Cards, Cta, Dash, Hero, Section, Split, StatementVisual, Steps } from '../components'
import { S, P, V } from '../paths'

export default function Services() {
  return (
    <>
      <Hero tag="Financial Data Services" title="Structured Financial Information. Smarter Lending Decisions."
        text="Credit OS helps banks and NBFCs access organised MSME financial information, extracted from accounting systems and shared with customer authorisation."
        a={['Explore Our Services', '#services']} b={['Partner With Us', P]}
        visual={<Dash title="Structured statements" kpis={[['Balance Sheet', 'Ready'], ['Profit & Loss', 'Ready'], ['Cash Flow', 'Ready']]} bars={[40, 55, 48, 70, 62, 80]} />} />
      <Section id="services" title="Five services, one data pipeline">
        <Cards items={[
          { t: 'Tally Integration and Financial Data Extraction', d: "Extract financial data from Tally with the customer's authorisation." },
          { t: 'Financial Data Standardisation', d: 'Convert varied account structures into one consistent format.' },
          { t: 'Balance Sheet Generation', d: 'Structured balance sheets built from standardised data.' },
          { t: 'Profit and Loss Reporting', d: 'Consistent profit and loss statements for review.' },
          { t: 'Cash Flow Reporting', d: 'Cash flow statements that show how funds move.' }]} />
      </Section>
      <Section tint><Split title="One consistent statement format" text="Whatever the chart of accounts, institutions receive the same structure." points={['Tally groups mapped to standard line items', 'Balance sheet, profit and loss and cash flow', 'Shared only with customer authorisation']} visual={<StatementVisual />} /></Section>
      <Section title="How it works" sub="From accounting system to authorised statements.">
        <Steps items={[{ t: 'Connect', d: 'Connect accounting information.' }, { t: 'Extract', d: 'Extract financial data.' }, { t: 'Standardise', d: 'Standardise information.' },
          { t: 'Generate', d: 'Generate structured financial statements.' }, { t: 'Share', d: 'Share authorised information.' }]} />
      </Section>
      <Section title="Benefits for banks and NBFCs">
        <Cards cols={4} from={3} items={[{ t: 'Structured information', d: 'Organised data instead of scattered records.' }, { t: 'Consistent reporting', d: 'The same format across MSME customers.' },
          { t: 'Easier access', d: 'Simpler access to MSME financial information.' }, { t: 'Simpler review', d: 'Less effort reviewing financial data.' }]} />
      </Section>
      <Section tint title="Data security and privacy">
        <Cards from={1} items={[{ t: 'Customer consent', d: "Information is shared only with the customer's permission." }, { t: 'Secure handling', d: 'Financial information is handled securely.' },
          { t: 'Controlled access', d: 'Only authorised parties can view shared information.' }]} />
      </Section>
      <Cta title="Access structured MSME financial information." text="Talk to us about financial data services for your institution."><Btn to={P}>Partner With Us</Btn><Btn to={V} v="s">Privacy and consent</Btn></Cta>
    </>
  )
}

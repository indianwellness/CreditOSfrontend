import { Btn, Cards, CountUp, Cta, Dash, Hero, HealthVisual, Section, Split, Steps } from '../components'
import { L, O } from '../paths'

const kp: [string, string][] = [['Revenue', '₹ 1.20 Cr'], ['Expenses', '₹ 0.91 Cr'], ['Assets', '₹ 2.40 Cr'], ['Liabilities', '₹ 1.10 Cr'], ['Cash position', '₹ 0.18 Cr'], ['Profitability', '24%']]
export default function Health() {
  return (
    <>
      <Hero tag="MSME Financial Health" title="Understand Your Business Financial Health."
        text="See revenue, expenses, assets, liabilities and cash position in one clear view, and prepare better for financing conversations."
        a={['Get Started', '#overview']} b={['Explore Loans', L]}
        visual={<Dash title="Financial overview" kpis={[['Revenue', '₹ 1.2 Cr'], ['Expenses', '₹ 0.9 Cr'], ['Margin', '24%']]} bars={[30, 44, 52, 48, 66, 78]} />} />
      <Section id="overview" title="Financial overview" sub="Six numbers that describe your business. All figures are illustrative sample data.">
        <div className="grid c3">{kp.map(([l, v]) => (
          <div className="card" key={l}><small style={{ color: '#4A5565' }}>{l}</small><div style={{ font: "700 28px 'Bricolage Grotesque',sans-serif", margin: '6px 0' }}><CountUp value={v} /></div><span className="tag">Sample</span></div>))}</div>
      </Section>
      <Section><Split flip title="Ratios that show where you stand" text="Four views of financial strength, drawn from your own statements." points={['Liquidity and working capital', 'Profitability and leverage', 'Clear, plain-language explanations']} visual={<HealthVisual />} /></Section>
      <Section tint title="Financial insights" sub="Five lenses on financial performance.">
        <Cards items={[{ t: 'Liquidity', d: 'Can the business meet short-term obligations?' }, { t: 'Profitability', d: 'How much of revenue becomes profit?' },
          { t: 'Leverage', d: 'How much of the business is funded by debt?' }, { t: 'Working Capital', d: 'Is enough cash tied up in daily operations?' }, { t: 'Cash Flow', d: 'How cash moves in and out each period.' }]} />
      </Section>
      <Section title="Financial reports">
        <Cards cols={4} from={5} items={[{ t: 'Balance Sheet', d: 'Assets, liabilities and equity at a point in time.' }, { t: 'Profit and Loss', d: 'Income and expenses over a period.' },
          { t: 'Cash Flow', d: 'Operating, investing and financing movements.' }, { t: 'Financial Ratios', d: 'Key ratios drawn from your statements.' }]} />
      </Section>
      <Section tint title="How Credit OS helps">
        <Steps items={[{ t: 'Organise', d: 'Bring financial information into one place.' }, { t: 'Understand', d: 'See performance through clear reports.' }, { t: 'Prepare', d: 'Get ready for financing discussions.' }]} />
      </Section>
      <Cta title="Know your numbers before you borrow." text="Start with a clear picture of your financial position."><Btn to={O}>Explore Lender Offers</Btn><Btn to={L} v="s">Loan Products</Btn></Cta>
    </>
  )
}
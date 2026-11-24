import { Dash, Faq, Form, Hero, Section, Steps, useUI } from '../components'
import { P } from '../paths'

function Offer({ n, c, p, e }: { n: string; c: string; p: string; e: string }) {
  const ui = useUI()
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <span style={{ width: 44, height: 44, borderRadius: 8, background: '#E9EDF2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>LOGO</span>
        <div><b>{n}</b><br /><span className="tag w">Sample lender</span></div></div>
      <p><b>Category:</b> {c}</p><p><b>Purpose:</b> {p}</p><p><b>Basic eligibility (sample):</b> {e}</p>
      <div className="row" style={{ marginTop: 16 }}><button className="btn s" onClick={() => ui.open('offer', { n, c, p, e })}>View Details</button><button className="btn p" onClick={() => ui.open('enquiry')}>Submit Enquiry</button></div>
    </div>
  )
}
export default function Offers() {
  return (
    <>
      <Hero tag="Lender Offers" title="Explore Financing Opportunities from Lending Partners." text="Review sample lender products by category, check requirements and submit an enquiry."
        a={['Browse Offers', '#offers']} b={['Partner With Us', P]}
        visual={<Dash title="Categories" kpis={[['Working capital', 'Sample'], ['Term', 'Sample'], ['Assets', 'Sample']]} bars={[50, 62, 44, 70, 56, 64]} note="Sample data" />} />
      <Section id="offers" title="Available products" sub="Clearly labelled sample lender information.">
        <div className="row" style={{ marginBottom: 24 }}>{['Working Capital', 'Term Loans', 'Business Loans', 'Asset Financing'].map(t => <span className="tag" key={t}>{t}</span>)}</div>
        <div className="grid c2">
          <Offer n="Sample Lender A" c="Working Capital" p="Inventory and operating cash flow" e="Registered business, minimum operating history" />
          <Offer n="Sample Lender B" c="Term Loans" p="Expansion and long-term needs" e="Financial statements available" />
          <Offer n="Sample Lender C" c="Business Loans" p="General business requirements" e="Business age and turnover criteria" />
          <Offer n="Sample Lender D" c="Asset Financing" p="Machinery and equipment purchase" e="Quotation for the asset" />
        </div>
      </Section>
      <Section tint title="Know what you are looking at">
        <div className="grid c3">
          <div className="card"><span className="tag">Educational</span><h3 style={{ marginTop: 12 }}>Educational information</h3><p>Explains loan categories. Not an offer.</p></div>
          <div className="card"><span className="tag">Sponsored</span><h3 style={{ marginTop: 12 }}>Sponsored promotions</h3><p>Always labelled clearly as sponsored.</p></div>
          <div className="card"><span className="tag w">Lender offer</span><h3 style={{ marginTop: 12 }}>Actual lender offers</h3><p>Published by participating lenders with their own terms.</p></div>
        </div>
      </Section>
      <Section title="How it works"><Steps items={[{ t: 'Explore', d: 'Explore available products.' }, { t: 'Review', d: 'Review lender requirements.' }, { t: 'Enquire', d: 'Submit an enquiry.' }, { t: 'Apply', d: "Follow the lender's application process." }]} /></Section>
      <Section tint id="enquiry" title="Submit an enquiry" sub="Sample form for this prototype.">
        <Form fields={[['Business name'], ['Contact person'], ['Email', 'email'], ['Phone', 'tel']]} label="Submit Enquiry" thanks="Thanks. Your sample enquiry was recorded." extra="Financing requirement" />
      </Section>
      <Section title="Frequently asked questions">
        <Faq items={[['Are these real lender offers?', 'Lenders shown here are samples for this prototype.'], ['Is approval guaranteed?', 'No. Each lender decides on its own criteria.'], ['What happens after I enquire?', "The lender contacts you with its application process."]]} />
      </Section>
    </>
  )
}

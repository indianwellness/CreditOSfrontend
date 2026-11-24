import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cards, Faq, Form, Hero, Section, type Item } from '../components'

function Consent() {
  const [on, setOn] = useState<Record<string, boolean>>({ 'Balance Sheet': true, 'Profit and Loss': true, 'Cash Flow': false })
  return (
    <div className="dash consent"><div className="top"><b>Consent preview</b><span>Conceptual</span></div>
      {Object.keys(on).map(k => (<label key={k}>{k}<input type="checkbox" checked={on[k]} onChange={() => setOn({ ...on, [k]: !on[k] })} /></label>))}
      <p style={{ fontSize: 13, color: '#4A5565', margin: '12px 0 0' }}>{Object.values(on).filter(Boolean).length} of 3 statements authorised for sharing.</p></div>
  )
}
export default function Privacy() {
  const faq: [string, string][] = [['What is Credit OS?', 'A platform connecting MSMEs, banks and NBFCs through financial information and loan discovery.'],
    ['Why is financial information required?', 'It shows your financial position and supports financing discussions.'],
    ['How does Tally integration work?', 'With your authorisation, financial data is extracted from Tally and standardised.'],
    ['Why is customer consent important?', 'It keeps you in control of your financial information.'], ['How can I contact support?', 'Use the support form below.']]
  const items: Item[] = [{ t: 'Why consent matters', d: 'Your information is shared only with your permission.' }, { t: 'What may be shared', d: 'Financial statements you choose to authorise.' },
    { t: 'Who may access', d: 'Only parties you have authorised.' }, { t: 'Why transparency matters', d: 'So you always know how your data is used.' }]
  return (
    <>
      <Hero tag="Privacy, consent and help" title="Your Financial Information. Your Control." text="Understand how information is handled, why consent matters and how to get help."
        a={['Read FAQs', '#faq']} b={['Contact Support', '#support']} visual={<Consent />} />
      <Section title="Data privacy"><Cards from={1} items={[{ t: 'Responsible handling', d: 'Financial information is handled responsibly.' }, { t: 'Authorised access', d: 'Only authorised parties can access shared information.' }, { t: 'Transparency', d: 'You can see what is shared and with whom.' }]} /></Section>
      <Section tint title="Customer consent" sub="You decide what is shared."><Cards cols={4} from={4} items={items} /></Section>
      <Section id="faq" title="Frequently asked questions"><Faq items={faq} /></Section>
      <Section tint id="support" title="Help and support" sub="Email: [SUPPORT EMAIL]">
        <Form fields={[['Name'], ['Email', 'email']]} label="Send Enquiry" thanks="Thanks. Your sample enquiry was recorded." extra="How can we help?" />
        <p style={{ color: '#4A5565', marginTop: 20, fontSize: 14 }}>Privacy Policy and Terms and Conditions: [content to be provided]. <Link className="lk" to="/">Back to home</Link></p>
      </Section>
    </>
  )
}

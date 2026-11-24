import { Cards, Dash, Form, Hero, Section, Steps } from '../components'
import { S } from '../paths'

export default function Partner() {
  return (
    <>
      <Hero tag="Partner With Us" title="Build Better MSME Lending Opportunities with Credit OS."
        text="Collaborate with Credit OS to access organised MSME financial information and connect with MSME customers."
        a={['Become a Partner', '#enquiry']} b={['Financial Data Services', S]}
        visual={<Dash title="Partnership model" kpis={[['Banks', 'Access'], ['NBFCs', 'Access'], ['Partners', 'Integrate']]} bars={[40, 58, 46, 68, 54, 76]} note="Illustrative" />} />
      <Section title="Partnership opportunities">
        <Cards cols={4} items={[{ t: 'Banks', d: 'Access organised MSME financial information.' }, { t: 'NBFCs', d: 'Connect with MSME customers.' },
          { t: 'Financial Institutions', d: 'Use financial information services.' }, { t: 'Business and Technology Partners', d: 'Collaborate on integration.' }]} />
      </Section>
      <Section tint title="Partnership benefits">
        <Cards cols={4} from={4} items={[{ t: 'Organised information', d: 'Access to organised MSME financial information.' }, { t: 'MSME reach', d: 'Opportunities to connect with MSME customers.' },
          { t: 'Information services', d: 'Financial information services.' }, { t: 'Digital collaboration', d: 'Digital collaboration opportunities.' }]} />
      </Section>
      <Section title="Partnership process"><Steps items={[{ t: 'Submit enquiry', d: 'Tell us about your organisation.' }, { t: 'Discuss', d: 'Discuss business requirements.' },
        { t: 'Evaluate', d: 'Evaluate collaboration opportunities.' }, { t: 'Onboard', d: 'Define integration and onboarding requirements.' }]} /></Section>
      <Section tint id="enquiry" title="Partnership enquiry" sub="We will respond to discuss next steps.">
        <Form fields={[['Organisation Name'], ['Organisation Type'], ['Contact Person'], ['Business Email', 'email'], ['Phone Number', 'tel']]} label="Submit Enquiry" thanks="Thanks. Your sample enquiry was recorded." />
      </Section>
    </>
  )
}

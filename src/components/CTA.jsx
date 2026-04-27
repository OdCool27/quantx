import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './CTA.css';

const initialFormData = {
  firstName: '',
  lastName: '',
  businessEmail: '',
  companyName: '',
  primaryNeed: '',
};

const CTA = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [submitStatus, setSubmitStatus] = useState({
    type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      businessEmail,
      companyName,
      primaryNeed,
    } = formData;

    if (!firstName || !lastName || !businessEmail || !companyName || !primaryNeed) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete all required fields before submitting.',
      });
      return;
    }

    const templateParams = {
      firstName,
      lastName,
      companyName,
      primaryNeed,
      businessEmail,
      title: 'Quant X Discovery Session Request',
    };

    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: '', message: '' });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setSubmitStatus({
        type: 'success',
        message: 'Your request was sent successfully. We will be in touch soon.',
      });
      setFormData(initialFormData);
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong while sending your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-grid">
          <div>
            <div className="tag tag-light">Ready to Begin?</div>
            <h2 className="cta-h2">Book Your Free<br /><em>Discovery Session.</em></h2>
            <p className="cta-body">30 minutes. No pitch. Real insight into where your finance function stands and exactly what it could become with Quant X.</p>
            <div className="cta-bullets">
              <div className="cta-bullet">Immediate assessment of your most pressing financial pain points</div>
              <div className="cta-bullet">A clear roadmap for transformation with no obligation</div>
              <div className="cta-bullet">Senior partner-level conversation, not a junior sales representative</div>
            </div>
          </div>
          <div>
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
              <input
                className="form-input"
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                placeholder="Business Email"
                required
              />
              <input
                className="form-input"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                required
              />
              <select
                className="form-select"
                name="primaryNeed"
                value={formData.primaryNeed}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Primary Need</option>
                <option value="Financial Reporting & Investor Readiness">Financial Reporting &amp; Investor Readiness</option>
                <option value="Process Optimisation">Process Optimisation</option>
                <option value="Audit Preparation & Controls">Audit Preparation &amp; Controls</option>
                <option value="Cloud Accounting Setup">Cloud Accounting Setup</option>
                <option value="AI & Automation">AI &amp; Automation</option>
                <option value="Not sure - need guidance">Not sure - need guidance</option>
              </select>
              <button className="btn-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <>Book My Free Session {'->'}</>}
              </button>
              {submitStatus.message ? (
                <div className={`form-status ${submitStatus.type}`} role="status" aria-live="polite">
                  {submitStatus.message}
                </div>
              ) : null}
              <div className="form-note">No commitment required · Response within 24 hours</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

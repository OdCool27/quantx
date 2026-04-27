import './Testimonial.css';

const Testimonial = () => {
  return (
    <section className="testimonial-section">
      <div className="test-inner">
        <div className="test-divider"></div>
        <blockquote className="test-quote">
          "Automation does not replace accountants - it redefines them. Their value does not diminish"
        </blockquote>
        <p className="test-support">
          Digital systems take over repetitive tasks, creating space for deeper thinking, sharper analysis, and more meaningful contribution. The accountant becomes an interpreter of financial reality — an advisor on risk, an architect of smarter decisions. Insight will always outweigh input.
        </p>
        
        <div className="test-divider"></div>
        <div className="test-author">Terry-Ann Hines</div>
        <div className="test-role">Founder & Chief Architect — QuantX</div>
      </div>
    </section>
  );
};

export default Testimonial;

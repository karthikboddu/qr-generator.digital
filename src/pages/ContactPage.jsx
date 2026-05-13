import React, { useState } from 'react';
import Seo from '../components/Seo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cn } from '../lib/utils';
import { Mail, Send, MessageSquare, Sparkles, CheckCircle2, ShieldCheck, LifeBuoy, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(10, 'Message is too short!').required('Required'),
});

function ContactPage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError(null);
      try {
        const { error: submitError } = await supabase
          .from('contact_submissions')
          .insert([
            {
              name: values.name,
              email: values.email,
              message: values.message,
              user_id: user?.id || null,
            },
          ]);

        if (submitError) throw submitError;

        setSubmitted(true);
        resetForm();
        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        console.error('Error submitting contact form:', err);
        setError('Failed to send message. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Seo
        title="Contact QR Gen"
        description="Contact QR Gen with questions, feedback, bug reports, or partnership inquiries about our QR code generator."
        path="/contact"
      />

      <div className="grid-bg relative overflow-hidden" style={{ minHeight: '100%', padding: '60px 20px' }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', right: '10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="animate-fadeInUp relative z-10 max-w-6xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Support & Partnerships
            </div>
            <h1 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.03em'
            }}>
              Get in Touch
            </h1>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '600px', margin: '0 auto',
              lineHeight: 1.6
            }}>
              We’d love to hear from you. Use this page for support questions, bug reports, feature ideas, and partnership discussions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
            {/* Form Section */}
            <div className="dark-card" style={{ padding: '40px', background: 'rgba(22, 22, 31, 0.8)', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-primary)'
                }}>
                  <Send size={20} />
                </div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  Send a Message
                </h2>
              </div>

              <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {submitted && (
                  <div style={{
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    color: '#4ade80',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <CheckCircle2 size={18} />
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {error && (
                  <div style={{
                    padding: '16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    color: '#f87171',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label className="form-label">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={cn("dark-input", formik.touched.name && formik.errors.name && "border-red-500/50")}
                    placeholder="Your name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full" /> {formik.errors.name}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label className="form-label">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={cn("dark-input", formik.touched.email && formik.errors.email && "border-red-500/50")}
                    placeholder="you@example.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full" /> {formik.errors.email}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className={cn("dark-textarea", formik.touched.message && formik.errors.message && "border-red-500/50")}
                    placeholder="How can we help?"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full" /> {formik.errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', height: '52px', fontSize: '15px', marginTop: '8px' }}
                >
                  <span>{formik.isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!formik.isSubmitting && <Send size={18} />}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="dark-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <LifeBuoy size={20} color="var(--accent-primary)" />
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    What to Reach Out For
                  </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  Our team reviews every message to improve the platform. We're especially interested in:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: ShieldCheck, text: "Bug reports about downloads or scan issues." },
                    { icon: Sparkles, text: "Feature requests for new QR types or styles." },
                    { icon: MessageSquare, text: "Partnership or integration inquiries." }
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ marginTop: '3px', color: 'var(--accent-primary)' }}>
                        <item.icon size={14} />
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dark-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <CheckCircle2 size={20} color="#4ade80" />
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    Response Time
                  </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  We typically respond within 24-48 hours. For faster resolution, please include the QR type, device, and browser you were using if reporting a technical issue.
                </p>
              </div>

              <div className="dark-card" style={{ padding: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' }}>
                <Mail size={24} style={{ margin: '0 auto 12px', display: 'block', color: 'var(--accent-primary)' }} />
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>
                  Direct Email
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                  info@qr-generator.digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;

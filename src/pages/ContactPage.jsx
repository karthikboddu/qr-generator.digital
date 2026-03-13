import React from 'react';
import Seo from '../components/Seo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cn } from '../lib/utils';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(10, 'Message is too short!').required('Required'),
});

function ContactPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // In a real app, you'd send this to a server or email service.
      // For now, we'll just simulate a successful submission.
      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.");
        setSubmitting(false);
        resetForm();
      }, 1000);
    },
  });

  return (
    <>
      <Seo
        title="Contact QR Gen"
        description="Contact QR Gen with questions, feedback, bug reports, or partnership inquiries about our QR code generator."
        path="/contact"
      />
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground text-center mb-10">
          We'd love to hear from you! Send us a message below.
        </p>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={cn("w-full p-3 bg-input border rounded-md focus:ring-2 focus:outline-none", formik.touched.name && formik.errors.name ? "border-red-500 ring-red-500" : "border-border focus:ring-ring")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={cn("w-full p-3 bg-input border rounded-md focus:ring-2 focus:outline-none", formik.touched.email && formik.errors.email ? "border-red-500 ring-red-500" : "border-border focus:ring-ring")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className={cn("w-full p-3 bg-input border rounded-md focus:ring-2 focus:outline-none", formik.touched.message && formik.errors.message ? "border-red-500 ring-red-500" : "border-border focus:ring-ring")}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
            ) : null}
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-primary-foreground bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactPage;

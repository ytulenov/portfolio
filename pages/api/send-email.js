import { Resend } from 'resend';
import { ContactFormSchema } from '../../lib/schemas';
import ContactFormEmail from '../../components/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = ContactFormSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  try {
    const { name, email, subject, message } = result.data;

    
    await resend.emails.send({
      from: 'yerkin@ytulenov.com',
      to: [email],
      cc: ['yerkin@ytulenov.com'],
      subject: `Contact Form: ${subject}`, 
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, subject, message }),
    });

    
    await resend.emails.send({
      from: 'yerkin@ytulenov.com',
      to: ['ytulenov@gmail.com'],
      cc: ['yerkin@ytulenov.com'],
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, subject, message }),
    });


    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
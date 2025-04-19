import { Resend } from 'resend';
import { ContactFormSchema } from '../../lib/schemas';
import ContactFormEmail from '../../components/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('API route invoked:', new Date().toISOString());
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Not set');
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing');
    return res.status(500).json({ error: 'Server configuration error: Missing API key' });
  }

  const result = ContactFormSchema.safeParse(req.body);
  console.log('Schema validation result:', result);
  if (!result.success) {
    console.error('Validation failed:', result.error.format());
    return res.status(400).json({ error: 'Invalid input', details: result.error.format() });
  }

  try {
    const { name, email, subject, message } = result.data;
    console.log('Validated data:', { name, email, subject, message });

    const fromEmail = 'yerkin@ytulenov.com'; // Ensure this is verified in Resend

    console.log('Sending email 1 to:', email);
    await resend.emails.send({
      from: fromEmail,
      to: [email],
      cc: ['yerkin@ytulenov.com'],
      subject: "Thank you for your message!",
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, subject, message })
    });

    console.log('Sending email 2 to: ytulenov@gmail.com');
    await resend.emails.send({
      from: fromEmail,
      to: ['ytulenov@gmail.com'],
      cc: ['yerkin@ytulenov.com'],
      subject: "Thank you for your message!",
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, subject, message }),
    });

    console.log('Emails sent successfully');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
  }
}
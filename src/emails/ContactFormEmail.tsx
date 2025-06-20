// archivo: src/emails/ContactFormEmail.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New message from your contact form</Preview>
    <Body style={{ fontFamily: 'Arial, sans-serif' }}>
      <Container>
        <Heading>New Contact Form Submission</Heading>
        <Text>You received a new message from the contact form on your website.</Text>
        <Text><strong>From:</strong> {name}</Text>
        <Text><strong>Email:</strong> {email}</Text>
        <Text><b>Message:</b></Text>
        <Text>{message}</Text>
      </Container>
    </Body>
  </Html>
);
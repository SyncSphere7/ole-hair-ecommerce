import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface MagicLinkEmailProps {
  url: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Magic Link to Sign in to Ole Hair</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/olehair-big-logo.png`}
          width="120"
          height="auto"
          alt="Ole Hair"
          style={logo}
        />
        <Text style={paragraph}>Hi there,</Text>
        <Text style={paragraph}>
          Welcome to Ole Hair! Click the button below to securely sign in to your
          account. This link is valid for 24 hours.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={url}>
            Sign In
          </Button>
        </Section>
        <Text style={paragraph}>
          If you didn't request this email, you can safely ignore it.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          The Ole Hair Team
        </Text>
        <hr style={hr} />
        <Link href="https://www.olehair.com/" style={footer}>
          www.olehair.com
        </Link>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};

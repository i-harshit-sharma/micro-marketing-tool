import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';

const baseUrl = process.env.HOST_URL ? `${process.env.HOST_URL}` : '';

export default function OtpEmail({ otp, email, username }) {
  return (
    <Html>
      <Head />
      <Preview>Your OTP code for verifying your Marketeer account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src="https://res.cloudinary.com/dxqfeqcrn/image/upload/v1752749119/logo_wwftb3.png"
                width="75"
                height="75"
                alt="Marketeer's Logo"
                style={{
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Section>

            <Section style={upperSection}>
              <Heading style={h1}>Your OTP Code</Heading>

              <Text style={mainText}>
                Hi <strong>{username}</strong>,
              </Text>
              <Text style={mainText}>
                Use the One-Time Password (OTP) below to verify your email address associated with your Marketeer account:
              </Text>

              <Text style={otpText}>
                {otp}
              </Text>

              <Text style={mainText}>
                This OTP is valid for only 10 minutes. Do not share it with anyone.
              </Text>

              <Text style={mainText}>
                If you did not request this OTP, please ignore this email.
              </Text>
            </Section>

            <Hr />

            <Section style={lowerSection}>
              <Text style={cautionText}>
                Marketeer will never ask you to disclose or verify your password, credit card, or banking details.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ========== Styles ==========
const main = {
  backgroundColor: '#fff',
  color: '#212121',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
};

const coverSection = {
  backgroundColor: '#fff',
};

const imageSection = {
  backgroundColor: '#252f3d',
  padding: '20px 0',
};

const upperSection = {
  padding: '25px 35px',
};

const lowerSection = {
  padding: '25px 35px',
};

const h1 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const mainText = {
  color: '#333',
  fontSize: '14px',
  margin: '14px 0',
};

const otpText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#4CAF50',
  textAlign: 'center',
  margin: '20px 0',
};

const cautionText = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '1.4',
};

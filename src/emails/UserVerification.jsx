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

export default function VerifyEmail({ verificationLink, email, username }) {
    return (
        <Html>
            <Head />
            <Preview>Verify your email to activate your Marketeer account</Preview>
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
                            <Heading style={h1}>Verify your email address</Heading>

                            <Text style={mainText}>
                                Hi <strong>{username}</strong>,
                            </Text>
                            <Text style={mainText}>
                                Thanks for starting the new Marketeer account creation process.
                                To secure your account, we just need to verify your email
                                address:
                            </Text>
                            <Text style={mainText}>
                                <strong>{email}</strong>
                            </Text>
                            <Section style={verificationSection}>
                                <Button href={`${baseUrl}/${verificationLink}`} style={button}>
                                    Verify Email Address
                                </Button>
                            </Section>

                            <Text style={mainText}>
                                If you didn't sign up for a Marketeer account, you can safely ignore this email.
                            </Text>

                            <Text style={mainText}>
                                Button not working? Copy and paste the link below into your browser:
                            </Text>

                            <Text style={link}>{`${baseUrl}/${verificationLink}`}</Text>
                        </Section>

                        <Hr />

                        {/* Footer Section */}
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                Marketeer will never email you asking to disclose or verify your
                                password, credit card, or banking details.
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

const link = {
    color: '#2754C5',
    fontSize: '14px',
    wordBreak: 'break-word',
    textDecoration: 'underline',
};

const button = {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    padding: '12px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'inline-block',
};

const verificationSection = {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
};

const cautionText = {
    color: '#666',
    fontSize: '12px',
    lineHeight: '1.4',
};

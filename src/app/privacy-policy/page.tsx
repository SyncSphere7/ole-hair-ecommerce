
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Ole Hair',
  description: 'Privacy Policy for Ole Hair.',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for OleHair</h1>
      <p className="mb-4">Last updated: October 25, 2025</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to OleHair! We are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and protect your
            personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Personal identification information (Name, email, phone number, etc.)</li>
            <li>Account information if you sign up or log in via Facebook</li>
            <li>Transaction data (when you make purchases)</li>
            <li>Usage data (pages visited, device/browser info)</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Process orders and deliver products</li>
            <li>Provide customer service</li>
            <li>Improve our website and services</li>
            <li>Enable social login (Facebook)</li>
            <li>Send updates or marketing offers (if you opt-in)</li>
            <li>Comply with legal requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Sharing of Information</h2>
          <p>We may share your info with:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Service providers (payment processing, delivery)</li>
            <li>Facebook, when you choose "Log in with Facebook"</li>
            <li>Legal authorities, if required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Facebook Login</h2>
          <p>
            If you log in using Facebook, we collect and process some of your
            public Facebook profile information subject to your Facebook
            permissions and this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Data Protection & Security</h2>
          <p>
            We use industry-standard security measures to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
          <p>You can:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Request access or changes to your personal data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt out of marketing emails</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have any questions about this policy, please contact us at:{' '}
            <a href="mailto:ceo@syncsphereofficial.com" className="text-blue-600 hover:underline">
              ceo@syncsphereofficial.com
            </a>
          </p>
          <p>
            <a href="https://www.olehair.com/" className="text-blue-600 hover:underline">
              https://www.olehair.com/
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Changes</h2>
          <p>
            We may update this Policy. Updates will be posted at this URL with a
            new effective date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

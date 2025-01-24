const PrivacyPolicy = () => {
  return (
    <div className="sm:grid sm:place-items-center">
      <div className=" sm:w-[522px]">
        <div className="mx-5 my-10 text-justify">
          <h2 className="text-center font-extrabold text-2xl">
            Privacy Policy{" "}
          </h2>

          <div className="mt-3">
            <p className="mb-3">Last Updated: Feb 19 2024</p>
            <p className="font-bold">Introduction</p>
            <p>
              At Cha Cha, your privacy is our top priority. We are committed to
              ensuring that your personal information is handled securely and
              responsibly. This Privacy Policy outlines how we collect, use, and
              safeguard your personal data while delivering our services.
            </p>
          </div>

          <div>
            <p className="font-bold mt-5">
              What Information We Collect: Personal Data
            </p>
            <ul className="list-disc">
              <li className="list-item">
                Account Information: Including but not limited to your name,
                email address, and mobile number.
              </li>
              <li>
                Profile Information: Including but not limited to your
                affiliations, priorities, and challenges.
              </li>
              <li>
                Conversation data: Answers to questions related to our weekly
                pulses.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">How We Collect Data</p>
            <ul className="list-disc">
              <li>Registration: Through the initial signup process.</li>
              <li>
                Weekly topics: You may share information with us by joining
                topic related pulses each week.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">Why We Collect Data</p>
            <ul className="list-disc">
              <li>
                To personalize and improve the services we offer (to provide you
                with tailored responses based on your personal information and
                responses).
              </li>
              <li>
                Advice shared by users may anonymously be shared with other
                users on the platform to improve the quality of advice / service
                Cha Cha is able to provide
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">Data we do not collect</p>
            <ul className="list-disc">
              <li>
                We never collect any data through phone usage such as location
                tracking or contacts. The only information we will ever have
                about you, is that which you explicitly share with us.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">
              Data Use and Automated Decision-making
            </p>
            <ul className="list-disc">
              <li>
                We use AI models to match your questions, responses and
                circumstances to the most relevant advice from similar
                individuals who may have useful advice to share. Your personal
                details are always protected, even when shared with AI models.
              </li>
              <li>
                All data is anonymized and aggregated to prevent unauthorized
                access to individualized data by the AI models.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">Data Storage and Security</p>
            <ul className="list-disc">
              <li>All data is encrypted and securely stored with AWS.</li>
              <li>
                Data is retained for as long as you maintain your account with
                Cha Cha.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">How We Protect Your Data</p>
            <ul className="list-disc">
              <li>
                Securing Data in Transit: We ensure that all communication and
                data in transit are encrypted to prevent unauthorized access.
              </li>
              <li>
                Enhanced Security Protocols: We continuously update our security
                protocols, including regular changes to encryption keys, to
                safeguard against potential breaches and enhance data
                protection.
              </li>
              <li>
                Restrictions on Personal Data Sharing: We strictly adhere to the
                principle of not sharing any personally identifiable data. Any
                data shared for the purposes of improving our services is in an
                aggregated form. Users have exclusive access to their personal
                data within their accounts.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">Data Sharing</p>
            <ul className="list-disc">
              <li>
                We will never share individualized data with third parties.
              </li>
              <li>
                Any data that may be shared or used to provide better advice to
                other users will be anonymized and/or aggregated to ensure
                personal information is always protected.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">User Rights and Choices</p>
            <ul className="list-disc">
              <li>
                You can delete your account and all associated data at any time
                in settings.
              </li>
              <li>
                Data collection as described above is integral to the service we
                offer, and opting out is not possible.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">Consent and Policy Updates</p>
            <ul className="list-disc">
              <li>
                By using Cha Cha, you consent to the collection and use of your
                information as outlined in this Privacy Policy.
              </li>
              <li>
                Any changes to this policy will be communicated via in-app
                notifications. sms or email.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mt-5">Legal Compliance</p>
            <ul className="list-disc">
              <li>We are GDPR compliant.</li>
              <li>The service is not intended for minors.</li>
            </ul>
          </div>

          <p className="mt-5">
            For any questions or concerns regarding this Privacy Policy, please
            contact us at Cha Cha.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

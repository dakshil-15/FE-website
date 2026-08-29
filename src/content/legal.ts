export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocumentContent = {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactNote: string;
};

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Privacy Policy",
  eyebrow: "Legal",
  lastUpdated: "29 August 2026",
  intro:
    "First Economy Private Limited (\"First Economy\", \"we\", \"us\", or \"our\") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website, contact us, subscribe to updates, or apply for a role.",
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We may collect personal information that you choose to provide, including your name, email address, phone number, company name, message content, job application details, and files you upload (such as a resume).",
        "We may also collect limited technical information automatically, such as IP address, browser type, device information, pages viewed, and referral URLs, through cookies and similar technologies.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      paragraphs: ["We use personal information to:"],
      bullets: [
        "Respond to enquiries and provide information about our services.",
        "Process job applications and communicate about recruitment.",
        "Send newsletters or marketing communications where you have opted in.",
        "Improve our website, services, security, and user experience.",
        "Comply with legal obligations and protect our rights.",
      ],
    },
    {
      id: "legal-basis",
      title: "Legal basis and consent",
      paragraphs: [
        "Where required, we process personal information based on your consent, our legitimate business interests (such as responding to enquiries), contractual necessity, or compliance with applicable law.",
        "By submitting a contact or application form, you confirm that the information you provide is accurate and that you agree to this Privacy Policy and our Terms & Conditions where applicable.",
      ],
    },
    {
      id: "sharing",
      title: "How we share information",
      paragraphs: [
        "We do not sell your personal information. We may share information with trusted service providers who help us operate our website, deliver email, host infrastructure, or support recruitment — only to the extent needed and subject to appropriate safeguards.",
        "We may also disclose information if required by law, court order, or to protect the rights, property, or safety of First Economy, our clients, or others.",
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      paragraphs: [
        "We retain personal information only for as long as necessary for the purposes described in this policy, including to meet legal, accounting, or reporting requirements. Enquiry and application records are typically retained for a limited period unless a longer retention period is required or permitted by law.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We implement reasonable administrative, technical, and organisational measures designed to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "Depending on applicable law, including India’s Digital Personal Data Protection Act, 2023, you may have rights to access, correction, erasure, withdrawal of consent, grievance redressal, and other remedies regarding your personal information.",
        "To exercise these rights, contact us using the details below. We may need to verify your identity before responding.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      paragraphs: [
        "Our website may use cookies and similar technologies to remember preferences, measure traffic, and improve performance. You can control cookies through your browser settings. Disabling cookies may affect certain site features.",
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      paragraphs: [
        "Our website may contain links to third-party websites or social platforms. We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.",
      ],
    },
    {
      id: "children",
      title: "Children’s privacy",
      paragraphs: [
        "Our services are not directed to individuals under 18 years of age, and we do not knowingly collect personal information from children.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page indicates when it was last revised. Material changes will be posted on this page.",
      ],
    },
  ],
  contactNote:
    "For privacy-related questions or requests, email hello@firsteconomy.in or write to First Economy Private Limited, Mumbai, India.",
};

export const termsContent: LegalDocumentContent = {
  title: "Terms & Conditions",
  eyebrow: "Legal",
  lastUpdated: "29 August 2026",
  intro:
    "These Terms & Conditions (\"Terms\") govern your access to and use of the First Economy website and related online forms. By using this website, you agree to these Terms. If you do not agree, please do not use the site.",
  sections: [
    {
      id: "about",
      title: "About First Economy",
      paragraphs: [
        "This website is operated by First Economy Private Limited, an integrated marketing solutions company headquartered in Mumbai, India. References to \"First Economy\", \"we\", \"us\", or \"our\" mean First Economy Private Limited unless stated otherwise.",
      ],
    },
    {
      id: "use-of-site",
      title: "Use of the website",
      paragraphs: ["You agree to use this website only for lawful purposes and in a way that does not:"],
      bullets: [
        "Violate applicable laws or regulations.",
        "Infringe the rights of others or attempt unauthorised access to our systems.",
        "Transmit malware, spam, or harmful or misleading content.",
        "Interfere with the proper functioning or security of the website.",
      ],
    },
    {
      id: "no-client-relationship",
      title: "No automatic client relationship",
      paragraphs: [
        "Information on this website is for general information about First Economy and our capabilities. Submitting a contact form, newsletter signup, or job application does not create a client, agency, employment, or partnership relationship unless confirmed in writing by an authorised representative of First Economy.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "All content on this website — including text, visuals, logos, layouts, case studies, and downloadable materials — is owned by First Economy or used with permission and is protected by applicable intellectual property laws.",
        "You may view and share links to pages for personal or internal business reference. You may not copy, modify, distribute, or exploit site content for commercial purposes without our prior written consent.",
      ],
    },
    {
      id: "case-studies",
      title: "Case studies and testimonials",
      paragraphs: [
        "Case studies, metrics, logos, and client names are presented for illustrative purposes based on work performed for respective clients. Results vary by brief, market, and timeframe. Nothing on this site guarantees future performance.",
      ],
    },
    {
      id: "form-submissions",
      title: "Form submissions",
      paragraphs: [
        "When you submit information through our forms, you represent that the information is accurate and that you have the right to provide it. For job applications, you confirm that documents you upload are truthful and do not infringe third-party rights.",
        "We may use submitted information as described in our Privacy Policy.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      paragraphs: [
        "This website and its content are provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, First Economy disclaims all warranties, express or implied, including fitness for a particular purpose and non-infringement.",
        "We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by applicable law, First Economy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or any content on it.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      paragraphs: [
        "You agree to indemnify and hold harmless First Economy and its directors, officers, employees, and agents from claims arising out of your misuse of the website or breach of these Terms.",
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      paragraphs: [
        "Links to third-party websites are provided for convenience. First Economy does not control and is not responsible for the content, policies, or practices of third-party sites.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law and jurisdiction",
      paragraphs: [
        "These Terms are governed by the laws of India. Subject to applicable law, courts in Mumbai, Maharashtra shall have exclusive jurisdiction over disputes relating to these Terms or use of this website.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these Terms",
      paragraphs: [
        "We may revise these Terms at any time by posting an updated version on this page. Your continued use of the website after changes are posted constitutes acceptance of the revised Terms.",
      ],
    },
  ],
  contactNote:
    "For questions about these Terms, contact hello@firsteconomy.in.",
};

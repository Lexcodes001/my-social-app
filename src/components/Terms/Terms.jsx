import React from "react";
import classes from "./Terms.module.css";

// Terms of Service Component
const TermsOfService = () => (
  <main className={classes["main"]}>
    <h3>Terms of Service</h3>
    <p>
      1. <strong>Acceptance of Terms</strong>: Welcome to My Social App ("the
      App"). By using the App, you agree to comply with and be bound by these
      Terms of Service.
    </p>
    <p>
      2. <strong>User Eligibility</strong>: You must be at least 13 years old to
      use the App. If you are under 13, you may only use the App with the
      consent and supervision of a parent or legal guardian.
    </p>
    <p>
      3. <strong>User Conduct</strong>: You agree not to engage in any unlawful
      or prohibited activities while using the App...
    </p>
    {/* Additional terms go here */}
  </main>
);

// Privacy Policy Component
const PrivacyPolicy = () => (
  <main className={classes["main"]}>
    <h3>Privacy Policy</h3>
    <p>
      1. <strong>Information We Collect</strong>: Personal Information, Usage
      Information, etc.
    </p>
    <p>
      2. <strong>How We Use Your Information</strong>: To provide and improve
      the App's services, personalize your experience, communicate with you,
      etc.
    </p>
    <p>
      3. <strong>Information Sharing</strong>: We do not sell, trade, or rent
      your personal information to third parties...
    </p>
  </main>
);

export { TermsOfService, PrivacyPolicy };
# CleanBrowse Monetization Flow

This document outlines the monetization strategy for CleanBrowse, which uses a freemium model with a premium subscription managed by Stripe.

## 1. Subscription Model

- **Free Tier:** Core ad-blocking, whitelisting, and custom filter imports.
- **Premium Tier:**
  - Cloud-updated advanced filter lists.
  - "Stealth Mode" to bypass anti-ad-blockers.
  - Priority support.
  - Cloud backup & sync of settings.
- **Pricing:**
  - Monthly: $2.99/month
  - Yearly: $19.99/year

## 2. Payment & Licensing Flow

The entire process is designed to be secure and straightforward.

1.  **User Initiates Upgrade:** The user clicks an "Upgrade to Premium" CTA in the extension's popup or options page. This opens a Stripe Checkout page.

2.  **Stripe Checkout:** The user completes the payment through Stripe's secure checkout.

3.  **Stripe Webhook Notification:** After a successful payment, Stripe sends a `checkout.session.completed` event to our backend webhook (`/webhook/stripe`).

4.  **Backend Creates License:**
    - The webhook handler verifies the Stripe event.
    - It creates a new user record in the database (or updates an existing one) with the customer's email and subscription status.
    - It generates a unique, signed JWT (JSON Web Token) to act as the license key. This token contains the user's ID and the subscription expiry date.
    - The backend emails the license key to the user.

5.  **User Activates License:**
    - The user copies the license key from their email and pastes it into the extension's options page.
    - The user clicks "Verify License".

6.  **Extension Verifies License:**
    - The extension sends the license key to the backend API (`/api/verify-license`).
    - The backend validates the JWT's signature and checks that the subscription is still active in the database.
    - If valid, the backend returns a success response.

7.  **Extension Unlocks Premium Features:**
    - Upon successful verification, the extension stores the license key and its expiry date in `chrome.storage.local`.
    - The UI updates to show a "Premium" status, and all premium features are unlocked.

## 3. Backend Endpoints

-   **`POST /api/verify-license`**
    -   **Request Body:** `{ "token": "..." }`
    -   **Logic:** Validates the JWT. Returns success if the token is valid and the associated subscription is active.
    -   **Response:** `{ "valid": true, "expires": "..." }` or `{ "valid": false, "error": "..." }`

-   **`GET /api/filters/latest`**
    -   **Logic:** Requires a valid license key (sent as a bearer token in the `Authorization` header). Serves the latest premium filter lists from the database or a cached file.

-   **`POST /webhook/stripe`**
    -   **Logic:** Handles subscription events from Stripe (e.g., creation, renewal, cancellation). Updates the user's subscription status in the database accordingly.

## 4. License Validation & Offline Support

-   The extension re-validates the license key with the backend periodically (e.g., once every 24 hours) to ensure the subscription is still active.
-   If the backend is unreachable, the extension relies on the expiry date stored locally in the JWT to provide offline access to premium features until the token expires. This ensures a seamless user experience even with intermittent network issues.

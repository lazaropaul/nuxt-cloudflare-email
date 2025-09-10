# Nuxt Cloudflare Email Template

A TypeScript template for sending emails from Nuxt server-side applications via Cloudflare Workers. This template provides a robust solution for email delivery using Cloudflare's edge computing platform.

## Features

- 🚀 **TypeScript Support**: Fully typed implementation for better developer experience
- 📧 **Email Sending**: Send emails directly from your Nuxt server routes
- ⚡ **Cloudflare Workers**: Leverages Cloudflare's edge network for fast email delivery
- 🔒 **Verified Addresses Only**: Restricted to verified destination addresses for security
- 🎯 **Server-Side**: Designed for Nuxt server-side email sending capabilities

## Prerequisites

Before using this template, ensure you have:

- Node.js 18+ installed
- A Cloudflare account with Workers enabled
- Verified email addresses in your Cloudflare email routing setup
- Basic knowledge of TypeScript and Nuxt.js

## Setup

1. **Clone this template**:
   ```bash
   git clone https://github.com/lazaropaul/nuxt-cloudflare-email.git
   cd nuxt-cloudflare-email
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   CLOUDFLARE_API_TOKEN=your_api_token
   CLOUDFLARE_ZONE_ID=your_zone_id
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   ```

## Configuration

### Cloudflare Workers Setup

1. **Enable Email Routing** in your Cloudflare dashboard
2. **Verify destination addresses** that will receive emails
3. **Set up Worker** with the provided TypeScript code
4. **Configure API tokens** with appropriate permissions

### Nuxt Configuration

Add the email service to your Nuxt configuration:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
    cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID,
    cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  }
})
```

## Usage

### Basic Email Sending

```typescript
// server/api/send-email.post.ts
export default defineEventHandler(async (event) => {
  const { to, subject, content } = await readBody(event)
  
  try {
    const result = await sendEmail({
      to: to, // Must be a verified address
      subject: subject,
      content: content,
      from: 'noreply@yourdomain.com'
    })
    
    return { success: true, messageId: result.id }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email'
    })
  }
})
```

### TypeScript Email Interface

```typescript
interface EmailOptions {
  to: string        // Verified destination address
  from: string      // Sender address
  subject: string   // Email subject
  content: string   // Email content (HTML or text)
}
```

## Important Notes

### Verified Destination Addresses

⚠️ **Security Restriction**: This template only sends emails to **verified destination addresses**. This is a Cloudflare Workers limitation that prevents spam and ensures compliance with email regulations.

To add verified addresses:
1. Go to your Cloudflare dashboard
2. Navigate to Email Routing
3. Add and verify destination addresses
4. Only these verified addresses can receive emails

### TypeScript Benefits

This template is built with TypeScript to provide:
- **Type Safety**: Catch errors at compile time
- **IntelliSense**: Better IDE support and autocomplete
- **Documentation**: Self-documenting code with type definitions
- **Refactoring**: Safer code changes and refactoring

## Project Structure

```
├── server/
│   ├── api/
│   │   └── send-email.post.ts    # Email sending endpoint
│   └── utils/
│       └── email.ts              # Email utility functions
├── types/
│   └── email.ts                  # TypeScript type definitions
├── nuxt.config.ts                # Nuxt configuration
└── README.md                     # This file
```

## Development

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Type checking**:
   ```bash
   npm run typecheck
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test your implementation
5. Submit a pull request

## License

This template is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- Review [Nuxt.js server documentation](https://nuxt.com/docs/guide/directory-structure/server)
- Open an issue in this repository

---

**Note**: Remember that all destination email addresses must be verified in your Cloudflare Email Routing settings before emails can be successfully delivered.

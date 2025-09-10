# Nuxt Cloudflare Email Template

A TypeScript template for sending emails from Nuxt server-side applications via Cloudflare Workers. Because in a few days I won't remember how to use it

## Prerequisites

Before using this template, ensure you have:

- Node.js 18+ installed
- A Cloudflare Worker with Email Routing enabled
- Verified email addresses in your Cloudflare email routing setup

## Configuration

### Cloudflare Workers Setup

1. **Enable Email Routing** in your Cloudflare dashboard
2. **Verify destination addresses** that will receive emails
3. **Set up Worker** with the provided TypeScript code

## Important Notes

### Verified Destination Addresses

⚠️ **Security Restriction**: This template only sends emails to **verified destination addresses**. This is a Cloudflare Workers limitation that prevents spam and ensures compliance with email regulations.

To add verified addresses:
1. Go to your Cloudflare dashboard
2. Navigate to Email Routing
3. Add and verify destination addresses
4. Only these verified addresses can receive emails

## Project Structure

```
├── server/
│   └── api/
│        └── send-email.post.ts    # Email sending endpoint
└── nuxt.config.ts                 # Nuxt configuration
```

## Upload with Wrangler

1. **Build the project**:
   ```bash
   npm run build
   bun run build
   ```

2. **Update wrangler.toml (recomended after making changes on the file) **:
   ```bash
   npx wrangler types
   bunx wrangler types
   ```

3. **Upload to Cloudflare**:
   ```bash
   npx wrangler deploy
   bunx wrangler deploy
   ```

## License

This template is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)
- [Enable email routing](https://developers.cloudflare.com/email-routing/get-started/)
- Review [Nuxt.js server documentation](https://nuxt.com/docs/guide/directory-structure/server)
- Open an issue in this repository

---

**Note**: Remember that all destination email addresses must be verified in your Cloudflare Email Routing settings before emails can be successfully delivered.


/*
Its necessary to mark this imports as external in the nuxt.config.ts file so it works on Workers but gives no error building the app
nitro: {
    preset: 'cloudflare-module',  // ensures Nuxt builds for CF Workers
    rollupConfig: {
      external: ['cloudflare:email', 'mimetext'],
    }
  },
*/
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  //Allows to read env vars directly from the Cloudflare Worker, without this line it won't work
  const env = event.context.cloudflare?.env; 

  const msg = createMimeMessage();
  msg.setSender({ name: "<SENDER_NAME>", addr: "<SENDER_EMAIL>" });
  msg.setRecipient({ name: "<RECIPIENT_NAME>", addr: "<RECIPIENT_EMAIL>" });
  msg.setSubject("An email generated in a worker");
  msg.addMessage({
    contentType: "text/plain",
    data: `Congratulations, you just sent an email from a worker.`,
  });

  const message = new EmailMessage(
    "<FROM_ADDRESS>",
    "<TO_ADDRESS>",
    msg.asRaw(),
  );
  try {
    /*
      It's necessary to configure the wrangler.toml as seen in this repo
    */
    // env.<NAME_SET_IN_SEND-EMAIL_WRANGLER.TOML>.send(message)
    await env.SEB.send(message);
  } catch (e: any) {
    return { status: 500, error: true, statusMessage: "Error sending mail", message: e.message };
  }

  return { status: 200, message: "Mail sent successfully" };
});

import { defineMiddleware } from "astro:middleware";
import { paraglideMiddleware } from "./paraglide/server.js";
import { getLocale, getTextDirection, setLocale } from "./paraglide/runtime.js";
import { m } from "./paraglide/messages.js";

export const onRequest = defineMiddleware((context, next) => {
	return paraglideMiddleware(context.request, ({ request }) => next(request));
});

// m.greeting({ name: "World" }); // "Hello World!"

// // Get and set locale
// getLocale();    // "en"
// getTextDirection(); // "ltr" | "rtl" for current locale
// setLocale("de"); // switches to German
import { z } from "zod";

/** Shared by the browser form and the API route so both enforce identical rules. */
export const enquirySchema = z.object({
  kind: z.enum(["contact", "consultation"]),
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+0-9()\s-]*$/, "Phone numbers may only contain digits, spaces, + ( ) and -.")
    .optional()
    .or(z.literal("")),
  area: z.string().trim().max(120).optional().or(z.literal("")),
  office: z.enum(["polokwane", "sandton", "no-preference"]).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your matter (at least 10 characters).")
    .max(3000, "Message is too long (3000 characters maximum)."),
  consent: z.literal(true, { error: "Consent is required so we can respond to you." }),
  /** Honeypot: real visitors never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Epoch ms when the form was rendered; used to reject instant bot submissions. */
  startedAt: z.number().optional(),
  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

import { defineCollection, z } from 'astro:content';

// Writeups: time-ordered CTF / HTB / Sherlock walkthroughs.
const writeups = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      platform: z.string().optional(),        // e.g. HackTheBox, TryHackMe
      type: z.string().optional(),            // e.g. Machine, Challenge, Sherlock, Room
      difficulty: z.string().optional(),      // e.g. Easy, Medium, Hard
      os: z.string().optional(),              // e.g. Linux, Windows 7 x64
      ip: z.string().optional(),              // target IP, if relevant
      url: z.string().url().optional(),       // challenge page on the platform
      icon: image().optional(),               // platform avatar, e.g. ./images/precious.png
      // Knowledge pages this writeup references, by their slug - powers
      // the "artifacts referenced" list and two-way linking.
      knowledge: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

// Knowledge: evergreen reference/artifact pages. Not time-ordered.
const knowledge = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Domain grouping used on the knowledge index, e.g.
    // "Windows Artifacts", "Event Logs", "Memory Forensics".
    domain: z.string(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Tools: scripts / parsers / utilities you've written.
const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    language: z.string().optional(),          // e.g. Python, PowerShell
    repo: z.string().url().optional(),        // link to source
    draft: z.boolean().default(false),
  }),
});

export const collections = { writeups, knowledge, tools };

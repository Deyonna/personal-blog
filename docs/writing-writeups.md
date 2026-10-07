# Writing writeups

How to add a writeup, lock it while the box/challenge is active, unlock it
when it retires, and pick tags.

## 1. Where files go

| What | Where |
| --- | --- |
| A writeup | `src/content/writeups/<slug>.mdx` |
| Its icon and screenshots | `src/content/writeups/images/` |
| Full text of a **locked** writeup | `private/writeups/<slug>.mdx` (never pushed) |

The filename becomes the URL: `precious.mdx` → `/writeups/precious`. Use the
box/challenge name in lowercase with dashes: `suspicious-threat.mdx`.

## 2. Add a new writeup

Copy this into `src/content/writeups/<slug>.mdx` and fill it in:

```mdx
---
title: "Name - Short Subtitle"
description: "One sentence: the technique and how you got in / what you found."
date: 2026-10-07
tags: ["forensics", "linux", "rootkit"]
platform: "HackTheBox"
type: "Machine"
difficulty: "Easy"
os: "Linux"
ip: "10.10.11.189"
url: "https://app.hackthebox.com/machines/Name"
icon: ./images/name.png
knowledge: []
locked: false
draft: false
---

import Callout from '../../components/Callout.astro';
import Spoiler from '../../components/Spoiler.astro';

## Overview

...
```

### The fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | `"Name - Subtitle"`. The part before ` - ` is the box name (used for the letter badge and the machine card). |
| `description` | yes | Shown under the title in the list and on the page. Keep it to one sentence, and no spoilers if the writeup is locked. |
| `date` | yes | `YYYY-MM-DD`. The list is sorted newest first. |
| `tags` | no | See [Choosing tags](#4-choosing-tags). |
| `platform` | no | `HackTheBox`, `TryHackMe`, … Spell `HackTheBox` exactly like that (the fingerprint icon depends on it). |
| `type` | no | `Machine`, `Challenge`, `Sherlock`, `Room`. |
| `difficulty` | no | `Easy`, `Medium`, `Hard`, `Insane`. |
| `os` | no | `Linux`, `Windows 7 x64`, … |
| `ip` | no | Target IP, for machines. |
| `url` | no | The box/challenge page on the platform. Must be a full `https://` link. |
| `icon` | no | `./images/<slug>.png`. Without one you get a letter badge, or a fingerprint for HTB forensics challenges. |
| `knowledge` | no | Slugs of knowledge pages this writeup uses, e.g. `["evidence-of-execution"]`. They're listed at the bottom and link back. |
| `locked` | no | `true` while the box/challenge is active. See below. |
| `draft` | no | `true` hides the writeup from the site completely. |

Everything in the machine card at the top of the page (platform, type,
difficulty, OS, IP, link) comes from these fields, so don't repeat it in
the body.

### In the body

- Headings: start at `##`. `##` and `###` appear in the table of contents.
- Screenshots: put them in `images/` and use `![what it shows](./images/name-step.png)`.
- Notes and warnings:
  `<Callout type="note">…</Callout>`. Types: `note`, `tip`, `warning`, `flag`.
- Flags: always behind a spoiler:
  ``<Spoiler summary="Reveal root flag">`HTB{...}`</Spoiler>``

### Check it

Run `npm run dev` and open http://localhost:4321/personal-blog/writeups. When it looks
right, commit and push. The site redeploys automatically.

## 3. Locked writeups (active boxes)

HTB doesn't allow public writeups for active content. A locked writeup still
shows in the list (title, description, tags, icon, a 🔒 **locked** badge)
and its page shows the machine card, but the walkthrough itself is never
built into the site.

The repo is public, though, so the walkthrough must also stay out of git.
That's what `private/` is for.

### Lock a new writeup

1. Write the full writeup in `private/writeups/<slug>.mdx`.
2. Create `src/content/writeups/<slug>.mdx` with **only the frontmatter**
   (copy it from the private file) and set `locked: true`:

   ```mdx
   ---
   title: "Name - Subtitle"
   description: "..."
   ...
   locked: true
   draft: false
   ---

   {/* Locked: full writeup is in private/writeups/<slug>.mdx (not committed). */}
   ```
3. Commit and push. Only the frontmatter goes public.

> Before committing, run `git status`. Nothing under `private/` should
> appear. If it does, stop and check `.gitignore`.

### Unlock it when it retires

1. Copy `private/writeups/<slug>.mdx` over `src/content/writeups/<slug>.mdx`.
2. Make sure the frontmatter has `locked: false` (or no `locked` line).
3. Check it with `npm run dev`, then commit and push.
4. Delete the private copy if you like.

### Locked vs draft

| | Shows in list | Page exists | Body published |
| --- | --- | --- | --- |
| `locked: true` | yes, with a badge | yes, with the "locked" notice | no |
| `draft: true` | no | no | no |

Use `draft` for something unfinished you don't want anyone to see yet.
Use `locked` for a finished writeup you want people to know is coming.

## 4. Choosing tags

Tags power the tag filter on the writeups page, the **Topics** list in the
sidebar (the 10 most-used tags across the whole site) and the site search.
The list rows show the **first 4** tags, so put the most useful ones first.

### Rules

- **3–5 tags** per writeup.
- **Lowercase, dashes for spaces:** `memory-forensics`, not `Memory Forensics`.
- **Reuse before inventing.** Check the tag cloud on `/writeups` first. A
  tag only helps if other posts share it.
- **Don't tag what a field already says.** Platform, type and difficulty
  have their own fields and are already searchable, so skip `htb`, `easy`,
  `sherlock`.

### What to include, in this order

1. **Category:** one of the broad buckets:
   `forensics`, `web`, `pwn`, `reversing`, `crypto`, `malware`, `osint`, `misc`.
   For machines, use the main foothold area (usually `web`).
2. **DFIR:** add `dfir` to any blue-team/investigation work (Sherlocks,
   forensics challenges, memory analysis).
3. **OS:** `linux` or `windows`.
4. **Technique:** what you'd want to find it by later:
   `command-injection`, `privesc`, `rootkit`, `memory-forensics`,
   `deserialization`, `kerberoasting`, …
5. **Key tool, if central:** `volatility`, `wireshark`, `burp`. Only when
   the tool is the point of the writeup.

### Examples

| Writeup | Tags |
| --- | --- |
| HTB forensics challenge, Linux rootkit | `forensics`, `dfir`, `linux`, `rootkit` |
| HTB Sherlock, Windows memory dump | `dfir`, `windows`, `memory-forensics`, `volatility` |
| HTB machine, web foothold → root | `web`, `linux`, `command-injection`, `privesc` |

### Tags that change how things look

- `forensics` + `platform: "HackTheBox"` + `type: "Challenge"` + no `icon`
  → the fingerprint icon instead of a letter badge.

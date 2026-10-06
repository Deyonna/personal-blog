---
title: "Evidence of Execution"
description: "The Windows artifacts that show a program actually ran - and the caveats that trip people up."
domain: "Windows Artifacts"
tags: ["dfir", "windows", "execution"]
updated: 2026-01-14
draft: false
---

Proving that a binary **executed** (not merely that it existed on disk) is one of the most common questions in an investigation. No single artifact is definitive; you corroborate across several. This page follows a consistent template so every artifact answers the same questions.

## Prefetch

- **Location:** `C:\Windows\Prefetch\*.pf`
- **What it proves:** a program was executed, with run count and last-run timestamps (up to 8 on Win8+).
- **What it does *not* prove:** who ran it, or with what privileges. Prefetch can be disabled (common on servers/SSDs).
- **Parsing:** PECmd (Eric Zimmerman).
- **Caveats:** format differs across Windows versions; Win10+ compresses the files.

## Amcache.hve

- **Location:** `C:\Windows\AppCompat\Programs\Amcache.hve`
- **What it proves:** presence and execution metadata, including SHA-1 of the binary - valuable for matching against threat intel.
- **What it does *not* prove:** exact execution time is less reliable than Prefetch; presence in Amcache alone isn't proof of execution.
- **Parsing:** AmcacheParser (Eric Zimmerman).

## ShimCache / AppCompatCache

- **Location:** `SYSTEM` registry hive.
- **What it proves:** the binary was *present* and, on some Windows versions, that it executed.
- **What it does *not* prove:** on modern Windows, a ShimCache entry does **not** by itself prove execution - a frequent analyst mistake.
- **Parsing:** AppCompatCacheParser.

## UserAssist

- **Location:** `NTUSER.DAT` hive, per-user.
- **What it proves:** GUI-launched programs, with run counts and focus time.
- **What it does *not* prove:** command-line-launched execution (won't appear here).
- **Caveats:** values are ROT13-encoded.

## BAM / DAM

- **Location:** `SYSTEM` hive.
- **What it proves:** background activity per user with last-execution timestamps.

> **Rule of thumb:** presence ≠ execution. Corroborate at least two independent artifacts before asserting a program ran.

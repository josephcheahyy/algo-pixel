# Security Policy — Algo Pixel Empire

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (main branch) | ✅ |
| Older commits | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in this site, please **do not open a public GitHub Issue**.

Instead, report it privately:

- **Email:** cheahyueyeou@gmail.com  
- **Subject:** `[SECURITY] Algo Pixel Empire — <brief description>`

Please include:
1. A clear description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. (Optional) Your suggested fix

I will respond within **72 hours** and aim to patch within **7 days** for high-severity issues.

## Scope

This is a **static frontend-only portfolio site**. There is no user authentication, no database, no backend API, and no stored user data.

In scope:
- Cross-site scripting (XSS)
- Clickjacking
- URL injection / open redirect
- Content Security Policy bypass
- Dependency vulnerabilities with public exploits

Out of scope:
- Social engineering attacks
- Attacks requiring physical access
- Spam / denial-of-service via the contact links (these are mailto: links)
- Self-XSS

## Disclosure Policy

- Please give me reasonable time to fix the issue before public disclosure
- I will credit you in the commit message and changelog if you wish
- No bug bounty is offered for this personal project, but I genuinely appreciate responsible disclosure

## Security Measures in Place

- Content Security Policy (HTTP header via Service Worker + `<meta>` tag fallback)
- X-Frame-Options: DENY (clickjacking prevention)  
- X-Content-Type-Options: nosniff  
- Referrer-Policy: no-referrer-when-downgrade  
- Permissions-Policy: camera, mic, geolocation all denied  
- URL allowlist on all outbound navigation  
- GitHub Actions: pinned SHA hashes on all actions, secret-leak scanning on every build  
- No API keys in frontend bundle (verified by post-build grep audit)  
- All external links use `rel="noopener noreferrer"`  

# Security Policy

## Project Status

OpenWarnDE is an early-stage, non-certified open-source project.

It is **not certified operational software** and has not undergone a formal security audit or independent security assessment.

The project is currently in active development and architectural planning.

## Important Notice / Scope of Use

OpenWarnDE is designed to provide **situational awareness** by aggregating and displaying publicly available hazard, warning, and location-related information.

OpenWarnDE must **NOT** be used as the sole source for:

- life-critical decisions
- emergency dispatching without independent verification
- operational decisions where incorrect, delayed, or missing information could endanger life, health, or property
- replacing official warning or emergency communication systems

Critical information must always be verified through appropriate official sources, such as:

- official weather and warning services
- local authorities
- emergency services
- responsible infrastructure operators

OpenWarnDE does not guarantee the completeness, accuracy, availability, or timeliness of information provided by external data sources.

## Supported Versions

OpenWarnDE is currently in active development and has not reached a stable 1.0 release.

At this stage, security fixes are provided on a best-effort basis for the latest state of the default branch.

There are currently no long-term-supported (LTS) versions.

| Version / Branch    | Supported |
| ------------------- | --------- |
| `main` (latest)     | ✅        |
| Older tags/releases | ❌        |

This policy will be updated once OpenWarnDE reaches a stable, versioned release.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues.**

Public issues are visible to everyone and may expose an unpatched vulnerability before a fix is available.

Instead, please report vulnerabilities privately using one of the following channels:

1. **Preferred:** Use GitHub's private vulnerability reporting feature through the repository's **Security** tab.
2. **Alternative:** Contact the project maintainer through the GitHub profile if private vulnerability reporting is unavailable.

When reporting a vulnerability, please include as much of the following information as possible:

- description of the vulnerability
- potential impact
- steps to reproduce
- proof of concept, if available
- affected component
- affected version, tag, or commit
- suggested mitigation, if known

### What to Expect

- **Acknowledgement:** The report will be reviewed as soon as reasonably possible.
- **Assessment:** The vulnerability will be investigated and its impact evaluated.
- **Follow-up:** Additional information may be requested if necessary.
- **Fix:** Confirmed vulnerabilities will be addressed according to their severity and project resources.
- **Disclosure:** Security advisories or changelog entries may be published after a fix is available. Contributors may be credited with their permission.

As this is a small open-source project, response times are **best-effort and are not guaranteed by an SLA**.

Please allow a reasonable amount of time for investigation and remediation before publicly disclosing a vulnerability.

## Scope

This security policy covers the OpenWarnDE software and its components as defined by the current project architecture.

This may include:

- application clients
- backend services
- APIs
- web interfaces
- administrative components

The exact system boundaries are defined in the project architecture documentation.

Out of scope:

- vulnerabilities in third-party services used by OpenWarnDE
- vulnerabilities in external data providers
- vulnerabilities in upstream infrastructure
- vulnerabilities in third-party libraries that cannot be reproduced or influenced by OpenWarnDE

Security issues affecting third-party services should be reported to the respective provider.

## Security Principles

OpenWarnDE follows the following security principles:

- Administrative functionality is separated from publicly accessible interfaces.
- Secrets and credentials must never be committed to the repository.
- Secrets must never be embedded in client applications.
- Client input must never be trusted for authorization decisions.
- Authorization must be enforced server-side.
- API keys must not be treated as authentication credentials unless explicitly designed for that purpose.
- API access must be protected against unauthorized or excessive use.
- Rate limiting and abuse prevention are enforced server-side where applicable.
- Access to sensitive operations is restricted according to defined roles and permissions.
- Third-party API credentials are kept separate from client-side application access.
- Dependencies are regularly evaluated for known security vulnerabilities.
- Security-relevant events should be logged where appropriate without unnecessarily storing sensitive personal information.

These principles describe the intended security architecture of OpenWarnDE 2.0. Their actual implementation depends on the respective project phase and component.

See the project architecture and security documentation for further details.

## Security During Development

Security is considered throughout the development lifecycle.

Security-related measures may include:

- dependency vulnerability scanning
- static analysis
- linting and type checking
- secure handling of secrets
- authentication and authorization testing
- API security testing
- input validation
- rate-limit testing
- build and deployment checks

The exact security measures are defined and expanded as the project architecture develops.

## Responsible Disclosure

OpenWarnDE follows a responsible disclosure approach.

Security vulnerabilities should be reported privately and should not be publicly disclosed before the project has had a reasonable opportunity to investigate and, where possible, remediate the issue.

The project may publish a security advisory after a vulnerability has been fixed and the necessary information can be disclosed safely.
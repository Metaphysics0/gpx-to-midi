# Guitar Pro To Midi Converter

A simple web app I built to convert Guitar Pro files (.gpx, .gp5, .gp, etc) into Midi files.

## Tech Stack 👨🏻‍💻

- SvelteKit + a handful of node api's
- [This dotnet project](https://github.com/rageagainsthepc/GuitarPro-to-Midi). Basically spawning a node child_process to execute this on vercel's network
- Vercel deployment
- Skeleton UI (for the Dropzone)

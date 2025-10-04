# Aurora — Next Generation OS for macOS (Scaffold)

This repository contains an initial scaffold for Project Aurora, focused on C++ core components and Swift UI tooling for macOS & iOS.

Structure
- aurora/: core C++ + Swift app code
- aurora-ui/: Swift Package for shared UI components
- aurora-cloud/: cloud adapters and adapters scaffold
- aurora-developer/: developer SDK and tools
- CMakeLists.txt: root build entry for C++ parts
- .github/workflows/ci.yml: CI workflow (macOS runners)

Goals
- Provide a working local build for C++ components (CMake).
- Provide Swift Package / Xcode project stubs for macOS and iOS.
- CI to build C++ and Swift on macOS runners.

See SPECIFICATION.md and ROADMAP.md for details and next steps.
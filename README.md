<p align="center">
  <img src="https://github.com/user-attachments/assets/1b2ef92b-036f-4c9b-80cf-8b13edbacaee" width="20%" alt="COPO-logo">
</p>
<p align="center">
    <h1 align="center">copo</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/skyash-dev/copo?style=flat&logo=git&logoColor=white&color=161616" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/skyash-dev/copo?style=flat&color=161616" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/skyash-dev/copo?style=flat&color=161616" alt="repo-language-count">
</p>
<p align="center">
		<em>Built with the tools and technologies:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<br>
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/Socket.io-010101.svg?style=flat&logo=socketdotio&logoColor=white" alt="Socket.io">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>

<br>

#####  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

**copo** is a globally synced Pomodoro timer designed for seamless focus and collaboration. All users are synchronized to the same Pomodoro intervals (25 minutes of work followed by a 5-minute break). The application offers a minimal and distraction-free environment where everyone is on the same cycle. During the breaks, users can chat with each other in a global chat room, making it a community-driven productivity tool.

The simplicity of the timer ensures that users stay focused without needing to manage their time themselves. Built using modern technologies, Copo provides real-time updates and ensures that users are always in sync no matter when they join the session.

---

## Features

- **Global Sync Pomodoro Timer:** All users operate on the same 25-minute work and 5-minute break intervals. The timer is globally synchronized, meaning no matter when you join, you’ll be on the same cycle as everyone else.
  
- **Break-Time Global Chat:** During the 5-minute breaks, users can chat with others from around the world, fostering a sense of community and collaboration.

- **Minimalist Interface:** A clean and intuitive design that keeps the focus on productivity. The user interface has been designed to eliminate distractions and make the timer easy to follow.

- **Real-time Timer Updates:** The server broadcasts the timer state to all connected clients in real-time, ensuring that the timer remains consistent across all sessions.

- **User-Friendly Notifications:** Receive visual and auditory cues when the work session ends and the break begins.

- **Cross-Platform Compatibility:** Accessible via any browser, making it easy to use on different devices without the need for additional installations.

- **Metrics Tracking:** Integrated with Umami for tracking important user interactions (like video clicks or chat messages), providing insights into how users engage with the application.


---

##  Repository Structure

```sh
└── copo/
    ├── client
    │   ├── .eslintrc.json
    │   ├── .gitignore
    │   ├── README.md
    │   ├── app
    │   ├── next.config.mjs
    │   ├── package.json
    │   ├── pnpm-lock.yaml
    │   ├── postcss.config.mjs
    │   ├── socket.js
    │   ├── tailwind.config.ts
    │   ├── tsconfig.json
    │   └── utils
    ├── server
    │   ├── .gitignore
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── router.js
    │   └── server.js
    └── test.js
```

---

##  Modules

<details closed><summary>.</summary>

| File | Summary |
| --- | --- |
| [test.js](https://github.com/skyash-dev/copo/blob/main/test.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>client</summary>

| File | Summary |
| --- | --- |
| [next.config.mjs](https://github.com/skyash-dev/copo/blob/main/client/next.config.mjs) | <code>❯ REPLACE-ME</code> |
| [pnpm-lock.yaml](https://github.com/skyash-dev/copo/blob/main/client/pnpm-lock.yaml) | <code>❯ REPLACE-ME</code> |
| [.eslintrc.json](https://github.com/skyash-dev/copo/blob/main/client/.eslintrc.json) | <code>❯ REPLACE-ME</code> |
| [tsconfig.json](https://github.com/skyash-dev/copo/blob/main/client/tsconfig.json) | <code>❯ REPLACE-ME</code> |
| [postcss.config.mjs](https://github.com/skyash-dev/copo/blob/main/client/postcss.config.mjs) | <code>❯ REPLACE-ME</code> |
| [package.json](https://github.com/skyash-dev/copo/blob/main/client/package.json) | <code>❯ REPLACE-ME</code> |
| [socket.js](https://github.com/skyash-dev/copo/blob/main/client/socket.js) | <code>❯ REPLACE-ME</code> |
| [tailwind.config.ts](https://github.com/skyash-dev/copo/blob/main/client/tailwind.config.ts) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>client.utils</summary>

| File | Summary |
| --- | --- |
| [types.ts](https://github.com/skyash-dev/copo/blob/main/client/utils/types.ts) | <code>❯ REPLACE-ME</code> |
| [constants.ts](https://github.com/skyash-dev/copo/blob/main/client/utils/constants.ts) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>client.app</summary>

| File | Summary |
| --- | --- |
| [layout.tsx](https://github.com/skyash-dev/copo/blob/main/client/app/layout.tsx) | <code>❯ REPLACE-ME</code> |
| [globals.css](https://github.com/skyash-dev/copo/blob/main/client/app/globals.css) | <code>❯ REPLACE-ME</code> |
| [page.tsx](https://github.com/skyash-dev/copo/blob/main/client/app/page.tsx) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>server</summary>

| File | Summary |
| --- | --- |
| [package-lock.json](https://github.com/skyash-dev/copo/blob/main/server/package-lock.json) | <code>❯ REPLACE-ME</code> |
| [router.js](https://github.com/skyash-dev/copo/blob/main/server/router.js) | <code>❯ REPLACE-ME</code> |
| [package.json](https://github.com/skyash-dev/copo/blob/main/server/package.json) | <code>❯ REPLACE-ME</code> |
| [server.js](https://github.com/skyash-dev/copo/blob/main/server/server.js) | <code>❯ REPLACE-ME</code> |

</details>

---

##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/skyash-dev/copo/issues)**: Submit bugs found or log feature requests for the `copo` project.
- **[Submit Pull Requests](https://github.com/skyash-dev/copo/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/skyash-dev/copo/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/skyash-dev/copo
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/skyash-dev/copo/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=skyash-dev/copo">
   </a>
</p>
</details>

---

---

##  Acknowledgments

- https://layers.to/layers/cljb0wzd3000jjv0c51egnan2

---

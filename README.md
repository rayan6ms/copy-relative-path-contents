# Copy Relative Path and Content

Adds an Explorer context-menu action to copy the **relative file path** and the **full file content** for one or multiple selected files.

Output format:

```
docs/spec.md:
```md
<file content>
```‎
```
---

## Features

- Works with **single** or **multi-select** in the VS Code Explorer
- Copies output to your clipboard as:
  - `relative/path.ext:`
  - followed by a fenced code block using the file extension as the language tag

---

## How to use

1. Open VS Code Explorer (Files panel).
2. Select one or more files.
3. Right-click the selection.
4. Click **Copy Relative Path and Content**.
5. Paste anywhere (Markdown, chat, issue, etc.).

---

## Install

### Option A) Install from a `.vsix`
1. Download the latest `.vsix` from the GitHub Releases page.
2. In VS Code, open the Extensions view.
3. Click the `...` menu → **Install from VSIX...**
4. Select the downloaded `.vsix`.

### Option B) Run locally in dev mode
1. Clone the repo
2. Install dependencies
3. Run the extension

```bash
npm install
npm run compile
```

Then press **F5** in VS Code to launch the Extension Development Host.

---

## Development

### Build

```bash
npm run compile
```

### Package

```bash
npm install -g @vscode/vsce
vsce package
```

This generates a `.vsix` file.

---

## Notes / behavior

* Only **files** are copied (folders are ignored).
* Paths are relative to the current workspace root.

---

## License

GPLv3 (see [LICENSE](https://github.com/rayan6ms/copy-relative-path-contents/blob/main/LICENSE))

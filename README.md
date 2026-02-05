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

GitHub may reject uploading `.vsix` directly as a Release asset in some cases.
As a workaround, Releases provide the packaged extension as a **`.zip`** (it is the same VSIX file content).

### Option A) Install from GitHub Releases (`.zip` → `.vsix`)
1. Download the latest release asset (example):  
   `copy-relative-path-and-content.zip`
2. Rename it to `.vsix`:
   - `copy-relative-path-and-content.zip` → `copy-relative-path-and-content-<version>.vsix`
3. In VS Code, open the Extensions view.
4. Click the `...` menu → **Install from VSIX...**
5. Select the renamed `.vsix`.

### Option B) Install via terminal (same thing but automatically)
Download the latest release asset and save it as a `.vsix`:

```bash
curl -L -o copy-relative-path-and-content.vsix \
  https://github.com/rayan6ms/copy-relative-path-contents/releases/latest/download/copy-relative-path-and-content.zip

code --install-extension copy-relative-path-and-content.vsix
```

### Option C) Run locally in dev mode

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
npm install
npm run release:asset
```

This generates a `.zip` file. If you want a `.vsix` file directly just rename it to `.vsix` or use `npx vsce package` in the project root.

---

## Notes / behavior

* Only **files** are copied (folders are ignored).
* Paths are relative to the current workspace root.

---

## License

GPLv3 (see [LICENSE](https://github.com/rayan6ms/copy-relative-path-contents/blob/main/LICENSE))

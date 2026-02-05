import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "copyRelativePathAndContent.copy",
    async (
      uri?: vscode.Uri,
      arg2?: unknown,
      arg3?: unknown
    ) => {
      try {
        const uris = normalizeExplorerSelection(uri, arg2, arg3);

        console.log("[copyRelativePathAndContent] uri:", uri?.fsPath);
        console.log(
          "[copyRelativePathAndContent] normalized:",
          uris.map(u => u.fsPath)
        );

        if (uris.length === 0) {
          vscode.window.showWarningMessage("No files selected.");
          return;
        }

        const workspaceFolder = pickWorkspaceFolder(uris[0]);
        if (!workspaceFolder) {
          vscode.window.showWarningMessage("Open a workspace folder first.");
          return;
        }

        const fileUris: vscode.Uri[] = [];
        for (const u of uris) {
          const stat = await safeStat(u);
          if (stat?.type === vscode.FileType.File) fileUris.push(u);
        }

        if (fileUris.length === 0) {
          vscode.window.showWarningMessage("No files in selection.");
          return;
        }

        fileUris.sort((a, b) => a.fsPath.localeCompare(b.fsPath));

        const parts: string[] = [];
        for (const fileUri of fileUris) {
          const rel = vscode.workspace.asRelativePath(fileUri, false);
          const lang = getLangFromPath(rel);

          const bytes = await vscode.workspace.fs.readFile(fileUri);
          const content = Buffer.from(bytes).toString("utf8");

          parts.push(`${rel}:\n\`\`\`${lang}\n${content}\n\`\`\``);
        }

        await vscode.env.clipboard.writeText(parts.join("\n\n"));
        vscode.window.showInformationMessage(
          `Copied ${fileUris.length} file(s): relative path + content.`
        );
      } catch (err: any) {
        vscode.window.showErrorMessage(
          `Copy Relative Path and Content failed: ${err?.message ?? String(err)}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() { }

function isUriArray(x: unknown): x is vscode.Uri[] {
  return Array.isArray(x) && x.every(v => v && typeof v === "object" && "fsPath" in v);
}

function normalizeExplorerSelection(
  uri?: vscode.Uri,
  arg2?: unknown,
  arg3?: unknown
): vscode.Uri[] {
  if (isUriArray(arg2) && arg2.length > 0) return arg2;

  if (arg2 && typeof arg2 === "object") {
    const maybe = (arg2 as any).selectedResources;
    if (isUriArray(maybe) && maybe.length > 0) return maybe;
  }

  if (isUriArray(arg3) && arg3.length > 0) return arg3;

  if (arg3 && typeof arg3 === "object") {
    const maybe = (arg3 as any).selectedResources;
    if (isUriArray(maybe) && maybe.length > 0) return maybe;
  }

  return uri ? [uri] : [];
}

function getLangFromPath(relPath: string): string {
  const m = /\.([a-zA-Z0-9]+)$/.exec(relPath);
  return m?.[1]?.toLowerCase() ?? "";
}

function pickWorkspaceFolder(uri: vscode.Uri): vscode.WorkspaceFolder | undefined {
  return vscode.workspace.getWorkspaceFolder(uri) ?? vscode.workspace.workspaceFolders?.[0];
}

async function safeStat(uri: vscode.Uri): Promise<vscode.FileStat | null> {
  try {
    return await vscode.workspace.fs.stat(uri);
  } catch {
    return null;
  }
}

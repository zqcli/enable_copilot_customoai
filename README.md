# Enable Copilot CustomOAI

A minimal VS Code extension that unlocks the **OpenAI Compatible (CustomOAI)** model provider in VS Code Stable.

## What It Does

VS Code Copilot Chat includes a "CustomOAI" provider that lets you connect any OpenAI-compatible API (e.g., local inference servers, third-party LLM providers). However, this provider is gated behind `productQualityType != 'stable'`, meaning it only appears in VS Code Insiders.

This extension sets `productQualityType` to `insiders` on startup, making the CustomOAI provider visible in the model picker.

That's it. One line of effective code.

## Installation

1. Download the `.vsix` file from [Releases](../../releases)
2. Run: `code --install-extension enable-copilot-customoai-0.0.1.vsix`
3. Restart VS Code

Or build from source:

```bash
npm install -g @vscode/vsce
vsce package --no-dependencies --allow-missing-repository
code --install-extension enable-copilot-customoai-0.0.1.vsix
```

## Usage

1. Restart VS Code after installation
2. Open Copilot Chat → click the model picker
3. Select "OpenAI Compatible" provider
4. Configure your API endpoint and models

## How It Works

```js
vscode.commands.executeCommand('setContext', 'productQualityType', 'insiders');
```

This sets the VS Code context variable that Copilot Chat's `languageModelChatProviders` contribution point checks via its `when` clause:

```json
"when": "productQualityType != 'stable'"
```

## Disclaimer

This extension modifies an internal VS Code context variable. It may break if Microsoft removes or renames this variable in a future update.

## License

MIT
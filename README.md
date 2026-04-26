# Enable Copilot CustomOAI

[中文](README_zh.md)

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

## Configuration Example

Connecting to an OpenAI-compatible API (New API, One API, etc.):

```json
[
  {
    "name": "my-api",
    "vendor": "customoai",
    "apiKey": "sk-your-api-key",
    "models": [
      {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "url": "https://api.example.com/v1/chat/completions",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000
      }
    ]
  }
]
```

URL resolution rules:
- Domain: `https://api.example.com` → auto-appends `/v1/chat/completions`
- With version: `https://api.example.com/v1` → auto-appends `/chat/completions`
- Full path: `https://api.example.com/v1/chat/completions` → used as-is

## Disclaimer

This extension modifies an internal VS Code context variable. It may break if Microsoft removes or renames this variable in a future update.

## License

MIT
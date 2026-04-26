const vscode = require('vscode');

function activate(context) {
	vscode.commands.executeCommand('setContext', 'productQualityType', 'insiders');
}

function deactivate() {}

module.exports = { activate, deactivate };
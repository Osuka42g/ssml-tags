// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "ssml-tags" is now active! 🎉');

	const speak = vscode.commands.registerCommand('extension.ssml-speak', function () {
		vscode.window.showInformationMessage('Speak');
	});
	context.subscriptions.push(speak);
	const emphasis = vscode.commands.registerCommand('extension.ssml-emphasis', function () {
		vscode.window.showInformationMessage('Emphasis');
	});
	context.subscriptions.push(emphasis);
	const paragraph = vscode.commands.registerCommand('extension.ssml-paragraph', function () {
		vscode.window.showInformationMessage('Paragraph');
	});
	context.subscriptions.push(paragraph);
	const breakCmd = vscode.commands.registerCommand('extension.ssml-break', function () {
		vscode.window.showInformationMessage('Break');
	});
	context.subscriptions.push(breakCmd);
	const lang = vscode.commands.registerCommand('extension.ssml-lang', function () {
		vscode.window.showInformationMessage('Lang');
	});
	context.subscriptions.push(lang);



}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

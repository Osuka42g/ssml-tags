
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const commands = vscode.commands;
	const window = vscode.window;

	console.log('Congratulations, your extension "ssml-tags" is now active! 🎉');

	const speak = commands.registerCommand('extension.ssml-speak', function () {
		vscode.window.showInformationMessage('Speak');
		surroundWith('<speak>', '</speak>');
	});
	context.subscriptions.push(speak);
	const emphasis = commands.registerCommand('extension.ssml-emphasis', function () {
		vscode.window.showInformationMessage('Emphasis');
		surroundWith('<emphasis>', '</emphasis>');
	});
	context.subscriptions.push(emphasis);
	const paragraph = commands.registerCommand('extension.ssml-paragraph', function () {
		vscode.window.showInformationMessage('Paragraph');
		surroundWith('<paragraph>', '</paragraph>');
	});
	context.subscriptions.push(paragraph);
	const breakCmd = commands.registerCommand('extension.ssml-break', function () {
		vscode.window.showInformationMessage('Break');
		surroundWith('<break>', '</break>');
	});
	context.subscriptions.push(breakCmd);
	const lang = commands.registerCommand('extension.ssml-lang', function () {
		vscode.window.showInformationMessage('Lang');
		const options = ['en-US', 'fr-FR', 'ru-RU', 'es-MX'];
		presentOptions(options, function({ selection, quickPick }) {
			surroundWith(`<lang xml:lang="${selection}">`, `</lang>`);
			quickPick.hide();
		});
	});
	context.subscriptions.push(lang);

	function surroundWith(tag, closeTag) {
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		const log = `${tag}${selectedText}${closeTag}`
		editor.edit(editBuilder => {
				editBuilder.replace(selection, log);
		});
	};

	function presentOptions(options, callback) {
		const quickPick = window.createQuickPick();
		quickPick.items = options.map(label => ({ label }));
		quickPick.onDidChangeSelection(selected => {
			callback({ selection: selected[0].label, quickPick });
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}

}
exports.activate = activate;

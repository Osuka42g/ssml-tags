
const vscode = require('vscode');
const langOptions = require('./languageOptions');
const cmds = require('./commands');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const commands = vscode.commands;
	const window = vscode.window;

	console.log('Congratulations, your extension "ssml-tags" is now active! 🎉');

	for (const cm of cmds) {
		context.subscriptions.push(commands.registerCommand(cm.cmd, function () {
			surroundWith(cm.tag, cm.close);
		}))
	}

	const lang = commands.registerCommand('extension.ssml-lang', function () {
		presentOptions(langOptions, function({ selection, quickPick }) {
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

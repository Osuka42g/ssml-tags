
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

	const mark = commands.registerCommand('extension.ssml-mark', function () {
		showInputBox(function({ selection }) {
			selection && surroundWith(`<mark name="${selection}">`, `</mark>`);
		});
	});
	context.subscriptions.push(mark);

	const sub = commands.registerCommand('extension.ssml-sub', function () {
		showInputBox(function({ selection }) {
			selection && surroundWith(`<sub alias="${selection}">`, `</sub>`);
		});
	});
	context.subscriptions.push(sub);

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

	function showInputBox(callback) {
		const quickPick = window.showInputBox().then(
			selected => {
				callback({ selection: selected, quickPick });
			}
		);
	}

}
exports.activate = activate;


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

	for (const { command, tag, close } of cmds.simple) {
	context.subscriptions.push(
		commands.registerCommand(command, function () {
				surroundWith(tag, close);
			})
		);
	};

	const breakCmd = commands.registerCommand('extension.ssml-break', function () {
		presentInputNumberBox(function(selection) {
			selection && surroundWith(`<break time="${selection}s" />`, '');
		});
	});
	context.subscriptions.push(breakCmd);

	const mark = commands.registerCommand('extension.ssml-mark', function () {
		presentInputBox(function (selection) {
			selection && surroundWith(`<mark name="${selection}" />`, '');
		});
	});
	context.subscriptions.push(mark);

	const sub = commands.registerCommand('extension.ssml-sub', function () {
		presentInputBox(function (selection) {
			selection && surroundWith(`<sub alias="${selection}">`, `</sub>`);
		});
	});
	context.subscriptions.push(sub);

	const lang = commands.registerCommand('extension.ssml-lang', function () {
		presentOptions(langOptions, function({ selection, quickPick }) {
			surroundWith(`<lang xml:lang="${selection}">`, `</lang>`);
			quickPick.hide();
		});
	});
	context.subscriptions.push(lang);


	function surroundWith(tag, closeTag) {
		const editor = vscode.window.activeTextEditor;
		const selections = editor.selections;

		const selectedTexts = selections.map(s => editor.document.getText(s));
		const logs = selectedTexts.map(s => `${tag}${s}${closeTag}`);

		editor.edit(editBuilder => {
			for (let i = 0; i < selectedTexts.length; i++) {
				editBuilder.replace(selections[i], logs[i]);
			}
		});
	};

	function presentInputNumberBox(callback) {
		window.showInputBox({
			value: '',
			placeHolder: 'time in seconds',
			validateInput: text => Number(text) ? null : 'must be a number',
		}).then(callback);
	};

	function presentInputBox(callback) {
		window.showInputBox().then(callback);
	};

	function presentOptions(options, callback) {
		const quickPick = window.createQuickPick();
		quickPick.items = options.map(label => ({ label }));
		quickPick.onDidChangeSelection(selected => {
			callback({ selection: selected[0].label, quickPick });
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	};
}
exports.activate = activate;

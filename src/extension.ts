import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('deepseek-ext.start', () => {
		const panel = vscode.window.createWebviewPanel(
			'deepChat',
			'DeepSeek Chat',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.html = getWebviewContent();

		panel.webview.onDidReceiveMessage(async (message: any) => {
			if (message.command === 'chat') {
				const userPrompt = message.text;
				const selectedModel = message.model;
				let responseText = '';

				try {
					const streamResponse = await ollama.chat({
						model: selectedModel,
						messages: [{ role: 'user', content: userPrompt }],
						stream: true
					});

					for await (const part of streamResponse) {
						responseText += part.message.content;
						panel.webview.postMessage({ command: 'chatResponse', text: responseText });
					}

				} catch (error: any) {
					console.log(error);
					panel.webview.postMessage({ command: 'chatResponse', text: `❌ Error: ${error.message}` });
				}
			}
		});
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
	return /*html*/ `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<style>
			body {
				font-family: sans-serif;
				margin: 1rem;
				<!-- background-color: #f4f4f4; -->
			}

			#prompt, #modelSelect {
				width: 100%;
				box-sizing: border-box;
				margin-bottom: 10px;
				padding: 10px;
				border: 1px solid #ccc;
				border-radius: 5px;
				color: black;
			}

			#response {
				border: 1px solid #ccc;
				background: white;
				margin-top: 1rem;
				padding: 10px;
				min-height: 50px;
				border-radius: 5px;
				color: black;
			}

			#askBtn {
				background-color: #007acc;
				color: white;
				border: none;
				padding: 10px 15px;
				border-radius: 5px;
				cursor: pointer;
				font-size: 16px;
				width: 100%;
				transition: background 0.3s;
			}

			#askBtn:hover {
				background-color: #005a9e;
			}
		</style>
	</head>
	<body>
		<h2>Ollama DeepSeek Chat</h2>
		<select id="modelSelect">
			<option value="deepseek-r1:1.5b">deepseek-r1:1.5b</option>
			<option value="deepseek-r1:7b">deepseek-r1:7b</option>
			<option value="deepseek-r1:8b">deepseek-r1:8b</option>
			<option value="deepseek-r1:14b">deepseek-r1:14b</option>
			<option value="deepseek-r1:32b">deepseek-r1:32b</option>
			<option value="deepseek-r1:70b">deepseek-r1:70b</option>
			<option value="deepseek-r1:671b">deepseek-r1:671b</option>
			<option value="deepseek-r1:latest">deepseek-r1:latest</option>
		</select>
		<textarea id="prompt" rows="3" placeholder="Ask something..."></textarea>
		<button id="askBtn">Ask</button>
		<div id="response"></div>

		<script>
			const vscode = acquireVsCodeApi();

			document.getElementById('askBtn').addEventListener('click', () => {
				const text = document.getElementById('prompt').value;
				const model = document.getElementById('modelSelect').value;
				vscode.postMessage({ command: 'chat', text, model });
			});

			window.addEventListener('message', event => {
				const { command, text } = event.data;
				if (command === 'chatResponse') {
					document.getElementById('response').innerText = text;
				}
			});
		</script>
	</body>
	</html>
	`;
}

export function deactivate() {}

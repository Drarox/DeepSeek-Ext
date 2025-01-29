DeepSeek Chat VSCode Extension
==============================

A simple extension that allows you to chat with [DeepSeek](https://www.deepseek.com/) AI models using [Ollama](https://ollama.com/) inside VSCode. This extension enables seamless local AI-powered assistance directly within your code editor.

🚀 Prerequisites
----------------

Before using this extension, ensure that you have:

1.  **Ollama installed** on your machine: [Download Ollama](https://ollama.com/download)
    
2.  A DeepSeek model pulled locally using Ollama. Run the following command to install a model you want to use:
```shell
ollama run deepseek-r1:1.5b
```
_(Replace `deepseek-r1:1.5b` with your preferred model size, such as `8b`, `14b`, etc.)_
    
3.  **Ollama running locally** for the extension to function.
    

🔧 Installation
---------------

To install this extension:

1.  Clone the repository or download the extension.
    
2.  Open the folder in VSCode.
    
3.  Run `npm install` to install dependencies.
    
4.  Use `F5` to launch a new Extension Development Host and test the extension.
    

📌 Features
-----------

*   Chat with DeepSeek AI models directly in VSCode.
    
*   Choose from multiple model sizes (`1.5B`, `8B`, `14B`, etc.).
    
*   Streamed responses for a fast and interactive experience.
    
*   Displays AI "thinking" process for improved UI/UX.
    

🚀 Usage
--------

1.  Open VSCode and start the extension with `Ctrl+Shift+P`, then select **`DeepSeek Chat`**.
    
2.  Choose the desired model from the dropdown list.
    
3.  Enter your prompt in the text box.
    
4.  Click **Ask** and receive a response in real-time.
    

🎨 UI Preview
-------------

![preview](https://raw.githubusercontent.com/Drarox/DeepSeek-Ext/master/metadata/imgs/preview.png)


🛠️ Development & Contribution
------------------------------

Want to improve this extension? Contributions are welcome!

### To modify the extension:

*   Fork and clone this repository.
    
*   Install dependencies: `npm install`
    
*   Edit `src/extension.ts` for backend logic.
    
*   Modify `getWebviewContent()` for UI updates.
    
*   Test changes by running `F5` in VSCode.
    

❌ Troubleshooting
-----------------

**If the AI model is not found:**

*   Ensure you have installed the model using `ollama run deepseek-r1:8b`.
    
*   Verify Ollama is running in the background.
    

📜 License
----------

This extension is open-source and available under the MIT License.
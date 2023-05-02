/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
//const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const {ipcRenderer} = require('electron');
const { exec } = require("child_process");

const commandTest = document.getElementById('command');

commandTest.onclick = e => {
  console.log(e);
  //example();
  ipcRenderer.send('tab', 'https://www.discogs.com/artist/7760-Japanese-Telecom');
}




function openChrome() {
  exec("start chrome google.com", (error, stdout, stderr) => {
  if (error) {
      console.log(`[ERROR] openChrome: ${error.message}`);
      return;
  }
  
  if (stderr) {
      console.log(`[STDERROR] openChrome: ${stderr}`);
      return;
  }

  console.log(`openChrome: ${stdout}`); // Output response from the terminal
  });
}
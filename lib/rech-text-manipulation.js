'use babel';

import { CompositeDisposable } from 'atom';
import { AtomEditor } from 'rech-atom-commons'

export default {

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rech-text-manipulation:copy-word': () => this.copyWord(),
      'rech-text-manipulation:paste-over-word': () => this.pasteOverWord(),
      'rech-text-manipulation:copy-line': () => this.copyLine(),
      'rech-text-manipulation:paste-line': () => this.pasteLine(),
      'rech-text-manipulation:find-blank-line-after': () => this.findBlankLineAfter(),
      'rech-text-manipulation:find-blank-line-before': () => this.findBlankLineBefore(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  /**
   * Copies the word under the cursor
   */
  copyWord() {
    let editor = new AtomEditor();
    editor.selectCurrentWord();
    editor.clipboardCopy();
  },

  /**
   * Paste the content of the clipboard over the current word
   */
  pasteOverWord() {
    let editor = new AtomEditor();
    editor.selectCurrentWord();
    editor.clipboardPaste();
  },
  /**
   * Copiar linha
   */
  // copyLine() {
  //   let editor = new AtomEditor();
  //   editor.clipboardCopy(editor.getCurrentLine() + "\n");
  // },
  copyLine(){
    let editor = new AtomEditor();
    let buffer = editor.getCursorLines();
    for (var i in buffer) {
      editor.clipboardCopy(buffer[i]);
    }
  },

  /**
   * colar linha
   */
  pasteLine() {
    let editor = new AtomEditor();
    editor.clipboardPaste();
  },

  /**
   * Posiciona na próxima linha em branco para frente
   */
  findBlankLineAfter() {
    let editor = new AtomEditor();
    row = editor.getCurrentRow() + 1;
    while(editor.getLine(row) != null){
      if (editor.getLine(row) == ""){
        while(editor.getLine(row) == ""){
          row++;
        }
        editor.setCursor(row);
        break;
      }
      row++;
    }
  },

  /**
   * Posiciona na próxima linha em branco para tras
   */
  findBlankLineBefore() {
    let editor = new AtomEditor();
    row = editor.getCurrentRow() - 1;
    while(editor.getLine(row) != null){
      if (editor.getLine(row) == ""){
        while(editor.getLine(row) == ""){
          row--;
        }
        editor.setCursor(row);
        break;
      }
      row--;
    }
  }


};

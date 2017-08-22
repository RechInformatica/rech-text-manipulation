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
  }

};

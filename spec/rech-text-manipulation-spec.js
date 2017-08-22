'use babel';

describe('RechTextManipulation', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    waitsForPromise(() => {
      activationPromise = atom.packages.activatePackage('rech-text-manipulation')
      return activationPromise;
    });
    waitsForPromise(() => {
      return atom.workspace.open();
    });
  });

  describe('the copy word command', () => {
    it('open full paths', () => {
//      expect(atom.workspace.open).toHaveBeenCalledWith("c:\\js\\file1.js");
    });
  });

});

## setings json  vscode

```
{
"editor.lineNumbers": "relative",
"workbench.colorTheme": "Kanagawa Dragon",
"window.commandCenter": false,
"workbench.layoutControl.enabled": false,
"chat.commandCenter.enabled": false,
"editor.minimap.enabled": false,
"breadcrumbs.enabled": false,
"editor.stickyScroll.enabled": true,
"editor.occurrencesHighlight": "off",
"editor.glyphMargin": false,
"git.openRepositoryInParentFolders": "never",
"extensions.ignoreRecommendations": true,
"workbench.editor.enablePreview": false,
"workbench.editor.showTabs": "none",
"editor.renderLineHighlight": "none",
"editor.hover.enabled": "off",
"security.workspace.trust.untrustedFiles": "open",
"workbench.activityBar.location": "hidden",
"workbench.editor.editorActionsLocation": "hidden",
"python.defaultInterpreterPath": "/home/espiderman/Documents/blender/scripts/eyesSetup/venv/bin/python3",
"workbench.colorCustomizations": {
    "editorCursor.foreground": "#ababab"
},
}
```

## atajos de teclado

```
// Place your key bindings in this file to override the defaults
// Place your key bindings in this file to override the defaults
[
    {
        "key": "f3",
        "command": "-editor.action.nextMatchFindAction",
        "when": "editorFocus"
    },
    {
        "key": "f3",
        "command": "-workbench.action.terminal.findNext",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocusInAny && terminalHasBeenCreated || terminalFocusInAny && terminalProcessSupported"
    },
    {
        "key": "f3",
        "command": "-list.find",
        "when": "listFocus && listSupportsFind"
    },
    {
        "key": "f3",
        "command": "-list.find.replInputFocus",
        "when": "view == 'workbench.panel.repl.view'"
    },
    {
        "key": "ctrl+w",
        "command": "-workbench.action.terminal.killEditor",
        "when": "terminalEditorFocus && terminalFocus && terminalHasBeenCreated || terminalEditorFocus && terminalFocus && terminalProcessSupported"
    },
    {
        "key": "space",
        "command": "editor.action.previousMatchFindAction",
        "when": "editorFocus && findInputFocussed"
    },
    {
        "key": "shift+enter",
        "command": "-editor.action.previousMatchFindAction",
        "when": "editorFocus && findInputFocussed"
    },
    {
        "key": "escape",
        "command": "-closeFindWidget",
        "when": "editorFocus && findWidgetVisible && !isComposing"
    },
    {
        "key": "escape",
        "command": "-list.closeFind",
        "when": "listFocus && treeFindOpen"
    },
    {
        "key": ";",
        "command": "editor.action.nextMatchFindAction",
        "when": "editorFocus && findInputFocussed"
    },
    {
        "key": "enter",
        "command": "-editor.action.nextMatchFindAction",
        "when": "editorFocus && findInputFocussed"
    },
    {
        "key": "`",
        "command": "workbench.action.splitEditorRight"
    },
    {
        "key": "ctrl+k ctrl+\\",
        "command": "-workbench.action.splitEditorRight"
    },
    {
        "key": "backspace",
        "command": "editor.action.inlineSuggest.hide",
        "when": "inlineEditIsVisible || inlineSuggestionVisible"
    },
    {
        "key": "escape",
        "command": "-editor.action.inlineSuggest.hide",
        "when": "inlineEditIsVisible || inlineSuggestionVisible"
    },
    {
        "key": ";",
        "command": "list.focusDown",
        "when": "listFocus && !inputFocus && !treestickyScrollFocused"
    },
    {
        "key": "down",
        "command": "-list.focusDown",
        "when": "listFocus && !inputFocus && !treestickyScrollFocused"
    },
    {
        "key": "backspace",
        "command": "list.focusUp",
        "when": "listFocus && !inputFocus && !treestickyScrollFocused"
    },
    {
        "key": "up",
        "command": "-list.focusUp",
        "when": "listFocus && !inputFocus && !treestickyScrollFocused"
    },
    {
        "key": ";",
        "command": "workbench.action.terminal.paste",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+shift+v",
        "command": "-workbench.action.terminal.paste",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+1",
        "command": "-workbench.action.focusFirstEditorGroup"
    },
    {
        "key": "2",
        "command": "workbench.action.focusFirstEditorGroup"
    }
]
```

## scripts bashrc fzf  

### buscar y abrir con vscode

```
vf() {
  local file
  file="$(fzf)" || return

  echo "$(realpath "$file")" >> ~/.fzf_vscode_files
  code -r "$file"
}

```

### buscar y abrir archivos recientes

```

vfr() {
  code -r "$(fzf < ~/.fzf_vscode_files)"
}

```

### buscar palabra fzf y grep

```
vfg() {
  grep -R "$1" . | fzf
}
```

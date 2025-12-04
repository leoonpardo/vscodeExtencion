## configuracion de espacio de trabajo 

### user config json

```
{
"workbench.colorTheme": "Default High Contrast Light",
"workbench.colorCustomizations": {
    "editorCursor.foreground": "#000000"
},
"window.commandCenter": false,
"workbench.layoutControl.enabled": false,
"chat.commandCenter.enabled": false,
"editor.minimap.enabled": false,
"breadcrumbs.enabled": false,
"editor.stickyScroll.enabled": false,
"editor.occurrencesHighlight": "off",
"editor.glyphMargin": false,
"git.openRepositoryInParentFolders": "never",
"extensions.ignoreRecommendations": true,
"workbench.editor.enablePreview": false,
"workbench.editor.showTabs": "none",
"editor.hover.enabled": false,
"security.workspace.trust.untrustedFiles": "open",
"workbench.activityBar.location": "hidden",
"workbench.editor.editorActionsLocation": "hidden",

    }

```
### user key mapping config

```
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
        "key": "tab",
        "command": "closeFindWidget",
        "when": "editorFocus && findWidgetVisible && !isComposing"
    },
    {
        "key": "escape",
        "command": "-closeFindWidget",
        "when": "editorFocus && findWidgetVisible && !isComposing"
    },
    {
        "key": "tab",
        "command": "list.closeFind",
        "when": "listFocus && treeFindOpen"
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
    }
]
```

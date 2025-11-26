import * as vscode from "vscode";

let myvar = 0;
let buscar_switch = 1;

// 0 = modo normal
// 1 = modo navegación
// 2 = modo visual
// 5 = estado especial opcional

// Cambia color del cursor dinámicamente
function setCursorColor(color: string) {
	const config = vscode.workspace.getConfiguration();
	const currentColors = config.get<any>("workbench.colorCustomizations") || {};

	const newColors = {
		...currentColors,
		["editorCursor.foreground"]: color
	};

	config.update(
		"workbench.colorCustomizations",
		newColors,
		vscode.ConfigurationTarget.Global
	);
}

export function activate(context: vscode.ExtensionContext) {

	// ------------- TOGGLE ; -------------
	const toggleCommand = vscode.commands.registerCommand("myModal.toggle", () => {

		if (myvar === 5) {
			myvar = 0;
			setCursorColor("#000000"); 

		} else if (myvar === 1) {
			myvar = 0;
			setCursorColor("#000000"); 

		} else {
			myvar = 1;
			setCursorColor("#ffea00"); // amarillo (modo navegación)
		}
	});

	// ------------- SPACE -------------
	const eCommand = vscode.commands.registerCommand("myModal.eCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'e');
					
				}else if (myvar === 1) {
					  const text = "-><-";

					  editor.edit(editBuilder => {

						editor.selections.forEach(sel => {
						  editBuilder.insert(sel.active, text);
						});

					  }).then(() => {

						// Mover cursores al centro (entre < y -)
						const newSelections = editor.selections.map(sel => {
						  const pos = sel.active.translate(0, -2); // mover 2 caracteres a la derecha
						  return new vscode.Selection(pos, pos);
						});

						editor.selections = newSelections;
					  });
						  myvar = 0;
						  buscar_switch = 2
					   setCursorColor("#000000"); 


				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}else if (myvar === 3) {
					editBuilder.insert(position, '#');
					myvar = 0;
				}else if (myvar === 5) {
					editBuilder.insert(position, '3');
				}else if (myvar === 6) {
					editBuilder.insert(position, 'B');
				}
			}
		});
	}); 
const spaceCommand = vscode.commands.registerCommand("myModal.spaceCommand", async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
		const pos = editor.selection.active;

				if (myvar === 0 && buscar_switch === 2) {
					  const doc = editor.document;
  let actions = [];
  for (const sel of editor.selections) {
	const pos = sel.active;
	const line = doc.lineAt(pos.line).text;

	const start = line.lastIndexOf("->", pos.character);
	const end = line.indexOf("<-", pos.character);

	if (start !== -1 && end !== -1 && start < pos.character && pos.character <= end + 2) {

	  // contenido interno
	  const innerText = line.substring(start + 2, end).trim();

	  // Copiar al portapapeles (OK fuera del editBuilder)
	  await vscode.env.clipboard.writeText(innerText);

	  // preparar el rango a borrar
	  actions.push({
		range: new vscode.Range(
		  new vscode.Position(pos.line, start),
		  new vscode.Position(pos.line, end + 2)
		)
	  });
	}
  }
  if (actions.length === 0) return;
  editor.edit(editBuilder => {
	for (const act of actions) {
	  editBuilder.delete(act.range);
	vscode.commands.executeCommand('actions.find');
	vscode.commands.executeCommand('editor.action.clipboardPasteAction');
	buscar_switch = 3

	}
  });

					
				}else if (myvar === 0 && buscar_switch === 3) {
				vscode.commands.executeCommand('cancelSelection');
				buscar_switch = 1
				
				}else if (myvar === 0 && buscar_switch === 1) {
				editor.edit(editBuilder => {
				editBuilder.insert(pos, ' ');
				})
				}
  
  
});


	context.subscriptions.push(toggleCommand
		, spaceCommand        
		, eCommand);

}

export function deactivate() {}

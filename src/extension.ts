import * as vscode from "vscode";
import * as path from 'path';

let myvar = 0;
let buscar_switch = 1;
let line_start = 1;
let myStatus: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

    myStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    myStatus.text = "MODE = 1";
    myStatus.tooltip = "Mi modo personalizado";
    myStatus.show();
    context.subscriptions.push(myStatus);
	// ------------- TOGGLE ; -------------
	const toggleCommand = vscode.commands.registerCommand("myModal.toggle", () => {

		if (myvar === 5) {
			myvar = 0;
		} else if (myvar === 1) {
			myvar = 0;
		} else {
			myvar = 1;
		}
		myStatus.text = `MODE = ${myvar}`;
		
	});

	const uCommand = vscode.commands.registerCommand("myModal.uCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'u');
					
				}else if (myvar === 1) {
        			vscode.commands.executeCommand('editor.action.clipboardCopyAction');

				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
		});
	}); 
	const wCommand = vscode.commands.registerCommand("myModal.wCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'w');
					
				}else if (myvar === 1) {
     				vscode.commands.executeCommand('editor.action.clipboardPasteAction');

				}else if (myvar === 3) {
					vscode.commands.executeCommand('cursorHome');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
		const nCommand = vscode.commands.registerCommand("myModal.nCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'n');
					
				}else if (myvar === 1) {
     				vscode.commands.executeCommand('editor.action.addSelectionToNextFindMatch');

				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const tabCommand = vscode.commands.registerCommand("myModal.tabCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					myvar = 4
					
				}else if (myvar === 1) {
     				vscode.commands.executeCommand('editor.action.clipboardPasteAction');

				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
		const oCommand = vscode.commands.registerCommand("myModal.oCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'o');
				}else if (myvar === 1) {
					vscode.commands.executeCommand('cursorDown');

				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}else if (myvar === 3) {
					vscode.commands.executeCommand('workbench.action.tasks.runTask', 'RecentOpenFzf');
					myvar = 1
				}

			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
			const gCommand = vscode.commands.registerCommand("myModal.gCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'g');
				}else if (myvar === 1) {
					vscode.commands.executeCommand("workbench.action.terminal.focus");
					vscode.commands.executeCommand("workbench.action.terminal.kill");
				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}else if (myvar === 3) {
					const filePath = editor.document.fileName;
					const folderPath = path.dirname(filePath)
					vscode.env.clipboard.writeText(folderPath).then(() => {
						vscode.commands.executeCommand('workbench.action.tasks.runTask', 'ExplorerNnn');
					});
					myvar = 1
				}

			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const pCommand = vscode.commands.registerCommand("myModal.pCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'p');
				}else if (myvar === 1) {
					vscode.commands.executeCommand('cursorUp');

				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
		const aCommand = vscode.commands.registerCommand("myModal.aCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'a');
				}else if (myvar === 1) {
					vscode.commands.executeCommand('redo');

				}else if (myvar === 3) {
					vscode.commands.executeCommand('cursorHome');
					myvar = 1
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const rCommand = vscode.commands.registerCommand("myModal.rCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'r');
				}else if (myvar === 4) {
					editor.edit(editBuilder => {
						editBuilder.insert(position, '()');
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
						myvar = 0;
				}else if (myvar === 3) {
							vscode.commands.executeCommand('cursorEnd');
							myvar = 1
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const dCommand = vscode.commands.registerCommand("myModal.dCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'd');
					
				}else if (myvar === 1) {
 					vscode.commands.executeCommand('undo');

				}else if (myvar === 2) {
			    const startLine = line_start 
	        const position = editor.selection.active; // posición actual del cursor
			    const endLine = position.line 
			    const startPos = new vscode.Position(startLine, 0);
			    const endPos = new vscode.Position(endLine, editor.document.lineAt(endLine).text.length);

			    editor.selection = new vscode.Selection(startPos, endPos);
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
		const cCommand = vscode.commands.registerCommand("myModal.cCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;
				if (myvar === 0) {
					editBuilder.insert(position, 'c');
				}else if (myvar === 1) {
				 const editor = vscode.window.activeTextEditor;
			    if (!editor) return;

			    // Rango visible
			    const visibleRange = editor.visibleRanges[0];
			    const linesPerPage = visibleRange.end.line - visibleRange.start.line;

			    // Mínimo 1
			    const page = Math.max(1, linesPerPage);

			    // Posición actual
			    const cursor = editor.selection.active;

			    // Nueva posición (subir una página)
			    const newLine = Math.max(cursor.line - page, 0);

			    const newPos = new vscode.Position(newLine, cursor.character);

			    // Mover cursor
			    editor.selection = new vscode.Selection(newPos, newPos);

			    // Scroll sincronizado (igual a scroll_lines)
			    editor.revealRange(
			        new vscode.Range(newPos, newPos),
			        vscode.TextEditorRevealType.InCenterIfOutsideViewport
			    );
				}else if (myvar === 3) {
				  const editor = vscode.window.activeTextEditor;
			    if (!editor) return;

			    // Obtener rango visible
			    const visibleRange = editor.visibleRanges[0];
			    const linesPerPage = visibleRange.end.line - visibleRange.start.line;

			    // Media página mínima
			    const halfPage = Math.max(1, Math.floor(linesPerPage / 2));

			    // Posición actual del cursor
			    const cursor = editor.selection.active;

			    // Nueva posición (hacia arriba)
			    const newLine = Math.max(cursor.line - halfPage, 0);
			    const newPos = new vscode.Position(newLine, cursor.character);

			    // Mover cursor
			    editor.selection = new vscode.Selection(newPos, newPos);

			    // Mantener vista alineada con el cursor (equivale a scroll_lines en Sublime)
			    editor.revealRange(
			        new vscode.Range(newPos, newPos),
			        vscode.TextEditorRevealType.InCenterIfOutsideViewport
			    );
				}

			}
		});
		myStatus.text = `MODE = ${myvar}`;
		
	}); 
			const vCommand = vscode.commands.registerCommand("myModal.vCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;
				if (myvar === 0) {
					editBuilder.insert(position, 'v');
				}else if (myvar === 1) {
           myvar = 3					
				}
			}
		});
		myStatus.text = `MODE = ${myvar}`;
		
	}); 

		const zCommand = vscode.commands.registerCommand("myModal.zCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;
				if (myvar === 0) {
					editBuilder.insert(position, 'z');
				}else if (myvar === 1) {
				    const editor = vscode.window.activeTextEditor;
				    if (!editor) return;

				    // Obtener rango visible (vista actual en pantalla)
				    const visibleRange = editor.visibleRanges[0];
				    const linesPerPage = visibleRange.end.line - visibleRange.start.line;

				    // Mínimo una línea por página
				    const page = Math.max(1, linesPerPage);

				    // Posición actual del cursor
				    const cursor = editor.selection.active;

				    // Calcular nueva posición hacia abajo
				    const newLine = Math.min(cursor.line + page, editor.document.lineCount - 1);
				    const newPos = new vscode.Position(newLine, cursor.character);

				    // Mover cursor
				    editor.selection = new vscode.Selection(newPos, newPos);

				    // Mantener la vista alineada (equivalente a scroll_pages)
				    editor.revealRange(
				        new vscode.Range(newPos, newPos),
				        vscode.TextEditorRevealType.InCenterIfOutsideViewport
				    );
				}else if (myvar === 3) {
				    const editor = vscode.window.activeTextEditor;
				    if (!editor) return;

				    // Obtener rango visible
				    const visibleRange = editor.visibleRanges[0];
				    const top = visibleRange.start.line;
				    const bottom = visibleRange.end.line;

				    // Líneas que caben en viewport
				    const linesPerPage = bottom - top;

				    // Media página mínima = 1
				    const halfPage = Math.max(1, Math.floor(linesPerPage / 2));

				    // Posición actual del cursor
				    const cursor = editor.selection.active;

				    // Nueva línea donde irá el cursor
				    const newLine = Math.min(cursor.line + halfPage, editor.document.lineCount - 1);
				    const newPos = new vscode.Position(newLine, cursor.character);

				    // Mover cursor
				    editor.selection = new vscode.Selection(newPos, newPos);

				    // Hacer scroll (igual cantidad)
				    vscode.commands.executeCommand("scrollLineDown"); // lo repetimos “halfPage” veces
				    for (let i = 1; i < halfPage; i++) {
				        vscode.commands.executeCommand("scrollLineDown");
				    }
				}
				
			}
			myStatus.text = `MODE = ${myvar}`;
		});
	}); 

	const hCommand = vscode.commands.registerCommand("myModal.hCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'h');
					
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
			myStatus.text = `MODE = ${myvar}`;
			
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
    const position = editor.selection.active; // posición actual del cursor
    line_start = position.line;         // número de línea (0-based)
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
				}else if (myvar === 1){
					myvar = 2
				}
				myStatus.text = `MODE = ${myvar}`;
				
  
  
});

	context.subscriptions.push(toggleCommand
		, spaceCommand        
		, uCommand        
		, wCommand        
		, cCommand        
		, hCommand);

}

export function deactivate() {}
	                                                              
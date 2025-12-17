import * as vscode from "vscode";
import * as path from 'path';
let savedPosition: vscode.Position | null = null;
let myvar = 0;
let buscar_switch = 1;
let marca_line = 1;
let line_start = 1;
let myStatus: vscode.StatusBarItem;
let lastCapturedIndentation = '';
let palabraBuscar = ''
let my_numero = 1

function captureIndentation() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const lineText = editor.document.lineAt(editor.selection.active.line).text;
  lastCapturedIndentation = lineText.match(/^\s*/)?.[0] ?? '';
}
function applyIndentation() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const line = editor.selection.active.line;
  const lineText = editor.document.lineAt(line).text;
  const textWithoutIndent = lineText.trimStart();

  editor.edit(editBuilder => {
    const range = new vscode.Range(
      new vscode.Position(line, 0),
      new vscode.Position(line, lineText.length)
    );
    editBuilder.replace(range, lastCapturedIndentation + textWithoutIndent);
  });
}
export function activate(context: vscode.ExtensionContext) {

    myStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    myStatus.text = "MODE = 1";
    myStatus.tooltip = "Mi modo personalizado";
    myStatus.show();
    context.subscriptions.push(myStatus);
	// ------------- TOGGLE ; -------------
	const toggleCommand = vscode.commands.registerCommand("myModal.toggle", async () => {
		const editor = vscode.window.activeTextEditor;
				if (!editor) return;

                if (myvar === 0 && buscar_switch === 3) {
                 const doc = editor.document;

    // --- LEER PALABRA DEL PORTAPAPELES ---
    const targetRaw = palabraBuscar
    if (!targetRaw) {
      vscode.window.showInformationMessage("El portapapeles está vacío.");
      return;
    }

    const target = targetRaw.toLowerCase();   // <-- insensible a mayúsculas
    const len = target.length;

    // posición inicial
    let pos = editor.selection.active;

    while (pos.line < doc.lineCount) {

      const lineText = doc.lineAt(pos.line).text;
      const lowerLine = lineText.toLowerCase();  // <-- minúsculas

      // buscar desde la posición actual hacia adelante
      const index = lowerLine.indexOf(target, pos.character);

      if (index !== -1) {
        // --- Coincidencia encontrada ---
        const start = new vscode.Position(pos.line, index);
        const end = new vscode.Position(pos.line, index + len);

        // colocar cursor AL FINAL DE LA PALABRA
        editor.selection = new vscode.Selection(end, end);

        // hacer scroll
        editor.revealRange(
          new vscode.Range(start, end),
          vscode.TextEditorRevealType.InCenter
        );

        return;
      }

      // avanzar una llamada, comenzar desde el primer caracter
      pos = new vscode.Position(pos.line + 1, 0);
    }

    vscode.window.showInformationMessage(`No se encontró (insensible a mayúsculas): "${targetRaw}".`);


				}else if (myvar === 0 && buscar_switch === 2 || myvar === 5 && buscar_switch === 2) {
					myvar = 0
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
      palabraBuscar = innerText
	  

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
  editor.edit(async editBuilder => {
	for (const act of actions) {
    const position = editor.selection.active; // posición actual del cursor
    line_start = position.line;         // número de línea (0-based)
	  editBuilder.delete(act.range);
				buscar_switch = 3
    // --- LEER PALABRA DEL PORTAPAPELES ---
    const targetRaw = palabraBuscar
    if (!targetRaw) {
      vscode.window.showInformationMessage("El portapapeles está vacío.");
      return;
    }

    const target = targetRaw.toLowerCase();   // <-- insensible a mayúsculas
    const len = target.length;

    // posición inicial
    let pos = editor.selection.active;

    while (pos.line < doc.lineCount) {

      const lineText = doc.lineAt(pos.line).text;
      const lowerLine = lineText.toLowerCase();  // <-- minúsculas

      // buscar desde la posición actual hacia adelante
      const index = lowerLine.indexOf(target, pos.character);

      if (index !== -1) {
        // --- Coincidencia encontrada ---
        const start = new vscode.Position(pos.line, index);
        const end = new vscode.Position(pos.line, index + len);

        // colocar cursor AL FINAL DE LA PALABRA
        editor.selection = new vscode.Selection(end, end);

        // hacer scroll
        editor.revealRange(
          new vscode.Range(start, end),
          vscode.TextEditorRevealType.InCenter
        );

        return;
      }

      // avanzar una llamada, comenzar desde el primer caracter
      pos = new vscode.Position(pos.line + 1, 0);
    }

    vscode.window.showInformationMessage(`No se encontró (insensible a mayúsculas): "${targetRaw}".`);

				
	}
  });
		}else if (myvar === 7) {
			vscode.commands.executeCommand('selectNextSuggestion');
			
		} else if (myvar === 1) {
			myvar = 0;
		} else if (myvar === 6) {
			myvar = 0;
			
		} else if (myvar === 5) {
			myvar = 0;
			my_numero = 1
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
					}else if (myvar === 6){
					editBuilder.insert(position, 'U')
				
				}else if (myvar === 1) {
        			vscode.commands.executeCommand('editor.action.clipboardCopyAction');
				}else if (myvar === 5) {
					editBuilder.insert(position, '6');
				}else if (myvar === 4) {
					editBuilder.insert(position, ';');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
				}else if (myvar === 2) {
        			vscode.commands.executeCommand('editor.action.clipboardCopyAction');
							vscode.commands.executeCommand('cancelSelection');
							myvar = 1
				}
			}
			myStatus.text = `MODE = ${myvar}`;
		});
	}); 
		const enterCommand = vscode.commands.registerCommand("myModal.enterCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
            
			  if (myvar === 0 && buscar_switch === 1){
				    vscode.commands.executeCommand('cursorLeft');
				}
				else if (myvar === 0 && buscar_switch === 2){
				    buscar_switch = 3
				}
				else if (myvar === 4){
				    vscode.commands.executeCommand('lineBreakInsert');
        			vscode.commands.executeCommand('cursorDown');
		        	myvar = 0
				}else if (myvar === 1){
				    vscode.commands.executeCommand('workbench.action.focusRightGroup');
				}

			myStatus.text = `MODE = ${myvar}`;
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

				}else if (myvar === 4) {
					editBuilder.insert(position, ',');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
				}else if (myvar === 1) {
     				vscode.commands.executeCommand('editor.action.clipboardPasteAction');
                }else if (myvar === 6){
					editBuilder.insert(position, 'W')
				}else if (myvar === 2) {
					vscode.commands.executeCommand('cursorHome');
					myvar = 1
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
	const iCommand = vscode.commands.registerCommand("myModal.iCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'i');
					
				}else if (myvar === 1) {
					vscode.commands.executeCommand('workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup');
					}else if (myvar === 6){
					editBuilder.insert(position, 'I')
				
				}else if (myvar === 4) {
					editBuilder.insert(position, '+');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
				}else if (myvar === 2) {
					vscode.commands.executeCommand('workbench.action.closeActiveEditor');
					myvar = 1
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

	const tCommand = vscode.commands.registerCommand("myModal.tCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 't');
                }else if (myvar === 6){
					editBuilder.insert(position, 'T')
									
				}else if (myvar === 1) {
								        const filePath = editor.document.fileName;
					const folderPath = path.dirname(filePath)
					vscode.env.clipboard.writeText(folderPath).then(() => {
    				    vscode.window.showInformationMessage(`ruta copiada`);
					});


				}else if (myvar === 3) {
					vscode.commands.executeCommand('editor.action.selectAll');
					myvar = 2
				}else if (myvar === 4) {
					editBuilder.insert(position, '*');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
			}
				
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
	
	const eCommand = vscode.commands.registerCommand("myModal.eCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'e');
			}else if (myvar === 6){
					editBuilder.insert(position, 'E')
						
				}else if (myvar === 1) {
					vscode.commands.executeCommand('cursorRight');
				}else if (myvar === 2) {
					vscode.commands.executeCommand('cursorRightSelect');
				}else if (myvar === 4) {
					editBuilder.insert(position, '$');
        		if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
					
				}else if (myvar === 3) {
					vscode.commands.executeCommand('editor.action.selectAll');
					myvar = 2
				}else if (myvar === 5) {
					vscode.commands.executeCommand('cursorLeft');
				}

			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
	
	
	const fCommand = vscode.commands.registerCommand("myModal.fCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'f');
				}else if (myvar === 6){
					editBuilder.insert(position, 'F')
					
				}else if (myvar === 1) {
					const position = editor.selection.active; // posición actual del cursor
                    marca_line = position.line;         // número de línea (0-based)
					vscode.commands.executeCommand('cursorHome');
					vscode.commands.executeCommand('actions.find');
					
					myvar = 2
				}else if (myvar === 2) {
						vscode.commands.executeCommand('editor.action.clipboardCutAction');
						myvar = 1 
				}else if (myvar === 3) {
					vscode.commands.executeCommand('editor.action.selectAll');
					myvar = 2
				}else if (myvar === 4) {
					editBuilder.insert(position, '/');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
		
		const bakspCommand = vscode.commands.registerCommand("myModal.bakspCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
						vscode.commands.executeCommand('deleteLeft');
				}else if (myvar === 7) {
					myvar = 0
				}else if (myvar === 2) {
						vscode.commands.executeCommand('deleteLeft');
						myvar = 1
				}else if (myvar === 5) {
						vscode.commands.executeCommand('deleteLeft');
				}else if (myvar === 6) {
						vscode.commands.executeCommand('deleteLeft');
				}else if (myvar === 4) {
					      myvar =  6
				    vscode.window.showInformationMessage(`mayuscula`);
			
				}else if (myvar === 1) {
				
				
	
    const pos = editor.selection.active;
    captureIndentation()
    editor.edit(edit => {
        // Insertar una nueva línea abajo sin indentación
        edit.insert(new vscode.Position(pos.line + 1, 0), "\n");
    }).then(() => {
        // Mover cursor a la nueva línea
        const newPos = new vscode.Position(pos.line + 1, 0);
        editor.selection = new vscode.Selection(newPos, newPos);
        applyIndentation()
            });
				}
						
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
	
		const sCommand = vscode.commands.registerCommand("myModal.sCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 's');
				}else if (myvar === 6){
					editBuilder.insert(position, 'S')
					
				}else if (myvar === 1 ) {
								vscode.commands.executeCommand('workbench.action.files.save');

				}else if (myvar === 2) {
					vscode.commands.executeCommand('cursorEnd');
					myvar = 1
					}else if (myvar === 4) {
					editBuilder.insert(position, '.');
		        if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
					
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 


		const bCommand = vscode.commands.registerCommand("myModal.bCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'b');
				}else if (myvar === 6){
					editBuilder.insert(position, 'B')
					
				}else if (myvar === 5 ) {
					editBuilder.insert(position, '9');
					
				}else if (myvar === 2) {
					vscode.commands.executeCommand('cursorTop');
					myvar = 1
				}else if (myvar === 4) {
					editBuilder.insert(position, '!');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				}else if (myvar === 1){
				    buscar_switch = 3
					myvar = 0
				    vscode.window.showInformationMessage(`modo buscar activado`);
			
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
					
				}else if (myvar === 5) {
					editBuilder.insert(position, '7');
						
				}else if (myvar === 4) {
					editBuilder.insert(position, '\\');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
                }else if (myvar === 6){
					editBuilder.insert(position, 'N')
									
				}else if (myvar === 1) {
				vscode.commands.executeCommand('workbench.action.nextEditor');
				}else if (myvar === 2) {
					vscode.commands.executeCommand('scrollPageDown');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const mCommand = vscode.commands.registerCommand("myModal.mCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'm');
				}else if (myvar === 6){
					editBuilder.insert(position, 'M')
					
				}else if (myvar === 5) {
					editBuilder.insert(position, '8');
				}else if (myvar === 4) {
					editBuilder.insert(position, '|');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				}
				else if (myvar === 1){
				    vscode.commands.executeCommand('workbench.action.moveActiveEditorGroupLeft');
				}
					else if (myvar === 2){
				    vscode.commands.executeCommand('cursorBottom');
				    myvar = 1
				}
			
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const qCommand = vscode.commands.registerCommand("myModal.qCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'q');
					}else if (myvar === 6){
					editBuilder.insert(position, 'Q')
				
				}else if (myvar === 1) {
			        vscode.commands.executeCommand('editor.fold');
				}else if (myvar === 3) {
			        vscode.commands.executeCommand('editor.foldAll');
		    	}else if (myvar === 5) {
					editBuilder.insert(position, '0');
				}else if (myvar === 4) {
					editBuilder.insert(position, '#');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				}else if (myvar === 2) {
					if (!savedPosition) {
						vscode.window.showErrorMessage("No hay una posición guardada. Usa el atajo 'd' primero.");
						return;
					}

					const currentPosition = editor.selection.active;

					const newSelection = new vscode.Selection(savedPosition, currentPosition);
					editor.selection = newSelection;
				}
				
				
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 


		const yCommand = vscode.commands.registerCommand("myModal.yCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'y');
					}else if (myvar === 6){
					editBuilder.insert(position, 'Y')
				}else if (myvar === 1) {
                    vscode.commands.executeCommand('editor.unfold');
				}else if (myvar === 3) {
                    vscode.commands.executeCommand('editor.unfoldAll');
				}else if (myvar === 5) {
					editBuilder.insert(position, '0');
				}else if (myvar === 4) {
					editBuilder.insert(position, '%');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				}else if (myvar === 2) {
					myvar = 1
					savedPosition = editor.selection.active; // posición actual del cursor
					vscode.window.setStatusBarMessage(`Posición guardada: (${savedPosition.line + 1}, ${savedPosition.character + 1})`, 2000);
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 

		const completCommand = vscode.commands.registerCommand("myModal.completCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				 if (myvar === 0) {
					vscode.commands.executeCommand('editor.action.triggerSuggest');
					myvar = 7
				
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

				if (myvar === 0 && buscar_switch === 1) {
					myvar = 4
				}else if (myvar === 0 && buscar_switch === 2) {
					myvar = 4
				}else if (myvar === 7) {
    				vscode.commands.executeCommand('selectPrevSuggestion');
				}else if (myvar === 2) {
    				vscode.commands.executeCommand('editor.action.outdentLines');
				}else if (myvar === 6) {
					myvar = 4
				}else if (myvar === 0 && buscar_switch === 3) {
					buscar_switch = 1
					myvar = 1
				    vscode.window.showInformationMessage(`modo buscar descativado`);
				}else if (myvar === 1) {
     				vscode.commands.executeCommand('editor.action.clipboardPasteAction');

				}else if (myvar === 5) {
					myvar = 4
					my_numero = 2
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
					}else if (myvar === 6){
					editBuilder.insert(position, 'O')
				
				}else if (myvar === 1) {
					vscode.commands.executeCommand('cursorDown');

				}else if (myvar === 5) {
					editBuilder.insert(position, '5');
				}else if (myvar === 2) {
					vscode.commands.executeCommand('cursorDownSelect');
				}else if (myvar === 4) {
					editBuilder.insert(position, '@');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
					
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
						}else if (myvar === 3) {
					vscode.commands.executeCommand("workbench.action.splitEditorRight");
					myvar = 1
				}else if (myvar === 5) {
					editBuilder.insert(position, '2');
					}else if (myvar === 6){
					editBuilder.insert(position, 'G')
				
				}else if (myvar === 4) {
						editor.edit(editBuilder => {
						editBuilder.insert(position, '{}');
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				
				
				}else if (myvar === 2) {
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
			const jCommand = vscode.commands.registerCommand("myModal.jCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		editor.edit(editBuilder => {
			const selections = editor.selections;

			for (const selection of selections) {
				const position = selection.active;

				if (myvar === 0) {
					editBuilder.insert(position, 'j');
				}else if (myvar === 4) {
					editor.edit(editBuilder => {
						editBuilder.insert(position, '``');
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
                }else if (myvar === 6){
					editBuilder.insert(position, 'J')
								
				}else if (myvar === 2) {
    				const filePath = editor.document.fileName;
					const folderPath = path.dirname(filePath)
					vscode.env.clipboard.writeText(folderPath).then(() => {
						vscode.commands.executeCommand('workbench.action.tasks.runTask', 'Gitpush');
					});
					myvar = 1
				}else if (myvar === 5) {
					editBuilder.insert(position, '3');
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
					vscode.commands.executeCommand('cursorUpSelect');
				}else if (myvar === 5) {
					editBuilder.insert(position, '4');
					}else if (myvar === 6){
					editBuilder.insert(position, 'P')
				
				}else if (myvar === 4) {
					
						editor.edit(editBuilder => {
        					editBuilder.insert(position, '[]');
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
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
					}else if (myvar === 6){
					editBuilder.insert(position, 'A')
				
				}else if (myvar === 1) {
					vscode.commands.executeCommand('redo');

				}else if (myvar === 3) {
					vscode.commands.executeCommand('cursorHome');
					myvar = 1
				
				}else if (myvar === 4) {
					editBuilder.insert(position, ':');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
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
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				
							}else if (myvar === 6){
					editBuilder.insert(position, 'R')
				
				}else if (myvar === 1) {
						const document = editor.document;
						const line = document.lineAt(position.line);
						editBuilder.delete(line.rangeIncludingLineBreak);

				}else if (myvar === 2) {
						vscode.commands.executeCommand('editor.action.clipboardCutAction');
							myvar = 1
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
		const unoCommand = vscode.commands.registerCommand("myModal.unoCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
			const infox = `MODE = ${myvar}--${buscar_switch}`;
			vscode.window.showInformationMessage(infox);
			myStatus.text = `MODE = ${myvar}`;
			
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

				}else if (myvar === 4) {
					editBuilder.insert(position, '=');
                    if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
                    }else if (myvar === 6){
					editBuilder.insert(position, 'D')
				
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
					}else if (myvar === 6){
					editBuilder.insert(position, 'C')
				
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
				}else if (myvar === 2) {
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
				}else if (myvar === 4) {
					editor.edit(editBuilder => {
						editBuilder.insert(position, '""');
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
				}

			}
		});
		myStatus.text = `MODE = ${myvar}`;
		
	}); 
		const xCommand = vscode.commands.registerCommand("myModal.xCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;
				if (myvar === 0) {
					editBuilder.insert(position, 'x');
				}else if (myvar === 5) {
					editBuilder.insert(position, '1');
							}else if (myvar === 2) {
										const lineNumber = marca_line;
					const position = new vscode.Position(lineNumber, 0);

					editor.selection = new vscode.Selection(position, position);
					editor.revealRange(
						new vscode.Range(position, position),
						vscode.TextEditorRevealType.InCenter
						);
					myvar = 1
					
				}else if (myvar === 1) {
					vscode.commands.executeCommand('editor.action.addSelectionToNextFindMatch');
					myvar = 2
		
					}else if (myvar === 6){
					editBuilder.insert(position, 'X')
				
                }else if (myvar === 4) {
						editBuilder.insert(position, "&");
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
								}	}
		});
		myStatus.text = `MODE = ${myvar}`;
		
	}); 

				const lCommand = vscode.commands.registerCommand("myModal.lCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;
				if (myvar === 0) {
					editBuilder.insert(position, 'l');
					}else if (myvar === 6){
					editBuilder.insert(position, 'L')
				
				}else if (myvar === 5) {
					editBuilder.insert(position, '1');
				}else if (myvar === 1) {
					const position = editor.selection.active; // posición actual del cursor
                    line_start = position.line;         // número de línea (0-based)
                    vscode.window.showInformationMessage("linea start capturada.");
                    
                }else if (myvar === 4) {
                
					editor.edit(editBuilder => {
						editBuilder.insert(position, "''");
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
						if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
		
                
								}else if (myvar === 2) {
					vscode.commands.executeCommand('workbench.action.tasks.runTask', 'RecentOpenFzf');
					myvar = 1
				}
}
		});
		myStatus.text = `MODE = ${myvar}`;
		
	}); 

			const kCommand = vscode.commands.registerCommand("myModal.kCommand", () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		editor.edit(editBuilder => {
			const selections = editor.selections;
			for (const selection of selections) {
				const position = selection.active;
				if (myvar === 0) {
					editBuilder.insert(position, 'k');
				}else if (myvar === 1) {
					vscode.commands.executeCommand('cursorLeft');
				}else if (myvar === 2) {
					vscode.commands.executeCommand('cursorLeftSelect');
           }else if (myvar === 6){
					editBuilder.insert(position, 'K')
				
				}else if (myvar === 4) {
					editBuilder.insert(position, '_');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
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
           }else if (myvar === 6){
					editBuilder.insert(position, 'V')
				
				}else if (myvar === 4) {
					editBuilder.insert(position, '-');
					if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
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
					}else if (myvar === 6){
					editBuilder.insert(position, 'Z')
				
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
				}else if (myvar === 2) {
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
				}else if (myvar === 4) {
					editor.edit(editBuilder => {
						editBuilder.insert(position, '<>');
						}).then(() => {
							vscode.commands.executeCommand('cursorLeft');
						});
           		if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
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
                }else if (myvar === 6){
					editBuilder.insert(position, 'H')
									
				}else if (myvar === 1) {
					const position = editor.selection.active; // posición actual del cursor
                    marca_line = position.line;         // número de línea (0-based)
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
				}else if (myvar === 4) {
					editBuilder.insert(position, '?');
           		if (my_numero === 1) {
						myvar = 0;
					}else {
						myvar = 5;
					}
				}else if (myvar === 5) {
					editBuilder.insert(position, '3');
				}else if (myvar === 6) {
					editBuilder.insert(position, 'B');
				}
			}
			myStatus.text = `MODE = ${myvar}`;
			
		});
	}); 
const closeBuscador = vscode.commands.registerCommand('myModal.closeBuscador', () => {
		vscode.commands.executeCommand('list.closeFind');
		vscode.commands.executeCommand('closeFindWidget');
		vscode.commands.executeCommand('cancelSelection');
		myvar = 1
		myStatus.text = `MODE = ${myvar}`;
    
});

const spaceCommand = vscode.commands.registerCommand("myModal.spaceCommand", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const pos = editor.selection.active;
    const doc = editor.document;

    // ============================================================
    // BUSCAR HACIA ATRÁS (INSENSIBLE A MAYÚSCULAS)
    // ============================================================
    async function buscarHaciaAtras() {
        const targetRaw = palabraBuscar
        if (!targetRaw) {
            vscode.window.showInformationMessage("El portapapeles está vacío.");
            return;
        }

        const target = targetRaw.toLowerCase();
        const len = target.length;
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // ← evita el error
		}

        let cur = editor.selection.active;

        while (cur.line >= 0) {

            const lineText = doc.lineAt(cur.line).text;
            const lowerLine = lineText.toLowerCase();

            const upto = cur.character;
            const segment = lowerLine.substring(0, upto);

            const index = segment.lastIndexOf(target);

            if (index !== -1) {
                const start = new vscode.Position(cur.line, index);
                const end = new vscode.Position(cur.line, index + len);
				editor.selection = new vscode.Selection(start, start);

                editor.revealRange(new vscode.Range(start, end), vscode.TextEditorRevealType.InCenter);

                return;
            }

            cur = new vscode.Position(
                cur.line - 1,
                cur.line - 1 >= 0 ? doc.lineAt(cur.line - 1).text.length : 0
            );
        }

        vscode.window.showInformationMessage(`No se encontró: "${targetRaw}"`);
    }


    // ============================================================
    // EXTRAER TEXTO ENTRE ->   <-
    // ============================================================
    function extraerRangos() {
        const actions = [];
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // ← evita el error
		}

        for (const sel of editor.selections) {
            const p = sel.active;
            const line = doc.lineAt(p.line).text;

            const start = line.lastIndexOf("->", p.character);
            const end = line.indexOf("<-", p.character);

            if (start !== -1 && end !== -1 && start < p.character && p.character <= end + 2) {
                const inner = line.substring(start + 2, end).trim();

                actions.push({
                    line: p.line,
                    start,
                    end,
                    inner
                });
            }
        }

        return actions;
    }


    // ============================================================
    // LOGICA PRINCIPAL
    // ============================================================
    if (myvar === 0 && buscar_switch === 2 || myvar === 5 && buscar_switch === 2) {

        const actions = extraerRangos();
		if (!actions || actions.length === 0) {
    return;
}

        if (actions.length === 0) return;
        palabraBuscar = actions[0].inner
        // Copiar el texto del PRIMER rango al portapapeles

        // 1) BORRAR texto → SOLO EDICIÓN
        await editor.edit(editBuilder => {
            for (const act of actions) {
                editBuilder.delete(
                    new vscode.Range(
                        new vscode.Position(act.line, act.start),
                        new vscode.Position(act.line, act.end + 2)
                    )
                );
            }
        });

        // 2) Cambiar modo
        buscar_switch = 3;
        myvar = 0;

        // 3) Buscar hacia atrás
        await buscarHaciaAtras();

    }
    else if (myvar === 0 && buscar_switch === 3) {
        // SOLO busca hacia atrás
        await buscarHaciaAtras();
    }
    else if (myvar === 0 && buscar_switch === 1) {

		
        // Insertar espacio (solo edición)
        await editor.edit(editBuilder => {
            editBuilder.insert(pos, " ");
        });

    }
        else if (myvar === 0 && buscar_switch === 1) {

        // Insertar espacio (solo edición)
        await editor.edit(editBuilder => {
            editBuilder.insert(pos, " ");
        });

    }
        else if (myvar === 6 || myvar ===  5) {
        // Insertar espacio (solo edición)
        await editor.edit(editBuilder => {
            editBuilder.insert(pos, " ");
        });
    }
    else if (myvar === 1) {
        myvar = 2;
    }
    else if (myvar === 7) {
	    vscode.commands.executeCommand('acceptSelectedSuggestion');
	    myvar = 0
     
    }
    else if (myvar === 2) {
	    vscode.commands.executeCommand('editor.action.indentLines');
    }
    else if (myvar === 4) {
        myvar =  5
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
	                                                              
# Launch Control v2

Rewritten core with focus on the modules

Launch Control is a cross OS tool similar to macOS spotlight. It is written in TypsScript and Compiled with Electron. Focus is to create a powerful modulesystem that is restricted through permissions that can be allow or disallowed by the user.


## Input

Inputs contain out of up to two parts:

**Trigger:** a string that will be matched agains a list of triggers provided by modules
Example: Visual Studio Code: `vscode`, `code`, `vsc`, `visualstudiocode`

**Query:** a query is an optional second parameter, everything that follows the trigger (first word) will be utilized as a query
Example: `caniuse backdrop-filter` caniuse is the trigger in this case, backdrop-filter is the query


## Module

```tsx
interface Setting {
	type: string; // input type 'text', 'checkbox', 'number'
	name: string; // name for the setting 
	value: string; // value, empty for settings that have no value required from beginning
	description: string; // description what the setting will do for the user
}

interface Trigger {
	keyword: string; // a keyword to match
	hasQuery: boolean; // whether this trigger accepts an additional query
	callback: Function; // function that get called once the user selects the option and hits enter
	hideKeyword: boolean; // once the keyword is matched it will only show the query 
}

interface Result {
	keyword: string;
	description: string;
	icon: string;
	content: string;
	moduleName: string;
	showKeyword: boolean;
	showContent: boolean;
	showDescription: boolean;
}

interface Module {
	name: string;
	description: string;
	icon: string;
	version: string;
	maxResults: bigint;
    settings: Array<Setting>;
	trigger: Array<Trigger>;

	init() void;

	matchTrigger(value: string, trigger: Trigger) boolean;
	
	getResult(trigger: Trigger, query?: string) Result;
}
```

```python
# pseudo code aka python

userInput = "string"
userQuery = "query string"

results = Array()
iterations = 0

for module in modules:
	for trigger in module:
		if module.matchTrigger(userInput, trigger) and iterations < settings.maxResults:
			results.push(module.getResult(trigger, query)
			iterations++

ipcRenderer.send(results)			
```

## Settings

Split between general settings and module specific settings

- Aliases for trigger
- Modules
    - permissions


## Theming 

Will come, probably based on css custom properties, but nothing more planned right now.
    
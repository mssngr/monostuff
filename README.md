monostuff
=========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/monostuff.svg)](https://npmjs.org/package/monostuff)
[![Downloads/week](https://img.shields.io/npm/dw/monostuff.svg)](https://npmjs.org/package/monostuff)
[![License](https://img.shields.io/npm/l/monostuff.svg)](https://github.com/monostuff/monostuff/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g monostuff
$ monostuff COMMAND
running command...
$ monostuff (-v|--version|version)
monostuff/0.0.0 darwin-x64 node-v16.13.1
$ monostuff --help [COMMAND]
USAGE
  $ monostuff COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`monostuff hello [FILE]`](#monostuff-hello-file)
* [`monostuff help [COMMAND]`](#monostuff-help-command)

## `monostuff hello [FILE]`

describe the command here

```
USAGE
  $ monostuff hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ monostuff hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/monostuff/monostuff/blob/v0.0.0/src/commands/hello.ts)_

## `monostuff help [COMMAND]`

display help for monostuff

```
USAGE
  $ monostuff help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.10/src/commands/help.ts)_
<!-- commandsstop -->

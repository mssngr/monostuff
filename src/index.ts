#!/usr/bin/env node
import yargs from 'yargs'
import build from './commands/build'

yargs(process.argv.slice(2))
  .scriptName('monostuff')
  .command(
    'build [packages]',
    'builds your specified packages',
    yargs => {
      yargs.positional('packages', {
        type: 'string',
        default: '',
        describe:
          'the comma-separated list of packages to build (defaults to all)',
        coerce: arg => arg.split(','),
      })
    },
    (argv: { packages: string[] }) => {
      build(argv.packages)
    }
  )
  .help().argv

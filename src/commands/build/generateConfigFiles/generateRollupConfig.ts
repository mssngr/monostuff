import { readFile, rename, writeFile } from 'fs/promises'

export default async function (name: string, packagesDir: string) {
  try {
    const sharedRollupConfig = await getSharedRollupConfig()
    const rollupConfig = sharedRollupConfig.replace(
      /process.env.NAME/g,
      `'${name}'`
    )
    try {
      await rename(
        `${packagesDir}/${name}/rollup.config.ts`,
        `${packagesDir}/${name}/temp.rollup.config.ts`
      )
    } catch {}
    await writeFile(`${packagesDir}/${name}/rollup.config.ts`, rollupConfig)
  } catch (error) {
    console.error(error)
  }
}

async function getSharedRollupConfig(): Promise<string> {
  try {
    const sharedRollupConfigFile = await readFile('./sharedRollupConfig.ts')
    return sharedRollupConfigFile.toString()
  } catch (error) {
    console.error(error)
    throw new Error('Shared Rollup Config could not be parsed.')
  }
}

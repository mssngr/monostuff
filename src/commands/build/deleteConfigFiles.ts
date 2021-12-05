import { rm, rename } from 'fs/promises'

export default async function (name: string, packagesDir: string) {
  try {
    await rm(`${packagesDir}/${name}/package.json`)
    try {
      await rename(
        `${packagesDir}/${name}/temp.package.json`,
        `${packagesDir}/${name}/package.json`
      )
    } catch {}
    await rm(`${packagesDir}/${name}/rollup.config.ts`)
    try {
      await rename(
        `${packagesDir}/${name}/temp.rollup.config.ts`,
        `${packagesDir}/${name}/rollup.config.ts`
      )
    } catch {}
  } catch (error) {
    throw new Error(`${error}`)
  }
}

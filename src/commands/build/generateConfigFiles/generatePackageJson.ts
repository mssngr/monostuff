import { readFile, rename, writeFile } from 'fs/promises'
import { PackageJson } from 'type-fest'

interface MonostuffPackageJson extends PackageJson {
  monostuff?: {
    isSubScope?: boolean
    packagesDir?: string
  }
}

export default async function (name: string, packagesDir: string) {
  try {
    const sharedPackageJson = await getSharedPackageJson()
    const existingPackageJson = await getExistingPackageJson(name, packagesDir)
    const packageJson = JSON.stringify(
      {
        ...sharedPackageJson,
        name: `${sharedPackageJson.name}.${name}`,
        ...existingPackageJson,
        monostuff: {
          ...sharedPackageJson?.monostuff,
          ...existingPackageJson?.monostuff,
        },
        scripts: {
          ...sharedPackageJson?.scripts,
          ...existingPackageJson?.scripts,
        },
        dependencies: {
          ...sharedPackageJson?.dependencies,
          ...existingPackageJson?.dependencies,
        },
        devDependencies: {
          ...sharedPackageJson?.devDependencies,
          ...existingPackageJson?.devDependencies,
        },
        peerDependencies: {
          ...sharedPackageJson?.peerDependencies,
          ...existingPackageJson?.peerDependencies,
        },
      },
      undefined,
      2
    )
    try {
      await rename(
        `${packagesDir}/${name}/package.json`,
        `${packagesDir}/${name}/temp.package.json`
      )
    } catch {}
    await writeFile(`${packagesDir}/${name}/package.json`, packageJson)
  } catch (error) {
    console.error(error)
  }
}

async function getSharedPackageJson(): Promise<MonostuffPackageJson> {
  try {
    const sharedPackageJsonFile = await readFile('./sharedPackage.json')
    return JSON.parse(sharedPackageJsonFile.toString())
  } catch (error) {
    console.error(error)
    throw new Error('Shared Package JSON could not be parsed.')
  }
}

export async function getExistingPackageJson(
  name: string,
  packagesDir: string
): Promise<MonostuffPackageJson | null> {
  try {
    const existingPackageJsonFile = await readFile(
      `${packagesDir}/${name}/package.json`
    )
    return JSON.parse(existingPackageJsonFile.toString())
  } catch {
    return null
  }
}

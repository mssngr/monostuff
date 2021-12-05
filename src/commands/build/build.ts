import { readdir } from 'fs/promises'
import generateConfigFiles from './generateConfigFiles'
import { getExistingPackageJson } from './generateConfigFiles'
import deleteConfigFiles from './deleteConfigFiles'

const PACKAGES_DIR = './packages'

async function build(packages: string[], providedPackagesDir?: string) {
  const packagesDir = providedPackagesDir || PACKAGES_DIR
  if (packages.length > 0) {
    // Use provided packages if they exist
    packages.map(async name => {
      await buildIndividualPackage(name, packagesDir)
    })
  } else {
    // Otherwise, get the packages automatically from the file system
    try {
      const files = await readdir(packagesDir, {
        withFileTypes: true,
      })
      await Promise.all(
        files.map(async file => {
          if (file.isDirectory()) {
            await buildIndividualPackage(file.name, packagesDir)
          }
        })
      )
    } catch (err) {
      console.error(err)
    }
  }
}

async function buildIndividualPackage(name: string, packagesDir: string) {
  const existingPackageJson = await getExistingPackageJson(name, packagesDir)
  if (existingPackageJson?.monostuff?.isSubScope) {
    // Recursively build out sub scopes
    await build([], existingPackageJson?.monostuff?.packagesDir)
  } else {
    // Otherwise, build this package as normal
    await generateConfigFiles(name, packagesDir)
    await deleteConfigFiles(name, packagesDir)
  }
}

export default build

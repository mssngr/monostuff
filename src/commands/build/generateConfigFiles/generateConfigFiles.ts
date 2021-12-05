import generatePackageJson from './generatePackageJson'
import generateRollupConfig from './generateRollupConfig'

export default async function (name: string, packagesDir: string) {
  await generatePackageJson(name, packagesDir)
  await generateRollupConfig(name, packagesDir)
}

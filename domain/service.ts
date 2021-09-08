export default interface Service {
    register: () => void
}

const util = require("util")
const fs = require("fs")
const readdir = util.promisify(fs.readdir)

export async function getFilesAndFolders(filePath: string): Promise<{ files: string[], folders: string[] }> {
    const folderElements = await readdir(filePath);
    const files = folderElements.filter(value => fs.lstatSync(`${filePath}/${value}`).isFile() && (value.endsWith('.ts') || value.endsWith('.js')))
    const folders = folderElements.filter(value => fs.lstatSync(`${filePath}/${value}`).isDirectory())

    return {files, folders};
}

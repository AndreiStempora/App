import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const FS = {
    createDirectory : async(path) => {
        if(await FS.readDirectory(path) === null){
            await Filesystem.mkdir({
                path: path,
                directory: Directory.Data,
                recursive: true
            });
        }
    },
    readDirectory : async(path) => {
        try{
            const result = await Filesystem.readdir({
                path: path,
                directory: Directory.Data
            });
            return result.files;

        } catch (e) {
            console.log(e);
            return null;
        }
    },
    appendFile: async(path, data) => {
        await Filesystem.appendFile({
            path: path,
            data: data,
            directory: Directory.Data,
        });
    },
    renameFile: async(path, newPath) => {
        await Filesystem.rename({
            path: path,
            newPath: newPath,
            directory: Directory.Data,
        });
    },
    deleteFile: async(path) => {
        await Filesystem.deleteFile({
            path: path,
            directory: Directory.Data,
        });
    },
    copyFile: async(path, newPath) => {
        await Filesystem.copy({
            path: path,
            newPath: newPath,
            directory: Directory.Data,
        });
    },
    readFile: async(path) => {
        const result = await Filesystem.readFile({
            path: path,
            directory: Directory.Data,
        });
        return result.data;
    },
}

export { FS };
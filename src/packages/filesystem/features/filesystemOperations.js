import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const FS = {
    createDirectory : async(path) => {
        if(await FS.readDirectory(path) === null || await FS.readDirectory(path) === undefined){
            await Filesystem.mkdir({
                path: path,
                directory: Directory.Data,
                recursive: true
            });
        }
    },
    readDirectory : async(path) => {
        const result = await Filesystem.readdir({
            path: path,
            directory: Directory.Data
        });
        return result.files;
    }

}

export { FS };
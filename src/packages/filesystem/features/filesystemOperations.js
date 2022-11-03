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
        return await Filesystem.copy({
            from: path,
            to: newPath,
        });
    },
    readFile: async(path) => {
        const result = await Filesystem.readFile({
            path: path,
            directory: Directory.Data,
        });
        return result.data;
    },
    showPicture: async(path) => {
        try{
            if(path !== null){
                const contents = await Filesystem.readFile({ path: path });
                console.log(contents);
                const base64PictureData = "data:image/jpg;base64," + contents.data;
                console.log(base64PictureData);
                return base64PictureData;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export { FS };
import { Filesystem, Directory } from '@capacitor/filesystem';

const FS = {
    createDirectory: async (path) => {
        if (await FS.readDirectory(path) === null) {
            await Filesystem.mkdir({
                path: path,
                directory: Directory.Documents,
                recursive: true
            });
        }
    },
    readDirectory: async (path) => {
        try {
            const result = await Filesystem.readdir({
                path: path,
                directory: Directory.Documents,
            });
            return result.files;

        } catch (e) {
            return null;
        }
    },
    appendFile: async (path, data) => {
        await Filesystem.appendFile({
            path: path,
            data: data,
            directory: Directory.Documents,
        });
    },
    renameFile: async (path, newPath) => {
        await Filesystem.rename({
            path: path,
            newPath: newPath,
            directory: Directory.Documents,
        });
    },
    deleteFile: async (path) => {
        try {
            await Filesystem.deleteFile({
                path: path,
            })
            return true;
        } catch (e) {
            return e.message;
        }

    },
    copyFile: async (path, newPath) => {
        return await Filesystem.copy({
            from: path,
            to: newPath,
        });
    },

    readFile: async (path) => {
        const existingFiles = await FS.readDirectory('images');
        const uri = (await existingFiles.find((file) => (file.name === path))).uri;
        const result = await Filesystem.readFile({
            path: uri,
        });
        return result;
    },
    deleteDirectory: async (path) => {
        await Filesystem.rmdir({
            path: path,
            directory: Directory.External,
            recursive: true
        });
    },
    showPicture: async (path) => {
        try {
            if (path !== null) {
                const contents = await FS.readFile(path);
                const base64PictureData = "data:image/jpg;base64," + contents.data;
                return base64PictureData;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export { FS };
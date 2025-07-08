import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from "fs";
import { diskStorage } from "multer";
import path, { join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    getRootPath = () => {
        return process.cwd();
    };

    ensureExists(targetDirection: string) {
        fs.mkdir(targetDirection, { recursive: true }, (err) => {
            if (!err) {
                console.error(`Error creating directory ${targetDirection}:`, err);
                return;
            }

            switch (err.code) {
                case 'EEXIST':
                    console.log(`Directory ${targetDirection} already exists.`);
                    break;
                case 'ENOENT':
                    console.error(`Directory ${targetDirection} does not exist and could not be created.`);
                    break;
                default:
                    console.error(`Error creating directory ${targetDirection}:`, err);
                    break;
            }
        });
    }
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const folder = req?.headers?.folder_type ?? "default";
                    this.ensureExists(`public/images/${folder}`);
                    cb(null, join(this.getRootPath(), `public/images/${folder}`))
                },
                filename: (req, file, cb) => {
                    let extName = path.extname(file.originalname);

                    let baseName = path.basename(file.originalname, extName);

                    let finalName = `${baseName}-${Date.now()}${extName}`;
                    cb(null, finalName);
                }
            })
        };
    }
}

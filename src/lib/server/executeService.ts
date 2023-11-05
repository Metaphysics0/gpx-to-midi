import { env } from '$env/dynamic/private';
import { exec as nodeExec } from 'node:child_process';
import { readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import util from 'node:util';
import path from 'path';
// import path from 'path';
const exec = util.promisify(nodeExec);

export class ExecuteService {
	private readonly pathOfTestFile = 'static/assets/breathe.gp5';

	async writeFileAndConvert(file: File): Promise<{ file: Buffer; name: string }> {
		const uploadPath = await this.writeFileToTempFolder(file);
		await this.executeConvert(uploadPath);
		await this.deleteFile(uploadPath);

		const convertedFilePath = await this.getConvertedFilePath(uploadPath);
		const convertedFile = await readFile(convertedFilePath);

		await this.deleteFile(convertedFilePath);

		return {
			name: this.getFileNameParts(uploadPath).name,
			file: convertedFile
		};
	}

	async deleteFile(uploadPath: string) {
		await unlink(uploadPath);
	}

	private async executeConvert(uploadPath: string): Promise<void> {
		try {
			const { stderr } = await exec(this.getExecuteArgs(uploadPath));
			if (stderr) {
				throw new Error(`exec error: ${stderr}`);
			}
		} catch (error) {
			throw new Error(`error executing function: ${error}`);
		}
	}

	private async writeFileToTempFolder(file: File): Promise<string> {
		const uploadPath = `${env.PATH_TO_TEMP_FOLDER}/${Date.now()}__${file.name}`;

		try {
			await writeFile(uploadPath, new Uint8Array(Buffer.from(await file.arrayBuffer())));
		} catch (error) {
			console.error('upload failed:', error);
			throw new Error('upload failed');
		}

		return uploadPath;
	}

	private async getConvertedFilePath(uploadPath: string): Promise<string> {
		const { timestamp: uploadedFileTimestamp } = this.getFileNameParts(uploadPath);
		if (!uploadedFileTimestamp) {
			throw new Error('unable to find orignally uploaded file');
		}

		const dirCont = await readdir(env.PATH_TO_TEMP_FOLDER);
		const convertedFileName = dirCont.find((elm) => elm.includes(uploadedFileTimestamp));

		if (!convertedFileName) {
			throw new Error('unable to find newly converted file');
		}

		return env.PATH_TO_TEMP_FOLDER + '/' + convertedFileName;
	}

	private getFileNameParts(filePath: string) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line no-unsafe-optional-chaining
		const [timestamp, name] = filePath.split('/')?.at(-1)?.split('__');
		return {
			timestamp,
			name: name.split('.')[0]
		};
	}

	private getExecuteArgs(pathToRead?: string): string {
		const pathToExecFunction = path.join(process.cwd(), 'scripts', 'guitarprotomidi');
		// const pathToExecFunction = '/scripts/guitarprotomidi';
		return [pathToExecFunction, pathToRead || this.pathOfTestFile].join(' ');
	}
}

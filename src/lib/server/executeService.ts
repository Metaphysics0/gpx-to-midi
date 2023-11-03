import { env } from '$env/dynamic/private';
import { exec as nodeExec } from 'node:child_process';
import { readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import util from 'node:util';
const exec = util.promisify(nodeExec);

export class ExecuteService {
	private readonly pathOfTestFile = 'static/assets/breathe.gp5';

	async writeFileAndConvert(file: File): Promise<Buffer> {
		const uploadPath = await this.writeFileToTempFolder(file);
		await this.executeConvert(uploadPath);
		await this.deleteFile(uploadPath);
		const pathOfConvertedFile = await this.getConvertedFilePath(uploadPath);
		const convertedFile = await readFile(pathOfConvertedFile);
		return convertedFile;
	}

	async deleteFile(uploadPath: string) {
		await unlink(uploadPath);
	}

	private async executeConvert(uploadPath: string): Promise<void> {
		const { stderr } = await exec(this.getExecuteArgs(uploadPath));
		if (stderr) {
			throw new Error(`exec error: ${stderr}`);
		}
	}

	private async writeFileToTempFolder(file: File): Promise<string> {
		const uploadPath = `${env.PATH_TO_TEMP_FOLDER}/${Date.now()}__${file.name}`;

		try {
			await writeFile(uploadPath, Buffer.from(await file.arrayBuffer()));
		} catch (error) {
			console.error('upload failed:', error);
			throw new Error('upload failed');
		}

		return uploadPath;
	}

	private async getConvertedFilePath(uploadPath: string): Promise<string> {
		const uploadedFileTimestamp = uploadPath.split('/').at(-1)?.split('__').at(0);
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

	private getExecuteArgs(pathToRead?: string): string {
		return [env.PATH_TO_EXECUTE_FUNCTION, pathToRead || this.pathOfTestFile].join(' ');
	}
}

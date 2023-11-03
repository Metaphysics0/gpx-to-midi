import { env } from '$env/dynamic/private';
import { exec as nodeExec } from 'node:child_process';
import util from 'node:util';
const exec = util.promisify(nodeExec);

export class ExecuteService {
	private readonly pathOfTestFile = 'static/assets/breathe.gp5';

	public async call(): Promise<void> {
		const { stdout, stderr } = await exec(this.execArgs);
		if (stderr) {
			console.error(`exec error: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	}

	private get execArgs(): string {
		return [env.PATH_TO_EXECUTE_FUNCTION, this.pathOfTestFile].join(' ');
	}
}

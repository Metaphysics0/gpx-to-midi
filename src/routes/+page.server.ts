import { PATH_TO_EXECUTE_FUNCTION } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';
import { exec, spawn } from 'node:child_process';

const pathOfFile = 'src/lib/assets/breathe.gp5';
export const actions = {
	default: async (event) => {
		asExec();
	}
} satisfies Actions;

function asExec(): void {
	exec(`${PATH_TO_EXECUTE_FUNCTION} ${pathOfFile}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.error(`stderr: ${stderr}`);
	});
}

function asSpawn(): void {
	const { stdout, stderr } = spawn(PATH_TO_EXECUTE_FUNCTION, [pathOfFile]);

	console.log('test');

	stdout.on('data', (data) => {
		console.log('data', data);
	});

	stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});
}

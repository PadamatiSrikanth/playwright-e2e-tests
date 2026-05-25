import { type FullConfig } from "@playwright/test";
import { exec } from 'child_process';


export default async function globalTeardown(config: FullConfig) {

    console.log(`[INFO]: Starting the global teardown process...`);

    if (process.env.RUNNER?.toUpperCase() == 'LOCAL') {

        console.log(`>> Local run detectd - Starting Allure server...`);

        exec('allure serve', (error, stdout, stderr) => {

            if (error) {
                console.error('ERROR: Starting Allure server:', error.message);
            }

        });

        console.log(`[INFO]: completed the global teardown process...`);

    }

}
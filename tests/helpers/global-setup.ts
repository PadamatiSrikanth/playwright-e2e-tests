import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from 'fs';

export default async function globalSetup(config: FullConfig) {

    console.log(`[INFO]: Starting the global setup...`);

    if (process.env.RUNNER?.toUpperCase() == 'LOCAL') {

        console.log(`[INFO]: Deleting local runs...`);

        const resultDir = path.resolve(process.cwd(), "allure-results");
        console.log(`>> resultDir: ${resultDir}`);

        if (fs.existsSync(resultDir)) {
            fs.rmSync(resultDir, { recursive: true, force: true });
            console.log(`[INFO ]: Allure results deleted for local run`);
        }

        console.log(`[INFO]: completed global setup...`);

    }



}
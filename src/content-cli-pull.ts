import { AnalysisCommand } from "./commands/analysis.command";
import { SkillCommand } from "./commands/skill.command";
import { ObjectiveCommand } from "./commands/objective.command";
import { DataPoolCommand } from "./commands/data-pool.command";
import { AssetCommand } from "./commands/asset.command";
import { PackageCommand } from "./commands/package.command";

import commander = require("commander");
type CommanderStatic = commander.CommanderStatic;

class Pull {
    public static analysis(program: CommanderStatic): CommanderStatic {
        program
            .command("analysis")
            .description("Command to pull an analysis")
            .option("-p, --profile <profile>", "Profile which you want to use to pull the analysis")
            .requiredOption("--id <id>", "Id of the analysis you want to pull")
            .option("--asset", "Pull workflow as an asset")
            .action(async cmd => {
                await new AnalysisCommand().pullAnalysis(cmd.profile, cmd.id, !!cmd.asset);
                process.exit();
            });

        return program;
    }

    public static skill(program: CommanderStatic): CommanderStatic {
        program
            .command("skill")
            .description("Command to pull a skill")
            .option("-p, --profile <profile>", "Profile which you want to use to pull the skill")
            .requiredOption("--projectId <projectId>", "Id of the project you want to pull")
            .requiredOption("--skillId <skillId>", "Id of the skill you want to pull")
            .action(async cmd => {
                await new SkillCommand().pullSkill(cmd.profile, cmd.projectId, cmd.skillId);
                process.exit();
            });

        return program;
    }

    public static objective(program: CommanderStatic): CommanderStatic {
        program
            .command("objective")
            .description("Command to pull an objective")
            .option("-p, --profile <profile>", "Profile which you want to use to pull the objective")
            .requiredOption("--id <id>", "Id of the objective you want to pull")
            .action(async cmd => {
                await new ObjectiveCommand().pullObjective(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static dataPool(program: CommanderStatic): CommanderStatic {
        program
            .command("data-pool")
            .description("Command to pull a data pool")
            .option("-p, --profile <profile>", "Profile which you want to use to pull the data pool")
            .requiredOption("--id <id>", "Id of the data pool you want to pull")
            .action(async cmd => {
                await new DataPoolCommand().pullDataPool(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static asset(program: CommanderStatic): CommanderStatic {
        program
            .command("asset")
            .description("Command to pull an asset from Studio")
            .option("-p, --profile <profile>", "Profile which you want to use to pull the asset")
            .requiredOption("--key <key>", "Key of asset you want to pull")
            .action(async cmd => {
                await new AssetCommand().pullAsset(cmd.profile, cmd.key);
                process.exit();
            });

        return program;
    }

    public static package(program: CommanderStatic): CommanderStatic {
        program
            .command("package")
            .description("Command to pull a package")
            .option("-p, --profile <profile>", "Profile which you want to use to pull the package")
            .requiredOption("--key <key>", "Key of the package you want to pull")
            .option("--store", "Pull package with store deployment metadata")
            .option("--newKey <newKey>", "Define a new key for your package")
            .option("--draft", "Pull draft version of package")
            .action(async cmd => {
                await new PackageCommand().pullPackage(cmd.profile, cmd.key, !!cmd.store, cmd.newKey, !!cmd.draft);
                process.exit();
            });

        return program;
    }
}

Pull.analysis(commander);
Pull.skill(commander);
Pull.objective(commander);
Pull.dataPool(commander);
Pull.asset(commander);
Pull.package(commander);

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit(1);
}

import { AnalysisCommand } from "./commands/analysis.command";
import { SkillCommand } from "./commands/skill.command";
import { ObjectiveCommand } from "./commands/objective.command";
import { SemanticModelCommand } from "./commands/semantic-model.command";
import { BoardCommand } from "./commands/board.command";
import { WorkflowCommand } from "./commands/workflow.command";
import { DataPoolCommand } from "./commands/data-pool.command";
import { AssetCommand } from "./commands/asset.command";

var program = require("commander");

class Pull {
    public static analysis(program) {
        program
            .command("analysis")
            .description("Command to pull an analysis")
            .option("--profile <profile>", "Profile which you want to use to pull the analysis")
            .option("--id <id>", "Id of the analysis you want to pull")
            .action(async cmd => {
                await new AnalysisCommand().pullAnalysis(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static skill(program) {
        program
            .command("skill")
            .description("Command to pull a skill")
            .option("--profile <profile>", "Profile which you want to use to pull the skill")
            .option("--projectId <projectId>", "Id of the project you want to pull")
            .option("--skillId <skillId>", "Id of the skill you want to pull")
            .action(async cmd => {
                await new SkillCommand().pullSkill(cmd.profile, cmd.projectId, cmd.skillId);
                process.exit();
            });

        return program;
    }

    public static objective(program) {
        program
            .command("objective")
            .description("Command to pull an objective")
            .option("--profile <profile>", "Profile which you want to use to pull the objective")
            .option("--id <id>", "Id of the objective you want to pull")
            .action(async cmd => {
                await new ObjectiveCommand().pullObjective(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static semanticModel(program) {
        program
            .command("semantic-model")
            .description("Command to pull a semantic model file from semantic layer")
            .option("--profile <profile>", "Profile which you want to use to pull the semantic model")
            .option("--id <id>", "Id of the configuration file you want to pull")
            .action(async cmd => {
                await new SemanticModelCommand().pullSemanticModel(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static board(program) {
        program
            .command("board")
            .description("Command to pull a board")
            .option("--profile <profile>", "Profile which you want to use to pull the board")
            .option("--id <id>", "Id of the board configuration file you want to pull")
            .action(async cmd => {
                await new BoardCommand().pullBoard(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static workflow(program) {
        program
            .command("workflow")
            .description("Command to pull a workflow")
            .option("--profile <profile>", "Profile which you want to use to pull the workflow")
            .option("--id <id>", "Id of the workflow you want to pull")
            .option("--asset", "Pull workflow as an asset")
            .action(async cmd => {
                await new WorkflowCommand().pullWorkflow(cmd.profile, cmd.id, !!cmd.asset);
                process.exit();
            });

        return program;
    }

    public static dataPool(program) {
        program
            .command("data-pool")
            .description("Command to pull a data pool")
            .option("--profile <profile>", "Profile which you want to use to pull the data pool")
            .option("--id <id>", "Id of the data pool you want to pull")
            .action(async cmd => {
                await new DataPoolCommand().pullDataPool(cmd.profile, cmd.id);
                process.exit();
            });

        return program;
    }

    public static asset(program) {
        program
            .command("asset")
            .description("Command to pull an asset from Studio")
            .option("--profile <profile>", "Profile which you want to use to pull the asset")
            .option("--key <key>", "Key of asset you want to pull")
            .action(async cmd => {
                await new AssetCommand().pullAsset(cmd.profile, cmd.key);
                process.exit();
            });

        return program;
    }
}

Pull.analysis(program);
Pull.skill(program);
Pull.objective(program);
Pull.semanticModel(program);
Pull.board(program);
Pull.workflow(program);
Pull.dataPool(program);
Pull.asset(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}

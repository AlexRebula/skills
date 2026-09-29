/**
 * Types owned by scripts/notify-consumers.ts.
 */

/** One entry of the local `notify-consumers.config.json`. */
export interface Consumer {
  /** Label used in the log. */
  name: string;
  /** Absolute path to the consumer's checkout; the command's working directory. */
  path: string;
  /** Program and arguments, spawned without a shell, e.g. ["npm", "run", "sync", "--", "--pr"]. */
  command: string[];
}

export interface NotifyConfig {
  consumers: Consumer[];
}

/** One command the script runs: where, and the program plus its arguments. */
export interface Step {
  label: string;
  cwd: string;
  command: string[];
}

export interface ConsumerStep extends Step {
  /** The checkout at `cwd` doesn't exist: the step is reported and skipped. */
  missing: boolean;
}

export type Plan =
  | { kind: 'skip'; reason: string }
  | { kind: 'run'; regenerate: Step; consumers: ConsumerStep[] };

export interface CliArgs {
  dryRun: boolean;
  help: boolean;
  /** `--config <path>`, or null for the default path. */
  configPath: string | null;
}

export interface PlanInput {
  ci: boolean;
  /** The parsed config, or null when the config file doesn't exist. */
  config: NotifyConfig | null;
  configPath: string;
  repoRoot: string;
  pathExists: (path: string) => boolean;
}

export interface RunDeps {
  /** Runs one step and resolves with its exit code. */
  run: (step: Step) => Promise<number>;
  /** A progress or failure line, for stderr. */
  progress: (line: string) => void;
  /** The run's outcome (the skip reason, or the final summary), for stdout. */
  result: (line: string) => void;
}

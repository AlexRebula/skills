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

/** The signals that stop a run (and the consumer command it is running). */
export type StopSignal = 'SIGINT' | 'SIGTERM';

export type StopHandler = (signal: StopSignal) => void;

/**
 * The run's lock file, so only one real run happens at a time. Its content
 * is `LockHolder` as JSON.
 */
export interface LockFile {
  /** Where the lock lives, for messages. */
  path: string;
  /** This process's id, written into the lock. */
  pid: number;
  /** Creates the file with `content` only when it doesn't exist yet; false when it does. */
  create: (content: string) => boolean;
  /** The file's content, or null when it doesn't exist. */
  read: () => string | null;
  /** Deletes the file (no error when it is already gone). */
  remove: () => void;
  /** Whether a process with this id is still running. */
  isRunning: (pid: number) => boolean;
}

export interface LockHolder {
  pid: number;
  /** ISO timestamp of when the holding run started. */
  started: string;
}

export interface RunDeps {
  /**
   * Runs one step and resolves with its exit code. When `stop` aborts (its
   * `reason` is the `StopSignal`), it stops the step's whole process group
   * and resolves once the step has exited.
   */
  run: (step: Step, stop: AbortSignal) => Promise<number>;
  /** A progress or failure line, for stderr. */
  progress: (line: string) => void;
  /** The run's outcome (the skip reason, or the final summary), for stdout. */
  result: (line: string) => void;
  lock: LockFile;
  /** Calls `handler` on SIGINT or SIGTERM until the returned function is called. */
  onStopSignal: (handler: StopHandler) => () => void;
}

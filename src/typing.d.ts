declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    PROD_AZURE_AD: string,
    PROD_FIREBASE: string,
    PROD_ACCESS_REPORT: string
}

interface GlobalEnvironment {
    process: Process
}
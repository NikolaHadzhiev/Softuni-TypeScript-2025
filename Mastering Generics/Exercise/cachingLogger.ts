enum LoggingLevel {
    Info = "Info",
    Error = "Error",
    Warning = "Warning",
    Debug = "Debug",
}

enum LoggingFormat {
    Standard = "[%level][%date] %text",
    Minimal = "*%level* %text"
}

interface CachingLogger<T extends LoggingLevel, V extends LoggingFormat> {
    cachedLogs: Map<T, string[]>;
    log(logLevel: T, message: string): void;
    getFormat(): V;
}

class Logger<T extends LoggingLevel, V extends LoggingFormat> implements CachingLogger<T, V> {
    cachedLogs: Map<T, string[]> = new Map();

    constructor(private format: V) {}

    log(logLevel: T, message: string): void {
        const date = new Date().toISOString();
        const formatted = this.format
            .replace('%level', logLevel)
            .replace('%date', date)
            .replace('%text', message);

        console.log(formatted);

        if (!this.cachedLogs.has(logLevel)) {
            this.cachedLogs.set(logLevel, []);
        }
        this.cachedLogs.get(logLevel)!.push(formatted);
    }

    getFormat(): V {
        return this.format;
    }
}
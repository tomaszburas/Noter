export interface MySqlError extends Error {
    errno: number;
    sqlState: string;
}

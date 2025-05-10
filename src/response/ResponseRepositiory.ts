export interface ResponseRepository {
  json(status: number, data: Record<string, string>): void;
}

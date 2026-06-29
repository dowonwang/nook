export interface TokenHasher {
  create(token: string): string;
}

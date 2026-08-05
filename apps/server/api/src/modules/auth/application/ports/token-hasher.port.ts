export interface TokenHasher {
  create(token: string): string;
  compare(token: string, hashToken: string): boolean;
}

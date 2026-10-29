export interface TokenHasherPort {
  create(token: string): string;
  compare(token: string, hashToken: string): boolean;
}

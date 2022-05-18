export interface Auth0Claims {
  nickname?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  updated_at?: string;
  email?: string;
  email_verified?: boolean;
  iss?: string;
  sub?: string;
  audi?: string;
  iat?: number;
  exp?: number;
}

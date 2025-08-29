export interface AuthorizeQuery {
    response_type?: string;
    client_id?: string;
    redirect_uri?: string;
    scope?: string;
    state?: string;
    code_challenge?: string;       
    code_challenge_method?: string;
  }
  
  export interface TokenRequest {
    grant_type: "authorization_code" | "refresh_token" | string;
    code?: string;
    redirect_uri?: string;
    client_id?: string;
    client_secret?: string;
    refresh_token?: string;
    code_verifier?: string;        
  }
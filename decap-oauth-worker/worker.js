/**
 * Decap CMS GitHub OAuth Worker
 * 
 * This Cloudflare Worker handles GitHub OAuth authentication for Decap CMS.
 * It provides the /auth and /callback endpoints required by Decap CMS.
 */

const OAUTH_HOST = 'https://github.com';
const OAUTH_AUTHORIZE_PATH = '/login/oauth/authorize';
const OAUTH_TOKEN_PATH = '/login/oauth/access_token';
const OAUTH_SCOPES = 'repo,user';

// 許可されたGitHubユーザー名のリスト
const ALLOWED_USERS = ['keigoly'];

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS headers for Decap CMS
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Route: /auth - Redirect to GitHub OAuth
        if (path === '/auth') {
            const authUrl = new URL(OAUTH_HOST + OAUTH_AUTHORIZE_PATH);
            authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
            authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
            authUrl.searchParams.set('scope', OAUTH_SCOPES);
            authUrl.searchParams.set('state', crypto.randomUUID());

            return Response.redirect(authUrl.toString(), 302);
        }

        // Route: /callback - Handle OAuth callback from GitHub
        if (path === '/callback') {
            const code = url.searchParams.get('code');

            if (!code) {
                return new Response('Missing code parameter', {
                    status: 400,
                    headers: corsHeaders
                });
            }

            try {
                // Exchange code for access token
                const tokenResponse = await fetch(OAUTH_HOST + OAUTH_TOKEN_PATH, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: env.GITHUB_CLIENT_ID,
                        client_secret: env.GITHUB_CLIENT_SECRET,
                        code: code,
                    }),
                });

                const tokenData = await tokenResponse.json();

                if (tokenData.error) {
                    return new Response(`OAuth Error: ${tokenData.error_description || tokenData.error}`, {
                        status: 400,
                        headers: corsHeaders,
                    });
                }

                // ユーザー情報を取得してアクセス制限をチェック
                const userResponse = await fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': `Bearer ${tokenData.access_token}`,
                        'User-Agent': 'Decap-CMS-OAuth-Worker',
                        'Accept': 'application/json',
                    },
                });

                const userData = await userResponse.json();
                const username = userData.login;

                // 許可リストにないユーザーは拒否
                if (!ALLOWED_USERS.includes(username)) {
                    return new Response(`
                        <html>
                            <head>
                                <title>アクセス拒否</title>
                                <style>
                                    body { font-family: sans-serif; text-align: center; padding: 50px; background: #1a1a2e; color: #fff; }
                                    h1 { color: #ff6b6b; }
                                </style>
                            </head>
                            <body>
                                <h1>⛔ アクセス拒否</h1>
                                <p>このCMSは管理者専用です。</p>
                                <p>ユーザー「${username}」はアクセスが許可されていません。</p>
                            </body>
                        </html>
                    `, {
                        status: 403,
                        headers: {
                            'Content-Type': 'text/html; charset=utf-8',
                            ...corsHeaders,
                        },
                    });
                }

                // Return the token to Decap CMS via postMessage
                const script = `
          <html>
            <head><title>Authorizing...</title></head>
            <body>
              <script>
                (function() {
                  function receiveMessage(e) {
                    console.log("receiveMessage %o", e);
                    window.opener.postMessage(
                      'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
                      e.origin
                    );
                    window.removeEventListener("message", receiveMessage, false);
                  }
                  window.addEventListener("message", receiveMessage, false);
                  console.log("Sending message");
                  window.opener.postMessage("authorizing:github", "*");
                })();
              </script>
            </body>
          </html>
        `;

                return new Response(script, {
                    headers: {
                        'Content-Type': 'text/html',
                        ...corsHeaders,
                    },
                });
            } catch (error) {
                return new Response(`Error: ${error.message}`, {
                    status: 500,
                    headers: corsHeaders,
                });
            }
        }

        // Default response
        return new Response('Decap CMS OAuth Provider', {
            headers: corsHeaders,
        });
    },
};

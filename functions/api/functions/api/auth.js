export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  const code = url.searchParams.get('code');
  
  if (!code) {
    const clientId = env.OAUTH_GITHUB_CLIENT_ID;
    const redirectUri = `${url.origin}/api/auth`;
    const scope = 'repo,user';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    return Response.redirect(githubAuthUrl, 302);
  }
  
  const clientId = env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = env.OAUTH_GITHUB_CLIENT_SECRET;
  
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  
  if (tokenData.error) {
    return new Response(JSON.stringify({ error: tokenData.error_description }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authenticating...</title>
    </head>
    <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("Received message:", e);
            window.opener.postMessage(
              "authorization:github:success:" + JSON.stringify({
                token: "${tokenData.access_token}",
                provider: "github"
              }),
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          
          window.opener.postMessage(
            "authorization:github:success:" + JSON.stringify({
              token: "${tokenData.access_token}",
              provider: "github"
            }),
            window.location.origin
          );
          
          setTimeout(function() {
            window.close();
          }, 1000);
        })();
      </script>
      <p>Authenticating... You can close this window.</p>
    </body>
    </html>
  `;
  
  return new Response(content, {
    headers: { 'Content-Type': 'text/html' },
  });
}

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log("Url ===> ", url, "Method ===> ", method);
  if (url === "/" && method === "GET") {
    res.write(`
      <html>
        <head>
          <title>
            Node with maxx Homepage
          </title>
        </head>
        <body>
          <h1>Hello this is my task</h1>
          <form action="/message" method="POST">
            <div>
              <label for="name">Name:</label>
              <input type="text" name="name" id="name" required="true">
            </div>
            <div>
              <label for="email">E-Mail:</label>
              <input type="email" name="email" id="email" required="true">
            </div>
            <div>
              <input type="submit">
            </div>
          </form>
        </body>
      </html>
    `);
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = []
    req.on('data', chunk => {
      console.log('Chunk ===> ', chunk)
      body.push(chunk)
    })
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      console.log('Hell done',parsedBody, parsedBody.split('='))
      res.write(`
        <html>
          <head>
            <title>
              Node with maxx Message page
            </title>
          </head>
          <body>
            <div>
              <div>
                <label for="name">Name:</label> ${parsedBody.split('=')[1]}
              </div>
              <div>
                <label for="email">E-Mail:</label> ${parsedBody.split('=')[3]}
              </div>
              <div>
                <input type="submit">
              </div>
            </div>
          </body>
        </html>
      `);
      return res.end()
    })
  }
  res.write(`
    <html>
      <head>
        <title>
          Node with maxx Another page
        </title>
      </head>
      <body>
        <h1>Hello this is my task</h1>
      </body>
    </html>
  `);
  return res.end();
});

server.listen(3000);

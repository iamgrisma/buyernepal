// Basic HTML layout helper - you might use a more sophisticated templating approach

export const renderHtmlPage = (title: string, bodyContent: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} | BuyerNepal</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: auto; }
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${bodyContent}
      </body>
    </html>
  `;
};

export const renderErrorPage = (message: string, status = 500) => {
  return renderHtmlPage(`Error ${status}`, `<p class="error">${message}</p>`);
};

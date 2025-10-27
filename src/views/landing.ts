import { Context } from 'hono';
import { AppEnv } from '../index'; // Adjust path
import { renderHtmlPage } from './html'; // Import the layout helper

// Placeholder for generating the landing page HTML
export const renderLandingPage = async (c: Context<AppEnv>) => {
    // In a real implementation, you would:
    // 1. Fetch data (categories, trending products, etc.) from D1 using c.env.DB
    // 2. Format the data into HTML elements
    // 3. Pass the formatted HTML to renderHtmlPage

    const bodyContent = `
        <p>Welcome to BuyerNepal!</p>
        <p><em>(Content for categories, trending products, reviews, coupons will be loaded here.)</em></p>
        <p><a href="/api/products">View Products (API)</a></p>
         <p><a href="/api/categories">View Categories (API)</a></p>
    `;

    const html = renderHtmlPage('Welcome to BuyerNepal', bodyContent);
    return c.html(html);
};

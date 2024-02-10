// pages/api/proxy/[...params].js
import Cors from 'cors-anywhere';

// Initialize the cors-anywhere server
const proxy = Cors.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: ['cookie', 'cookie2'] // Remove cookies for privacy
});

export default function handler(req, res) {
  // Extract the target URL from the request path
  const { params } = req.query;
  let targetURL = params.join('/');

  req.url = targetURL.startsWith('/') ? targetURL : '/' + targetURL;

  // Use the cors-anywhere proxy to handle the request
  proxy.emit('request', req, res);
}

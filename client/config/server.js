const baseUrl = process.env.NEXT_PUBLIC_ENIROMENT =="production"? process.env.NEXT_PUBLIC_LIVE_URL:process.env.NEXT_PUBLIC_LOCAL_URL;

module.exports = baseUrl;

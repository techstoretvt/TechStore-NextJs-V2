import { getAllIdProduct, getAllIdBlog } from './services/appService'

const domain = process.env.REACT_APP_FRONTEND_URL
const backend = process.env.REACT_APP_BACKEND_URL_BUILD



export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed


  return [{ id: 0 }]
}


export default async function sitemap({ id }) {


  //get idProduct
  let allIdProduct = await getAllIdProduct();
  let dataIdProduct = allIdProduct.data.map(idProduct => ({
    url: domain + '/product/' + idProduct.id,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  //get idBlog
  let allIdBlog = await getAllIdBlog();
  let dataIdBlog = allIdBlog.data.map(idBog => ({
    url: domain + '/blogs/detail-blog/' + idBog.id,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }))

  return [
    {
      url: domain + "/",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: domain + '/portal/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: domain + '/images/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: domain + '/portal/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: domain + '/app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: domain + '/app/download',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: domain + '/account/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: domain + '/account/register',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: domain + '/search/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: domain + '/short-video/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: domain + '/search?promotion=true',
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: domain + '/product/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: domain + '/blogs/all',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: domain + '/blogs/detail-blog/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: domain + '/promotion/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: domain + '/short-video/foryou',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...dataIdProduct,
    ...dataIdBlog
  ];
}
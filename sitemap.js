import { getAllIdProduct, getAllIdBlog } from './services/appService'

const domain = process.env.REACT_APP_FRONTEND_URL
const backend = process.env.REACT_APP_BACKEND_URL_BUILD



export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed


  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}


export default async function sitemap({ id }) {


  //get idProduct
  let allIdProduct = await getAllIdProduct();
  let dataIdProduct = allIdProduct.map(idProduct => ({
    url: domain + '/product/' + idProduct.id,
    lastModified: idProduct.createdAt,
  }))

  //get idBlog
  let allIdBlog = await getAllIdBlog();
  let dataIdBlog = allIdBlog.map(idBog => ({
    url: domain + '/blogs/detail-blog/' + idBog.id,
    lastModified: idBog.createdAt,
  }))

  return [
    {
      url: domain + '/home',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: domain + '/portal/contact',
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: domain + '/account/login',
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: domain + '/blogs/all',
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: domain + '/short-video/foryou',
      lastModified: new Date(),
      priority: 0.5,
    },
    ...dataIdProduct,
    ...dataIdBlog
  ];
}
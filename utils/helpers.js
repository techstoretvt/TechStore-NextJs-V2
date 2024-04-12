const IgnoreUrl = (url) => {
    const ignore = [
        //app
        '/api/v1/check-start-server',
        '/api/v1/get-product-promotion-home',
        '/api/vi/get-top-sell-product',
        '/api/vi/get-new-collection-product',
        '/api/v1/get-product-type-flycam',
        '/api/v1/get-list-product-may-like',
        '/api/v1/get-evaluate-by-id-product',
        '/api/v1/search-product',
        '/api/v1/get-list-event-promotion',
        '/api/v1/get-list-blog',
        '/api/v1/get-list-hashtag',
        '/api/v1/get-blog-share-product',
        '/api/v1/get-blog-share-default',
        '/api/v1/get-blog-by-id',
        '/api/v1/get-comment-blog-by-id-blog',
        '/api/v1/increase-view-blog-by-id',
        '/api/v1/get-list-short-video',
        '/api/v1/get-list-comment-short-video-by-id',
        '/api/v1/get-list-product-hashtag-by-id-video',
        '/api/v1/get-product-by-id',
        '/api/v1/get-list-blog-home',
        '/api/v1/get-event-promotion-by-id',
        '/api/v1/get-list-event-promotion-home',
        '/api/v1/get-content-event-promotin-by-id',
        '/api/get-all-type-product',

        //user
        '/api/create-user',
        '/api/user-login',
        '/api/refresh-token',
        '/api/login-google',
        '/api/login-facebook',
        '/api/login-github',
        '/api/v1/check-key-verify',
        '/api/v1/update-video-evaluate',
        '/apit/v1/upload-images-evaluate-product',
        '/api/verify-create-user',
        '/api/v1/get-user-by-id',
        '/api/v1/get-list-video-by-id-user'
    ];

    let check = false;
    ignore.forEach((item) => {
        if (url === item) check = true;
    });

    return check;
};

module.exports = {
    IgnoreUrl,
};

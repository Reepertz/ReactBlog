import client from '../Service/client'

// Récupérer la liste des post
export async function getListPost() {
    try {
        const cli = await client.getSpace('8oamdugxcf33')
        const response = await cli.getEntries({ content_type: 'post' })
        let posts = []
        response.items.forEach(item =>{
            posts.push({
                id: item.sys.id,
                title: item.fields.title['en-US'],
                content: item.fields.content['en-US'],
                description: item.fields.description['en-US'],
                slug: item.fields.slug['en-US'],
            })
        })
        return posts
    } catch (err) {
        return 'error'
    }

}

// Récupérer les infos du post selectionné
export async function getPostDescription(slug) {
    try {
        const cli = await client.getSpace('8oamdugxcf33')
        const response = await cli.getEntries({ content_type: 'post', 'fields.slug': slug })
        console.log(response)
        return response
    } catch (err) {
        return 'error'
    }

}

// Publier un post
export const POST_ARTICLE = async (values) => {
    try {
        const content = await client.getEntry
        console.log(content)

        client.PublishEntry('')

    } catch (err) {
        return 'error'
    }
}

const createClient = {
  client: function() {
    return contentful.createClient({
      accessToken: config.accessToken
    });
  },
  getProducts: async function(filter = {}) {
    let client = await this.client().getSpace(config.space);
    let query = {
      content_type: process.env.CTF_PRODUCT_TYPE_ID
    };
    const response = await client.getEntries(
      Object.keys(filter).length === 0 ? query : Object.assign(query, filter)
    );
    if (response.items.length > 0) {
      let products = [];
      response.items.forEach(item => {
        let images = [];
        item.fields.image.fr.forEach(img => {
          images.push(img.fields);
        });
        let categories = [];
        item.fields.categories.fr.forEach(async categ => {
          let category = await client.getEntry(categ.sys.id);
          category.fields.id = categ.sys.id;
          categories.push(category.fields);
        });
        products.push({
          id: item.sys.id,
          productName: item.fields.productName.fr,
          slug: item.fields.slug.fr,
          productDescription: item.fields.productDescription.fr,
          image: images,
          tags: item.fields.tags.fr,
          categories: categories,
          price: item.fields.price.fr,
          sku: item.fields.sku.fr,
          level: item.fields.level.fr,
          session: item.fields.session.fr,
          numberOfParticipants: item.fields.numberOfParticipants.fr
        });
      });
      return products;
    }
  },
  getCategories: async function(filter = {}) {
    let client = await this.client().getSpace("bgctb5elpo33");
    let query = {
      content_type: process.env.CTF_CATEGORY_TYPE_ID
    };
    const response = await client.getEntries(
      Object.keys(filter).length === 0 ? query : Object.assign(query, filter)
    );
    if (response.items.length > 0) {
      let category = [];
      response.items.forEach(item => {
        category.push({
          id: item.sys.id,
          title: item.fields.title.fr,
          icon: item.fields.icon.fields.fr,
          categoryDescription: item.fields.categoryDescription.fr
        });
      });
      return category;
    }
  },
  getProductByUrl: function(slug) {
    return this.getProducts({ "fields.slug": slug });
  },
  getProductByCategoryId: function(categoriesId) {
    let query = { "fields.categories.sys.id": categoriesId };
    return this.getProducts(query);
  },
  getProductById: function(productId) {
    let query = { "sys.id": productId };
    return this.getProducts(query);
  },
  getCategoryById: function(categoryId) {
    let query = { "sys.id": categoryId };
    return this.getCategories(query);
  }
};
export default createClient;
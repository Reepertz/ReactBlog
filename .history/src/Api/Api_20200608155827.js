import * as contentful from "contentful-management";

const config = {
  space:'8oamdugxcf33',
  accessToken: "CFPAT-BUJz-C_nFxKdWW5WJHg3oO_XombKLt-7vz6ttoW74gY"
};

export const createClient = {
  client: function() {
    return contentful.createClient({
      accessToken: config.accessToken
    });
  },
  getPosts: async function(filter = {}) {
    let client = await this.client().getSpace(config.space);
    let query = {
      content_type: 'post'
    };
    const response = await client.getEntries(
      Object.keys(filter).length === 0 ? query : Object.assign(query, filter)
    );
    if (response.items.length > 0) {
      let posts = [];
      console.log(response.items)
      response.items.forEach(item => {
        posts.push({
          id: item.sys.id,
          author: item.fields.author['en-US'],
          title: item.fields.title['en-US'],
          description: item.fields.description['en-US'],
          slug: item.fields.slug['en-US'],
          content: item.fields.content['en-US'],
          
        });
      });
      return posts;
    }
  },
  getPostBySlug: function(slug) {
    return this.getPosts({ "fields.slug": slug });
  },
};
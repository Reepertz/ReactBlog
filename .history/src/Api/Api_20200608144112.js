import client from '../Service/client'

const cli = client.getSpace('8oamdugxcf33')

console.log(cli)
// Récupérer la liste des post
export async function getListPost() {
    try {
        // const cli = await client.getSpace('8oamdugxcf33')
        const response = await cli.getEntries({ content_type: 'post' })
        console.log(response)
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




// import momnModule from monSsrevice


// momnModule.mafonction
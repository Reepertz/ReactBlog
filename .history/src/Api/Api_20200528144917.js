
export async function getPost(){
    try{
        const call = await fetch("https://jsonplaceholder.typicode.com/posts/ksjd")
        const response = await call.json()
        console.log(response)
        if (response.status >= 200 && response.status < 400) {
           return response
        } 
            return 'error'
        
    }catch (err) {
        return 'error'
    }
}

export function getPostDescription(id){
    fetch("https://jsonplaceholder.typicode.com/posts/"+id)
    .then(res => res.json())
    .then(
    // si il trouve un resultat il set le restult 
    (result) => {
        this.setState({isLoaded: true, post: result});
    },
    // sinon il retourne un message d'erreur
    (error) => {
        this.setState({
        isLoaded: true,
        error
        });
    }
    )
}
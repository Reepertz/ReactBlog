
export async function getPost(){
try{
   const call = await fetch("https://jsonplaceholder.typicode.com/postss")
   const response = await call.json()
 if(!response)  {
       const error = 'Erreur de chargement'
       return error
   }
   return response
   
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
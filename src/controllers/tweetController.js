export const createTweet = (req,res)=>{
  const {
    file,
    body:{formData},
}=req;
console.log(formData);
console.log(file);
}
const token = "Bearer dfasddfasfasdfasfgasdgasgsd"; 
const accessToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
console.log(accessToken);

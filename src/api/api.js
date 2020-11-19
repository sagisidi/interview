export const fetchApi = async (endPoint,method,token,body) =>{
	let url = `http://localhost:8080/${endPoint}`
	let headers = {'Content-type':'application/json'};
	if(token) 
		headers.Authorization = token;
	let response =  !body?
		await fetch(url,{
			method:method,
			headers:headers
		})
		:
		await fetch(url,{
			method:method,
			headers:headers,
			body:JSON.stringify(body)
		})
		return await response.json();


} 


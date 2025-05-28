// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2

export default async (request, context) => {
  try {
    const data = {
      message: 'Hello, world!'
    }
    
    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}




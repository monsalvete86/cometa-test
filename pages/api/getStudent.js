export default async function handler(req, res) {
  const response =  await fetch(
    "http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/", 
    {
      headers: {
        hash: "OcJn4jYChW"
      },
    method: "GET"
    }
  );
  return response;s
}
/*
export default function handler(req, res) {
  
  res.status(200).json({ name: 'Jsdfsdfsdfsfd' })
}*/
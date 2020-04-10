const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title,url,techs} = request.body;
    let NewRepo= {id:uuid(),title,url,techs,likes:0};
    repositories.push(NewRepo);
    return response.json(NewRepo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex<0){
    response.status(400).json({message : "Couldn't find the repository"});
  }
  else{
  const updatedRepo = {id,title,url,techs,likes:repositories[repoIndex].likes};
  repositories[repoIndex]=updatedRepo;
  response.json(updatedRepo);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repoIndex=repositories.findIndex(repo => repo.id===id);
  if(repoIndex<0){
    return response.status(400).json({message : "Couldn't find the repository"});
  }
  else{
    repositories.splice(repoIndex,1);
    return response.status(204).send("Removed");
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id ===id);
  if(repoIndex<0){
    response.status(400).json({message : "Couldn't find the repository"});
  }
  else{
    const {title,url,techs,likes}=repositories[repoIndex];
    let newlikes=parseInt(likes+1);
    const updatedRepo={id,title,url,techs,likes:newlikes};
    repositories[repoIndex]=updatedRepo;
    response.json(updatedRepo);
  }
});

module.exports = app;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './ideaItem.css';
import api from './service/api';

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    async function getIdeas() {
      const response = await api.get('/idea')
      console.log('response', response)
      setIdeas(response.data)
    }
    getIdeas()
  }, []
  )

  function updateIdea(id) {
    console.log('update id', id)
  }

  async function deleteIdea(id) {
    console.log('delete id', id)
    const result = await api.delete(`/idea/${id}`)
    if (result)
      setIdeas(ideas.filter(idea => idea._id !== id))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const idea = {
      name: title,
      description,
      type: tags,
      img_url: imgUrl
    }

    console.log('idea', idea)

    const response = await api.post('/idea', idea)
    console.log('response', response)

    setIdeas([...ideas, response.data])
  }


  return (
    <div id="app">
      <div className="jumbotron">
        <div className="container text-center"><h2>Idea API</h2></div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter your Idea Title"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Tell a little bit about your idea"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  placeholder="What kind of idea is this?"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="imgUr"
                  placeholder="Do you have any image to represent it? Paste the URL here!"
                  value={imgUrl}
                  onChange={e => setImgUrl(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success btn-block">Create!</button>
              </div>
            </form>
          </div>

          <div className="col-sm-8">
            {ideas.map(idea => (
              <div key={idea._id} className="card">
                <img className="card-img-top" src={idea.img_url} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">{idea.name}</h5>
                  <p className="card-text">{idea.description}</p>
                  <strong>Tags: {idea.type} </strong>
                </div>
                <div className="card-body">
                  <button
                    className="btn btn-warning"
                    onClick={() => { updateIdea(idea._id) }}
                  >
                    Edit Idea</button> &nbsp;
                <button
                    className="btn btn-danger"
                    onClick={() => { deleteIdea(idea._id) }}
                  >Delete Idea</button>
                </div>
              </div>
            ))}




            <div className="col"></div>
          </div>

        </div>

      </div>
    </div >
  );
}

export default App;

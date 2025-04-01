import React, { useEffect, useState } from 'react';
import axios from 'axios';


function BlogPost() {
  const [form, setForm] = useState({ title: "", content: "", author: ""});

  const [blogPost, setBlogPost] = useState(null);

  const changeHandler=(e)=>{
    setForm({ ...form, [e.target.name]:e.target.value });
  };


    function getAllBlogPost(){
      try{
        // debugger;
        axios.get("http://localhost:8081/blogPost").then((d)=>{
          setBlogPost(d.data.blogData);
        });
      }
      catch(error){
          alert(error?.message);
      }
    }
    useEffect(() => {
      getAllBlogPost();
    }, []);
    


    function renderBlogPost(){
      return blogPost?.map((item)=>{
        return (
          <tr>
            <td>{item.title}</td>
            <td>{item.content}</td>
            <td>{item.author}</td>
            <td>
              <button className="btn btn-primary m-1" data-target='#editBlogPost' onClick={() =>{setForm(item);}}  data-toggle='modal'>
                Edit
                </button> 
                <button className='btn btn-danger' onClick={() =>{deleteClick(item._id);}}>
                  Delete
                </button>
            </td>
          </tr>
        )
      });
    }

    function saveClick(){
      try{
          axios.post("http://localhost:8081/blogPost", form).then((d)=>{
            alert(d.data.message);
            getAllBlogPost();
            resetForm();
          });
      }
      catch(error){
          alert('unable to access api!!!');
      }
    }

    function resetForm(){
      setForm({title:"", content:"", author:""});
    }

    function updateClick(){
      try{
        axios.put("http://localhost:8081/blogPost",form).then((d)=>{
          alert(d.data.message);
          getAllBlogPost();
          resetForm();
        });
      }
      catch(error){
        alert(error?.message);
      }
    }

    function deleteClick(id){
      try{
        debugger;
        let ans = window.confirm("want to delete data ?");
        if(!ans) return;
        axios.delete("http://localhost:8081/blogPost",{data:{id:id}}).then((d)=>{
          alert(d.data.message);
          getAllBlogPost();
          resetForm();
        });
      }
      catch(error){
        alert(error?.message);
      }
    } 
  
  return (
    <>
    <div className='row m-2 p-2'>
      <div className='col-9'>
        <h2 className='text-info   text-left'>BlogPostProject</h2>
      </div>
      <div className='col-3'>
        <button className='btn btn-primary form-control' data-target="#newBlogPost" data-toggle="modal">
          Add New BlogPost
        </button>
      </div>
    </div>
    <div className='row border p-2 m-2'>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderBlogPost()}</tbody>
      </table>
    </div>

    {/* New BlogPost */}
    <div className="modal" tabIndex="-1" role="dialog" id="newBlogPost">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header bg-info">
        <h5 className="modal-title text-white">New BlogPost</h5>
        <button type="button" onClick={resetForm} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className='form-group row'>
          <label className='col-4'>Title</label>
          <div className='col-8'>
            <input type="text" className='form-control' name='title' onChange={changeHandler} value={form.title}/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-4'>Content</label>
          <div className='col-8'>
            <input type="text" className='form-control'name='content' onChange={changeHandler} value={form.content}/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-4'>Author</label>
          <div className='col-8'>
            <input type="text" className='form-control'name='author' onChange={changeHandler} value={form.author}/>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveClick}>Save changes</button>
        <button type="button" className="btn btn-secondary" onClick={resetForm} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  {/* Edit BlogPost */}
  <div className="modal" tabIndex="-1" role="dialog" id="editBlogPost">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header bg-info">
        <h5 className="modal-title text-white">Edit BlogPost</h5>
        <button type="button" onClick={resetForm} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className='form-group row'>
          <label className='col-4'>Title</label>
          <div className='col-8'>
            <input type="text" className='form-control' name='title' onChange={changeHandler} value={form.title}/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-4'>Content</label>
          <div className='col-8'>
            <input type="text" className='form-control'name='content' onChange={changeHandler} value={form.content}/>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-4'>Author</label>
          <div className='col-8'>
            <input type="text" className='form-control'name='author' onChange={changeHandler} value={form.author}/>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal"onClick={updateClick}>Update</button>
        <button type="button" className="btn btn-secondary" onClick={resetForm} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default BlogPost
